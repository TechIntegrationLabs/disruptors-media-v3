# Module Framework Architecture

## 🧩 Module Structure Standard

Every Disruptors Site Module follows a consistent architectural pattern to ensure reliability, maintainability, and user experience consistency.

## 📋 Module Anatomy

### Core Components

Every module consists of these standardized components:

```
module-name/
├── documentation/
│   ├── module-spec.md           # Technical specifications
│   ├── user-guide.md            # User-facing documentation
│   └── integration-notes.md     # Integration requirements
├── configuration/
│   ├── schema.json             # Configuration field definitions
│   ├── defaults.json           # Default settings
│   └── validation-rules.json   # Input validation rules
├── user-interface/
│   ├── dashboard-card.json     # Module card specification
│   ├── onboarding-wizard.json  # Setup wizard definition
│   └── status-display.json     # Status monitoring interface
├── core-logic/
│   ├── main-processor.js       # Core functionality
│   ├── external-integrations.js # API connections
│   └── data-transformers.js    # Data processing utilities
└── assets/
    ├── icons/                  # Module icons and thumbnails
    ├── templates/              # Content templates
    └── examples/               # Sample configurations
```

## ⚙️ Configuration Schema Standard

### Schema Definition Format

Each module defines its configuration needs using a standardized JSON schema:

```json
{
  "moduleId": "blog-generator",
  "displayName": "Blog Generator",
  "description": "Writes posts from your approved keywords and manages everything in a Google Sheet",
  "category": "content-generation",
  "configurationFields": [
    {
      "id": "google_sheet_url",
      "type": "url",
      "label": "Blog Posts Google Sheet URL",
      "description": "Link to your Blog Posts management sheet",
      "required": true,
      "validation": {
        "pattern": "https://docs.google.com/spreadsheets/",
        "errorMessage": "Must be a valid Google Sheets URL"
      }
    },
    {
      "id": "writing_style",
      "type": "select",
      "label": "Writing Style",
      "description": "Choose the tone for generated blog posts",
      "required": true,
      "options": [
        {"value": "professional", "label": "Professional"},
        {"value": "casual", "label": "Casual & Friendly"},
        {"value": "bold", "label": "Bold & Confident"},
        {"value": "technical", "label": "Technical & Detailed"}
      ],
      "default": "professional"
    },
    {
      "id": "publishing_schedule",
      "type": "object",
      "label": "Publishing Schedule",
      "description": "Control when and how often posts are published",
      "fields": [
        {
          "id": "days_between_posts",
          "type": "number",
          "label": "Days Between Posts",
          "min": 1,
          "max": 30,
          "default": 2
        },
        {
          "id": "max_posts_per_week",
          "type": "number",
          "label": "Maximum Posts Per Week",
          "min": 1,
          "max": 7,
          "default": 3
        }
      ]
    }
  ],
  "dependencies": [
    {
      "moduleId": "business-brain-builder",
      "required": true,
      "reason": "Needs business context for relevant content generation"
    },
    {
      "moduleId": "brand-dna-builder",
      "required": false,
      "reason": "Uses brand voice if available for consistent writing style"
    }
  ]
}
```

### Configuration Validation

All user inputs are validated against the schema before module activation:

```javascript
// Validation example
function validateConfiguration(moduleId, userInput) {
  const schema = getModuleSchema(moduleId);
  const errors = [];
  
  schema.configurationFields.forEach(field => {
    const value = userInput[field.id];
    
    // Required field validation
    if (field.required && !value) {
      errors.push(`${field.label} is required`);
    }
    
    // Type validation
    if (value && !validateFieldType(value, field.type)) {
      errors.push(`${field.label} must be a valid ${field.type}`);
    }
    
    // Custom validation
    if (field.validation && value) {
      const validationResult = applyValidation(value, field.validation);
      if (!validationResult.valid) {
        errors.push(validationResult.errorMessage);
      }
    }
  });
  
  return {
    valid: errors.length === 0,
    errors: errors
  };
}
```

## 🎨 User Interface Framework

### Dashboard Card Standard

Every module appears as a standardized card in the dashboard:

```json
{
  "moduleId": "blog-generator",
  "cardDisplay": {
    "title": "Blog Generator",
    "subtitle": "Automated blog post creation and publishing",
    "icon": "/assets/icons/blog-generator.svg",
    "thumbnail": "/assets/thumbnails/blog-generator-preview.png",
    "statusTypes": [
      {
        "id": "active",
        "label": "Active",
        "color": "green",
        "description": "Generating and publishing posts automatically"
      },
      {
        "id": "needs-setup",
        "label": "Needs Setup",
        "color": "orange",
        "description": "Complete configuration to activate"
      },
      {
        "id": "error",
        "label": "Error",
        "color": "red",
        "description": "Check settings - something needs attention"
      }
    ],
    "quickActions": [
      {
        "id": "configure",
        "label": "Configure",
        "icon": "settings",
        "action": "openOnboardingWizard"
      },
      {
        "id": "view-posts",
        "label": "View Posts",
        "icon": "eye",
        "action": "openPostsView",
        "showWhen": "active"
      }
    ]
  }
}
```

### Onboarding Wizard Framework

Each module's setup process follows a standardized wizard pattern:

```json
{
  "moduleId": "blog-generator",
  "wizard": {
    "title": "Set up Blog Generator",
    "description": "Generate high-quality blog posts automatically from your approved keywords",
    "estimatedTime": "5 minutes",
    "steps": [
      {
        "id": "welcome",
        "type": "introduction",
        "title": "Welcome to Blog Generator",
        "content": "This module will automatically write and publish blog posts based on your keyword research. It manages everything through a Google Sheet so you can easily review and approve content.",
        "benefits": [
          "Consistent publishing schedule",
          "SEO-optimized content",
          "Brand-consistent writing style",
          "Easy approval workflow"
        ]
      },
      {
        "id": "google-sheet",
        "type": "configuration",
        "title": "Connect Your Blog Sheet",
        "description": "Link to a Google Sheet where we'll manage your blog posts",
        "fields": ["google_sheet_url"],
        "helpText": "We can create a template sheet for you, or you can use an existing one."
      },
      {
        "id": "writing-style",
        "type": "configuration",
        "title": "Choose Writing Style",
        "description": "How should your blog posts sound?",
        "fields": ["writing_style"],
        "preview": true
      },
      {
        "id": "publishing",
        "type": "configuration",
        "title": "Set Publishing Schedule",
        "description": "Control when and how often posts go live",
        "fields": ["publishing_schedule"]
      },
      {
        "id": "review",
        "type": "review",
        "title": "Review Settings",
        "description": "Everything looks good? Let's activate your Blog Generator.",
        "showConfiguration": true,
        "previewContent": true
      }
    ]
  }
}
```

## 🔄 Module Lifecycle Management

### Activation States

Every module progresses through defined states:

1. **Available**: Module exists but not configured
2. **Configuring**: User is in onboarding wizard
3. **Validating**: Configuration being validated
4. **Activating**: Module being initialized
5. **Active**: Running and operational
6. **Paused**: Temporarily stopped by user
7. **Error**: Needs attention due to issues
8. **Deactivating**: Being shut down
9. **Inactive**: Configured but not running

### State Transition Rules

```javascript
const stateTransitions = {
  'available': ['configuring'],
  'configuring': ['available', 'validating'],
  'validating': ['configuring', 'activating', 'error'],
  'activating': ['active', 'error'],
  'active': ['paused', 'error', 'deactivating'],
  'paused': ['active', 'deactivating'],
  'error': ['configuring', 'deactivating'],
  'deactivating': ['inactive'],
  'inactive': ['configuring', 'deactivating']
};

function canTransitionTo(currentState, targetState) {
  return stateTransitions[currentState]?.includes(targetState) || false;
}
```

## 📡 Inter-Module Communication

### Event System

Modules communicate through a standardized event system:

```javascript
// Event publishing
function publishEvent(moduleId, eventType, payload) {
  const event = {
    timestamp: new Date().toISOString(),
    sourceModule: moduleId,
    eventType: eventType,
    payload: payload,
    eventId: generateUniqueId()
  };
  
  eventBus.publish(event);
  logEvent(event);
}

// Event subscription
function subscribeToEvents(moduleId, eventTypes, callback) {
  eventBus.subscribe({
    subscriber: moduleId,
    eventTypes: eventTypes,
    callback: callback
  });
}

// Example usage
blogGenerator.publishEvent('content-created', {
  contentType: 'blog-post',
  contentId: 'post-123',
  keywords: ['AI', 'automation'],
  publishDate: '2024-01-15'
});

seoOptimizer.subscribeToEvents(['content-created'], (event) => {
  if (event.payload.contentType === 'blog-post') {
    optimizePage(event.payload.contentId);
  }
});
```

### Data Sharing Protocol

Modules share data through a standardized format:

```javascript
// Standard data sharing format
const sharedData = {
  moduleId: 'business-brain-builder',
  dataType: 'business-profile',
  version: '1.0',
  timestamp: '2024-01-01T12:00:00Z',
  data: {
    companyName: 'Tech Innovators Inc',
    industry: 'Technology',
    targetAudience: ['CTOs', 'Tech Managers'],
    keyServices: ['AI Consulting', 'Digital Transformation'],
    brandVoice: 'professional-authoritative',
    competitorKeywords: ['AI consulting', 'digital transformation']
  },
  permissions: {
    read: ['blog-generator', 'landing-page-builder'],
    write: ['business-brain-builder'],
    expire: '2024-12-31T23:59:59Z'
  }
};
```

## 🛡️ Error Handling Framework

### Standardized Error Types

All modules use consistent error categorization:

```javascript
const ErrorTypes = {
  CONFIGURATION_ERROR: 'configuration_error',
  EXTERNAL_API_ERROR: 'external_api_error',
  DATA_PROCESSING_ERROR: 'data_processing_error',
  PERMISSION_ERROR: 'permission_error',
  QUOTA_EXCEEDED: 'quota_exceeded',
  NETWORK_ERROR: 'network_error',
  VALIDATION_ERROR: 'validation_error'
};

// Error handling pattern
function handleModuleError(moduleId, error, context) {
  const standardError = {
    moduleId: moduleId,
    errorType: categorizeError(error),
    message: getReadableMessage(error),
    technicalDetails: error.stack,
    context: context,
    timestamp: new Date().toISOString(),
    severity: determineSeverity(error),
    suggested_action: getSuggestedAction(error),
    user_message: getUserFriendlyMessage(error)
  };
  
  logError(standardError);
  notifyUser(standardError);
  
  // Attempt automatic recovery
  if (canAutoRecover(error)) {
    attemptRecovery(moduleId, error);
  }
}
```

### Recovery Strategies

Each error type has defined recovery procedures:

1. **Configuration Errors**: Guide user back to setup wizard
2. **API Errors**: Retry with exponential backoff, fallback to cached data
3. **Data Processing Errors**: Skip problematic items, continue with batch
4. **Permission Errors**: Provide clear instructions for fixing permissions
5. **Quota Errors**: Pause until quota resets, notify user of timing

## 📊 Performance Monitoring Framework

### Standard Metrics

Every module reports consistent performance metrics:

```javascript
const moduleMetrics = {
  moduleId: 'blog-generator',
  performanceMetrics: {
    operationsPerHour: 12,
    averageProcessingTime: 45000, // milliseconds
    successRate: 0.95,
    errorRate: 0.05,
    apiCallsPerOperation: 3,
    cacheHitRate: 0.80
  },
  businessMetrics: {
    contentCreated: 156,
    userSatisfactionScore: 4.7,
    timeToFirstValue: 8, // minutes
    configurationCompletionRate: 0.92
  },
  resourceUsage: {
    memoryUsageMB: 125,
    cpuUtilization: 0.15,
    storageUsedMB: 2048,
    networkBandwidthKB: 512
  }
};
```

This framework ensures that all modules provide a consistent, reliable, and maintainable experience while allowing for the flexibility needed to implement diverse functionality.