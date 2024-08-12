// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;


contract Ownable {

    address internal  owner;

    constructor() payable {
        owner = payable (msg.sender);
    }


    modifier  onlyOwner {
        require(owner == msg.sender, "Caller not owner");
        _;
    }


    function getOwner() public  view returns (address){
        return owner;
    }

}