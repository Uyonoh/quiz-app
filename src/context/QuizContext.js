import { createContext, useReducer, useEffect, useContext } from 'react';
import { fetchQuestions } from '../utils/api';

const initialState = {
  config: null,
  questions: [],
  currentIndex: 0,
  answers: [],
  status: 'idle', // 'loading' | 'active' | 'completed' | 'error'
  difficulty: 'medium',
  error: null
};

function quizReducer(state, action) {
  switch (action.type) {
    case 'START_QUIZ':
      return { ...initialState, config: action.payload, status: 'loading' };
    case 'QUESTIONS_LOADED':
      return { ...state, questions: action.payload, status: 'active' };
    case 'QUESTIONS_ERROR':
      return { ...state, status: 'error', error: action.payload };
    case 'ANSWER_SUBMITTED':
      return {
        ...state,
        answers: [...state.answers, action.payload],
        currentIndex: state.currentIndex + 1
      };
    case 'COMPLETE_QUIZ':
      return { ...state, status: 'completed' };
    case 'RESTART_QUIZ':
      return { ...initialState };
    default:
      return state;
  }
}

const QuizContext = createContext();

export function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  useEffect(() => {
    if (state.status === 'loading' && state.config) {
      const loadQuestions = async () => {
        try {
          const questions = await fetchQuestions(
            state.config.amount,
            state.config.difficulty,
            state.config.type
          );
          dispatch({ type: 'QUESTIONS_LOADED', payload: questions });
        } catch (error) {
          dispatch({ type: 'QUESTIONS_ERROR', payload: error.message });
        }
      };
      loadQuestions();
    }
  }, [state.status, state.config]);

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  return useContext(QuizContext);
}