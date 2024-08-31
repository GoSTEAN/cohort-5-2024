const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("StudentRegistryV2 Test Suite", () => {
  // deploy util function
  const deployUtil = async () => {
    const StudentRegistryV2 = await ethers.getContractFactory(
      "StudentRegistryV2"
    ); // instance of StudentRegistryV2 contract in Contracts folder
    const deployedStudentRegistryV2 = await StudentRegistryV2.deploy(); // the deployed version of the StudentRegistryV2 contract in the network

    const [owner, addr1, addr2] = await ethers.getSigners();
    const ZERO_ADDRESS = "0x000000000000000000000000";
    return { deployedStudentRegistryV2, owner, addr1, addr2, ZERO_ADDRESS }; // returning the deployed StudentRegistryV2 instance
  };

  describe("Deployment", () => {
    it("should deploy succesfuly and return default values of count", async () => {
      const { deployedStudentRegistryV2, owner } = await loadFixture(
        deployUtil
      );

      let studentRegistryV2Owner = await deployedStudentRegistryV2.getOwner();
      console.log("registry owner___", studentRegistryV2Owner);
      expect(studentRegistryV2Owner).to.eql(owner);

      let allStudents = await deployedStudentRegistryV2.getAllStudents();
      console.log("all student___", allStudents);
      expect(allStudents.length).to.eq(0);
    });
  });
});
