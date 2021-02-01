var express = require('express');
var router = express.Router();
const { getConnection } = require('typeorm');

//Database
const Assign = require('../schemas/assign');
const College = require('../schemas/college');
const Course = require('../schemas/course');
const Quiz = require('../schemas/quiz');
const Student = require('../schemas/student');
const teamPro = require('../schemas/teamPro');

const AssignMD = require('../models/assign').Assign;
const CollegeMD = require('../models/college').College;
const CourseMD = require('../models/course').Course;
const QuizMD = require('../models/quiz').Quiz;
const StudentMD = require('../models/student').Student;
const teamProMD = require('../models/teamPro').teamPro;

router.get('/', function(req, res, next) {
    res.send({ uid : "test id" });
});

router.post('/loginVerify', async function(req, res, next) {
    let student = await getConnection()
    .getRepository(StudentMD)
    .createQueryBuilder("Student")
    .select("Student")
    .getMany();

    let nowUid = null;

    try{
        for(i = 0;i < student.length;i++)
            if(req.body.loginId == student[i].loginId && req.body.loginPw == student[i].loginPw)
                nowUid = student[i].id;
    }catch(e){
        console.log("Body undefined");
    }
    res.send({ uid : nowUid });
});

router.post('/signup', function(req, res, next) {
    signup(req.body.cid,req.body.name,req.body.signid, req.body.signpw);
    res.status(200).json("SignUp");
});

async function signup(cid, name, uid, upw){
    let student = await getConnection()
    .getRepository(StudentMD)
    .createQueryBuilder("Student")
    .select("Student")
    .getMany();

    for(i = 0;i < student.length;i++)
        if(student[i].collegeId == cid && student[i].loginId == uid)
            return;

    await getConnection()
    .createQueryBuilder()
    .insert()
    .into(StudentMD)
    .values([
      { collegeId: cid,
        name: name,
        loginId:uid,
        loginPw:upw}
    ])
    .execute();
}

module.exports = router;