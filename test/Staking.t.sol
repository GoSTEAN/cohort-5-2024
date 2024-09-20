// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Test, console} from "forge-std/Test.sol";
import "forge-std/console.sol";
import {StakingContract} from "../src/Staking.sol";
import {ERC20} from "../src/ERC20.sol";

contract StakingContractTest is Test {
    StakingContract public stakingContract;

    ERC20 public bwcErc20TokenContract;
    ERC20 public receiptTokenContract;
    ERC20 public rewardTokenContract;
    address public user = address(0x1);
    address public user1 = address(0x21);
    uint256 public constant INITIAL_BALANCE = 10000e18;
    uint256 public stakingAmount = 100e18;
    uint256 constant MIN_TIME_BEFORE_WITHDRAW = 240;

    address bwcTokenAddress;
    address receiptTokenAddress;
    address rewardTokenAddress;

    address ownerAddr;
    address addr1;

    function setUp() public {
        bwcErc20TokenContract = new ERC20("BlockheaderWeb3 Token", "BWC", 0);
        receiptTokenContract = new ERC20("Receipt Token", "cBWC", 0);
        rewardTokenContract = new ERC20("Reward Token", "wBWC", 0);

        bwcTokenAddress = address(bwcErc20TokenContract);
        receiptTokenAddress = address(receiptTokenContract);
        rewardTokenAddress = address(rewardTokenContract);

        stakingContract = new StakingContract(
            bwcTokenAddress,
            receiptTokenAddress,
            rewardTokenAddress
        );

        bwcErc20TokenContract.mint(user, INITIAL_BALANCE);
        bwcErc20TokenContract.mint(user1, INITIAL_BALANCE);

        receiptTokenContract.mint(address(stakingContract), INITIAL_BALANCE);
    }

    function test_StakingContractDeployment() public view {
        assertEq(stakingContract.bwcErc20TokenAddress(), bwcTokenAddress);
        assertEq(stakingContract.receiptTokenAddress(), receiptTokenAddress);
        assertEq(stakingContract.rewardTokenAddress(), rewardTokenAddress);
    }

    function test_StakingNotAddZero() public {
        vm.startPrank(address(0));
        uint256 amount = 100e18;
        bwcErc20TokenContract.approve(address(stakingContract), amount);
        vm.expectRevert("STAKE: Address zero not allowed");
        stakingContract.stake(amount);
        vm.stopPrank();
    }

    function test_StakingWithZeroAmount() public {
        vm.startPrank(user);
        vm.expectRevert("STAKE: Zero amount not allowed");
        stakingContract.stake(0);
        vm.stopPrank();
    }

    function test_StakingWithInsufficientBalance() public {
        uint256 stakeAmount = INITIAL_BALANCE + 1;
        vm.startPrank(user);
        bwcErc20TokenContract.approve(address(stakingContract), stakeAmount);
        vm.expectRevert("STAKE: Insufficient funds");
        stakingContract.stake(stakeAmount);
        vm.stopPrank();
    }

    function test_StakingWithInsufficientAllowance() public {
        uint256 stakeAmount = 100e18;
        vm.startPrank(user);
        bwcErc20TokenContract.approve(address(stakingContract), stakeAmount - 1);
        vm.expectRevert("STAKE: Amount not allowed");
        stakingContract.stake(stakeAmount);
        vm.stopPrank();
    }

    function test_StakingWhenContractHasInsufficientReceiptTokens() public {
        uint256 stakeAmount = INITIAL_BALANCE;
        receiptTokenContract.burn(address(stakingContract), INITIAL_BALANCE);
        
        vm.startPrank(user);
        bwcErc20TokenContract.approve(address(stakingContract), stakeAmount);
        vm.expectRevert("STAKE: Low contract receipt token balance");
        stakingContract.stake(stakeAmount);
        vm.stopPrank();
    }

    function test_StakeTransferFailed() public {
        vm.startPrank(user);
        uint256 stakeAmount = 100e18;

        vm.mockCall(
            address(bwcTokenAddress),
            abi.encodeWithSignature("transferFrom(address,address,uint256)", user, address(stakingContract), stakeAmount),
            abi.encode(false) // Simulate a transfer failure
        );
        // uint time = block.timestamp;
        // bool status = true;
        // bwcErc20TokenContract.approve(address(stakingContract), stakeAmount);

        // // assertEq(stakingContract.getStakers(user).amount, stakeAmount);
        // assertEq(stakingContract.getStakers(user).timeStaked, time);
        // assertEq(stakingContract.getStakers(user).status, status);
        

        vm.expectRevert("STAKE: Transfer failed");
        stakingContract.stake(stakeAmount);
        vm.stopPrank();
    }


    function test_GetTotalStake() public {
        // Initial total stake should be 0
        assertEq(stakingContract.getTotalStake(), 0, "Initial total stake should be 0");

        // Stake some tokens
        uint256 stakingAmount1 = 100e18;
        uint256 stakingAmount2 = 150e18;

        uint256 totalAmount = stakingAmount1 + stakingAmount2;
        
        vm.startPrank(user);
        bwcErc20TokenContract.approve(address(stakingContract), totalAmount);
        stakingContract.stake(stakingAmount1);
        
        // Check total stake after first staking
        assertEq(stakingContract.getTotalStake(), stakingAmount1, "Total stake should equal first staking amount");
        
        // Stake more tokens
        stakingContract.stake(stakingAmount2);
        vm.stopPrank();

        // Check total stake after second staking
        assertEq(stakingContract.getTotalStake(), totalAmount, "Total stake should equal sum of both staking amounts");
    }

    function test_GetBwcTokenAddress() public view{

        assertEq(stakingContract.getBwcTokenAddress(), bwcTokenAddress, "The bwc token address");
    }

    function test_GetRewardTokenAddress() public view {
        assertEq(stakingContract.getRewardTokenAddress(), rewardTokenAddress, "The reward token address");
    }

    function test_GetReceiptTokenAddress() public view {
        assertEq(stakingContract.getReceiptTokenAddress(), receiptTokenAddress, "The receive token address");
    }



function test_NextWithdrawal() public view {
    uint time = block.timestamp;
    uint256 nextTime = time + MIN_TIME_BEFORE_WITHDRAW - block.timestamp;
    uint256 actualTime = stakingContract.getNextWithdrawTime(user);
    assertApproxEqAbs(actualTime, nextTime, 1, "The time left for the next withdrawal should be within 1 second of the expected time.");
}

    // function test_IsTimeToWithdraw() public {
    
    // }

    function test_Withdraw() public {
        uint256 amount = 100e18;

    }
}
