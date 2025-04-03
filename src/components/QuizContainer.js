import { useQuiz } from '../context/QuizContext';
import WelcomeScreen from './WelcomeScreen';  // Now properly importing default export
import Quiz from './Quiz';
import Results from './Results';
import Loading from './Loading';
import ErrorScreen from './ErrorScreen';

function QuizContainer() {
  const { state } = useQuiz();
  
  if (state.status === 'idle') return <WelcomeScreen />;
  if (state.status === 'loading') return <Loading />;
  if (state.status === 'error') return <ErrorScreen error={state.error} />;
  if (state.status === 'completed') return <Results />;
  return <Quiz />;
}

export default QuizContainer;