# Umoja Project - Backend and AI Enhancement Setup Guide

## 🚀 Overview

This guide will help you set up Supabase backend integration and AI features for your Umoja Project. The enhanced version includes:

- **Backend**: User authentication, story management, real-time updates
- **AI Features**: Content moderation, auto-categorization, writing suggestions, sentiment analysis
- **Enhanced UX**: Real-time search, recommendations, improved UI

## 📋 Prerequisites

- A modern web browser
- Internet connection
- Text editor (VS Code recommended)

## 🛠️ Setup Instructions

### 1. Supabase Setup

#### Step 1: Create Supabase Account

1. Go to [supabase.com](https://supabase.com)
2. Sign up for a free account
3. Create a new project
4. Note down your project URL and anon key

#### Step 2: Database Schema

Run these SQL commands in your Supabase SQL editor:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table (extends auth.users)
CREATE TABLE public.users (
    id UUID REFERENCES auth.users ON DELETE CASCADE,
    email TEXT,
    full_name TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    PRIMARY KEY (id)
);

-- Create categories table
CREATE TABLE public.categories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    description TEXT,
    color TEXT DEFAULT '#667eea',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default categories
INSERT INTO public.categories (name, description, color) VALUES
('mental-health', 'Stories about mental health awareness, struggles, and recovery', '#2ecc71'),
('gender-issues', 'Stories about gender equality, discrimination, and identity', '#ad1457'),
('social-justice', 'Stories about inequality, activism, and community action', '#1565c0'),
('community', 'Stories about community building, local initiatives, and helping others', '#ef6c00');

-- Create stories table
CREATE TABLE public.stories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    summary TEXT,
    author_name TEXT NOT NULL,
    author_email TEXT,
    category TEXT REFERENCES public.categories(name),
    status TEXT DEFAULT 'pending_review' CHECK (status IN ('draft', 'pending_review', 'approved', 'rejected')),
    user_id UUID REFERENCES auth.users(id),
    image_url TEXT,
    sentiment_data JSONB,
    ai_metadata JSONB,
    view_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create story analytics table
CREATE TABLE public.story_analytics (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    story_id UUID REFERENCES public.stories(id) ON DELETE CASCADE,
    event_type TEXT NOT NULL, -- 'view', 'share', 'like', etc.
    user_id UUID REFERENCES auth.users(id),
    metadata JSONB,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_stories_status ON public.stories(status);
CREATE INDEX idx_stories_category ON public.stories(category);
CREATE INDEX idx_stories_created_at ON public.stories(created_at DESC);
CREATE INDEX idx_stories_user_id ON public.stories(user_id);
CREATE INDEX idx_story_analytics_story_id ON public.story_analytics(story_id);
CREATE INDEX idx_story_analytics_timestamp ON public.story_analytics(timestamp DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.story_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users
CREATE POLICY "Users can view own profile" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for stories
CREATE POLICY "Anyone can view approved stories" ON public.stories FOR SELECT USING (status = 'approved');
CREATE POLICY "Users can view own stories" ON public.stories FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own stories" ON public.stories FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own stories" ON public.stories FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for analytics
CREATE POLICY "Anyone can insert analytics" ON public.story_analytics FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can view analytics for own stories" ON public.story_analytics FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM public.stories
        WHERE stories.id = story_analytics.story_id
        AND stories.user_id = auth.uid()
    )
);

-- RLS Policies for categories
CREATE POLICY "Anyone can view categories" ON public.categories FOR SELECT USING (true);

-- Function to automatically create user profile
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, email, full_name)
    VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name');
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create user profile on signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.stories FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
```

#### Step 3: Storage Setup

1. Go to Storage in your Supabase dashboard
2. Create a new bucket called "story-images"
3. Set it to public
4. Configure upload policies as needed

### 2. AI Services Setup

You have several options for AI services:

#### Option A: OpenAI (Recommended)

1. Sign up at [platform.openai.com](https://platform.openai.com)
2. Get your API key
3. Replace `YOUR_OPENAI_API_KEY` in `ai-services.js`

#### Option B: Hugging Face (Free Alternative)

1. Sign up at [huggingface.co](https://huggingface.co)
2. Get your API token
3. Replace `YOUR_HUGGING_FACE_API_KEY` in `ai-services.js`

#### Option C: Local AI (Advanced)

- Set up local models using Ollama or similar
- Modify the API endpoints in `ai-services.js`

### 3. Configuration

#### Step 1: Update Supabase Config

1. Open `js/supabase-config.js`
2. Replace placeholders:
   ```javascript
   const SUPABASE_URL = "your-project-url-here";
   const SUPABASE_ANON_KEY = "your-anon-key-here";
   ```

#### Step 2: Update AI Config

1. Open `js/ai-services.js`
2. Replace API keys:
   ```javascript
   this.OPENAI_API_KEY = "your-openai-key-here";
   this.HF_API_KEY = "your-hugging-face-key-here";
   ```

### 4. File Updates

#### Step 1: Update HTML Files

Add the new CSS and JavaScript files to your HTML pages:

```html
<!-- In the <head> section -->
<link rel="stylesheet" href="../css/ai-enhanced.css" />

<!-- Before closing </body> tag -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script src="../js/supabase-config.js"></script>
<script src="../js/ai-services.js"></script>
<script src="../js/database-manager.js"></script>
```

#### Step 2: Update Stories Page

1. Open `pages/stories.html`
2. Add search and filter elements:

   ```html
   <div class="search-filters">
     <div class="search-bar">
       <input
         type="text"
         id="story-search"
         class="search-input"
         placeholder="Search stories..."
       />
       <button id="search-btn" class="btn primary">Search</button>
       <button id="ai-recommendations" class="btn ai-btn">
         <i class="fas fa-robot"></i> AI Recommendations
       </button>
     </div>
     <div class="filter-row">
       <div class="category-filters">
         <button class="category-btn active" data-category="all">All</button>
         <button class="category-btn" data-category="mental-health">
           Mental Health
         </button>
         <button class="category-btn" data-category="gender-issues">
           Gender Issues
         </button>
         <button class="category-btn" data-category="social-justice">
           Social Justice
         </button>
         <button class="category-btn" data-category="community">
           Community
         </button>
       </div>
       <div class="filter-group">
         <label class="filter-label">Sentiment:</label>
         <select id="sentiment-filter" class="sentiment-filter">
           <option value="all">All</option>
           <option value="positive">Positive</option>
           <option value="neutral">Neutral</option>
           <option value="negative">Negative</option>
         </select>
       </div>
     </div>
   </div>

   <div id="story-count" class="story-count"></div>
   <div id="stories-loader" class="stories-loader">
     <div class="loading-spinner"></div>
   </div>
   <div id="stories-container" class="stories-grid"></div>
   <div id="pagination" class="pagination"></div>
   ```

3. Add the enhanced stories script:
   ```html
   <script src="../js/stories-enhanced.js"></script>
   ```

## 🔧 Features Explained

### Backend Features

- **Authentication**: User signup/login with Supabase Auth
- **Story Management**: CRUD operations with proper permissions
- **Real-time Updates**: Live story updates using Supabase subscriptions
- **File Storage**: Image uploads for story thumbnails
- **Analytics**: Track story views and engagement

### AI Features

- **Content Moderation**: Automatic detection of inappropriate content
- **Auto-categorization**: AI determines story category based on content
- **Sentiment Analysis**: Emotional tone detection
- **Writing Suggestions**: AI-powered feedback for better storytelling
- **Similar Stories**: AI finds related content for recommendations
- **Smart Search**: Enhanced search with AI-powered relevance

### Enhanced UI

- **Real-time Search**: Instant search results as you type
- **Smart Filters**: Category and sentiment-based filtering
- **Responsive Design**: Works on all device sizes
- **Loading States**: Better user feedback during operations
- **Error Handling**: Graceful error messages and recovery

## 🚀 Deployment

### Option 1: Netlify

1. Connect your GitHub repository to Netlify
2. Set environment variables for API keys
3. Deploy automatically

### Option 2: Vercel

1. Import your GitHub repository
2. Add environment variables
3. Deploy with zero configuration

### Option 3: GitHub Pages

1. Create a build process for environment variables
2. Use GitHub Actions for deployment
3. Serve static files

## 🔐 Security Best Practices

1. **API Keys**: Never commit API keys to version control
2. **Environment Variables**: Use environment variables for sensitive data
3. **RLS**: Ensure Row Level Security is properly configured
4. **Content Moderation**: Always validate user input
5. **Rate Limiting**: Implement rate limiting for AI API calls

## 🐛 Troubleshooting

### Common Issues

1. **Supabase Connection Issues**

   - Check URL and API key
   - Verify RLS policies
   - Check browser console for errors

2. **AI Features Not Working**

   - Verify API keys are correct
   - Check API quotas and limits
   - Look for CORS issues

3. **File Upload Issues**
   - Check storage bucket permissions
   - Verify file size limits
   - Ensure proper MIME types

### Debug Mode

Enable debug mode by adding this to your console:

```javascript
localStorage.setItem("umoja-debug", "true");
```

## 📈 Analytics and Monitoring

Track your application performance:

- Supabase Dashboard for database metrics
- Browser DevTools for frontend performance
- AI API usage through provider dashboards

## 🤝 Contributing

To contribute to the project:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Hugging Face API Documentation](https://huggingface.co/docs/api-inference)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

## 🎉 What's Next?

Future enhancements you could add:

- User profiles and story collections
- Story commenting and rating systems
- Email notifications for story approval
- Advanced analytics dashboard
- Multi-language support with AI translation
- Voice-to-text story submission
- Story recommendation engine improvements
- Social sharing integrations

Happy coding! 🚀
