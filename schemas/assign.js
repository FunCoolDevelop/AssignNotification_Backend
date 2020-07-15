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
        name: {
            type: 'varchar',
            length: 50,
            nullable: false
        },
        categoty: {
            type: 'varchar',
            length: 50,
            nullable: false
        },
        subjectId: {
            type: 'bigint',
            nullable: false
        },
        limit: {
            type: 'timestamp',
            default: () => 'CURRENT_TIMESTAMP',
            nullabel: false
        }
    }
})