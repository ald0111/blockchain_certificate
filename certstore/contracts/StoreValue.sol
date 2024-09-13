// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.12;

contract StoreValue{
    private uint value;

    function set(uint v) public{
        value = v;
    }

    function get() public view returns(uint){
        return value;
    }
}
