// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract StoreHashes {

    // Array to store hashes
    bytes32[] private hashes;

    // Function to add a new SHA-256 hash
    function addHash(string memory input) public {
        // Calculate the SHA-256 hash and store it in the array
        bytes32 hash = sha256(abi.encodePacked(input));
        hashes.push(hash);
    }

    // Function to get all stored hashes
    function getHashes() public view returns (bytes32[] memory) {
        return hashes;
    }
}