import React, { useState } from 'react'
import './Quiz.css'
import QuizQuestion from '../core/QuizQuestion';
import QuizCore from '../core/QuizCore';
// Hint: Take advantage of the QuizQuestion interface

interface QuizState {
  currentQuestion: QuizQuestion | null,
  selectedAnswer: string | null,
  core: QuizCore
}

const Quiz: React.FC = () => {
  // TODO: Task1 - Seprate the logic of quiz from the UI.
  // Hint: Take advantage of QuizCore to manage quiz state separately from the UI.
  //const core: QuizCore =  new QuizCore();
  const [state, setState] = useState<QuizState>({
    selectedAnswer: null,  // Initialize the selected answer.
    core: new QuizCore(),
    currentQuestion: null,
  });
  
  const handleOptionSelect = (option: string): void => {
    setState((prevState) => ({ ...prevState, selectedAnswer: option }));
  }

  const handleButtonClick = (): void => {
    // TODO: Task3 - Implement the logic for button click ("Next Question" and "Submit").
    // Hint: You might want to check for a function in the core logic to help with this.
    core.answerQuestion(selectedAnswer ?? "");
    core.nextQuestion();
    setState((prevState) => ({ ...prevState, currentQuestion: core.getCurrentQuestion() }));
  } 

  const { selectedAnswer, currentQuestion, core} = state;

  //Chatgpt generated this
  React.useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      currentQuestion: prevState.core.getCurrentQuestion(),
    }));
  }, []);

  if (!currentQuestion) {
    return (
      <div>
        <h2>Quiz Completed</h2>
        <p>Final Score: {core.getScore()} out of {core.getTotalQuestions()}</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Quiz Question:</h2>
      <p>{currentQuestion.question}</p>
    
      <h3>Answer Options:</h3>
      <ul>
        {currentQuestion.options.map((option) => (
          <li
            key={option}
            onClick={() => handleOptionSelect(option)}
            className={selectedAnswer === option ? 'selected' : ''}
          >
            {option}
          </li>
        ))}
      </ul>

      <h3>Selected Answer:</h3>
      <p>{selectedAnswer ?? 'No answer selected'}</p>

      <button onClick={handleButtonClick}>Next Question</button>
    </div>
  );
};

export default Quiz;