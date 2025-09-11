// Database Manager for Umoja Project with Supabase
class DatabaseManager {
  constructor() {
    this.supabase = window.UmojaConfig.supabase;
    this.tables = window.UmojaConfig.TABLES;
    this.status = window.UmojaConfig.STORY_STATUS;
  }

  // User Authentication
  async signUp(email, password, userData) {
    try {
      const { data, error } = await this.supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: userData,
        },
      });

      if (error) throw error;
      return { success: true, user: data.user };
    } catch (error) {
      console.error("Sign up error:", error);
      return { success: false, error: error.message };
    }
  }

  async signIn(email, password) {
    try {
      const { data, error } = await this.supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) throw error;
      return { success: true, user: data.user };
    } catch (error) {
      console.error("Sign in error:", error);
      return { success: false, error: error.message };
    }
  }

  async signOut() {
    try {
      const { error } = await this.supabase.auth.signOut();
      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error("Sign out error:", error);
      return { success: false, error: error.message };
    }
  }

  async getCurrentUser() {
    try {
      const {
        data: { user },
      } = await this.supabase.auth.getUser();
      return user;
    } catch (error) {
      console.error("Get current user error:", error);
      return null;
    }
  }

  // Story Management
  async submitStory(storyData) {
    try {
      const user = await this.getCurrentUser();
      if (!user) {
        throw new Error("User must be authenticated to submit stories");
      }

      // AI-powered content moderation
      const moderationResult = await window.UmojaAI.moderateContent(
        storyData.content
      );
      if (moderationResult.flagged) {
        return {
          success: false,
          error:
            "Content flagged by moderation system. Please review and modify your story.",
          moderation: moderationResult,
        };
      }

      // AI-powered categorization if no category provided
      if (!storyData.category) {
        storyData.category = await window.UmojaAI.categorizeStory(
          storyData.title,
          storyData.content
        );
      }

      // Generate AI summary
      const summary = await window.UmojaAI.generateSummary(storyData.content);

      // Sentiment analysis
      const sentiment = await window.UmojaAI.analyzeSentiment(
        storyData.content
      );

      const storyRecord = {
        title: storyData.title,
        content: storyData.content,
        author_name: storyData.authorName,
        author_email: user.email,
        category: storyData.category,
        status: this.status.PENDING,
        summary: summary,
        sentiment_data: sentiment,
        user_id: user.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await this.supabase
        .from(this.tables.STORIES)
        .insert([storyRecord])
        .select();

      if (error) throw error;

      return { success: true, story: data[0] };
    } catch (error) {
      console.error("Submit story error:", error);
      return { success: false, error: error.message };
    }
  }

  async getStories(filters = {}) {
    try {
      let query = this.supabase
        .from(this.tables.STORIES)
        .select("*")
        .eq("status", this.status.APPROVED)
        .order("created_at", { ascending: false });

      // Apply filters
      if (filters.category) {
        query = query.eq("category", filters.category);
      }

      if (filters.limit) {
        query = query.limit(filters.limit);
      }

      const { data, error } = await query;

      if (error) throw error;
      return { success: true, stories: data };
    } catch (error) {
      console.error("Get stories error:", error);
      return { success: false, error: error.message };
    }
  }

  async getStoryById(id) {
    try {
      const { data, error } = await this.supabase
        .from(this.tables.STORIES)
        .select("*")
        .eq("id", id)
        .eq("status", this.status.APPROVED)
        .single();

      if (error) throw error;

      // Get similar stories using AI
      const allStoriesResult = await this.getStories();
      if (allStoriesResult.success) {
        const similarStories = await window.UmojaAI.findSimilarStories(
          data,
          allStoriesResult.stories
        );
        data.similar_stories = similarStories;
      }

      // Track analytics
      await this.trackStoryView(id);

      return { success: true, story: data };
    } catch (error) {
      console.error("Get story by ID error:", error);
      return { success: false, error: error.message };
    }
  }

  async searchStories(searchTerm) {
    try {
      const { data, error } = await this.supabase
        .from(this.tables.STORIES)
        .select("*")
        .eq("status", this.status.APPROVED)
        .or(
          `title.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%,author_name.ilike.%${searchTerm}%`
        )
        .order("created_at", { ascending: false });

      if (error) throw error;
      return { success: true, stories: data };
    } catch (error) {
      console.error("Search stories error:", error);
      return { success: false, error: error.message };
    }
  }

  // Draft Management
  async saveDraft(draftData) {
    try {
      const user = await this.getCurrentUser();
      if (!user) {
        // Save to localStorage if not authenticated
        localStorage.setItem("story_draft", JSON.stringify(draftData));
        return { success: true, location: "local" };
      }

      const draftRecord = {
        ...draftData,
        user_id: user.id,
        status: this.status.DRAFT,
        updated_at: new Date().toISOString(),
      };

      // Check if draft already exists
      const { data: existingDraft } = await this.supabase
        .from(this.tables.STORIES)
        .select("id")
        .eq("user_id", user.id)
        .eq("status", this.status.DRAFT)
        .single();

      let result;
      if (existingDraft) {
        // Update existing draft
        result = await this.supabase
          .from(this.tables.STORIES)
          .update(draftRecord)
          .eq("id", existingDraft.id)
          .select();
      } else {
        // Create new draft
        result = await this.supabase
          .from(this.tables.STORIES)
          .insert([draftRecord])
          .select();
      }

      if (result.error) throw result.error;
      return { success: true, draft: result.data[0], location: "database" };
    } catch (error) {
      console.error("Save draft error:", error);
      return { success: false, error: error.message };
    }
  }

  async getDraft() {
    try {
      const user = await this.getCurrentUser();
      if (!user) {
        // Try to get from localStorage
        const localDraft = localStorage.getItem("story_draft");
        return localDraft
          ? { success: true, draft: JSON.parse(localDraft), location: "local" }
          : { success: false };
      }

      const { data, error } = await this.supabase
        .from(this.tables.STORIES)
        .select("*")
        .eq("user_id", user.id)
        .eq("status", this.status.DRAFT)
        .single();

      if (error && error.code !== "PGRST116") throw error; // PGRST116 is "not found"
      return data
        ? { success: true, draft: data, location: "database" }
        : { success: false };
    } catch (error) {
      console.error("Get draft error:", error);
      return { success: false, error: error.message };
    }
  }

  // Analytics
  async trackStoryView(storyId) {
    try {
      const { error } = await this.supabase
        .from(this.tables.STORY_ANALYTICS)
        .insert([
          {
            story_id: storyId,
            event_type: "view",
            timestamp: new Date().toISOString(),
          },
        ]);

      if (error) console.error("Analytics tracking error:", error);
    } catch (error) {
      console.error("Track story view error:", error);
    }
  }

  // File Upload (for images)
  async uploadFile(file, bucket = "story-images") {
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2)}.${fileExt}`;

      const { data, error } = await this.supabase.storage
        .from(bucket)
        .upload(fileName, file);

      if (error) throw error;

      // Get public URL
      const { data: publicURL } = this.supabase.storage
        .from(bucket)
        .getPublicUrl(fileName);

      return {
        success: true,
        fileName: fileName,
        publicURL: publicURL.publicUrl,
      };
    } catch (error) {
      console.error("File upload error:", error);
      return { success: false, error: error.message };
    }
  }

  // Real-time subscriptions
  subscribeToStories(callback) {
    return this.supabase
      .channel("stories-channel")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: this.tables.STORIES,
          filter: `status=eq.${this.status.APPROVED}`,
        },
        callback
      )
      .subscribe();
  }
}

// Export database manager
window.UmojaDB = new DatabaseManager();
