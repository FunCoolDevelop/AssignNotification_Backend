const EntitySchema = require('typeorm').EntitySchema;
const Student = require('../models/student').Student;

module.exports = new EntitySchema({
    name: 'Student',
    target: Student,
    columns: {
        id: {
            primary: true,
            type: 'bigint',
            generated: true
        },
        collegeId: {
            type: 'bigint',
            nullable: false
        },
        courseIds: {
            type: 'varchar',
            length: 150,
            nullable: true
        },
        name: {
            type: 'varchar',
            length: 50,
            nullable: false
        },
        loginId: {
            type: 'varchar',
            length: 50,
            nullable: false
        },
        loginPw: {
            type: 'varchar',
            length: 50,
            nullable: false
        }
    }
})