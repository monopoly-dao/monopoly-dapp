// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.22;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

interface Erc20TokenInterface {
    function decimals() external view returns (uint8);
}

contract SettleyTicket is ERC1155URIStorage, ERC1155Supply, Ownable {

    using SafeERC20 for IERC20;

    event TokenMinted(
        uint256 indexed tokenId,
        address indexed recipient,
        uint256 amount,
        string tokenURI,
        address stableCoin,
        uint256 stableAmount,
        uint256 blockNumber
    );

    uint256 public tokenCounter;
    string private _baseURI;

    address public receiverWallet;

    uint256 public startingBlock;
    uint256 public mostRecentBlock;

    uint256 public costPerTicket6Decimals;
    uint256 public costPerTicket18Decimals;

    mapping(address => bool) public acceptedStables;
    mapping(address => mapping(address => uint256)) public buyersBalance;

    constructor() ERC1155("https://example.com/metadata/") Ownable(msg.sender) {
        tokenCounter = 0;
        costPerTicket6Decimals = 0.1e6;
        costPerTicket18Decimals = 0.1e18;
    }

    // Override required for the inherited contracts to work together
    function _update(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory values
    ) internal override(ERC1155, ERC1155Supply) {
        super._update(from, to, ids, values);
    }

    // Override for URI storage
    function uri(
        uint256 tokenId
    ) public view override(ERC1155, ERC1155URIStorage) returns (string memory) {
        return super.uri(tokenId);
    }

    function transferStables(address _stableCoin, uint256 _amount) internal {
        require(receiverWallet != address(0), "Set receiver wallet");
        buyersBalance[_stableCoin][msg.sender] = _amount;
        IERC20(_stableCoin).safeTransferFrom(
            msg.sender,
            receiverWallet,
            _amount
        );
    }

    function estimateTotalCost(
        address _stable,
        uint256 numberOfTickets
    ) public view returns (uint256) {
        if (Erc20TokenInterface(_stable).decimals() == 6) {
            return costPerTicket6Decimals * numberOfTickets;
        } else if (Erc20TokenInterface(_stable).decimals() == 18) {
            return costPerTicket18Decimals * numberOfTickets;
        } else {
            return 0;
        }
    }

    function mint(
        uint256 numberOfTickets, // the amount of tickets the user is buying.  We need to set the exchange rate on the frontend.
        string memory tokenURI,
        address _stableCoin
    ) external returns (uint256) {
        require(
            msg.sender != address(0) || _stableCoin != address(0),
            "Address zero is invalid"
        );
        require(
            costPerTicket18Decimals != 0 || costPerTicket6Decimals != 0,
            "Set cost per ticket!"
        );
        uint256 amountDue = estimateTotalCost(_stableCoin, numberOfTickets);

        require(amountDue > 0, "Amount must be greater than zero!");
        require(acceptedStables[_stableCoin], "Token is not acceptable!");
        require(numberOfTickets > 0, "Token amount must be greater than zero!");

        tokenCounter++;

        if (tokenCounter == 1) {
            startingBlock = block.number;
        }

        uint256 newTokenId = tokenCounter;
        mostRecentBlock = block.number;

        _setURI(newTokenId, tokenURI);
        transferStables(_stableCoin, amountDue);
        _mint(msg.sender, newTokenId, numberOfTickets, "");

        emit TokenMinted(
            newTokenId,
            msg.sender,
            numberOfTickets,
            tokenURI,
            _stableCoin,
            amountDue,
            block.number
        );
        return newTokenId;
    }

    function setBaseURI(string memory baseURI) external onlyOwner {
        _baseURI = baseURI;
    }

    function getBaseURI() public view returns (string memory) {
        return _baseURI;
    }

    function setReceiverWallet(address _wallet) external onlyOwner {
        receiverWallet = _wallet;
    }

    function setAcceptedStable(
        address _stableCoin,
        bool _status
    ) external onlyOwner {
        acceptedStables[_stableCoin] = _status;
    }

    function mintAdditional(
        address recipient,
        uint256 tokenId,
        uint256 additionalAmount
    ) external onlyOwner {
        require(exists(tokenId), "Token does not exist");
        require(additionalAmount > 0, "Amount must be greater than zero");

        _mint(recipient, tokenId, additionalAmount, "");
    }


    function setCostPerTokenFor6Decimals(uint256 _amount) external {
        costPerTicket6Decimals = _amount;
    }

    function setCostPerTokenFor18Decimals(uint256 _amount) external {
        costPerTicket18Decimals = _amount;
    }

    function isTokenAccepted(address _token) view external returns(bool){
        return acceptedStables[_token];
    }
}
