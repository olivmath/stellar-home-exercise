// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title Flipper
/// @notice Stores a boolean value that anyone can flip and read.
contract Flipper {
    bool private value;

    constructor(bool initialValue) {
        value = initialValue;
    }

    function flip() external {
        value = !value;
    }

    function get() external view returns (bool) {
        return value;
    }
}
