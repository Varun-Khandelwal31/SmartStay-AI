

/**
 * POST /api/ai/analyze-review
 * Analyzes a hotel guest review using Google Gemini API.
 */
async function analyzeReview(req, res, next) {
  const { review } = req.body;

  // 1. Validate request
  if (!review || typeof review !== 'string' || !review.trim()) {
    return res.status(400).json({
      success: false,
      error: 'Review text is required and must be a string.',
    });
  }

  // 2. Validate API key
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('GEMINI_API_KEY is not defined in environment variables.');
    return res.status(500).json({
      success: false,
      error: 'AI analysis service is misconfigured. Please check server configuration.',
    });
  }

  // 3. Build prompt instructions
  const systemInstruction = 
    `You are an expert hotel guest relations manager. Analyze the guest review and generate structured insights. ` +
    `You must output a JSON object that adheres exactly to the following rules:\n` +
    `1. "sentiment": Strictly one of: "Positive", "Neutral", "Negative".\n` +
    `2. "summary": A concise 2-3 sentence summary of the guest's main feedback points.\n` +
    `3. "keyIssues": An array of strings representing the main issues or highlights mentioned (e.g., "Cleanliness", "Room Service", "Staff Behavior"). If no specific issues are highlighted, provide an empty array [].\n` +
    `4. "hotelResponse": A professional, empathetic, and polite response draft written from the perspective of the hotel manager. Address the key issues directly. If the review is negative, apologize sincerely and offer action. If positive, thank the guest.\n` +
    `5. "priority": Strictly one of: "Low", "Medium", "High". Assign "High" for safety/health hazards or major complaints, "Medium" for minor complaints or mixed reviews, and "Low" for positive reviews.`;

  const prompt = `Review to analyze:\n"${review}"`;

  // 4. Configure fetch request to Gemini REST API
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;


  const payload = {
    contents: [
      {
        parts: [
          { text: systemInstruction },
          { text: prompt }
        ]
      }
    ],
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: 'OBJECT',
        properties: {
          sentiment: {
            type: 'STRING',
            enum: ['Positive', 'Neutral', 'Negative']
          },
          summary: {
            type: 'STRING'
          },
          keyIssues: {
            type: 'ARRAY',
            items: {
              type: 'STRING'
            }
          },
          hotelResponse: {
            type: 'STRING'
          },
          priority: {
            type: 'STRING',
            enum: ['Low', 'Medium', 'High']
          }
        },
        required: ['sentiment', 'summary', 'keyIssues', 'hotelResponse', 'priority']
      }
    }
  };

  // 5. Call API with Timeout Handling
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 seconds timeout

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // Handle rate limits
    if (response.status === 429) {
      return res.status(429).json({
        success: false,
        error: 'Rate limit exceeded. Please try again in a few moments.',
      });
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Gemini API error status ${response.status}:`, errorText);
      return res.status(502).json({
        success: false,
        error: `Gemini API service error (status ${response.status}).`,
      });
    }

    const data = await response.json();

    // Check structure of Gemini response
    const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!candidateText) {
      console.error('Invalid response structure from Gemini API:', JSON.stringify(data));
      return res.status(502).json({
        success: false,
        error: 'Failed to retrieve analysis from Gemini API response.',
      });
    }

    // Parse the JSON text returned by the model
    try {
      const parsedAnalysis = JSON.parse(candidateText.trim());
      return res.status(200).json({
        success: true,
        data: parsedAnalysis,
      });
    } catch (parseError) {
      console.error('Failed to parse Gemini JSON output:', candidateText);
      return res.status(502).json({
        success: false,
        error: 'Gemini returned invalid JSON content.',
      });
    }

  } catch (error) {
    clearTimeout(timeoutId);

    if (error.name === 'AbortError') {
      console.error('Gemini API request timed out (15s).');
      return res.status(504).json({
        success: false,
        error: 'Network request timed out. Please try again.',
      });
    }

    console.error('Gemini API fetch exception:', error);
    return res.status(500).json({
      success: false,
      error: 'An unexpected error occurred while communicating with the AI service.',
    });
  }
}

module.exports = {
  analyzeReview,
};
