const router = require('express').Router();
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const questions = JSON.parse(fs.readFileSync('./questions.json', 'utf8'));

app.use(bodyParser.urlencoded({ extended: true }));

router.get('/checkin', (req, res) => {
  res.render('checkin', { questions });
});

app.post('/checkin', (req, res) => {
  const answers = {
    id: uuidv4(),
    timestamp: new Date(),
    ...req.body
  };

  // Write the answers to a JSON file
  const dataFilePath = path.join(__dirname, 'answers.json');
  const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
  data.push(answers);
  fs.writeFileSync(dataFilePath, JSON.stringify(data));

  res.send('Thanks for your submission!');
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});


module.exports = router;
