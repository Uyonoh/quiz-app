import { createContext, useReducer, useEffect, useContext } from 'react'
import { fetchQuestions } from "../utils/api";

const initialState = {
  config: null,
  questions: [],
  currentIndex: 0,
  answers: [],
  status: "idle", // 'loading' | 'active' | 'completed' | 'error'
  difficulty: "medium",
};

async function loadQuestions(config, dispatch) {
  dispatch({ type: 'QUESTIONS_LOADING' });
  try {
    const questions = await fetchQuestions(config.amount, config.difficulty, config.type);
    dispatch({ type: 'QUESTIONS_LOADED', payload: questions });
  } catch (error) {
    dispatch({ type: 'QUESTIONS_ERROR', payload: error.message });
  }
}

function quizReducer(state, action) {
  switch (action.type) {
    case 'START_QUIZ':
      return { ...initialState, config: action.payload, status: 'loading' };
    case 'QUESTIONS_LOADING':
      return { ...state, status: 'loading' };
    case 'QUESTIONS_LOADED':
      return { ...state, questions: action.payload, status: 'active' };
    case 'QUESTIONS_ERROR':
      return { ...state, status: 'error', error: action.payload };
    case "ANSWER_SUBMITTED":
      return {
        ...state,
        answers: [...state.answers, action.payload],
        currentIndex: state.currentIndex + 1,
        difficulty: calculateNewDifficulty(
          state.difficulty,
          action.payload.isCorrect
        ),
      };
    case "COMPLETE_QUIZ":
      return { ...state, status: "completed" };
    case "RESTART_QUIZ":
      return { ...initialState };
    default:
      return state;
  }
}

function calculateNewDifficulty(current, isCorrect) {
  // Implement your adaptive difficulty logic here
  return current; // Placeholder
}

const QuizContext = createContext();

export function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  console.log(context)
  return context;
}