var express = require('express');
var router = express.Router();
const { getConnection } = require('typeorm');
const puppeteer = require('puppeteer');

const Assign = require('../schemas/assign');
const Subject = require('../schemas/subject');

const AssignMD = require('../models/assign').Assign;
const SubjectMD = require('../models/subject').Subject;

router.get('/', function(req, res, next) {
	const connection = getConnection();
	const repository = connection.getRepository(Assign.options.name);
	repository.find().then((result) => {
		res.status(200).json(result);
	});
});

// 사용자의 계정으로 로그인 필요
// http://ecampus.konkuk.ac.kr/ilos/main/main_form.acl
router.get('/crawler', function(req, res, next) {
	getSubjects("http://ecampus.konkuk.ac.kr/ilos/main/main_form.acl");
	res.status(200).json("Crawler Initiated");
});

let subjectInfo = [];

async function getSubjects(url){
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
  
	await page.goto(url);

	await page.waitForSelector("div", {timeout: 10000});

	const result = await page.evaluate(() => {
		const tData = Array.from(document.querySelectorAll("em"));
		tData.flat(Infinity);

		return tData;
	});
	console.log(result);
}

module.exports = router;