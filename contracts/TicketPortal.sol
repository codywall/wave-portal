// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract TicketPortal {
    uint256 totalTickets;
    uint256 private seed;

    event NewTicket(address indexed from, uint256 timestamp, string message);

    struct Ticket {
        address buyer;
        string message;
        uint256 timestamp;
    }

    Ticket[] tickets;

    mapping(address => uint256) public lastEnteredAt;

    constructor() payable {
        console.log("We have been constructed!");
    }

    function buyTicket(string memory _message) public {
        require(
            lastEnteredAt[msg.sender] + 30 seconds < block.timestamp,
            "Wait 30s"
        );

        lastEnteredAt[msg.sender] = block.timestamp;

        totalTickets += 1;
        console.log("%s has bought a ticket.", msg.sender);

        tickets.push(Ticket(msg.sender, _message, block.timestamp));

        uint256 randomNumber = (block.difficulty + block.timestamp + seed) %
            100;
        console.log("Random # generated: %s", randomNumber);

        seed = randomNumber;

        if (randomNumber < 20) {
            console.log("%s won!", msg.sender);

            uint256 prizeAmount = 0.0001 ether;
            require(
                prizeAmount <= address(this).balance,
                "Trying to withdraw more money than they contract has."
            );
            (bool success, ) = (msg.sender).call{value: prizeAmount}("");
            require(success, "Failed to withdraw money from contract.");
        }

        emit NewTicket(msg.sender, block.timestamp, _message);
    }

    function getAllTickets() public view returns (Ticket[] memory) {
        return tickets;
    }

    function getTotalTickets() public view returns (uint256) {
        return totalTickets;
    }
}
