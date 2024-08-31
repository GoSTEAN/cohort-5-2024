const { time, loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");

const convertEther = (amount) => {
  return ethers.parseEther(amount)
}

describe("StudentRegistryV2 Test Suite", () => {
  // deploy util function
  const deployUtil = async () => {
    const StudentRegistryV2 = await ethers.getContractFactory("StudentRegistryV2"); // instance of StudentRegistryV2 contract in Contracts folder
    const deployedStudentRegistryV2 = await StudentRegistryV2.deploy(); // the deployed version of the StudentRegistryV2 contract in the network
    const [owner, addr1, addr2] = await ethers.getSigners();
    const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
    return { deployedStudentRegistryV2, owner, addr1, addr2, ZERO_ADDRESS };
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
        it("should revert attempt to proceed without paying 1ETH as payment fee", async () => {
          const { deployedStudentRegistryV2, owner, ZERO_ADDRESS, addr1 } = await loadFixture(deployUtil);
         await expect(deployedStudentRegistryV2.connect(addr1).payFee({value: convertEther('0')})).to.be.rejectedWith("You must pay fee")
        });
      });
    });
  });
});
