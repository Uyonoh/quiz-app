import { useState, useEffect } from 'react';
import { useQuiz } from '../context/QuizContext';
import Question from './Question';
import QuestionTimer from './QuestionTimer';
import './QuestionTimer.css';
import { audioService } from '../utils/AudioService';

function Quiz() {
  const { state, dispatch } = useQuiz();
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (state.questions.length > 0 && state.currentIndex < state.questions.length) {
      setCurrentQuestion(state.questions[state.currentIndex]);
      setTimeLeft(30);
      setSelectedAnswer(null);
      setIsLoading(false);
    }
  }, [state.currentIndex, state.questions]);

  useEffect(() => {
    if (!currentQuestion) return;

    const timer = timeLeft > 0 && setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    if (timeLeft === 0) {
      handleSubmit(null);
    }

    return () => clearInterval(timer);
  }, [timeLeft, currentQuestion]);

  const handleSubmit = (answer) => {
    if (!currentQuestion) return;

    const isCorrect = answer === currentQuestion.correct_answer;
    
    dispatch({
      type: 'ANSWER_SUBMITTED',
      payload: {
        question: currentQuestion.question,
        userAnswer: answer || 'No answer',
        correctAnswer: currentQuestion.correct_answer,
        isCorrect,
        difficulty: currentQuestion.difficulty
      }
    });

    if (state.currentIndex === state.questions.length - 1) {
      dispatch({ type: 'COMPLETE_QUIZ' });
      audioService.playCompletionSound();
    }
  };

  if (isLoading || !currentQuestion) {
    return <div className="loading">Loading question...</div>;
  }

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <span>Question {state.currentIndex + 1}/{state.questions.length}</span>
        <QuestionTimer timeLeft={timeLeft} totalTime={30} />
      </div>
      
      <Question
        question={currentQuestion}
        selectedAnswer={selectedAnswer}
        onSelect={setSelectedAnswer}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default Quiz;