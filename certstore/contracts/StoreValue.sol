// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract StoreValue {
    uint private value;  // Declared as private, no need to specify again in function

    // Function to set a new value
    function set(uint v) public {
        value = v;
    }

    // Function to get the current value
    function get() public view returns (uint) {
        return value;
    }
}