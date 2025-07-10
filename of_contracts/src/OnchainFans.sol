// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.25;

contract OnchainFans {
    uint constant public FEE = 0.0001 ether;

    mapping (address => mapping (address => bool)) public members;

    error InsufficientFee();
    error AlreadyAMember();
    error PaymentRejected();
    function join(address payable creator) external payable {
        if(msg.value < FEE) {
            revert InsufficientFee();
        }
        
        if(members[creator][msg.sender] == true) {
            revert AlreadyAMember();
        }

        (bool sent, bytes memory _data) = creator.call{value: FEE}("");
        if(!sent) {
            revert PaymentRejected();
        }
    }
}
