const { time, loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");

const convertEther = (amount) => {
  return ethers.parseEther(amount);
};

// Get balance util function
const getBalance = async (account) => {
  const balance = await ethers.provider.getBalance(account);
  return balance;
};

describe("StudentRegistryV2 Test Suite", () => {
  // deploy util function
  const deployUtil = async () => {
    const StudentRegistryV2 = await ethers.getContractFactory("StudentRegistryV2"); // instance of StudentRegistryV2 contract in Contracts folder
    const deployedStudentRegistryV2 = await StudentRegistryV2.deploy(); // the deployed version of the StudentRegistryV2 contract in the network
    const [owner, addr1, addr2] = await ethers.getSigners();
    const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
    return {
      deployedStudentRegistryV2,
      owner,
      addr1,
      addr2,
      ZERO_ADDRESS,
      deployedStudentRegistryV2Address: deployedStudentRegistryV2.target,
    };
  };

  describe("Deployment", () => {
    it("should deploy succesfuly and return default values of count", async () => {
      const { deployedStudentRegistryV2, owner, ZERO_ADDRESS, addr1 } = await loadFixture(deployUtil);
      // check the owner of the StudentRegistry contract which auto inherits from Ownable
      let studentRegistryV2Owner = await deployedStudentRegistryV2.getOwner();
      console.log("registry owner___", studentRegistryV2Owner);
      expect(studentRegistryV2Owner).to.eq(owner);

      // check that students array of Student struct is empty
      let allStudents = await deployedStudentRegistryV2.getAllStudents();
      console.log("all students___", allStudents);
      expect(allStudents.length).to.eq(0);

      // check that studentsMapping has default values
      // meaning no values pushed to studentsMapping upon successful deployment
      let studentsMapping = await deployedStudentRegistryV2.studentsMapping(ZERO_ADDRESS);
      let addr1Mapping = await deployedStudentRegistryV2.studentsMapping(addr1);
      console.log("student mapping___", ...studentsMapping);
      console.log("no of items in students mapping___", studentsMapping.length);
      const emptyStudentStruct = ["0x0000000000000000000000000000000000000000", "", "0", "0", false, false];
      expect(...addr1Mapping).to.eq(...emptyStudentStruct);
      expect(...studentsMapping).to.eq(...emptyStudentStruct);

      // check that tempstudentsMapping  has default values
      const tempStudentsMapping = await deployedStudentRegistryV2.tempstudentsMapping(addr1);
      expect(...tempStudentsMapping).to.eq(...emptyStudentStruct);

      // check if  hasPaidMapping has default value of false
      const hasPaidMapping = await deployedStudentRegistryV2.hasPaidMapping(addr1);
      expect(hasPaidMapping).to.eq(false);
    });
  });

  describe("Transactions", () => {
    describe("PayFee Transaction", () => {
      describe("Validations", () => {
        it("should revert owner attempt to paying 1ETH as fee", async () => {
          const { deployedStudentRegistryV2, owner } = await loadFixture(deployUtil);
          await expect(
            deployedStudentRegistryV2.connect(owner).payFee({ value: convertEther("1") })
          ).to.be.revertedWith("Owner is excluded");

          console.log("Deployed contract address:", deployedStudentRegistryV2.address);
          console.log(deployedStudentRegistryV2);
        });

        it("should revert attempt to proceed without paying 1ETH as fee", async () => {
          const { deployedStudentRegistryV2, addr1 } = await loadFixture(deployUtil);
          await expect(
            deployedStudentRegistryV2.connect(addr1).payFee({ value: convertEther("0") })
          ).to.be.revertedWith("You must pay fee");
        });
      });

      describe("Success", () => {
        it("should successfully process payment of 1 ETH fee", async () => {
          const { deployedStudentRegistryV2, addr1, deployedStudentRegistryV2Address, owner } = await loadFixture(
            deployUtil
          );

          // Fetch contract balance before payFee txn
          const initialContractBalance = await getBalance(deployedStudentRegistryV2Address);
          console.log("Contract's initial balance:", ethers.formatEther(initialContractBalance));

          // Fetch addr1  balance of  before payFee txn
          const initialPayerBalance = await getBalance(addr1.address);

          console.log("Payer's initial balance:", ethers.formatEther(initialPayerBalance));

          // Perform the payment
          const tx = await deployedStudentRegistryV2.connect(addr1).payFee({ value: ethers.parseEther("1") });
          await tx.wait(); // Wait for the transaction to be mined

          // Fetch updated balances
          const finalPayerBalance = await getBalance(addr1.address);
          const finalContractBalance = await getBalance(deployedStudentRegistryV2Address);

          console.log("Payer's final balance:", ethers.formatEther(finalPayerBalance));
          console.log("Contract's final balance:", ethers.formatEther(finalContractBalance));

          // Assert the balance changes
          const initialPayerBalanceNum = parseFloat(ethers.formatEther(initialPayerBalance));
          const finalPayerBalanceNum = parseFloat(ethers.formatEther(finalPayerBalance));
          const initialContractBalanceNum = parseFloat(ethers.formatEther(initialContractBalance));
          const finalContractBalanceNum = parseFloat(ethers.formatEther(finalContractBalance));

          // Check that the payer's balance decreased by 1 ETH
          expect(finalPayerBalanceNum).to.be.closeTo(initialPayerBalanceNum - 1, 0.01); // Use a tolerance for floating point comparison

          // Check that the contract's balance increased by 1 ETH
          expect(finalContractBalanceNum).to.be.closeTo(initialContractBalanceNum + 1, 0.01); // Use a tolerance for floating point comparison
        });
      });
      describe("Event", () => {
        it("should emit PaidFee", async () => {
          const { deployedStudentRegistryV2, addr1 } = await loadFixture(deployUtil);

          await expect(deployedStudentRegistryV2.connect(addr1).payFee({ value: ethers.parseEther("1") }))
            .to.emit(deployedStudentRegistryV2, "PaidFee")
            .withArgs(addr1.address, ethers.parseEther("1"));
        });
      });
    });
    describe("RegisterStudent Transaction", () => {
      it.only("should successfully register a student", async function () {
        const { deployedStudentRegistryV2, addr1, addr2, deployedStudentRegistryV2Address, owner } = await loadFixture(
          deployUtil
        );

        // Make a payment first
        await deployedStudentRegistryV2.connect(addr1).payFee({ value: ethers.parseEther("1") });

        // Perform registration
        await expect(deployedStudentRegistryV2.connect(addr1).register(addr2.address, "Alice", 20))
          .to.emit(deployedStudentRegistryV2, "registerStudent")
          .withArgs(addr2.address, "Alice", 20);

        // Verify the student was added
        const student = await deployedStudentRegistryV2.tempstudentsMapping(addr2.address);
        expect(student.studentAddr).to.equal(addr2.address);
        expect(student.name).to.equal("Alice");
        expect(student.age).to.equal(20);
        expect(student.hasPaid).to.be.true;
        expect(student.isAuthorized).to.be.false;
      });
    });
  });
});
