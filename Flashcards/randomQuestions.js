const fs = require('fs');
const readline = require('readline');
const path = require('path');

const inputFilePath = path.resolve(__dirname, 'questions.txt');

function readQuestionsFromFile(filepath) {
  return new Promise((resolve, reject) => {
    const questions = [];
    const stream = fs.createReadStream(filepath);

    const rl = readline.createInterface({
      input: stream,
      crlfDelay: Infinity,
    });

    rl.on('line', (line) => {
      if (line.endsWith('?')) {
        questions.push(line);
      }
    });

    rl.on('close', () => {
      resolve(questions);
    });

    rl.on('error', (error) => {
      reject(error);
    });
  });
}

function getRandomQuestion(questions) {
  const index = Math.floor(Math.random() * questions.length);
  return questions[index];
}

async function main() {
  try {
    const questions = await readQuestionsFromFile(inputFilePath);

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    console.log('Press ENTER to display a random question or type "quit" to exit.');

    rl.on('line', (input) => {
      if (input.toLowerCase() === 'quit') {
        console.log('Goodbye!');
        rl.close();
      } else {
        console.log(getRandomQuestion(questions));
      }
    });
  } catch (error) {
    console.error('An error occurred:', error.message);
    process.exit(1);
  }
}

main();
