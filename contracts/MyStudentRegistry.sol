// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "contracts/StudentStruct.sol";
import "contracts/IStudentRegistry.sol";
import "contracts/Ownable.sol";

/**
 * @title MyStudentRegistry
 * @dev This contract acts as a proxy to interact with another StudentRegistry contract.
 * It forwards calls to the `StudentRegistry` contract for student management functions.
 */
contract MyStudentRegistry is Ownable {
    address private studentRegistry;

    /**
     * @dev Sets the address of the StudentRegistry contract.
     * @param _studentRegistryAddr The address of the StudentRegistry contract.
     */
    constructor(address _studentRegistryAddr) {
        studentRegistry = _studentRegistryAddr;
    }

    /**
     * @dev Register a student by forwarding the call to the StudentRegistry contract.
     * @param _studentAddr The address of the student to register.
     * @param _name The name of the student.
     * @param _age The age of the student.
     * Requires exactly 1 ether to be sent with the transaction.
     */
    function registerStudents(address _studentAddr, string memory _name, uint8 _age) public payable {
        require(msg.value == 1 ether, "You must pay exactly 1 ether");
        (bool success, ) = studentRegistry.call{value: msg.value}(
            abi.encodeWithSignature("registerStudent(address,string,uint8)", _studentAddr, _name, _age)
        );
        require(success, "Failed to forward payment and call");
    }

    /**
     * @dev Authorize a student by forwarding the call to the StudentRegistry contract.
     * @param _studentAddr The address of the student to authorize.
     */
    function authorizeStudents(address _studentAddr) public {
        IStudentRegistry(studentRegistry).authorizeStudent(_studentAddr);
    }

    /**
     * @dev Retrieve a student's information by forwarding the call to the StudentRegistry contract.
     * @param _studentAddr The address of the student to retrieve.
     */
    function getStudents(address _studentAddr) public  {
        return IStudentRegistry(studentRegistry).getStudent(_studentAddr);
    }

    /**
     * @dev Update a student's information by forwarding the call to the StudentRegistry contract.
     * @param _oldAddr The current address of the student.
     * @param _studentAddr The new address of the student.
     * @param _name The new name of the student.
     * @param _age The new age of the student.
     */
    function updateStudents(address _oldAddr, address _studentAddr, string memory _name, uint8 _age) public {
        IStudentRegistry(studentRegistry).updateStudent(_oldAddr, _studentAddr, _name, _age);
    }

    /**
     * @dev Delete a student's record by forwarding the call to the StudentRegistry contract.
     * @param _studentAddr The address of the student to delete.
     */
    function deleteStudents(address _studentAddr) public {
        IStudentRegistry(studentRegistry).deleteStudent(_studentAddr);
    }

    /**
     * @dev Allow the contract to receive Ether.
     */
    receive() external payable {}
}
