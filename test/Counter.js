// const {
//     time,
//     loadFixture,
//   } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
//     const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
//   const { expect } = require("chai");
//   const { ethers } = require("hardhat");
<<<<<<< HEAD

=======
  
>>>>>>> 7c4354bef0c1a6954d33b5d6468d7ae7ae5a0d63
//   describe("Counter Test Suite", () => {
//     // deploy util function
//     const deployUtil = async () => {
//       const Counter = await ethers.getContractFactory("Counter"); // instance of Counter contract in Contracts folder
//       const deployedCounter = await Counter.deploy(); // the deployed version of the Counter contract in the network
//       return deployedCounter; // returning the deployed counter instance
//     };
<<<<<<< HEAD

//     describe("Deployment", () => {
//       it("should deploy succesfuly and return default values of count", async () => {
//         const deployedCounter = await loadFixture(deployUtil);

=======
  
//     describe("Deployment", () => {
//       it("should deploy succesfuly and return default values of count", async () => {
//         const deployedCounter = await loadFixture(deployUtil);
  
>>>>>>> 7c4354bef0c1a6954d33b5d6468d7ae7ae5a0d63
//         // check initial value of count
//         let initialCountValue = await deployedCounter.count();
//         expect(initialCountValue).to.eq(0); // assertion that the value of  count variable upon deployment is 0
//       });
//     });
<<<<<<< HEAD

=======
  
>>>>>>> 7c4354bef0c1a6954d33b5d6468d7ae7ae5a0d63
//     describe("Transactions", () => {
//       describe("Increase Count Transactions", () => {
//         it("should increase count by one", async () => {
//           const deployedCounter = await loadFixture(deployUtil);
<<<<<<< HEAD

=======
  
>>>>>>> 7c4354bef0c1a6954d33b5d6468d7ae7ae5a0d63
//           // check initial value of count before increase count txn
//           const count1 = await deployedCounter.count();
//           console.log("count 1___", count1);
//           expect(count1).to.eq(0);
<<<<<<< HEAD

//           // check count value after increase count txn
//           await deployedCounter.increaseByOne();

//           const count2 = await deployedCounter.count();
//           expect(count2).to.eq(1);

//           // check count value after 2nd increase count txn
//           await deployedCounter.increaseByOne();

=======
  
//           // check count value after increase count txn
//           await deployedCounter.increaseByOne();
  
//           const count2 = await deployedCounter.count();
//           expect(count2).to.eq(1);
  
//           // check count value after 2nd increase count txn
//           await deployedCounter.increaseByOne();
  
>>>>>>> 7c4354bef0c1a6954d33b5d6468d7ae7ae5a0d63
//           const count3 = await deployedCounter.count();
//           expect(count3).to.eq(2);
//           console.log("count 3", count3);
//         });
//       });
<<<<<<< HEAD

=======
  
>>>>>>> 7c4354bef0c1a6954d33b5d6468d7ae7ae5a0d63
//       describe("Decrease Count Transactions", () => {
//         describe("Successful Decrease", () => {
//           it("should decrease count by one", async () => {
//             const deployedCounter = await loadFixture(deployUtil);
<<<<<<< HEAD

=======
  
>>>>>>> 7c4354bef0c1a6954d33b5d6468d7ae7ae5a0d63
//             // check initial value of count before increase count txn
//             const count1 = await deployedCounter.count();
//             console.log("count 1___", count1);
//             expect(count1).to.eq(0);
<<<<<<< HEAD

//             // check count value after increase count txn
//             await deployedCounter.increaseByOne();

//             const count2 = await deployedCounter.count();
//             expect(count2).to.eq(1); // 1

//             // check count value after 2nd increase count txn
//             await deployedCounter.decreaseByOne();

=======
  
//             // check count value after increase count txn
//             await deployedCounter.increaseByOne();
  
//             const count2 = await deployedCounter.count();
//             expect(count2).to.eq(1); // 1
  
//             // check count value after 2nd increase count txn
//             await deployedCounter.decreaseByOne();
  
>>>>>>> 7c4354bef0c1a6954d33b5d6468d7ae7ae5a0d63
//             const count3 = await deployedCounter.count();
//             expect(count3).to.eq(0);
//             console.log("count 3", count3); // 0
//           });
//         });
<<<<<<< HEAD

//         describe("Validations", () => {
//           it("should revert attempt to decrease below 0", async () => {
//             const deployedCounter = await loadFixture(deployUtil);

=======
  
//         describe("Validations", () => {
//           it("should revert attempt to decrease below 0", async () => {
//             const deployedCounter = await loadFixture(deployUtil);
  
>>>>>>> 7c4354bef0c1a6954d33b5d6468d7ae7ae5a0d63
//             // check initial value of count before increase count txn
//             const count1 = await deployedCounter.count();
//             console.log("count 1___", count1);
//             expect(count1).to.eq(0);
<<<<<<< HEAD

//             // check count value after increase count txn
//             await deployedCounter.increaseByOne();

//             const count2 = await deployedCounter.count();
//             expect(count2).to.eq(1); // 1

//             // check count value after 2nd increase count txn
//             await deployedCounter.decreaseByOne();

//             const count3 = await deployedCounter.count();
//             expect(count3).to.eq(0);
//             console.log("count 3", count3); // 0

=======
  
//             // check count value after increase count txn
//             await deployedCounter.increaseByOne();
  
//             const count2 = await deployedCounter.count();
//             expect(count2).to.eq(1); // 1
  
//             // check count value after 2nd increase count txn
//             await deployedCounter.decreaseByOne();
  
//             const count3 = await deployedCounter.count();
//             expect(count3).to.eq(0);
//             console.log("count 3", count3); // 0
  
>>>>>>> 7c4354bef0c1a6954d33b5d6468d7ae7ae5a0d63
//            await expect( deployedCounter.decreaseByOne()).to.be.rejectedWith("cannot decrease below 0")
//           });
//         });
//       });
//     });
//     describe("Events", () => {
//       describe("CountIncreased", () => {
//         it("should emit CountIncreased event on increaseByOne function", async () => {
//           const deployedCounter = await loadFixture(deployUtil);
<<<<<<< HEAD

=======
    
>>>>>>> 7c4354bef0c1a6954d33b5d6468d7ae7ae5a0d63
//           await expect(deployedCounter.increaseByOne())
//             .to.emit(deployedCounter, "CountIncreased")
//             .withArgs(1, anyValue);
//         });
//       });
<<<<<<< HEAD

//       describe("CounterDecreased", () => {
//         it("should emit CounterDecreased event on decreaseByOne function", async () => {
//           const deployedCounter = await loadFixture(deployUtil);

=======
    
//       describe("CounterDecreased", () => {
//         it("should emit CounterDecreased event on decreaseByOne function", async () => {
//           const deployedCounter = await loadFixture(deployUtil);
    
>>>>>>> 7c4354bef0c1a6954d33b5d6468d7ae7ae5a0d63
//           await deployedCounter.increaseByOne();
//           await expect(deployedCounter.decreaseByOne())
//             .to.emit(deployedCounter, "CountDecreased")
//             .withArgs(0, anyValue);  // Make sure the expected arguments are correct
//         });
//       });
//     });
<<<<<<< HEAD

//   });
=======
    
//   });
  
>>>>>>> 7c4354bef0c1a6954d33b5d6468d7ae7ae5a0d63
