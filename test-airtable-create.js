require('dotenv').config();

const AIRTABLE_API_KEY = process.env.REACT_APP_AIRTABLE_API_KEY;
const BLOG_BASE_ID = process.env.REACT_APP_AIRTABLE_BLOG_BASE_ID;

async function createSampleBlogPost() {
  try {
    console.log('🧪 Testing sample blog post creation...');
    
    const samplePost = {
      fields: {
        'Title': 'Test Blog Post - AI Marketing Revolution',
        'Post URL': 'https://docs.google.com/document/d/test123',
        'Client': 'Disruptors Media',
        // 'Status': 'Draft', // Skip Status field for now - needs pre-configured options
        'Primary Keyword': 'AI marketing',
        'Publish Date': '2024-12-15',
        'Approved': true,  // Make this post approved for testing
        'Feature Image': 'https://res.cloudinary.com/dvcvxhzmt/image/upload/f_auto,q_auto,w_800,h_400/v1/blog/ai-marketing-test'
      }
    };
    
    const url = `https://api.airtable.com/v0/${BLOG_BASE_ID}/Table%201`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ records: [samplePost] })
    });
    
    console.log('Response status:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ SUCCESS! Created blog post:');
      console.log('   Record ID:', data.records[0].id);
      console.log('   Title:', data.records[0].fields.Title);
      return data.records[0];
    } else {
      const errorText = await response.text();
      console.log('❌ ERROR:', errorText);
      
      // Parse the error to understand what fields are missing or wrong
      try {
        const errorData = JSON.parse(errorText);
        if (errorData.error && errorData.error.message) {
          console.log('💡 Error details:', errorData.error.message);
        }
      } catch (parseError) {
        // Error text wasn't JSON, just log it as is
      }
      
      return null;
    }
    
  } catch (error) {
    console.error('💥 Exception:', error.message);
    return null;
  }
}

async function createSampleClient() {
  try {
    console.log('🧪 Testing sample client creation...');
    
    const sampleClient = {
      fields: {
        'client_id': 1001,
        'company_name': 'Test Company Inc',
        'industry': 'Technology',
        'contact_name': 'John Doe',
        'contact_email': 'john@testcompany.com',
        'contact_phone': '+1-555-123-4567',
        'website_url': 'https://testcompany.com',
        'logo_url': 'https://testcompany.com/logo.png'
      }
    };
    
    const CLIENT_BASE_ID = process.env.REACT_APP_AIRTABLE_CLIENT_BASE_ID;
    const url = `https://api.airtable.com/v0/${CLIENT_BASE_ID}/Table%201`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ records: [sampleClient] })
    });
    
    console.log('Response status:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ SUCCESS! Created client:');
      console.log('   Record ID:', data.records[0].id);
      console.log('   Company:', data.records[0].fields.company_name);
      return data.records[0];
    } else {
      const errorText = await response.text();
      console.log('❌ ERROR:', errorText);
      return null;
    }
    
  } catch (error) {
    console.error('💥 Exception:', error.message);
    return null;
  }
}

async function testCreation() {
  console.log('🚀 TESTING AIRTABLE RECORD CREATION');
  console.log('='.repeat(50));
  
  const blogResult = await createSampleBlogPost();
  console.log('');
  const clientResult = await createSampleClient();
  
  console.log('');
  console.log('='.repeat(50));
  console.log('📋 TEST RESULTS:');
  console.log('Blog post:', blogResult ? '✅ Created successfully' : '❌ Failed');
  console.log('Client:', clientResult ? '✅ Created successfully' : '❌ Failed');
  
  if (blogResult && clientResult) {
    console.log('');
    console.log('🎉 Ready for migration! Your Airtable bases are properly configured.');
    console.log('Run: npm run airtable:migrate');
  } else {
    console.log('');
    console.log('⚠️  Please check your Airtable base field names and try again.');
  }
}

if (require.main === module) {
  testCreation().catch(console.error);
}