// const {
//     time,
//     loadFixture,
//   } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
//     const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
//   const { expect } = require("chai");
//   const { ethers } = require("hardhat");

//   describe("StudentRegistryV2 Test Suite", () => {
//     // deploy util function
//     const deployUtil = async () => {
//       const StudentRegistryV2 = await ethers.getContractFactory("StudentRegistryV2"); // instance of StudentRegistryV2 contract in Contracts folder
//       const deployedStudentRegistryV2 = await StudentRegistryV2.deploy(); // the deployed version of the StudentRegistryV2 contract in the network
//       return deployedStudentRegistryV2; // returning the deployed StudentRegistryV2 instance
//     };

//     describe("Deployment", () => {
//       it("should deploy succesfuly and return default values of count", async () => {
//         const deployedStudentRegistryV2 = await loadFixture(deployUtil);

//         // check initial value of count
//         let initialCountValue = await deployedStudentRegistryV2.count();
//         expect(initialCountValue).to.eq(0); // assertion that the value of  count variable upon deployment is 0
//       });
//     });
//   });
