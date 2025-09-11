// Netlify Function: AI Chat powered by OpenAI
// Endpoint: /.netlify/functions/ai-chat

const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY || process.env.OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

export const handler = async (event, context) => {
  // Handle CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  if (!OPENAI_API_KEY) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'OpenAI API key not configured' })
    };
  }

  try {
    const { messages, context: userContext } = JSON.parse(event.body);

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Messages array is required' })
      };
    }

    // System message for Disruptors Media context
    const systemMessage = {
      role: 'system',
      content: `You are an AI assistant for Disruptors Media, a cutting-edge AI-powered marketing and creative agency. 

Key information about Disruptors Media:
- We specialize in AI-powered marketing solutions, content creation, and business transformation
- Services include AI marketing, studio photography/videography, content production, and digital transformation
- We help businesses leverage AI and modern technology to scale and grow
- Our studio offers professional photography, videography, and creative services
- We focus on data-driven strategies and innovative approaches
- Located with state-of-the-art facilities for creative production

Your role:
- Answer questions about our services, capabilities, and approach
- Help visitors understand how AI can benefit their business
- Provide insights on marketing, content creation, and business growth
- Be professional, knowledgeable, and engaging
- If asked about specific pricing or detailed project requirements, suggest they contact us directly
- Keep responses concise and actionable
- Always maintain a helpful and professional tone

Current context: ${userContext || 'General inquiry'}`
    };

    // Prepare the OpenAI request
    const openAIRequest = {
      model: 'gpt-3.5-turbo',
      messages: [systemMessage, ...messages],
      max_tokens: 500,
      temperature: 0.7,
      stream: false
    };

    // Call OpenAI API
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(openAIRequest)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const aiResponse = await response.json();
    
    if (!aiResponse.choices || aiResponse.choices.length === 0) {
      throw new Error('No response from OpenAI');
    }

    const assistantMessage = aiResponse.choices[0].message.content;

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: assistantMessage,
        usage: aiResponse.usage
      })
    };

  } catch (error) {
    console.error('Error in AI chat function:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to process AI chat request',
        message: error.message
      })
    };
  }
};

// Example usage from frontend:
/*
const response = await fetch('/.netlify/functions/ai-chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    messages: [
      { role: 'user', content: 'What services does Disruptors Media offer?' }
    ],
    context: 'Services inquiry'
  })
});

const data = await response.json();
console.log(data.message);
*/