const router = require('express').Router();
const { getQuestions } = require('./questions');

router.get('/checkin', (req, res) => {
  const questions = getQuestions();
  res.render('checkin', { questions });
});

router.post('/checkin', (req, res) => {
  const answers = req.body;

  // Write the answers to a JSON file
  const dataFilePath = path.join(__dirname, 'scoreData.json');
  const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
  data.push(answers);
  fs.writeFileSync(dataFilePath, JSON.stringify(data));

  res.send('Thanks for your submission!');
});


module.exports = router;
