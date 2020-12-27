class Student{
    constructor(id,collegeId,courseIds,name,loginId,loginPw) {
        this.id = id;
        this.collegeId = collegeId;
        this.courseIds = courseIds;
        this.name = name;
        this.loginId = loginId;
        this.loginPw = loginPw;
    }
}

module.exports = {
    Student,
};