// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SellOutNFT is ERC1155, Ownable {
    uint256 public totalSupply;

    constructor() ERC1155("https://sellout-ten.vercel.app/nft.json") {}

    function mint() public {
        unchecked {
            ++totalSupply;
        }
        _mint(msg.sender, 1, 1, "");
    }
}