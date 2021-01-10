const EntitySchema = require('typeorm').EntitySchema;
const Assign = require('../models/assign').Assign;

module.exports = new EntitySchema({
    name: 'Assign',
    target: Assign,
    columns: {
        id: {
            primary: true,
            type: 'bigint',
            generated: true
        },
        courseId: {
            type: 'bigint',
            nullable: false
        },
        uploadDate: {
            type: 'timestamp',
            default: () => 'CURRENT_TIMESTAMP',
            nullabel: true
        },
        name: {
            type: 'varchar',
            length: 150,
            nullable: false
        },
        deadLine: {
            type: 'timestamp',
            default: () => 'CURRENT_TIMESTAMP',
            nullabel: false
        },
        grade: {
            type: 'varchar',
            length: 30,
            nullable: true
        },
        submission: {
            type: 'varchar',
            length: 50,
            nullable: true
        }
    }
})