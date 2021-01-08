var express = require('express');
var router = express.Router();
const { getConnection } = require('typeorm');
const puppeteer = require('puppeteer');

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

// 사용자의 계정정보를 담고있는 객체
const signInfo = require('../signInfo').signInfo;


router.get('/', function(req, res, next) {
	const connection = getConnection();
	const repository = connection.getRepository(Student.options.name);
	repository.find().then((result) => {
		res.status(200).json(result);
	});
});

router.get('/crawler', function(req, res, next) {
	crawlEngine('http://localhost:8000/crawler/crawlAll');
	res.status(200).json("Crawling Engine Manually Initiated");
});

async function crawlEngine(url){
	console.log('Crawling Engine Initiated');

	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	await page.goto(url,{timeout: 0});
	
	await browser.close();
	console.log('Crawling Engine Closed');
}

module.exports = router;