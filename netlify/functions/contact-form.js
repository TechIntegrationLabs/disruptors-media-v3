// Netlify Function: Handle contact form submissions
// Endpoint: /.netlify/functions/contact-form

export const handler = async (event, context) => {
  // Handle CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
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

  try {
    const data = JSON.parse(event.body);
    const { name, email, message, phone, company, service } = data;

    // Basic validation
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Name, email, and message are required' })
      };
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid email format' })
      };
    }

    // Here you would typically:
    // 1. Send email notification
    // 2. Save to database
    // 3. Add to CRM (Go High Level)
    // 4. Send auto-response email

    // For now, we'll just log and return success
    console.log('Contact form submission:', {
      name,
      email,
      message,
      phone,
      company,
      service,
      timestamp: new Date().toISOString()
    });

    // Simulate some processing time
    await new Promise(resolve => setTimeout(resolve, 500));

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        message: 'Thank you for your message. We will get back to you soon!' 
      })
    };

  } catch (error) {
    console.error('Error processing contact form:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to process contact form',
        message: error.message 
      })
    };
  }
};

// Optional: Add email sending functionality using a service like SendGrid or Mailgun
// async function sendEmail(formData) {
//   // Implementation depends on your email service
//   // Example with SendGrid:
//   /*
//   const sgMail = require('@sendgrid/mail');
//   sgMail.setApiKey(process.env.SENDGRID_API_KEY);
//   
//   const msg = {
//     to: 'info@disruptorsmedia.com',
//     from: 'noreply@disruptorsmedia.com',
//     subject: `New Contact Form Submission from ${formData.name}`,
//     html: `
//       <h3>New Contact Form Submission</h3>
//       <p><strong>Name:</strong> ${formData.name}</p>
//       <p><strong>Email:</strong> ${formData.email}</p>
//       <p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
//       <p><strong>Company:</strong> ${formData.company || 'Not provided'}</p>
//       <p><strong>Service:</strong> ${formData.service || 'Not specified'}</p>
//       <p><strong>Message:</strong></p>
//       <p>${formData.message}</p>
//     `
//   };
//   
//   return sgMail.send(msg);
//   */
// }