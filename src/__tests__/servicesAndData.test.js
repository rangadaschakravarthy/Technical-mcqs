import { describe, it, expect, beforeEach, vi } from 'vitest';
import { questionService } from '../services/questionService';
import { storageService } from '../services/storageService';
import * as geminiService from '../services/geminiService';
const { parseAndValidateGeminiResponse, cleanAndParseJson } = geminiService;

describe('Gemini Question Generation Policy & Services', () => {
  it('strictly enforces Gemini API Key for practice questions generation', async () => {
    const spy = vi.spyOn(geminiService, 'hasGeminiKey').mockReturnValue(false);
    await expect(
      questionService.getQuestionsForPractice({ topicName: 'Operating Systems', difficulty: 'Medium', count: 5 })
    ).rejects.toThrow('NO_API_KEY');
    spy.mockRestore();
  });

  it('strictly enforces Gemini API Key for 40-question mock assessment generation', async () => {
    const spy = vi.spyOn(geminiService, 'hasGeminiKey').mockReturnValue(false);
    await expect(
      questionService.getMockAssessmentQuestions()
    ).rejects.toThrow('NO_API_KEY');
    spy.mockRestore();
  });
});

describe('Gemini Response Validation & Parser', () => {
  it('successfully parses and validates compliant JSON', () => {
    const validJson = JSON.stringify({
      topic: 'DBMS',
      difficulty: 'Easy',
      questions: [
        {
          id: 'test-1',
          question: 'What is a primary key?',
          options: ['Unique identifier', 'Foreign pointer', 'Null column', 'Secondary index'],
          correctAnswer: 0,
          explanation: 'A primary key uniquely identifies each record in a database table.',
          optionExplanations: ['Correct', 'Incorrect', 'Incorrect', 'Incorrect'],
          concept: 'Relational Model'
        }
      ]
    });

    const parsed = parseAndValidateGeminiResponse(validJson, 'DBMS', 'Easy');
    expect(parsed).toHaveLength(1);
    expect(parsed[0].correctAnswer).toBe(0);
    expect(parsed[0].options).toHaveLength(4);
  });

  it('handles markdown code fences returned by AI', () => {
    const markdownEnclosed = "```json\n" + JSON.stringify({
      questions: [
        {
          question: 'What does CPU stand for?',
          options: ['Central Processing Unit', 'Computer Personal Unit', 'Central Power Unit', 'Core Processing Utility'],
          correctAnswer: 0,
          explanation: 'CPU stands for Central Processing Unit.',
          concept: 'Architecture'
        }
      ]
    }) + "\n```";

    const parsed = parseAndValidateGeminiResponse(markdownEnclosed, 'Architecture', 'Easy');
    expect(parsed).toHaveLength(1);
    expect(parsed[0].question).toBe('What does CPU stand for?');
  });

  it('throws descriptive MALFORMED_JSON and EMPTY_QUESTIONS errors', () => {
    expect(() => cleanAndParseJson('not json')).toThrow('MALFORMED_JSON');
    expect(() => parseAndValidateGeminiResponse('{"questions":[]}', 'OS', 'Medium')).toThrow('EMPTY_QUESTIONS');
  });
});

describe('Storage Service and Dynamic Question Management', () => {

  it('records mock test history and maintains recent activity', () => {
    const record = storageService.recordMockTest({
      score: 32,
      totalQuestions: 40,
      timeTakenSec: 1800,
      topicBreakdown: { 'Operating Systems': { total: 5, correct: 4 } }
    });

    expect(record.score).toBe(32);
    expect(record.accuracy).toBe(80);

    const history = storageService.getMockHistory();
    expect(history.length).toBeGreaterThan(0);
  });
});

describe('Accenture Assessment Specialized Topics & Fallbacks', () => {
  it('contains Pseudocodes, MS Excel, MS Office, Network Security, and Cloud Computing in CS_TOPICS', async () => {
    const { CS_TOPICS } = await import('../data/topics');
    const topicIds = CS_TOPICS.map(t => t.id);
    expect(topicIds).toContain('pseudocodes');
    expect(topicIds).toContain('ms-excel');
    expect(topicIds).toContain('ms-office');
    expect(topicIds).toContain('network-security');
    expect(topicIds).toContain('cloud-computing');
  });

  it('provides verified fallback questions for all newly added assessment topics', async () => {
    const { MCQ_FALLBACK_BANK } = await import('../data/mcqFallback');
    const topicsToCheck = [
      'Pseudocodes & Logic Tracing',
      'MS Excel & Spreadsheets',
      'MS Office & Common Applications',
      'Network Security',
      'Cloud Computing & Architecture'
    ];

    topicsToCheck.forEach(topic => {
      const matching = MCQ_FALLBACK_BANK.filter(q => q.topic === topic);
      expect(matching.length).toBeGreaterThan(0);
      matching.forEach(q => {
        expect(q.options).toHaveLength(4);
        expect(q.correctAnswer).toBeGreaterThanOrEqual(0);
        expect(q.correctAnswer).toBeLessThanOrEqual(3);
        expect(q.explanation).toBeTruthy();
      });
    });
  });
});

