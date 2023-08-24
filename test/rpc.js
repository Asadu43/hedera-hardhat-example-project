/*-
 *
 * Hedera Hardhat Example Project
 *
 * Copyright (C) 2023 Hedera Hashgraph, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

const hre = require("hardhat");
const { expect } = require("chai");
var abi = require('ethereumjs-abi');
const {parseEther} = ethers.utils






describe("Test Token", function () {

  let callerContract;
  let calleeContractAddress;
  let testAddress;
  let contractAdd;
  let signers;

  before(async () => {
    signers = await ethers.getSigners();

    // hre.tracer.nameTags[await signers[0].getAddress()] = "ADMIN";
    // hre.tracer.nameTags[await signers[1].getAddress()] = "USER1";

    const Caller = await ethers.getContractFactory("Caller", signers);
    const Callee = await ethers.getContractFactory("Callee", signers);
  //Using already intilized contract facotry object with our contract, we can invoke deploy function to deploy the contract.
  //Accepts constructor parameters from our contract
   callerContract = await Caller.deploy();
   calleeContractAddress = await Callee.deploy();
  //We use wait to recieve the transaction (deployment) receipt, which contrains contractAddress
  // contractAdd = (await contractAddress.deployTransaction.wait())
  //   .contractAddress;
  //   testAddress = (await test.deployTransaction.wait())
  //   .contractAddress;

  console.log(`Callee deployed to: ${calleeContractAddress.address}`);
  console.log(`Caller deployed to: ${callerContract.address}`);
  });



    it("should be able to get the account balance", async function () {

      const wallet = (await ethers.getSigners())[0];
      const balance = (await wallet.getBalance()).toString();
      console.log(`The address ${wallet.address} has ${balance} tinybars`);


     await callerContract.setX(calleeContractAddress.address,10);


     await callerContract.setXandSendEther(calleeContractAddress.address,20 , { value: parseEther("5") });


     const val = await calleeContractAddress.getX();


     console.log("Value............. ",val);



     const bal = await calleeContractAddress.getContractBalance();


     console.log("Balance............. ",bal);


  });


});

// describe("RPC", function () {
//   let contractAddress;
//   let signers;

//   before(async function () {
//     signers = await hre.ethers.getSigners();
//   });

//   it("should be able to get the account balance", async function () {
//     const balance = await hre.run("show-balance");
//     expect(Number(balance)).to.be.greaterThan(0);
//   });

//   it("should be able to deploy a contract", async function () {
//     contractAddress = await hre.run("deploy-contract");
//     expect(contractAddress).to.not.be.null;
//   });

//   it("should be able to make a contract view call", async function () {
//     const res = await hre.run("contract-view-call", { contractAddress });
//     expect(res).to.be.equal("initial_msg");
//   });

//   it("should be able to make a contract call", async function () {
//     const msg = "updated_msg";
//     await hre.run("contract-call", { contractAddress, msg });
//     const res = await hre.run("contract-view-call", { contractAddress });
//     expect(res).to.be.equal(msg);
//   });
// });
