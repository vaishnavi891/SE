const fs = require('fs');

function getQuestions() {
  // Read the questions from the questions.json file
  const questions = JSON.parse(fs.readFileSync('./questions.json', 'utf8'));

  // Map over the questions and add a `rating` property set to 0
  return questions.map(question => {
    return {
      ...question,
      rating: 0
    };
  });
}

module.exports = {
  getQuestions
};