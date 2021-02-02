var express = require('express');
var router = express.Router();
const puppeteer = require('puppeteer');
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
    res.send({ sid : "GET test" });
});

router.post('/getAssign', async function(req, res, next) {
    let sid = req.body.sid;
    let assignData = [];

    try{
        let student = await getConnection()
        .getRepository(StudentMD)
        .createQueryBuilder("Student")
        .where("student.id = :tmp", { tmp: sid })
        .getOne();

        let cids = (student.courseIds).split(';');
        for(i = 0;i < cids.length - 1;i++){
            let csTmp = [];

            let course = await getConnection()
            .getRepository(CourseMD)
            .createQueryBuilder("Course")
            .where("course.id = :tmp", { tmp: cids[i] })
            .getOne();

            csTmp.push(course.name);

            let assign = await getConnection()
            .getRepository(AssignMD)
            .createQueryBuilder("assign")
            .where("assign.courseId = :tmp", { tmp: cids[i] })
            .getMany();

            for(j = 0;j < assign.length;j++){
                let asTmp = [];
                asTmp.push(assign[j].name);
                //asTmp.push(assign[j].uploadDate);
                asTmp.push(assign[j].deadLine);
                asTmp.push(assign[j].grade);
                //asTmp.push(assign[j].submission);
                csTmp.push(asTmp);
            }
            assignData.push(csTmp);
        }
    }catch(e){
        console.log("DataBase Omission \n" + e);
    }
    //console.log(assignData);
    res.send({ assignData : assignData });
});

router.post('/loginVerify', async function(req, res, next) {
    let student = await getConnection()
    .getRepository(StudentMD)
    .createQueryBuilder("Student")
    .select("Student")
    .getMany();

    let nowSid = null;

    try{
        for(i = 0;i < student.length;i++)
            if(req.body.loginId == student[i].loginId && req.body.loginPw == student[i].loginPw)
                nowSid = student[i].id;

        //crawlSingle(nowSid);
    }catch(e){
        console.log("Body undefined");
    }
    res.send({ sid : nowSid });
});

router.post('/crawl', async function(req, res, next) {
    nowSid = req.body.sid;
    if(nowSid)
        crawlSingle(nowSid);
    res.status(200).json("Crawl");
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

async function crawlSingle(sid){
    crawlUrl = 'http://localhost:8000/crawler/' + sid;
	
	console.log('Crawling Engine Initiated');

	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	await page.goto(crawlUrl,{timeout: 0});
	
	await browser.close();

	console.log('Crawling Engine Closed');
}

module.exports = router;