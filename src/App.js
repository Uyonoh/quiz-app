import { QuizProvider } from './context/QuizContext';
import QuizContainer from './components/QuizContainer';
import './styles/main.css';

function App() {
  return (
    <QuizProvider>
      <div className="app">
        <QuizContainer />
      </div>
    </QuizProvider>
  );
}

export default App;