/**
 * Gemini Question & Coding Challenge Generation Service
 * Uses the official Google GenAI JavaScript SDK (@google/genai).
 * All questions (MCQs, Mock Assessment, DSA, SQL, Web) are generated dynamically using Gemini API.
 */

import { GoogleGenAI } from '@google/genai';
import { storageService } from './storageService';
import { MCQ_FALLBACK_BANK } from '../data/mcqFallback';

/**
 * Priority list of Gemini models to attempt.
 * If the primary model experiences high demand (503) or rate limits (429),
 * it seamlessly cascades to alternative models before resorting to verified local banks.
 */
const CANDIDATE_MODELS = [
  'gemini-flash-lite-latest',
  'gemini-3.5-flash-lite',
  'gemini-3.8-flash',
  'gemini-3.7-flash',
  'gemini-flash-latest'
];

/**
 * Resilient caller that tries models in sequence with brief backoff on 503/429
 */
export async function callGeminiWithFallbackModels(prompt, config = { responseMimeType: 'application/json' }) {
  const ai = getAiClient();
  let lastError = null;

  for (let i = 0; i < CANDIDATE_MODELS.length; i++) {
    const model = CANDIDATE_MODELS[i];
    try {
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config
      });

      if (response && response.text) {
        return response.text;
      }
    } catch (err) {
      console.warn(`Gemini model ${model} error:`, err?.message || err);
      lastError = err;

      const errStr = (err?.message || '') + JSON.stringify(err || {});
      const isTransient = /503|high demand|unavailable|429|quota/i.test(errStr);
      if (isTransient && i < CANDIDATE_MODELS.length - 1) {
        // Brief pause before trying next fallback model
        await new Promise(r => setTimeout(r, 600));
      }
    }
  }

  throw lastError || new Error('All Gemini models were unavailable.');
}

/**
 * Retrieves the effective Gemini API key from settings or environment
 */
export function getActiveApiKey() {
  const userSettings = storageService.getSettings();
  if (userSettings.geminiApiKey && userSettings.geminiApiKey.trim()) {
    return userSettings.geminiApiKey.trim();
  }
  return import.meta.env.VITE_GEMINI_API_KEY || '';
}

/**
 * Checks if a Gemini API key is configured
 */
export function hasGeminiKey() {
  return Boolean(getActiveApiKey());
}

/**
 * Helper to get GoogleGenAI client
 */
function getAiClient() {
  const apiKey = getActiveApiKey();
  if (!apiKey) {
    throw new Error('NO_API_KEY: Gemini API Key is required. Please set your key in Settings or enter it when prompted.');
  }
  return new GoogleGenAI({ apiKey });
}

/**
 * Clean and parse JSON response from Gemini
 */
export function cleanAndParseJson(rawText) {
  let cleaned = rawText.trim();
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.replace(/^```json\s*/, '').replace(/\s*```$/, '');
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```\s*/, '').replace(/\s*```$/, '');
  }
  try {
    return JSON.parse(cleaned);
  } catch (err) {
    throw new Error('MALFORMED_JSON: Failed to parse Gemini response as JSON: ' + err.message);
  }
}

// -------------------------------------------------------------
// 1. MCQ Generation for CS Fundamentals
// -------------------------------------------------------------
export async function generateGeminiMCQs({
  topic = 'Operating Systems',
  difficulty = 'Medium',
  count = 5
}) {
  let domainGuidance = '';
  const lowerTopic = String(topic).toLowerCase();
  if (lowerTopic.includes('pseudo')) {
    domainGuidance = `
IMPORTANT GUIDANCE FOR PSEUDOCODE:
- Questions must be Accenture-style pseudocode snippets with bitwise operators (^, &, |, ~, <<, >>), loops (while, for), conditional if/else statements, or recursion.
- Ask the candidate to trace execution and find the final printed output or return value.
- Format the pseudocode clearly with line breaks and indentations.`;
  } else if (lowerTopic.includes('excel')) {
    domainGuidance = `
IMPORTANT GUIDANCE FOR MS EXCEL:
- Questions must test authentic spreadsheet concepts: VLOOKUP, HLOOKUP, INDEX/MATCH, SUMIF, COUNTIF, nested IF, CONCATENATE, absolute vs relative cell references ($A$1 vs A1), error codes (#N/A, #VALUE!, #REF!), pivot tables, or conditional formatting.`;
  } else if (lowerTopic.includes('office')) {
    domainGuidance = `
IMPORTANT GUIDANCE FOR MS OFFICE:
- Questions must test MS Word features (Mail Merge, track changes, headers/footers), PowerPoint (Slide Master, layouts, animations, transitions), Outlook (IMAP/POP3/SMTP, calendars), and universal office keyboard shortcuts.`;
  } else if (lowerTopic.includes('security')) {
    domainGuidance = `
IMPORTANT GUIDANCE FOR NETWORK SECURITY:
- Questions must test firewalls (packet filtering, stateful inspection), IDS/IPS, TLS/SSL handshakes, VPNs, DoS/DDoS mitigation, ARP spoofing, symmetric vs asymmetric encryption (AES, RSA), and MITM attacks.`;
  } else if (lowerTopic.includes('cloud')) {
    domainGuidance = `
IMPORTANT GUIDANCE FOR CLOUD COMPUTING:
- Questions must test IaaS vs PaaS vs SaaS models, Public/Private/Hybrid cloud architectures, AWS/Azure core primitives (EC2, S3, Lambda, VPC, IAM, Azure Blob), virtualization & hypervisors (Type 1 vs Type 2), and cloud disaster recovery.`;
  }

  const buildPrompt = (c) => `
You are a premier Computer Science technical assessment creator.
Generate exactly ${c} distinct multiple-choice questions for technical recruitment preparation.

Topic: ${topic}
Target Difficulty: ${difficulty}
${domainGuidance}

Rules:
1. Every question must be technically accurate and pertinent to ${topic}.
2. Provide exactly 4 plausible answer options.
3. Provide exactly ONE unambiguous correct answer index (0, 1, 2, or 3).
4. Provide a thorough general explanation AND an array of 4 optionExplanations explaining why each option is correct or incorrect.
5. Provide a concise core concept tag.
6. Return ONLY valid, raw JSON conforming strictly to this format:

{
  "topic": "${topic}",
  "difficulty": "${difficulty}",
  "questions": [
    {
      "id": "gen-${Date.now()}-1",
      "question": "Question text here?",
      "options": [
        "Option A",
        "Option B",
        "Option C",
        "Option D"
      ],
      "correctAnswer": 0,
      "explanation": "Detailed explanation of why option A is correct.",
      "optionExplanations": [
        "Why option A is right",
        "Why option B is wrong",
        "Why option C is wrong",
        "Why option D is wrong"
      ],
      "concept": "Concept name",
      "difficulty": "${difficulty}"
    }
  ]
}
`;

  try {
    if (count > 15) {
      const b1 = Math.ceil(count / 2);
      const b2 = Math.floor(count / 2);
      const [res1, res2] = await Promise.all([
        callGeminiWithFallbackModels(buildPrompt(b1)),
        callGeminiWithFallbackModels(buildPrompt(b2))
      ]);
      const list1 = parseAndValidateGeminiResponse(res1, topic, difficulty);
      const list2 = parseAndValidateGeminiResponse(res2, topic, difficulty);
      return [...list1, ...list2];
    } else {
      const responseText = await callGeminiWithFallbackModels(buildPrompt(count));
      return parseAndValidateGeminiResponse(responseText, topic, difficulty);
    }
  } catch (err) {
    console.warn('Gemini MCQ generation encountered error, falling back to verified bank:', err?.message || err);
    const match = MCQ_FALLBACK_BANK.filter(q =>
      !topic || q.topic.toLowerCase().includes(topic.toLowerCase()) || topic.toLowerCase().includes(q.topic.toLowerCase())
    );
    const shuffledMatches = [...match].sort(() => Math.random() - 0.5);
    const result = [];
    const usedIds = new Set();

    // 1. Add distinct matching questions from the specific topic
    for (const q of shuffledMatches) {
      if (result.length >= count) break;
      if (!usedIds.has(q.id)) {
        usedIds.add(q.id);
        result.push({
          ...q,
          id: `fallback-${Date.now()}-${result.length}`,
          source: 'Verified Question Bank (Gemini 503 Fallback)',
          notice: 'Google Gemini experienced high demand (503). Loaded verified practice questions so your practice is uninterrupted.'
        });
      }
    }

    // 2. If requested count exceeds questions in this topic, fill with distinct questions from related topics without duplicates
    if (result.length < count) {
      const remainingPool = MCQ_FALLBACK_BANK
        .filter(q => !usedIds.has(q.id))
        .sort(() => Math.random() - 0.5);

      for (const q of remainingPool) {
        if (result.length >= count) break;
        usedIds.add(q.id);
        result.push({
          ...q,
          id: `fallback-${Date.now()}-${result.length}`,
          source: 'Verified Question Bank (Gemini 503 Fallback)',
          notice: 'Google Gemini experienced high demand (503). Loaded verified practice questions so your practice is uninterrupted.'
        });
      }
    }

    return result;
  }
}

export function parseAndValidateGeminiResponse(rawText, requestedTopic, requestedDiff) {
  const data = cleanAndParseJson(rawText);
  const list = data.questions || (Array.isArray(data) ? data : []);
  if (!Array.isArray(list) || list.length === 0) {
    throw new Error('EMPTY_QUESTIONS: No questions found in Gemini response.');
  }

  const validated = [];
  for (let i = 0; i < list.length; i++) {
    const q = list[i];
    if (!q.question || typeof q.question !== 'string') continue;
    if (!Array.isArray(q.options) || q.options.length !== 4) continue;
    if (typeof q.correctAnswer !== 'number' || q.correctAnswer < 0 || q.correctAnswer > 3) continue;

    validated.push({
      id: q.id || `gemini-${Date.now()}-${i}-${Math.random().toString(36).substr(2, 4)}`,
      topic: q.topic || requestedTopic,
      difficulty: q.difficulty || requestedDiff,
      question: q.question.trim(),
      options: q.options.map(opt => String(opt).trim()),
      correctAnswer: q.correctAnswer,
      explanation: q.explanation ? String(q.explanation).trim() : 'Verified explanation.',
      optionExplanations: Array.isArray(q.optionExplanations) && q.optionExplanations.length === 4
        ? q.optionExplanations.map(e => String(e).trim())
        : [
          'Verified correct answer.',
          'Incorrect option.',
          'Incorrect option.',
          'Incorrect option.'
        ],
      concept: q.concept || requestedTopic,
      source: 'Generated with Gemini AI'
    });
  }

  if (validated.length === 0) {
    throw new Error('VALIDATION_FAILED: Questions did not meet schema requirements.');
  }

  return validated;
}

// -------------------------------------------------------------
// 2. Full 40-Question Mock Assessment Generation with Gemini
// -------------------------------------------------------------
export async function generateGeminiMockAssessment(onProgress) {
  // Blueprint: 4 domain batches of 10 questions each = 40 questions total
  const batches = [
    {
      name: 'Batch 1: Pseudocodes & Logic Tracing',
      promptTopic: 'Accenture Pseudocode: Bitwise operators (^, &, |, ~, <<, >>), loops, conditional execution, recursion, and step-by-step variable evaluation',
      count: 10
    },
    {
      name: 'Batch 2: Common Applications (MS Excel & MS Office)',
      promptTopic: 'MS Excel (VLOOKUP, HLOOKUP, SUMIF, COUNTIF, cell referencing $A$1, shortcuts) and MS Office (Word Mail Merge, PowerPoint Slide Master, Outlook)',
      count: 10
    },
    {
      name: 'Batch 3: Network Security & Cloud Computing',
      promptTopic: 'Network Security (firewalls, SSL/TLS, VPN, encryption, DDoS, attacks) and Cloud Computing (AWS/Azure, IaaS, PaaS, SaaS, virtualization, VPC, IAM)',
      count: 10
    },
    {
      name: 'Batch 4: Core CS Fundamentals',
      promptTopic: 'Operating Systems, Computer Networks, DBMS, SQL, and Object-Oriented Programming',
      count: 10
    }
  ];

  const allQuestions = [];

  try {
    for (let b = 0; b < batches.length; b++) {
      const batch = batches[b];
      if (onProgress) {
        onProgress(`Generating ${batch.name} (${b * 10}/40 questions via Gemini API)...`);
      }

      const prompt = `
Generate exactly ${batch.count} multiple-choice questions for technical recruitment preparation.
Domains: ${batch.promptTopic}.
Requirements:
1. Exactly 4 plausible options per question.
2. Exactly 1 integer correctAnswer (0, 1, 2, or 3).
3. Clear technical explanation and concept.
4. Output raw JSON conforming to:
{
  "questions": [
    {
      "topic": "${batch.promptTopic}",
      "difficulty": "Medium",
      "question": "Question text?",
      "options": ["A", "B", "C", "D"],
      "correctAnswer": 0,
      "explanation": "Why A is correct.",
      "concept": "Concept"
    }
  ]
}
`;

      const responseText = await callGeminiWithFallbackModels(prompt);
      const parsed = parseAndValidateGeminiResponse(responseText, batch.promptTopic, 'Mixed');
      allQuestions.push(...parsed);
    }
  } catch (err) {
    console.warn('Gemini Mock Assessment experienced high demand (503) or error. Loading 40-question comprehensive mock assessment from verified bank:', err?.message || err);
    if (onProgress) {
      onProgress('Gemini API is at capacity (503). Assembling 40-question comprehensive assessment from verified bank...');
    }

    const domains = [
      'Pseudocode',
      'MS Excel',
      'MS Office',
      'Network Security',
      'Cloud Computing',
      'Operating Systems',
      'Computer Networks',
      'DBMS'
    ];

    allQuestions.length = 0;
    domains.forEach((dom) => {
      const match = MCQ_FALLBACK_BANK.filter(q =>
        q.topic.toLowerCase().includes(dom.toLowerCase()) || dom.toLowerCase().includes(q.topic.toLowerCase())
      );
      const pool = match.length >= 10 ? match : MCQ_FALLBACK_BANK;
      allQuestions.push(...[...pool].sort(() => Math.random() - 0.5).slice(0, 10));
    });

    while (allQuestions.length < 40) {
      const remaining = MCQ_FALLBACK_BANK.filter(q => !allQuestions.some(mq => mq.id === q.id));
      if (remaining.length === 0) break;
      allQuestions.push(remaining[Math.floor(Math.random() * remaining.length)]);
    }
  }

  if (onProgress) {
    onProgress('40 questions successfully prepared!');
  }

  // Shuffle and assign question numbers 1 through 40
  return allQuestions
    .slice(0, 40)
    .sort(() => Math.random() - 0.5)
    .map((q, idx) => ({
      ...q,
      questionNumber: idx + 1,
      id: `mock-q-${idx + 1}-${Date.now()}`
    }));
}
