// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

/// @title Student Registry Contract
/// @notice This contract is used for managing student records.
/// @dev This contract allows adding, updating, and deleting student records.
contract StudentRegistry {
    /// @dev Structure to store student information.
    struct Student {
        address studentAddr; ///< Address of the student.
        uint256 studentId; ///< Unique ID of the student.
        string name; ///< Name of the student.
        uint8 age; ///< Age of the student. Must be at least 18.
    }

    /// @notice Address of the contract owner.
    address public owner;

    /// @notice Event emitted when a student is added.
    /// @param studentAddr Address of the student.
    /// @param studentId Unique ID of the student.
    /// @param name Name of the student.
    /// @param age Age of the student.
    event AddStudentEvent(address indexed studentAddr, uint256 studentId, string name, uint8 age);

    /// @notice Event emitted when a student is deleted.
    /// @param studentAddr Address of the student.
    event DeleteStudentEvent(address indexed studentAddr);

    constructor() {
        owner = msg.sender;
    }

    Student[] private students;

    /// @dev Mapping from student address to student details.
    mapping(address => Student) private studentMapping;

    /// @dev Modifier to restrict functions to only the owner.
    modifier onlyOwner() {
        require(owner == msg.sender, "You fraud!!");
        _;
    }

    /// @dev Modifier to ensure the address is not zero.
    modifier isNotAddressZero() {
        require(msg.sender != address(0), "Invalid address");
        _;
    }
    
    /// @notice Adds a student to the registry.
    /// @param _studentAddr Address of the student.
    /// @param _name Name of the student.
    /// @param _age Age of the student. Must be at least 18.
    function addStudentFromMapping(
        address _studentAddr, 
        string memory _name, 
        uint8 _age
    ) public onlyOwner isNotAddressZero {
        require(bytes(_name).length > 0, "Name cannot be blank");
        require(_age >= 18, "You are not up to age");
        uint256 _studentId = students.length + 1;
        Student memory student = Student({
            studentAddr: _studentAddr,
            name: _name,
            age: _age,
            studentId: _studentId
        });

        students.push(student);
        studentMapping[_studentAddr] = student;

        emit AddStudentEvent(_studentAddr, _studentId, _name, _age);
    }

    /// @notice Retrieves a student's details using their ID.
    /// @param _studentId ID of the student.
    /// @return The student's details.
    function getStudent(uint256 _studentId) public onlyOwner view returns (Student memory) {
        return students[_studentId - 1];
    }

    /// @notice Retrieves a student's details using their address.
    /// @param _studentAddr Address of the student.
    /// @return The student's details.
    function getStudentFromMapping(address _studentAddr) public view returns (Student memory) {
        return studentMapping[_studentAddr];
    }
   
    /// @notice Updates a student's details in the registry.
    /// @param _studentAddr Address of the student.
    /// @param _name New name of the student.
    /// @param _age New age of the student. Must be at least 18.
    function updateStudentFromMapping(
        address _studentAddr,
        string memory _name, 
        uint8 _age
    ) public onlyOwner isNotAddressZero {
        require(_age >= 18, "Student must be at least 18 years old");

        Student storage student = studentMapping[_studentAddr];
        require(student.studentAddr != address(0), "Student does not exist");

        student.name = _name;
        student.age = _age;

        uint256 index = student.studentId - 1;
        students[index].name = _name;
        students[index].age = _age;

        // Optionally, emit an event if desired
        // emit UpdatedStudentEvent(_studentAddr, student.studentId, _name, _age);
    }

    /// @notice Deletes a student from the registry.
    /// @param _studentAddr Address of the student to delete.
    function deleteStudentFromMapping(address _studentAddr) public onlyOwner isNotAddressZero {
        require(studentMapping[_studentAddr].studentAddr != address(0), "Student does not exist");

        Student memory student = Student({
            studentAddr: address(0),
            name: "",
            age: 0,
            studentId: 0
        });

        studentMapping[_studentAddr] = student;

        emit DeleteStudentEvent(_studentAddr);
    }
}
