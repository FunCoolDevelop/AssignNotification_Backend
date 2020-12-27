class Course{
    constructor(id,collegeId,name,professor,assignIds,quizIds,teamProIds) {
        this.id = id;
        this.collegeId = collegeId;
        this.name = name;
        this.professor = professor;
        this.assignIds = assignIds;
        this.quizIds = quizIds;
        this.teamProIds = teamProIds;
    }
}

module.exports = {
    Course,
};