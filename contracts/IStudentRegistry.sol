// SPDX-License-Identifier: MIT
<<<<<<< HEAD
pragma solidity ^0.8.14;
=======
pragma solidity ^0.8.24;
>>>>>>> 7c4354bef0c1a6954d33b5d6468d7ae7ae5a0d63
import "./Student.sol";
interface IStudentRegistry {

    function register( address _studentAddr, string memory _name, uint8 _age) external payable;

    function addStudent( address _studentAddr ) external payable ;

    function authorizeStudentRegistration (address _studentAddr) external;

    function getStudent(uint8 _studentID) external view returns (Student memory);

    function getStudentFromMapping(address _studentAddr) external view returns (Student memory);
    
    function deleteStudent(address _studentAddr) external; 

}