import { useQuiz } from '../context/QuizContext';

export default function WelcomeScreen() {
  const { dispatch } = useQuiz();
  
  const startQuiz = () => {
    dispatch({ 
      type: 'START_QUIZ', 
      payload: { 
        amount: 10,
        difficulty: 'medium',
        type: 'multiple'
      }
    });
  };
  
  return (
    <div className="welcome-screen">
      <h1>Welcome to the Quiz!</h1>
      <button onClick={startQuiz} className="start-button">
        Start Quiz
      </button>
    </div>
  );
}