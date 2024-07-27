// SPDX-License-Identifier: MIT
pragma solidity  >=0.8.2 <0.9.0;

contract StudentRegistry {
    // struct
    struct Student {
        address studentAddr;
        uint256 studentId;
        string name;
        // age should not be less than 18
        // add function to update student 
        // add delete function to delete student from the registry
        uint8 age;
    }

    address public owner;

    constructor() {
        owner = msg.sender;
    }

    Student[] private students;

    // mapping
    
    mapping (address => Student) public studentMapping;

    // Modifier
    modifier onlyOwner () {
        require(owner == msg.sender, "You fraud!!");
        _;
    }

    modifier isNotAdressZero() {
        require(msg.sender != address(0), "Invalid address");
        _;
    }
    

    // why is memory attached to _name? because string are converted to arrays so it need memory to store it
    function addStudentFromMapping(
        address _studentAddr, 
        string memory _name, 
        uint8 _age
        )  public onlyOwner isNotAdressZero {

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
            // add student to the mapping
            studentMapping[_studentAddr] = student;
    }

   

    function getStudent(uint256 _studentId) public onlyOwner view returns (Student memory) {
        return  students[_studentId - 1];
    }

    function getStudentFromMapping(address _studentAddr) public  view  returns (Student memory) {
        return studentMapping[_studentAddr];
    }
   

    function deleteStudentFromMApping(address _studentAddr) public onlyOwner isNotAdressZero {
        require(studentMapping[_studentAddr].studentAddr != address(0), "Student does not exist");

        Student memory student = Student({
            studentAddr: address(0x0),
            name: "",
            age: 0,
            studentId: 0
        });

        studentMapping[_studentAddr] = student;
    }
}