import readline from 'readline';

class Question {
  text: string;
  options: string[];
  correctAnswer: number;

  constructor(text: string, options: string[], correctAnswer: number) {
    this.text = text;
    this.options = options;
    this.correctAnswer = correctAnswer;
  }
}

class Quiz {
  questions: Question[] = [];
  currentQuestionIndex: number = 0;
  score: number = 0;

  constructor() {
    this.loadQuestions();
  }

  loadQuestions() {
    // Load your questions and their options here
    this.questions.push(
      new Question('What is the capital of France?', ['1. Berlin', '2. Madrid', '3. Paris', '4. Rome'], 3),
      new Question('Which planet is known as the Red Planet?', ['1. Venus', '2. Jupiter', '3. Mars', '4. Saturn'], 3),
      new Question('What is the largest mammal?', ['1. Elephant', '2. Blue Whale', '3. Giraffe', '4. Gorilla'], 2)
      // Add more questions as needed
    );
  }

  displayCurrentQuestion() {
    const question = this.questions[this.currentQuestionIndex];
    console.log(question.text);
    for (const option of question.options) {
      console.log(option);
    }
  }

  processUserAnswer(answer: number) {
    const question = this.questions[this.currentQuestionIndex];
    if (answer === question.correctAnswer) {
      this.score++;
    }
    this.currentQuestionIndex++;

    if (this.currentQuestionIndex < this.questions.length) {
      this.displayCurrentQuestion();
    } else {
      this.showResult();
    }
  }

  showResult() {
    console.log('Quiz Complete!');
    console.log(`Your Score: ${this.score} out of ${this.questions.length}`);
  }
}

function startQuiz() {
  const quiz = new Quiz();
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log('Welcome to the Quiz! Please select the correct option for each question.');
  quiz.displayCurrentQuestion();

  rl.on('line', (input) => {
    const answer = parseInt(input);
    if (isNaN(answer) || answer < 1 || answer > 4) {
      console.log('Please enter a valid option (1-4).');
    } else {
      quiz.processUserAnswer(answer);
    }
  });
}

startQuiz();
