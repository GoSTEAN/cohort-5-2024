// const {
//   loadFixture,
// } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
// const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// describe("StudentRegistry", function () {
//   let StudentRegistry;
//   let deployedStudentRegistry;
//   let owner;
//   let student1;
//   let student2;
//   let newOwner;

//   beforeEach(async function () {
//     [owner, student1, student2, newOwner] = await ethers.getSigners();

//     StudentRegistry = await ethers.getContractFactory("StudentRegistry");
//     deployedStudentRegistry = await StudentRegistry.deploy();

//     // return deployedStudentRegistry;
//   });

//   describe("Student Registration", function () {
//     it("should register a student with correct payment", async function () {
//       const tx = await deployedStudentRegistry
//         .connect(student1)
//         .registerStudent(student1.address, "Alice", 20, {
//           value: ethers.parseEther("1"),
//         });

//       await expect(tx)
//         .to.emit(deployedStudentRegistry, "PaymentStatus")
//         .withArgs(true, "Payment successful!!");

//       const studentAfterRegistration = await deployedStudentRegistry.getStudent(
//         student1.address
//       );

//       console.log("student", studentAfterRegistration);

//       expect(studentAfterRegistration.studentAddr).to.equal(student1.address);
//       expect(studentAfterRegistration.name).to.equal("Alice");
//       expect(studentAfterRegistration.age).to.equal(20);
//       expect(studentAfterRegistration.isAuthorized).to.be.false;
//     });

//     it("should check receipt of registration", async () => {
//       await deployedStudentRegistry
//         .connect(student1)
//         .registerStudent(student1.address, "Alice", 20, {
//           value: ethers.parseEther("1"),
//         });

//       const receipt = await deployedStudentRegistry.receipt(student1.address);
//       console.log("receipt", receipt);
//       expect(receipt).to.equal(ethers.parseEther("1"));
//     });

//     it("should authorize a registered student", async function () {
//       await deployedStudentRegistry
//         .connect(student1)
//         .registerStudent(student1.address, "Alice", 20, {
//           value: ethers.parseEther("1"),
//         });

//       const studentBefore = await deployedStudentRegistry.getStudent(
//         student1.address
//       );
//       console.log("Student before authorization:", studentBefore);

//       // Owner authorizes the student
//       const tx = await deployedStudentRegistry
//         .connect(owner)
//         .authorizeStudent(student1.address);
//       await tx.wait();

//       const studentAfter = await deployedStudentRegistry.getStudent(
//         student1.address
//       );
//       console.log("Student after authorization:", studentAfter);

//       expect(studentAfter.isAuthorized).to.be.true;
//       expect(studentAfter.studentId).to.be.gt(1);
//     });
//   });
// });
