<<<<<<< HEAD
// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

/**
 * @title Student
 * @dev Struct for storing student information.
 */
struct Student {
    /**
     * @dev The address of the student.
     */
    address studentAddr;

    /**
     * @dev The unique ID assigned to the student.
     */
    uint32 studentId;

    /**
     * @dev The name of the student.
     */
    string name;

    /**
     * @dev The age of the student.
     */
    uint8 age;

    /**
     * @dev The authorization status of the student.
     * True if the student is authorized, false otherwise.
     */
    bool isAuthorized;
}
=======
 // SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

 struct Student {
        address studentAddr;
        string name;
        uint256 studentId;
        uint8 age;
        bool hasPaid;
        bool isAuthorized;
    }
>>>>>>> 7c4354bef0c1a6954d33b5d6468d7ae7ae5a0d63
