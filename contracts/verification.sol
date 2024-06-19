// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Verification {


    mapping(bytes32 => bool) public verifiedHashes;
    mapping(address => bool) public verifiedAddresses;

    function hashAndStore(string memory data) public {
        require(!isHashVerified(data), "Hash already verified");
        bytes32  hash = keccak256(abi.encodePacked(data));
        verifiedHashes[hash] = true;
        verifiedAddresses[msg.sender] = true;
    }

    function isHashVerified(string memory data) public view returns (bool) {
        bytes32 hash = keccak256(abi.encodePacked(data));
        return verifiedHashes[hash];
    }

    function isAddressVerified() public view returns (bool) {
        return verifiedAddresses[msg.sender];
    }
}
