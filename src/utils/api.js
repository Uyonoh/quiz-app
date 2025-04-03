import axios from 'axios';

export async function fetchQuestions(amount = 10, difficulty = 'medium', type = 'multiple') {
  try {
    const response = await axios.get(
      `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=${type}`
    );
    if (response.data.response_code === 0) {
      return response.data.results;
    }
    throw new Error('Failed to fetch questions');
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
}