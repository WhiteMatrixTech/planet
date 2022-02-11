// contracts/GameItem.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IPlanet.sol";

contract Planet is IPlanet, ERC721, ReentrancyGuard, ERC721Enumerable, Ownable {
    using Strings for uint256;
    using SafeMath for uint256;

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    string public baseURI =
        "https://storageapi.fleek.co/82da0466-48d9-4f6f-a026-269ea27f0827-bucket/plantbox-random/";
    string public defaultBoxURI =
        "https://storageapi.fleek.co/82da0466-48d9-4f6f-a026-269ea27f0827-bucket/planet/default.jpg";

    uint256 public purchaseCap = 10;
    uint256 public tokenPrice = 1000000000000000; // 0.001 eth
    uint256 public collectionSize = 5555;

    constructor() ERC721("PLANET", "PLA") {}

    function tokenURI(uint256 tokenId)
        public
        view
        override(IPlanet, ERC721)
        returns (string memory)
    {
        require(_exists(tokenId), "URI query for nonexistent token");

        if (bytes(baseURI).length > 0) {
            return
                string(
                    abi.encodePacked(_baseURI(), tokenId.toString(), ".json")
                );
        } else {
            return defaultBoxURI;
        }
    }

    function _baseURI() internal view override(ERC721) returns (string memory) {
        return baseURI;
    }

    /* ================ OWNER ACTIONS ================ */
    function setBaseURI(string memory newBaseURI) public override onlyOwner {
        baseURI = newBaseURI;
    }

    // buy
    function buy(uint256 quantity) external payable override(IPlanet) {
        require(
            quantity <= purchaseCap,
            "quantity is more than purchase of the cap"
        );
        require(
            totalSupply() + quantity <= collectionSize,
            "reached max supply"
        );
        require(
            msg.value >= tokenPrice.mul(quantity),
            "payment is less than token price"
        );

        for (uint256 i = 0; i < quantity; i++) {
            _tokenIds.increment();
            uint256 tokenId = _tokenIds.current();
            _safeMint(_msgSender(), tokenId);
            emit Minted(_msgSender(), tokenId, block.timestamp);
        }
    }

    function withdraw() external onlyOwner nonReentrant {
        (bool success, ) = msg.sender.call{value: address(this).balance}("");
        require(success, "Transfer failed.");
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
