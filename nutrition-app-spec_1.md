# Nutrition App - Technical Specification

## Overview
A minimalistic nutrition app with Google OAuth, admin-controlled access, surveys, and personalized feedback.

---

## Architecture

```
┌─────────────────────────────────────────────────────┐
│           Azure Static Web Apps (Free)              │
│  ┌─────────────────┐    ┌────────────────────────┐  │
│  │  React Frontend │───▶│  Azure Functions API   │  │
│  │  (TypeScript)   │    │  (Node.js/TypeScript)  │  │
│  └─────────────────┘    └───────────┬────────────┘  │
└─────────────────────────────────────┼───────────────┘
                                      │
                                      ▼
                          ┌───────────────────────┐
                          │  Cosmos DB (Free)     │
                          │  - users              │
                          │  - allowed_emails     │
                          │  - surveys            │
                          │  - feedback           │
                          │  - sidebar_modules    │
                          └───────────────────────┘
```

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18 + TypeScript + Vite |
| Styling | Tailwind CSS |
| Backend | Azure Functions (Node.js 20 + TypeScript) |
| Database | Azure Cosmos DB (NoSQL) |
| Auth | Google OAuth 2.0 (Static Web Apps built-in) |
| Hosting | Azure Static Web Apps |
| CI/CD | GitHub Actions (auto-configured by SWA) |

---

## Project Structure

```
nutrition-app/
├── src/                          # React frontend
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx       # Left navigation pane
│   │   │   ├── Header.tsx
│   │   │   └── Layout.tsx
│   │   ├── auth/
│   │   │   ├── LoginButton.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   ├── admin/
│   │   │   ├── AdminPanel.tsx
│   │   │   ├── AllowedDomains.tsx
│   │   │   ├── AllowedEmails.tsx
│   │   │   └── UserManagement.tsx
│   │   ├── survey/
│   │   │   ├── SurveyForm.tsx
│   │   │   └── SurveyQuestion.tsx
│   │   ├── feedback/
│   │   │   ├── FeedbackDisplay.tsx
│   │   │   └── FeedbackHistory.tsx
│   │   └── modules/
│   │       ├── Cookbook.tsx
│   │       └── ModuleLoader.tsx   # Dynamic module loading
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useSurvey.ts
│   │   └── useFeedback.ts
│   ├── services/
│   │   └── api.ts                # API client
│   ├── types/
│   │   └── index.ts              # TypeScript interfaces
│   ├── App.tsx
│   └── main.tsx
├── api/                          # Azure Functions
│   ├── src/
│   │   └── functions/
│   │       ├── auth/
│   │       │   └── checkAccess.ts
│   │       ├── admin/
│   │       │   ├── getAllowedAccess.ts
│   │       │   ├── addAllowedAccess.ts
│   │       │   ├── removeAllowedAccess.ts
│   │       │   └── getUsers.ts
│   │       ├── survey/
│   │       │   ├── getSurvey.ts
│   │       │   ├── submitSurvey.ts
│   │       │   └── getSurveyStatus.ts
│   │       ├── feedback/
│   │       │   ├── generateFeedback.ts
│   │       │   ├── getFeedback.ts
│   │       │   └── getFeedbackHistory.ts
│   │       └── modules/
│   │           ├── getSidebarModules.ts
│   │           └── cookbook/
│   │               ├── getRecipes.ts
│   │               └── getRecipe.ts
│   ├── lib/
│   │   ├── cosmosClient.ts       # Cosmos DB connection
│   │   └── authMiddleware.ts     # Auth validation
│   ├── host.json
│   ├── local.settings.json
│   └── package.json
├── staticwebapp.config.json      # SWA routing & auth config
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

---

## Database Schema (Cosmos DB Collections)

### Container: `users`
Partition key: `/id`

```json
{
  "id": "google-oauth-id-123",
  "email": "user@example.com",
  "name": "John Doe",
  "picture": "https://...",
  "isAdmin": false,
  "hasCompletedSurvey": true,
  "createdAt": "2024-01-15T10:00:00Z",
  "lastLoginAt": "2024-01-20T14:30:00Z"
}
```

### Container: `allowed_access`
Partition key: `/type`

```json
// Domain-based access (allows all emails from domain)
{
  "id": "uuid-domain-1",
  "type": "domain",
  "value": "company.com",
  "addedBy": "admin@example.com",
  "createdAt": "2024-01-10T09:00:00Z"
}

// Another allowed domain
{
  "id": "uuid-domain-2",
  "type": "domain",
  "value": "partner-org.com",
  "addedBy": "admin@example.com",
  "createdAt": "2024-01-10T09:00:00Z"
}

// Specific email access
{
  "id": "uuid-email-1",
  "type": "email",
  "value": "external.consultant@gmail.com",
  "addedBy": "admin@example.com",
  "createdAt": "2024-01-10T09:00:00Z"
}
```

### Container: `surveys`
Partition key: `/userId`

```json
{
  "id": "uuid-456",
  "userId": "google-oauth-id-123",
  "responses": {
    "age": "35",
    "weight": "70",
    "height": "175",
    "activityLevel": "moderate",
    "dietaryRestrictions": ["vegetarian"],
    "healthGoals": ["weight_loss", "energy"],
    "mealsPerDay": "3",
    "waterIntake": "6-8 glasses",
    "allergies": ["nuts"],
    "currentDiet": "mixed"
  },
  "completedAt": "2024-01-15T10:30:00Z",
  "version": 1
}
```

### Container: `feedback`
Partition key: `/userId`

```json
{
  "id": "uuid-789",
  "userId": "google-oauth-id-123",
  "surveyId": "uuid-456",
  "content": {
    "summary": "Based on your profile...",
    "recommendations": [
      {
        "category": "protein",
        "suggestion": "Increase plant-based protein intake",
        "priority": "high"
      }
    ],
    "dailyCalorieTarget": 1800,
    "macroSplit": {
      "protein": 25,
      "carbs": 50,
      "fat": 25
    }
  },
  "createdAt": "2024-01-15T10:31:00Z"
}
```

### Container: `sidebar_modules`
Partition key: `/id`

```json
{
  "id": "cookbook",
  "name": "Cookbook",
  "icon": "book-open",
  "route": "/cookbook",
  "order": 1,
  "isGlobal": true,
  "userId": null,
  "enabled": true
}
```

### Container: `recipes` (for Cookbook module)
Partition key: `/category`

```json
{
  "id": "recipe-001",
  "title": "Quinoa Buddha Bowl",
  "category": "lunch",
  "calories": 450,
  "protein": 15,
  "carbs": 55,
  "fat": 18,
  "ingredients": ["quinoa", "chickpeas", "avocado", "spinach"],
  "instructions": ["Cook quinoa...", "..."],
  "prepTime": 15,
  "cookTime": 20,
  "dietaryTags": ["vegetarian", "gluten-free"],
  "imageUrl": "/images/recipes/buddha-bowl.jpg"
}
```

---

## Authentication Flow

### staticwebapp.config.json

```json
{
  "auth": {
    "identityProviders": {
      "google": {
        "registration": {
          "openIdConnectConfiguration": {
            "wellKnownOpenIdConfiguration": "https://accounts.google.com/.well-known/openid-configuration"
          }
        }
      }
    }
  },
  "routes": [
    {
      "route": "/admin/*",
      "allowedRoles": ["admin"]
    },
    {
      "route": "/api/admin/*",
      "allowedRoles": ["admin"]
    },
    {
      "route": "/app/*",
      "allowedRoles": ["authenticated"]
    },
    {
      "route": "/api/*",
      "allowedRoles": ["authenticated"]
    },
    {
      "route": "/.auth/login/google",
      "rewrite": "/.auth/login/google"
    },
    {
      "route": "/login",
      "rewrite": "/index.html"
    },
    {
      "route": "/*",
      "rewrite": "/index.html"
    }
  ],
  "responseOverrides": {
    "401": {
      "redirect": "/login",
      "statusCode": 302
    }
  },
  "globalHeaders": {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY"
  }
}
```

### Auth Flow Steps

1. User clicks "Login with Google"
2. Redirects to `/.auth/login/google`
3. Google OAuth flow completes
4. SWA sets auth cookie, redirects to `/api/auth/check-access`
5. API checks access using this logic:
   ```typescript
   async function isAllowed(email: string): Promise<boolean> {
     const domain = email.split('@')[1];
     
     // Check if domain is allowed
     const domainMatch = await container.items
       .query({
         query: "SELECT * FROM c WHERE c.type = 'domain' AND c.value = @domain",
         parameters: [{ name: "@domain", value: domain }]
       }).fetchAll();
     
     if (domainMatch.resources.length > 0) return true;
     
     // Check if specific email is allowed
     const emailMatch = await container.items
       .query({
         query: "SELECT * FROM c WHERE c.type = 'email' AND c.value = @email",
         parameters: [{ name: "@email", value: email.toLowerCase() }]
       }).fetchAll();
     
     return emailMatch.resources.length > 0;
   }
   ```
6. If allowed: 
   - Create/update user in `users` collection
   - Check if survey completed
   - Redirect to `/app/survey` or `/app/dashboard`
7. If not allowed: Show "Access Denied" page

---

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/auth/check-access` | Verify user is in allowlist |
| GET | `/api/auth/me` | Get current user profile |

### Admin
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/allowed-access` | List all allowed domains & emails |
| POST | `/api/admin/allowed-access` | Add domain or email |
| DELETE | `/api/admin/allowed-access/:id` | Remove from allowlist |
| GET | `/api/admin/users` | List all users |
| PUT | `/api/admin/users/:id/role` | Update user role |

### Survey
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/survey` | Get survey questions |
| GET | `/api/survey/status` | Check if user completed survey |
| POST | `/api/survey` | Submit survey responses |

### Feedback
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/feedback/latest` | Get latest feedback |
| GET | `/api/feedback/history` | Get all past feedback |
| POST | `/api/feedback/generate` | Generate new feedback |

### Modules
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/modules/sidebar` | Get sidebar modules for user |

### Cookbook
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cookbook/recipes` | List recipes (with filters) |
| GET | `/api/cookbook/recipes/:id` | Get recipe details |

---

## UI Components Specification

### Sidebar (Left Pane)
- Fixed position, collapsible on mobile
- Dynamic buttons loaded from `sidebar_modules` collection
- Default modules: Dashboard, Cookbook
- Extensible: new modules added via database
- Icons from Lucide React
- Active state highlighting

### Survey Form
- Multi-step wizard format
- Progress indicator
- Question types: text, number, single-select, multi-select, slider
- Validation before proceeding
- Save progress (optional)

### Feedback Display
- Card-based layout
- Sections: Summary, Recommendations, Targets
- Visual charts for macro split (pie chart)
- Priority badges for recommendations
- Timestamp and "based on survey from [date]"

### Admin Panel
- **Allowed Domains** table: add/remove entire domains (e.g., `company.com`)
- **Allowed Emails** table: add/remove specific emails (e.g., `contractor@gmail.com`)
- User list with role management
- Simple, functional design
- Visual distinction between domain vs email entries

---

## Survey Questions

```typescript
const surveyQuestions = [
  {
    id: "age",
    type: "number",
    question: "What is your age?",
    validation: { min: 13, max: 120 }
  },
  {
    id: "weight",
    type: "number",
    question: "What is your current weight (kg)?",
    validation: { min: 30, max: 300 }
  },
  {
    id: "height",
    type: "number",
    question: "What is your height (cm)?",
    validation: { min: 100, max: 250 }
  },
  {
    id: "activityLevel",
    type: "single-select",
    question: "How would you describe your activity level?",
    options: [
      { value: "sedentary", label: "Sedentary (little or no exercise)" },
      { value: "light", label: "Light (exercise 1-3 days/week)" },
      { value: "moderate", label: "Moderate (exercise 3-5 days/week)" },
      { value: "active", label: "Active (exercise 6-7 days/week)" },
      { value: "very_active", label: "Very Active (intense exercise daily)" }
    ]
  },
  {
    id: "dietaryRestrictions",
    type: "multi-select",
    question: "Do you follow any dietary restrictions?",
    options: [
      { value: "none", label: "None" },
      { value: "vegetarian", label: "Vegetarian" },
      { value: "vegan", label: "Vegan" },
      { value: "pescatarian", label: "Pescatarian" },
      { value: "keto", label: "Keto" },
      { value: "paleo", label: "Paleo" },
      { value: "gluten_free", label: "Gluten-Free" },
      { value: "dairy_free", label: "Dairy-Free" },
      { value: "halal", label: "Halal" },
      { value: "kosher", label: "Kosher" }
    ]
  },
  {
    id: "healthGoals",
    type: "multi-select",
    question: "What are your health goals?",
    options: [
      { value: "weight_loss", label: "Lose weight" },
      { value: "weight_gain", label: "Gain weight" },
      { value: "muscle_gain", label: "Build muscle" },
      { value: "maintenance", label: "Maintain current weight" },
      { value: "energy", label: "Increase energy" },
      { value: "health", label: "Improve overall health" }
    ]
  },
  {
    id: "mealsPerDay",
    type: "single-select",
    question: "How many meals do you typically eat per day?",
    options: [
      { value: "1-2", label: "1-2 meals" },
      { value: "3", label: "3 meals" },
      { value: "4-5", label: "4-5 meals" },
      { value: "6+", label: "6 or more meals" }
    ]
  },
  {
    id: "waterIntake",
    type: "single-select",
    question: "How much water do you drink daily?",
    options: [
      { value: "1-2", label: "1-2 glasses" },
      { value: "3-5", label: "3-5 glasses" },
      { value: "6-8", label: "6-8 glasses" },
      { value: "8+", label: "More than 8 glasses" }
    ]
  },
  {
    id: "allergies",
    type: "multi-select",
    question: "Do you have any food allergies?",
    options: [
      { value: "none", label: "None" },
      { value: "nuts", label: "Nuts" },
      { value: "shellfish", label: "Shellfish" },
      { value: "eggs", label: "Eggs" },
      { value: "dairy", label: "Dairy" },
      { value: "soy", label: "Soy" },
      { value: "wheat", label: "Wheat" },
      { value: "other", label: "Other" }
    ]
  }
];
```

---

## Feedback Generation Logic

Simple rule-based feedback (no AI required):

```typescript
function generateFeedback(survey: SurveyResponse): Feedback {
  const bmr = calculateBMR(survey.weight, survey.height, survey.age);
  const tdee = bmr * activityMultiplier[survey.activityLevel];
  
  let calorieTarget = tdee;
  if (survey.healthGoals.includes("weight_loss")) {
    calorieTarget = tdee - 500; // 0.5kg/week deficit
  } else if (survey.healthGoals.includes("weight_gain")) {
    calorieTarget = tdee + 300;
  }
  
  const recommendations = [];
  
  if (survey.waterIntake === "1-2" || survey.waterIntake === "3-5") {
    recommendations.push({
      category: "hydration",
      suggestion: "Increase water intake to at least 8 glasses per day",
      priority: "high"
    });
  }
  
  // ... more rules
  
  return {
    summary: `Based on your profile...`,
    recommendations,
    dailyCalorieTarget: Math.round(calorieTarget),
    macroSplit: calculateMacros(survey)
  };
}
```

---

## Environment Variables

### Local Development (local.settings.json)
```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "",
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "COSMOS_CONNECTION_STRING": "AccountEndpoint=https://xxx.documents.azure.com:443/;AccountKey=xxx",
    "COSMOS_DATABASE_NAME": "nutrition-app",
    "INITIAL_ADMIN_EMAIL": "admin@yourdomain.com",
    "ALLOWED_DOMAINS": "yourcompany.com,partner.org"
  }
}
```

### Production (Azure App Settings)
- `COSMOS_CONNECTION_STRING` - From Cosmos DB connection strings
- `COSMOS_DATABASE_NAME` - "nutrition-app"
- `INITIAL_ADMIN_EMAIL` - First admin user email
- `ALLOWED_DOMAINS` - Comma-separated list of allowed domains (seeded on first run)

---

## Deployment Steps

### 1. Create Azure Resources

```bash
# Login to Azure
az login

# Create resource group
az group create --name rg-nutrition-app --location eastus

# Create Cosmos DB account (free tier)
az cosmosdb create \
  --name cosmos-nutrition-app \
  --resource-group rg-nutrition-app \
  --default-consistency-level Session \
  --enable-free-tier true

# Create database
az cosmosdb sql database create \
  --account-name cosmos-nutrition-app \
  --resource-group rg-nutrition-app \
  --name nutrition-app

# Create containers
az cosmosdb sql container create \
  --account-name cosmos-nutrition-app \
  --resource-group rg-nutrition-app \
  --database-name nutrition-app \
  --name users \
  --partition-key-path /id

az cosmosdb sql container create \
  --account-name cosmos-nutrition-app \
  --resource-group rg-nutrition-app \
  --database-name nutrition-app \
  --name allowed_access \
  --partition-key-path /type

az cosmosdb sql container create \
  --account-name cosmos-nutrition-app \
  --resource-group rg-nutrition-app \
  --database-name nutrition-app \
  --name surveys \
  --partition-key-path /userId

az cosmosdb sql container create \
  --account-name cosmos-nutrition-app \
  --resource-group rg-nutrition-app \
  --database-name nutrition-app \
  --name feedback \
  --partition-key-path /userId

az cosmosdb sql container create \
  --account-name cosmos-nutrition-app \
  --resource-group rg-nutrition-app \
  --database-name nutrition-app \
  --name sidebar_modules \
  --partition-key-path /id

az cosmosdb sql container create \
  --account-name cosmos-nutrition-app \
  --resource-group rg-nutrition-app \
  --database-name nutrition-app \
  --name recipes \
  --partition-key-path /category
```

### 2. Create Static Web App

```bash
# Create SWA (connects to GitHub repo)
az staticwebapp create \
  --name swa-nutrition-app \
  --resource-group rg-nutrition-app \
  --source https://github.com/YOUR_USERNAME/nutrition-app \
  --location eastus2 \
  --branch main \
  --app-location "/" \
  --api-location "api" \
  --output-location "dist" \
  --login-with-github
```

### 3. Configure Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials:
   - Authorized redirect URI: `https://<your-swa-domain>/.auth/login/google/callback`
5. Copy Client ID and Secret
6. In Azure Portal → Static Web App → Configuration → Identity providers
7. Add Google provider with credentials

### 4. Set Environment Variables

```bash
# Get Cosmos DB connection string
az cosmosdb keys list \
  --name cosmos-nutrition-app \
  --resource-group rg-nutrition-app \
  --type connection-strings

# Set in SWA
az staticwebapp appsettings set \
  --name swa-nutrition-app \
  --setting-names \
    COSMOS_CONNECTION_STRING="<connection-string>" \
    COSMOS_DATABASE_NAME="nutrition-app" \
    INITIAL_ADMIN_EMAIL="admin@yourdomain.com"
```

### 5. Seed Initial Data

Create a seed script to add:
- Initial admin email to `allowed_access` (type: "email")
- Default allowed domains to `allowed_access` (type: "domain")
- Default sidebar modules
- Sample recipes for Cookbook

Example seed data:
```json
// allowed_access collection
[
  { "id": "seed-domain-1", "type": "domain", "value": "yourcompany.com", "addedBy": "system", "createdAt": "2024-01-01T00:00:00Z" },
  { "id": "seed-domain-2", "type": "domain", "value": "partner.org", "addedBy": "system", "createdAt": "2024-01-01T00:00:00Z" },
  { "id": "seed-email-1", "type": "email", "value": "admin@gmail.com", "addedBy": "system", "createdAt": "2024-01-01T00:00:00Z" }
]
```

---

## Testing Checklist

- [ ] Google OAuth login works
- [ ] User from allowed domain can access app
- [ ] User with specific allowed email can access app
- [ ] Non-allowlisted email/domain is rejected
- [ ] Admin can add/remove domains from allowlist
- [ ] Admin can add/remove specific emails from allowlist
- [ ] Survey displays on first login
- [ ] Survey responses are saved
- [ ] Feedback is generated and displayed
- [ ] Feedback history is accessible
- [ ] Sidebar modules load correctly
- [ ] Cookbook displays recipes
- [ ] Mobile responsive layout
- [ ] Logout works correctly

---

## Future Extensibility

### Adding New Sidebar Modules

1. Create new component in `src/components/modules/`
2. Add route in `App.tsx`
3. Insert record in `sidebar_modules` collection:

```json
{
  "id": "meal-planner",
  "name": "Meal Planner",
  "icon": "calendar",
  "route": "/meal-planner",
  "order": 2,
  "isGlobal": true,
  "enabled": true
}
```

4. Create corresponding API endpoints if needed

### Planned Modules
- Meal Planner
- Progress Tracker
- Water Intake Logger
- Exercise Log
- Shopping List Generator

---

## Notes for Claude Code

1. **Start with**: Project scaffolding using Vite + React + TypeScript
2. **Then**: Set up Tailwind CSS
3. **Then**: Create Azure Functions API structure
4. **Then**: Implement Cosmos DB client and models
5. **Then**: Build auth flow with SWA config
6. **Then**: Create UI components (Sidebar first, then Survey, then Feedback)
7. **Then**: Implement admin panel
8. **Then**: Add Cookbook module
9. **Finally**: Deployment scripts and documentation

Use `@azure/cosmos` package for Cosmos DB operations.
Use `lucide-react` for icons.
Keep components small and focused.
Add TypeScript types for all data structures.
