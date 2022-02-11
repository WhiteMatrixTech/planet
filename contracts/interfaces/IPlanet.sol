// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma abicoder v2;

interface IPlanet {
    /* ================ EVENTS ================ */
    event Minted(
        address indexed payer,
        uint256 indexed tokenId,
        uint256 eventTime
    );

    /* ================ VIEWS ================ */
    function tokenURI(uint256 tokenId) external view returns (string memory);

    /* ================ ADMIN ACTIONS ================ */
    function setBaseURI(string memory newBaseURI) external;

    /**
     * @dev buy the amount of tokens to the _msgSender()
     * @notice the msg.values should be larger or equal than the tokens total price
     * @param quantity the amount of tokens to buy
     */
    function buy(uint256 quantity) external payable;
}
