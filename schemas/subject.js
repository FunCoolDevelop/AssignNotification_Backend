const EntitySchema = require('typeorm').EntitySchema;
const Subject = require('../models/subject').Subject;

module.exports = new EntitySchema({
    name: 'Subject',
    target: Subject,
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