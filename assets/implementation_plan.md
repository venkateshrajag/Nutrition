# Saffron Suvai - Core Features Implementation Plan
## Simplified Vercel + Supabase Architecture

> **Simplified Approach**: Open access for all Google OAuth users. Focus on core features: Survey, Feedback, and Cookbook.

---

## Architecture

```
┌─────────────────────────────────────────┐
│         Vercel Deployment                │
│  ┌─────────────┐    ┌─────────────────┐ │
│  │   React     │───▶│   Serverless    │ │
│  │  Frontend   │    │   Functions     │ │
│  └─────────────┘    └────────┬────────┘ │
└──────────────────────────────┼──────────┘
                               │
                               ▼
                   ┌───────────────────────┐
                   │     Supabase          │
                   │  - PostgreSQL         │
                   │  - Google OAuth       │
                   │  - Row Level Security │
                   └───────────────────────┘
```

---

## Database Schema (Supabase)

### Table: `users`
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  google_id TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  picture TEXT,
  has_completed_survey BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_login_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Table: `surveys`
```sql
CREATE TABLE surveys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  responses JSONB NOT NULL,
  completed_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Table: `feedback`
```sql
CREATE TABLE feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  survey_id UUID REFERENCES surveys(id),
  content JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Table: `recipes`
```sql
CREATE TABLE recipes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  prep_time INTEGER,
  cook_time INTEGER,
  calories INTEGER,
  protein DECIMAL,
  carbs DECIMAL,
  fat DECIMAL,
  fiber DECIMAL,
  ingredients JSONB,
  instructions JSONB,
  dietary_tags TEXT[],
  source_link TEXT
);
```

---

## Implementation Phases

### ✅ Phase 0: Foundation (COMPLETED)
- [x] Indian theme design implemented
- [x] Supabase project setup
- [x] Google OAuth configured
- [x] Recipe data extracted from PDF (14 recipes)

### Phase 1: Database Setup & Recipe Import
**Goal**: Set up database schema and import recipes

**Tasks**:
- [ ] Create SQL migration file with all table schemas
- [ ] Run migrations in Supabase
- [ ] Import 14 recipes from `assets/recipes.json` into database
- [ ] Set up Row Level Security policies
- [ ] Test database connections

**Files to create**:
- `supabase/migrations/001_initial_schema.sql`
- `scripts/seed-recipes.ts`

---

### Phase 2: Enhanced Authentication
**Goal**: Improve auth flow and user management

**Tasks**:
- [ ] Update `useAuth` hook to handle user creation/update
- [ ] Create auth callback page (`/auth/callback`)
- [ ] Implement automatic user record creation on first login
- [ ] Add protected route wrapper component
- [ ] Update Header to show user info from Supabase

**Files to modify**:
- `src/hooks/useAuth.ts`
- `src/components/layout/Header.tsx`

**Files to create**:
- `src/pages/AuthCallback.tsx`
- `src/components/auth/ProtectedRoute.tsx`

---

### Phase 3: Survey System
**Goal**: Multi-step survey for nutrition profile

**Survey Questions** (from spec):
1. Age (number)
2. Weight in kg (number)
3. Height in cm (number)
4. Activity level (single-select)
5. Dietary restrictions (multi-select)
6. Health goals (multi-select)
7. Meals per day (single-select)
8. Water intake (single-select)
9. Food allergies (multi-select)

**Tasks**:
- [ ] Create survey form component with multi-step wizard
- [ ] Add progress indicator
- [ ] Implement form validation
- [ ] Create API route to save survey (`/api/survey`)
- [ ] Redirect new users to survey, returning users to dashboard

**Files to create**:
- `src/components/survey/SurveyForm.tsx`
- `src/components/survey/SurveyQuestion.tsx`
- `src/components/survey/ProgressBar.tsx`
- `src/pages/Survey.tsx`
- `api/survey/submit.ts`
- `api/survey/status.ts`

---

### Phase 4: Feedback Generation
**Goal**: Generate personalized nutrition feedback

**Logic** (rule-based, no AI):
```typescript
// Calculate BMR (Basal Metabolic Rate)
// Calculate TDEE (Total Daily Energy Expenditure)
// Adjust calories based on goals
// Generate recommendations based on survey responses
```

**Tasks**:
- [ ] Implement BMR/TDEE calculation functions
- [ ] Create feedback generation logic
- [ ] Build feedback display component with charts
- [ ] Create API route for feedback generation
- [ ] Add feedback history view

**Files to create**:
- `src/utils/nutritionCalculations.ts`
- `src/components/feedback/FeedbackDisplay.tsx`
- `src/components/feedback/MacroChart.tsx`
- `src/components/feedback/FeedbackHistory.tsx`
- `src/pages/Dashboard.tsx`
- `api/feedback/generate.ts`
- `api/feedback/latest.ts`

---

### Phase 5: Cookbook Module
**Goal**: Browse and view Indian recipes

**Features**:
- Recipe list with category filters (Breakfast, Lunch, Dinner)
- Dietary tag filters (vegetarian, vegan, high-protein, etc.)
- Recipe detail view with nutrition info
- Search functionality

**Tasks**:
- [ ] Create recipe list component with filters
- [ ] Build recipe card component
- [ ] Create recipe detail page
- [ ] Add search and filter functionality
- [ ] Create API routes for recipes

**Files to create**:
- `src/components/cookbook/RecipeList.tsx`
- `src/components/cookbook/RecipeCard.tsx`
- `src/components/cookbook/RecipeDetail.tsx`
- `src/components/cookbook/RecipeFilters.tsx`
- `src/pages/Cookbook.tsx`
- `api/cookbook/recipes.ts`
- `api/cookbook/[id].ts`

---

### Phase 6: Navigation & Routing
**Goal**: Set up app navigation and routing

**Routes**:
- `/` - Landing page (if not logged in) or Dashboard (if logged in)
- `/auth/callback` - OAuth callback
- `/survey` - Survey form
- `/dashboard` - User dashboard with feedback
- `/cookbook` - Recipe browser
- `/cookbook/[id]` - Recipe detail

**Tasks**:
- [ ] Set up React Router
- [ ] Create sidebar navigation component
- [ ] Implement route protection
- [ ] Add loading states

**Files to modify**:
- `src/App.tsx`

**Files to create**:
- `src/components/layout/Sidebar.tsx`
- `src/components/layout/Navigation.tsx`

---

### Phase 7: Polish & Deployment
**Goal**: Final touches and production deployment

**Tasks**:
- [ ] Add error boundaries
- [ ] Implement loading skeletons
- [ ] Add toast notifications
- [ ] Optimize images
- [ ] Test all user flows
- [ ] Deploy to Vercel production
- [ ] Set environment variables on Vercel

---

## Recipe Data Summary

**14 Recipes Extracted** from `Saffron_Suvar_Recipe_Collection_final.pdf`:

**Breakfast (4)**:
1. Moong Dal Idli - 90 cal, 7g protein
2. Quinoa Upma + Greek Yogurt - 496 cal, 31g protein
3. Medu Vada + Greek Yogurt - 228 cal, 22g protein
4. Cottage Cheese Uttapam - 355 cal, 25g protein

**Lunch (5)**:
5. Egg Biryani + Greek Yogurt - 700 cal, 34g protein
6. Dal Vada - 90 cal, 6g protein
7. Besan Chilla - 124 cal, 7g protein
8. Chana Chaat - 180 cal, 9g protein
9. Egg Dosa - 465 cal, 30g protein

**Dinner (5)**:
10. Soya Chunks Curry - 244 cal, 20g protein
11. Egg Bhurji (Coconut Oil) - 180 cal, 14g protein
12. Protein Oats Khichdi - 280 cal, 14g protein
13. Chana Masala - 260 cal, 12g protein
14. Rajma Masala - 290 cal, 13g protein

All recipes include complete nutrition data, ingredients, instructions, and dietary tags.

---

## Environment Variables

### Development (`.env.local`)
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Production (Vercel)
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

---

## Next Steps

1. **Phase 1**: Set up database and import recipes
2. **Phase 2**: Enhance authentication flow
3. **Phase 3**: Build survey system
4. **Phase 4**: Implement feedback generation
5. **Phase 5**: Create cookbook module
6. **Phase 6**: Set up navigation
7. **Phase 7**: Polish and deploy

Ready to proceed with Phase 1?
