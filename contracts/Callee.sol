// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
import "hardhat/console.sol";


contract Callee {
    uint public x;
    uint public value;

    function setX(uint _x) public returns (uint) {
        x = _x;
        return x;
    }

    function setXandSendEther(uint _x) public payable returns (uint, uint) {
        x = _x;
        value = msg.value;

        return (x, value);
    }

function getContractBalance() public view returns (uint256){
    return address(this).balance;
}

    function getX() public view returns(uint){
        return x;
    }
}