/**
 * Question Service
 * Dynamically generates all MCQs and 40-question mock assessment using the Gemini API.
 */

import { generateGeminiMCQs, generateGeminiMockAssessment, hasGeminiKey } from './geminiService';
import { storageService } from './storageService';

export const questionService = {
  /**
   * Fetches questions generated exclusively via the Gemini API
   */
  async getQuestionsForPractice({
    topicName = 'Operating Systems',
    difficulty = 'Medium',
    count = 10,
    mode = 'Practice'
  }) {
    if (!hasGeminiKey()) {
      throw new Error('NO_API_KEY: Gemini API Key is required. Please set your Gemini API key in Settings.');
    }

    // In Revision mode, filter or prompt specifically for revision if previously recorded
    const diff = difficulty === 'Mixed' ? 'Medium' : difficulty;

    const questions = await generateGeminiMCQs({
      topic: topicName,
      difficulty: diff,
      count: Number(count) || 10
    });

    const notice = questions.length > 0 && questions[0].notice ? questions[0].notice : null;

    return {
      source: notice ? 'Verified Question Bank (Gemini 503 Fallback)' : 'Generated dynamically via Gemini API',
      notice,
      questions
    };
  },

  /**
   * Generates a 40-question mock assessment dynamically using the Gemini API
   */
  async getMockAssessmentQuestions(onProgress) {
    if (!hasGeminiKey()) {
      throw new Error('NO_API_KEY: Gemini API Key is required. Please set your Gemini API key in Settings.');
    }

    return await generateGeminiMockAssessment(onProgress);
  }
};
