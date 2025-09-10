const BaseAgent = require('./base-agent');
const path = require('path');

class FormIntegrationExpertAgent extends BaseAgent {
  constructor(context) {
    super(context);
    this.formConfig = {
      supportedProviders: {
        resend: {
          name: 'Resend',
          apiUrl: 'https://api.resend.com/emails',
          headers: { 'Authorization': 'Bearer API_KEY', 'Content-Type': 'application/json' },
          features: ['email', 'templates', 'analytics']
        },
        sendgrid: {
          name: 'SendGrid',
          apiUrl: 'https://api.sendgrid.com/v3/mail/send',
          headers: { 'Authorization': 'Bearer API_KEY', 'Content-Type': 'application/json' },
          features: ['email', 'templates', 'automation']
        },
        hubspot: {
          name: 'HubSpot',
          apiUrl: 'https://api.hubapi.com/contacts/v1/contact',
          headers: { 'Authorization': 'Bearer API_KEY', 'Content-Type': 'application/json' },
          features: ['crm', 'contacts', 'automation', 'analytics']
        },
        pipedrive: {
          name: 'Pipedrive',
          apiUrl: 'https://api.pipedrive.com/v1/persons',
          headers: { 'Content-Type': 'application/json' },
          features: ['crm', 'deals', 'contacts']
        }
      },
      formTypes: {
        contact: {
          fields: ['name', 'email', 'company', 'message'],
          validation: { email: 'required|email', name: 'required', message: 'required' },
          actions: ['email', 'crm']
        },
        newsletter: {
          fields: ['email', 'firstName'],
          validation: { email: 'required|email' },
          actions: ['email-list']
        },
        consultation: {
          fields: ['name', 'email', 'company', 'phone', 'service', 'budget', 'timeline'],
          validation: { email: 'required|email', name: 'required', service: 'required' },
          actions: ['email', 'crm', 'calendar']
        },
        assessment: {
          fields: ['name', 'email', 'company', 'answers'],
          validation: { email: 'required|email', name: 'required', answers: 'required' },
          actions: ['email', 'crm', 'score-calculation']
        }
      }
    };
    this.formRegistry = new Map();
    this.integrationStatus = new Map();
  }

  async execute() {
    try {
      await this.setupExecution();
      
      const { trigger, context } = this.context;
      
      switch (trigger) {
        case 'file_created':
        case 'file_modified':
          await this.handleFormFile(context.filePath);
          break;
        case 'keyword':
          await this.handleKeywordTrigger(context.keyword);
          break;
        case 'manual':
          await this.performFormIntegrationAudit();
          break;
        default:
          this.log(`Unknown trigger type: ${trigger}`);
      }
      
      await this.cleanupExecution();
    } catch (error) {
      this.error('Failed to execute form integration expert agent', error);
      throw error;
    }
  }

  async setupExecution() {
    // Load environment configuration and existing forms
    await this.loadEnvironmentConfig();
    await this.buildFormRegistry();
    await this.checkIntegrationStatus();
  }

  async loadEnvironmentConfig() {
    try {
      // Check for environment files
      const envFiles = ['.env', '.env.example', '.env.local'];
      this.envConfig = {};
      
      for (const envFile of envFiles) {
        if (await this.fileExists(envFile)) {
          const envContent = await this.read(envFile);
          this.parseEnvironmentFile(envContent, envFile);
        }
      }
      
      this.log('Environment configuration loaded');
    } catch (error) {
      this.error('Failed to load environment configuration', error);
    }
  }

  parseEnvironmentFile(content, fileName) {
    const lines = content.split('\\n');
    this.envConfig[fileName] = {};
    
    for (const line of lines) {
      if (line.includes('=') && !line.startsWith('#')) {
        const [key, value] = line.split('=');
        this.envConfig[fileName][key.trim()] = value.trim();
      }
    }
    
    // Check for form-related environment variables
    const formKeys = Object.keys(this.envConfig[fileName]).filter(key =>
      key.includes('API_KEY') || key.includes('EMAIL') || key.includes('CRM')
    );
    
    if (formKeys.length > 0) {
      this.log(`Found ${formKeys.length} form-related environment variables in ${fileName}`);
    }
  }

  async buildFormRegistry() {
    try {
      // Find form components
      const formFiles = await this.grep('form|Form', {
        glob: 'src/**/*.tsx',
        outputMode: 'files_with_matches'
      });
      
      for (const filePath of formFiles) {
        await this.analyzeFormFile(filePath);
      }
      
      this.log(`Built form registry with ${this.formRegistry.size} form files`);
    } catch (error) {
      this.error('Failed to build form registry', error);
    }
  }

  async analyzeFormFile(filePath) {
    try {
      const content = await this.read(filePath);
      const analysis = {
        filePath,
        isFormComponent: this.isFormComponent(content),
        formType: this.detectFormType(content),
        fields: this.extractFormFields(content),
        validation: this.extractValidation(content),
        submission: this.extractSubmissionLogic(content),
        hasBackendIntegration: this.hasBackendIntegration(content),
        useFormLibrary: this.detectFormLibrary(content),
        issues: [],
        suggestions: []
      };
      
      if (analysis.isFormComponent) {
        // Detect integration issues
        analysis.issues = await this.detectFormIssues(content, analysis);
        
        // Generate suggestions
        analysis.suggestions = await this.generateFormSuggestions(content, analysis);
        
        this.formRegistry.set(filePath, analysis);
      }
      
    } catch (error) {
      this.error(`Failed to analyze form file: ${filePath}`, error);
    }
  }

  isFormComponent(content) {
    const formIndicators = [
      '<form', 'useForm', 'handleSubmit', 'onSubmit',
      'input type=', 'textarea', 'select', 'React Hook Form',
      'yup', 'validation', 'form data'
    ];
    
    return formIndicators.some(indicator => content.includes(indicator));
  }

  detectFormType(content) {
    if (content.includes('contact') || content.includes('Contact')) {
      return 'contact';
    } else if (content.includes('newsletter') || content.includes('Newsletter')) {
      return 'newsletter';
    } else if (content.includes('consultation') || content.includes('Consultation')) {
      return 'consultation';
    } else if (content.includes('assessment') || content.includes('Assessment')) {
      return 'assessment';
    } else if (content.includes('subscribe') || content.includes('Subscribe')) {
      return 'newsletter';
    }
    return 'general';
  }

  extractFormFields(content) {
    const fields = [];
    
    // Extract input fields
    const inputRegex = /<input[^>]*name=['"]([^'"]+)['"][^>]*>/g;
    let match;
    
    while ((match = inputRegex.exec(content)) !== null) {
      fields.push({
        name: match[1],
        type: 'input',
        element: match[0]
      });
    }
    
    // Extract textarea fields
    const textareaRegex = /<textarea[^>]*name=['"]([^'"]+)['"][^>]*>/g;
    while ((match = textareaRegex.exec(content)) !== null) {
      fields.push({
        name: match[1],
        type: 'textarea',
        element: match[0]
      });
    }
    
    // Extract select fields
    const selectRegex = /<select[^>]*name=['"]([^'"]+)['"][^>]*>/g;
    while ((match = selectRegex.exec(content)) !== null) {
      fields.push({
        name: match[1],
        type: 'select',
        element: match[0]
      });
    }
    
    // Extract React Hook Form fields
    const registerRegex = /register\\(['"]([^'"]+)['"]\\)/g;
    while ((match = registerRegex.exec(content)) !== null) {
      fields.push({
        name: match[1],
        type: 'react-hook-form',
        method: 'register'
      });
    }
    
    return fields;
  }

  extractValidation(content) {
    const validation = {};
    
    // Yup validation
    if (content.includes('yup')) {
      const yupRegex = /(\\w+):\\s*yup\\.[^,}]+/g;
      let match;
      
      while ((match = yupRegex.exec(content)) !== null) {
        validation[match[1]] = match[0];
      }
    }
    
    // React Hook Form validation
    const validationRegex = /register\\(['"]([^'"]+)['"],\\s*\\{([^}]+)\\}/g;
    let match;
    
    while ((match = validationRegex.exec(content)) !== null) {
      validation[match[1]] = match[2];
    }
    
    return validation;
  }

  extractSubmissionLogic(content) {
    const submission = {
      hasOnSubmit: content.includes('onSubmit'),
      hasHandleSubmit: content.includes('handleSubmit'),
      hasAsyncSubmit: content.includes('async') && content.includes('submit'),
      apiCalls: this.extractApiCalls(content),
      errorHandling: content.includes('catch') || content.includes('error'),
      successHandling: content.includes('success') || content.includes('then')
    };
    
    return submission;
  }

  extractApiCalls(content) {
    const apiCalls = [];
    
    // Fetch calls
    const fetchRegex = /fetch\\(['"]([^'"]+)['"][^)]*\\)/g;
    let match;
    
    while ((match = fetchRegex.exec(content)) !== null) {
      apiCalls.push({
        type: 'fetch',
        url: match[1],
        method: this.extractHttpMethod(content, match.index)
      });
    }
    
    // Axios calls
    const axiosRegex = /axios\\.(get|post|put|delete)\\(['"]([^'"]+)['"][^)]*\\)/g;
    while ((match = axiosRegex.exec(content)) !== null) {
      apiCalls.push({
        type: 'axios',
        method: match[1].toUpperCase(),
        url: match[2]
      });
    }
    
    return apiCalls;
  }

  extractHttpMethod(content, index) {
    // Look for method in the fetch options
    const snippet = content.substring(index, index + 200);
    if (snippet.includes('POST')) return 'POST';
    if (snippet.includes('PUT')) return 'PUT';
    if (snippet.includes('DELETE')) return 'DELETE';
    return 'GET';
  }

  hasBackendIntegration(content) {
    const integrationIndicators = [
      '/api/', 'fetch(', 'axios', 'POST', 'PUT',
      'email', 'submit', 'contact', 'newsletter'
    ];
    
    return integrationIndicators.some(indicator => content.includes(indicator));
  }

  detectFormLibrary(content) {
    if (content.includes('react-hook-form')) {
      return 'react-hook-form';
    } else if (content.includes('formik')) {
      return 'formik';
    } else if (content.includes('yup')) {
      return 'yup';
    } else if (content.includes('zod')) {
      return 'zod';
    }
    return 'native';
  }

  async detectFormIssues(content, analysis) {
    const issues = [];
    
    // Check for missing backend integration
    if (analysis.fields.length > 0 && !analysis.hasBackendIntegration) {
      issues.push({
        type: 'missing-backend',
        severity: 'critical',
        message: 'Form has no backend integration for submission',
        suggestion: 'Add API endpoint for form submission'
      });
    }
    
    // Check for missing validation
    if (analysis.fields.length > 0 && Object.keys(analysis.validation).length === 0) {
      issues.push({
        type: 'missing-validation',
        severity: 'high',
        message: 'Form lacks proper validation',
        suggestion: 'Add validation using Yup or React Hook Form validation'
      });
    }
    
    // Check for missing error handling
    if (analysis.submission.apiCalls.length > 0 && !analysis.submission.errorHandling) {
      issues.push({
        type: 'missing-error-handling',
        severity: 'medium',
        message: 'Form submission lacks error handling',
        suggestion: 'Add try-catch blocks and user-friendly error messages'
      });
    }
    
    // Check for email field validation
    const emailField = analysis.fields.find(field => 
      field.name.includes('email') || field.name.includes('Email')
    );
    
    if (emailField && !analysis.validation[emailField.name]) {
      issues.push({
        type: 'missing-email-validation',
        severity: 'medium',
        message: 'Email field lacks validation',
        suggestion: 'Add email format validation'
      });
    }
    
    // Check for accessibility
    if (!content.includes('aria-') && !content.includes('label')) {
      issues.push({
        type: 'accessibility',
        severity: 'medium',
        message: 'Form lacks accessibility attributes',
        suggestion: 'Add labels, aria attributes, and proper form structure'
      });
    }
    
    // Check for loading states
    if (analysis.submission.hasAsyncSubmit && !content.includes('loading') && !content.includes('Loading')) {
      issues.push({
        type: 'missing-loading-state',
        severity: 'low',
        message: 'Form lacks loading state during submission',
        suggestion: 'Add loading indicator for better UX'
      });
    }
    
    return issues;
  }

  async generateFormSuggestions(content, analysis) {
    const suggestions = [];
    
    // Suggest form library if using native forms
    if (analysis.useFormLibrary === 'native' && analysis.fields.length > 2) {
      suggestions.push({
        type: 'form-library',
        message: 'Consider using React Hook Form for better form management',
        implementation: 'npm install react-hook-form @hookform/resolvers yup'
      });
    }
    
    // Suggest CRM integration
    if (analysis.formType === 'contact' && !content.includes('crm') && !content.includes('CRM')) {
      suggestions.push({
        type: 'crm-integration',
        message: 'Add CRM integration for contact form submissions',
        implementation: 'Integrate with HubSpot, Pipedrive, or similar CRM'
      });
    }
    
    // Suggest email service integration
    if (analysis.formType === 'newsletter' && !content.includes('email-service')) {
      suggestions.push({
        type: 'email-service',
        message: 'Integrate with email service provider',
        implementation: 'Add Resend, SendGrid, or Mailchimp integration'
      });
    }
    
    // Suggest analytics tracking
    if (!content.includes('track') && !content.includes('analytics')) {
      suggestions.push({
        type: 'analytics',
        message: 'Add form submission tracking for analytics',
        implementation: 'Track form submissions in Google Analytics or similar'
      });
    }
    
    // Suggest success handling
    if (analysis.submission.apiCalls.length > 0 && !analysis.submission.successHandling) {
      suggestions.push({
        type: 'success-handling',
        message: 'Add success message and redirect logic',
        implementation: 'Show success message and redirect to thank you page'
      });
    }
    
    return suggestions;
  }

  async checkIntegrationStatus() {
    try {
      // Check for API keys and configuration
      for (const [provider, config] of Object.entries(this.formConfig.supportedProviders)) {
        const status = {
          configured: false,
          hasApiKey: false,
          tested: false,
          lastChecked: new Date().toISOString()
        };
        
        // Check environment variables
        for (const envFile of Object.keys(this.envConfig)) {
          const envVars = this.envConfig[envFile];
          const apiKeyPattern = new RegExp(`${provider.toUpperCase()}.*API.*KEY`, 'i');
          
          if (Object.keys(envVars).some(key => apiKeyPattern.test(key))) {
            status.hasApiKey = true;
            status.configured = true;
          }
        }
        
        this.integrationStatus.set(provider, status);
      }
      
      this.log('Integration status checked for all providers');
    } catch (error) {
      this.error('Failed to check integration status', error);
    }
  }

  async handleFormFile(filePath) {
    this.log(`Analyzing form file: ${filePath}`);
    
    try {
      await this.analyzeFormFile(filePath);
      const analysis = this.formRegistry.get(filePath);
      
      if (!analysis || !analysis.isFormComponent) return;
      
      // Apply automatic fixes for critical issues
      const criticalIssues = analysis.issues.filter(issue => issue.severity === 'critical');
      if (criticalIssues.length > 0) {
        await this.fixCriticalFormIssues(filePath, criticalIssues);
      }
      
      // Generate backend integration if missing
      if (analysis.issues.some(issue => issue.type === 'missing-backend')) {
        await this.generateBackendIntegration(filePath, analysis);
      }
      
      // Update integration documentation
      await this.updateIntegrationDocumentation(filePath, analysis);
      
    } catch (error) {
      this.error(`Failed to handle form file ${filePath}`, error);
    }
  }

  async fixCriticalFormIssues(filePath, issues) {
    try {
      let content = await this.read(filePath);
      let modified = false;
      
      for (const issue of issues) {
        switch (issue.type) {
          case 'missing-backend':
            // Add basic submission handler
            if (!content.includes('onSubmit') && !content.includes('handleSubmit')) {
              content = this.addSubmissionHandler(content);
              modified = true;
              this.log('Added basic submission handler');
            }
            break;
            
          case 'missing-validation':
            // Add basic validation
            if (!content.includes('required') && content.includes('<input')) {
              content = content.replace(/<input([^>]*email[^>]*)>/g, '<input$1 required>');
              content = content.replace(/<input([^>]*name[^>]*)>/g, '<input$1 required>');
              modified = true;
              this.log('Added basic HTML5 validation');
            }
            break;
        }
      }
      
      if (modified) {
        await this.write(filePath, content);
        this.log(`Fixed ${issues.length} critical form issues in ${filePath}`);
      }
      
    } catch (error) {
      this.error(`Failed to fix critical form issues in ${filePath}`, error);
    }
  }

  addSubmissionHandler(content) {
    // Add basic submission handler template
    const handlerCode = `
  const handleSubmit = async (data) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        // Handle success
        console.log('Form submitted successfully');
      } else {
        // Handle error
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };`;
    
    // Insert before the return statement
    const returnIndex = content.lastIndexOf('return (');
    if (returnIndex !== -1) {
      return content.substring(0, returnIndex) + handlerCode + '\\n\\n  ' + content.substring(returnIndex);
    }
    
    return content;
  }

  async generateBackendIntegration(filePath, analysis) {
    try {
      // Generate API endpoint based on form type
      const formType = analysis.formType;
      const apiEndpoint = this.generateApiEndpoint(formType, analysis);
      
      // Create API file
      const apiPath = `src/api/${formType}-handler.ts`;
      await this.write(apiPath, apiEndpoint);
      
      this.log(`Generated backend integration for ${formType} form`);
      
      // Update form component to use the API
      await this.updateFormWithApiIntegration(filePath, formType);
      
    } catch (error) {
      this.error(`Failed to generate backend integration for ${filePath}`, error);
    }
  }

  generateApiEndpoint(formType, analysis) {
    const template = this.formConfig.formTypes[formType] || this.formConfig.formTypes.contact;
    
    return `// Generated API endpoint for ${formType} form
import { NextApiRequest, NextApiResponse } from 'next';

interface ${formType.charAt(0).toUpperCase() + formType.slice(1)}FormData {
${template.fields.map(field => `  ${field}: string;`).join('\\n')}
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const formData: ${formType.charAt(0).toUpperCase() + formType.slice(1)}FormData = req.body;
    
    // Validate required fields
${template.fields.map(field => `    if (!formData.${field}) {
      return res.status(400).json({ message: '${field} is required' });
    }`).join('\\n')}
    
    // Process form submission
    await processFormSubmission(formData);
    
    return res.status(200).json({ 
      success: true, 
      message: 'Form submitted successfully' 
    });
    
  } catch (error) {
    console.error('Form submission error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
}

async function processFormSubmission(data: ${formType.charAt(0).toUpperCase() + formType.slice(1)}FormData) {
  // Add your integration logic here:
  // - Send email notification
  // - Save to CRM
  // - Add to newsletter list
  // - etc.
  
  console.log('Processing form submission:', data);
  
  // Example: Send email (implement with your preferred service)
  // await sendEmail({
  //   to: process.env.CONTACT_EMAIL,
  //   subject: '${formType.charAt(0).toUpperCase() + formType.slice(1)} Form Submission',
  //   body: JSON.stringify(data, null, 2)
  // });
  
  // Example: Save to CRM (implement with your preferred CRM)
  // await saveToCRM(data);
}`;
  }

  async updateFormWithApiIntegration(filePath, formType) {
    try {
      let content = await this.read(filePath);
      
      // Update submission handler to use the API
      const apiCallCode = `
  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      const response = await fetch('/api/${formType}-handler', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (response.ok) {
        setIsSubmitted(true);
        // Optionally redirect or show success message
      } else {
        setError(result.message || 'Submission failed');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };`;
      
      // Replace existing handler or add new one
      if (content.includes('handleSubmit')) {
        content = content.replace(
          /const handleSubmit = async \([^}]+\}[^}]*\}/s,
          apiCallCode
        );
      } else {
        const returnIndex = content.lastIndexOf('return (');
        if (returnIndex !== -1) {
          content = content.substring(0, returnIndex) + apiCallCode + '\\n\\n  ' + content.substring(returnIndex);
        }
      }
      
      // Add state management
      if (!content.includes('useState')) {
        content = content.replace(
          "import React from 'react';",
          "import React, { useState } from 'react';"
        );
      }
      
      // Add state variables
      if (!content.includes('isSubmitting')) {
        const componentStart = content.indexOf('const ') || content.indexOf('function ');
        const firstBrace = content.indexOf('{', componentStart);
        const stateCode = `
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);
`;
        content = content.substring(0, firstBrace + 1) + stateCode + content.substring(firstBrace + 1);
      }
      
      await this.write(filePath, content);
      this.log(`Updated form component with API integration`);
      
    } catch (error) {
      this.error(`Failed to update form with API integration`, error);
    }
  }

  async handleKeywordTrigger(keyword) {
    this.log(`Handling keyword trigger: ${keyword}`);
    
    switch (keyword) {
      case 'form':
        await this.auditAllForms();
        break;
      case 'submit':
        await this.checkSubmissionIntegration();
        break;
      case 'validation':
        await this.auditFormValidation();
        break;
      default:
        this.log(`No specific handler for keyword: ${keyword}`);
    }
  }

  async auditAllForms() {
    this.log('Auditing all forms in the project');
    
    try {
      let totalForms = 0;
      let formsWithIssues = 0;
      let criticalIssues = 0;
      
      for (const [filePath, analysis] of this.formRegistry) {
        totalForms++;
        
        if (analysis.issues.length > 0) {
          formsWithIssues++;
          criticalIssues += analysis.issues.filter(issue => issue.severity === 'critical').length;
        }
        
        this.log(`Form: ${filePath} - ${analysis.issues.length} issues found`);
      }
      
      this.log(`Form audit complete: ${totalForms} forms, ${formsWithIssues} with issues, ${criticalIssues} critical`);
      
    } catch (error) {
      this.error('Failed to audit all forms', error);
    }
  }

  async checkSubmissionIntegration() {
    this.log('Checking form submission integration status');
    
    try {
      const integrationReport = {
        formsWithBackend: 0,
        formsWithoutBackend: 0,
        apiEndpoints: [],
        missingIntegrations: []
      };
      
      for (const [filePath, analysis] of this.formRegistry) {
        if (analysis.hasBackendIntegration) {
          integrationReport.formsWithBackend++;
          integrationReport.apiEndpoints.push(...analysis.submission.apiCalls);
        } else {
          integrationReport.formsWithoutBackend++;
          integrationReport.missingIntegrations.push(filePath);
        }
      }
      
      this.log(`Integration status: ${integrationReport.formsWithBackend} integrated, ${integrationReport.formsWithoutBackend} missing`);
      
      if (integrationReport.missingIntegrations.length > 0) {
        this.log('Forms missing backend integration:');
        integrationReport.missingIntegrations.forEach(path => this.log(`  - ${path}`));
      }
      
    } catch (error) {
      this.error('Failed to check submission integration', error);
    }
  }

  async auditFormValidation() {
    this.log('Auditing form validation implementation');
    
    try {
      const validationReport = {
        formsWithValidation: 0,
        formsWithoutValidation: 0,
        validationLibraries: new Set(),
        commonIssues: []
      };
      
      for (const [filePath, analysis] of this.formRegistry) {
        if (Object.keys(analysis.validation).length > 0) {
          validationReport.formsWithValidation++;
          validationReport.validationLibraries.add(analysis.useFormLibrary);
        } else {
          validationReport.formsWithoutValidation++;
          validationReport.commonIssues.push(`${filePath}: No validation found`);
        }
      }
      
      this.log(`Validation audit: ${validationReport.formsWithValidation} validated, ${validationReport.formsWithoutValidation} unvalidated`);
      this.log(`Libraries used: ${Array.from(validationReport.validationLibraries).join(', ')}`);
      
    } catch (error) {
      this.error('Failed to audit form validation', error);
    }
  }

  async performFormIntegrationAudit() {
    this.log('Performing comprehensive form integration audit');
    
    try {
      // Rebuild form registry
      await this.buildFormRegistry();
      
      const auditReport = {
        timestamp: new Date().toISOString(),
        summary: {
          totalForms: this.formRegistry.size,
          formsWithBackend: 0,
          formsWithValidation: 0,
          criticalIssues: 0
        },
        integrationStatus: Object.fromEntries(this.integrationStatus),
        forms: [],
        recommendations: []
      };
      
      // Analyze each form
      for (const [filePath, analysis] of this.formRegistry) {
        auditReport.forms.push({
          path: filePath,
          type: analysis.formType,
          fields: analysis.fields.length,
          hasBackend: analysis.hasBackendIntegration,
          hasValidation: Object.keys(analysis.validation).length > 0,
          issues: analysis.issues,
          suggestions: analysis.suggestions
        });
        
        if (analysis.hasBackendIntegration) auditReport.summary.formsWithBackend++;
        if (Object.keys(analysis.validation).length > 0) auditReport.summary.formsWithValidation++;
        auditReport.summary.criticalIssues += analysis.issues.filter(i => i.severity === 'critical').length;
      }
      
      // Generate recommendations
      if (auditReport.summary.criticalIssues > 0) {
        auditReport.recommendations.push('Address critical form integration issues immediately');
      }
      
      if (auditReport.summary.formsWithBackend < auditReport.summary.totalForms) {
        auditReport.recommendations.push('Complete backend integration for all forms');
      }
      
      if (auditReport.summary.formsWithValidation < auditReport.summary.totalForms) {
        auditReport.recommendations.push('Add validation to all forms for better UX and security');
      }
      
      // Save audit report
      const reportPath = '.claude/subagents/logs/form-integration-audit.json';
      await this.write(reportPath, JSON.stringify(auditReport, null, 2));
      
      this.log(`Form integration audit complete. Report saved to ${reportPath}`);
      this.log(`Summary: ${auditReport.summary.totalForms} forms, ${auditReport.summary.criticalIssues} critical issues`);
      
    } catch (error) {
      this.error('Failed to perform form integration audit', error);
    }
  }

  async updateIntegrationDocumentation(filePath, analysis) {
    try {
      // Update integration status documentation
      const docPath = '.claude/subagents/logs/form-integration-status.json';
      let integrationDoc = {
        lastUpdated: new Date().toISOString(),
        forms: {},
        providers: Object.fromEntries(this.integrationStatus)
      };
      
      if (await this.fileExists(docPath)) {
        const existingDoc = await this.read(docPath);
        integrationDoc = { ...JSON.parse(existingDoc), ...integrationDoc };
      }
      
      integrationDoc.forms[filePath] = {
        type: analysis.formType,
        hasBackend: analysis.hasBackendIntegration,
        hasValidation: Object.keys(analysis.validation).length > 0,
        issuesCount: analysis.issues.length,
        lastAnalyzed: new Date().toISOString()
      };
      
      await this.write(docPath, JSON.stringify(integrationDoc, null, 2));
      
    } catch (error) {
      this.error('Failed to update integration documentation', error);
    }
  }
}

module.exports = FormIntegrationExpertAgent;