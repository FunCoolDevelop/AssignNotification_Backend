const express = require('express');
const router = express.Router();

router.get('/',(req, res) => res.json({username : '민상연~~~'}));
router.get('/group', (req,res) => res.json({username : 'dev group.민상연'}))

module.exports = router;