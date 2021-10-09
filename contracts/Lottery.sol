// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/**
 * @title Lottery
 * @dev Store & retrieve value in a variable
 */
contract Lottery {

    address public owner;

    address[] public players;

    /**
     * @dev Store value in variable
     */
    constructor() {
        owner = msg.sender;
    }

    function enter() public payable {
        require(msg.value > 0.01 ether);

        players.push(msg.sender);
    }

    function chooseWinner() public restricted {
        if (players.length == 0) {
            return;
        }

        payable(players[generateRandomNumber() % players.length]).transfer(address(this).balance);
        delete players;
    }

    function generateRandomNumber() private view returns (uint) {
        return uint(keccak256(abi.encode(block.timestamp)));
    }

    modifier restricted() {
        require(msg.sender == owner);
        _;
    }


    function getPlayers() public view returns (address[] memory) {
        return players;
    }
}