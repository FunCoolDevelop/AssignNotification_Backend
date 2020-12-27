const EntitySchema = require('typeorm').EntitySchema;
const College = require('../models/assign').College;

module.exports = new EntitySchema({
    name: 'College',
    target: College,
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
        }
    }
})