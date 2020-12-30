const EntitySchema = require('typeorm').EntitySchema;
const Course = require('../models/assign').Course;

module.exports = new EntitySchema({
    name: 'Course',
    target: Course,
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
        name: {
            type: 'varchar',
            length: 50,
            nullable: false
        },
        professor: {
            type: 'varchar',
            length: 15,
            nullable: false
        },
        checkDate: {
            type: 'timestamp',
            default: () => 'CURRENT_TIMESTAMP',
            nullabel: false
        },
    }
})