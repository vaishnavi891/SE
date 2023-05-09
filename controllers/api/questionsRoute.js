const router = require('express').Router();
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const questions = JSON.parse(fs.readFileSync('./seeds/questions.json', 'utf8'));

router.use(bodyParser.urlencoded({ extended: true }));

router.use(express.static(path.join(__dirname, 'public')));

router.set('view engine', 'hbs');

router.set('views', path.join(__dirname, 'views'));

router.get('/checkin', (req, res) => {
  res.render('checkin', { questions });
});

router.post('/api/checkin', (req, res) => {
  const answers = {
    id: uuidv4(),
    timestamp: new Date(),
    ...req.body
  };

  // Write the answers to a JSON file
  const dataFilePath = path.join(__dirname, 'scoreData.json');
  const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
  data.push(answers);
  fs.writeFileSync(dataFilePath, JSON.stringify(data));

  res.send('Thanks for your submission!');
});

module.exports = router;
