class teamPro{
    constructor(id,courseId,uploadDate,name,deadLine,grade,submission) {
        this.id = id;
        this.courseId = courseId;
        this.uploadDate = uploadDate;
        this.name = name;
        this.deadLine = deadLine;
        this.grade = grade;
        this.submission = submission;
    }
}

module.exports = {
    teamPro,
};