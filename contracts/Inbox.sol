// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/**
 * @title Inbox
 * @dev Store & retrieve value in a variable
 */
contract Inbox {

    string public message;
    
    uint256 public number = 5;

    /**
     * @dev Store value in variable
     * @param initialMessage value to store
     */
    constructor(string memory initialMessage) {
        message = initialMessage;
    }
    
    function setMessage(string calldata newMessage) public {
        message = newMessage;
    }
}