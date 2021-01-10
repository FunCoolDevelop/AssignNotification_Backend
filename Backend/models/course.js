class Course{
    constructor(id,collegeId,name,professor,checkDate) {
        this.id = id;
        this.collegeId = collegeId;
        this.name = name;
        this.professor = professor;
        this.checkDate = checkDate;
    }
}

module.exports = {
    Course,
};