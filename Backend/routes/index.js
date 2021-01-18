var express = require('express');
var router = express.Router();
const { getConnection } = require('typeorm');
const puppeteer = require('puppeteer');
const cron = require('node-cron')
const moment = require('moment')

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

crawlUrl = 'http://localhost:8000/crawler/crawlAll';

cron.schedule('0 2 0 * * *', () => {
	console.log('Cron processing / ' + moment().format('YYYY-MM-DD hh:mm:ss'));
	crawlEngine(crawlUrl);
});

router.get('/', function(req, res, next) {
	const connection = getConnection();
	const repository = connection.getRepository(College.options.name);
	repository.find().then((result) => {
		res.status(200).json(result);
	});
});

router.get('/crawler', function(req, res, next) {
	crawlEngine(crawlUrl);
	res.status(200).json("Crawling engine manually initiated");
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