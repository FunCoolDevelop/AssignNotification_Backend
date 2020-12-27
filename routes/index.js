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
	const repository = connection.getRepository(Assign.options.name);
	repository.find().then((result) => {
		res.status(200).json(result);
	});
});

// 사용자의 계정으로 로그인 필요 (자동 로그인 기능)
const crawlUrl = "http://ecampus.konkuk.ac.kr/ilos/main/member/login_form.acl";

router.get('/crawler', function(req, res, next) {
	login(crawlUrl);
	res.status(200).json("Crawler Initiated");
});

async function screenshot(page){
	await page.screenshot({path: "screenshots/test_" + Date.now().toString() + ".png"});
	console.log("Took page screenshot");
}

async function login(url){
	console.log("Signing into " + signInfo.username);

	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	await page.goto(url);
	//await screenshot(page);

	await page.waitForSelector("div", {timeout: 10000});

	const result = await page.evaluate(() => {
		let resultArr = [];

		const tD1 = Array.from(document.querySelectorAll("div.utillmenu").values);
		//const tD2 = document.documentElement.outerHTML;

		resultArr.push(...tD1);
		//resultArr.push(tD2);

		return resultArr;
	});
	console.log(result);
	
	await browser.close();
}

let subjectInfo = [];

module.exports = router;