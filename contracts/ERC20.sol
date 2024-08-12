// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "./IERC20.sol";
import "./Ownable.sol";

contract ERC20 is IERC20, Ownable {
    // Events for logging transfers and approvals
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    uint256 public totalSupply;  // Total supply of tokens
    mapping(address => uint256) public balanceOf;  // Mapping from address to token balance
    mapping(address => mapping(address => uint256)) public allowance;  // Mapping for approved allowances
    string public name;  // Token name
    string public symbol;  // Token symbol
    uint8 public decimals;  // Number of decimal places

    // Constructor to initialize the token's name, symbol, and decimals
    constructor(string memory _name, string memory _symbol, uint8 _decimals) {
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
    }

    // Transfer function allows users to transfer tokens to another address
    function transfer(address recipient, uint256 amount) external returns (bool) {
        require(recipient != address(0), "ERC20: transfer to zero address");
        require(balanceOf[msg.sender] >= amount, "ERC20: transfer amount exceeds balance");
        balanceOf[msg.sender] -= amount;
        balanceOf[recipient] += amount;
        emit Transfer(msg.sender, recipient, amount);
        return true;
    }

    // Approve function allows users to approve another address to spend tokens on their behalf
    function approve(address spender, uint256 amount) external returns (bool) {
        require(spender != address(0), "ERC20: approve to zero address");
        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    // TransferFrom function allows an approved address to transfer tokens on behalf of another address
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool) {
        require(recipient != address(0), "ERC20: transfer to zero address");
        require(sender != address(0), "ERC20: transfer from zero address");
        require(balanceOf[sender] >= amount, "ERC20: transfer amount exceeds balance");
        require(allowance[sender][msg.sender] >= amount, "ERC20: transfer amount exceeds allowance");

        balanceOf[sender] -= amount;
        balanceOf[recipient] += amount;
        allowance[sender][msg.sender] -= amount;
        emit Transfer(sender, recipient, amount);
        return true;
    }

    // Internal mint function that only the owner can call
    function _mint(address to, uint256 amount) internal onlyOwner {
        require(to != address(0), "ERC20: mint to zero address");

        balanceOf[to] += amount;
        totalSupply += amount;
        emit Transfer(address(0), to, amount);
    }

    // Internal burn function that only the owner can call
    function _burn(address from, uint256 amount) internal onlyOwner {
        require(from != address(0), "ERC20: burn from zero address");
        require(balanceOf[from] >= amount, "ERC20: burn amount exceeds balance");

        balanceOf[from] -= amount;
        totalSupply -= amount;
        emit Transfer(from, address(0), amount);
    }

    // External mint function that calls the internal _mint function
    // Restricted to the contract owner
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    // External burn function that calls the internal _burn function
    // Restricted to the contract owner
    function burn(address from, uint256 amount) external onlyOwner {
        _burn(from, amount);
    }
}
