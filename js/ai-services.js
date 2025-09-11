// AI Services for Umoja Project
// This module handles AI-powered features

class AIServices {
  constructor() {
    // You can use various AI APIs here (OpenAI, Hugging Face, etc.)
    this.OPENAI_API_KEY = "YOUR_OPENAI_API_KEY"; // Replace with your API key
    this.HF_API_KEY = "YOUR_HUGGING_FACE_API_KEY"; // Alternative: Hugging Face
  }

  // Content moderation using AI
  async moderateContent(text) {
    try {
      const response = await fetch("https://api.openai.com/v1/moderations", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: text,
        }),
      });

      const data = await response.json();
      return {
        flagged: data.results[0].flagged,
        categories: data.results[0].categories,
        category_scores: data.results[0].category_scores,
      };
    } catch (error) {
      console.error("Content moderation error:", error);
      return { flagged: false, error: true };
    }
  }

  // Automatic story categorization
  async categorizeStory(title, content) {
    const prompt = `
        Analyze this story and categorize it into one of these categories:
        - mental-health: Stories about mental health struggles, recovery, awareness
        - gender-issues: Stories about gender equality, discrimination, identity
        - social-justice: Stories about inequality, activism, community action
        - community: Stories about community building, local initiatives, helping others

        Title: ${title}
        Content: ${content.substring(0, 500)}...

        Return only the category name (mental-health, gender-issues, social-justice, or community).
        `;

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 10,
            temperature: 0.1,
          }),
        }
      );

      const data = await response.json();
      return data.choices[0].message.content.trim();
    } catch (error) {
      console.error("Story categorization error:", error);
      return "community"; // Default category
    }
  }

  // Sentiment analysis
  async analyzeSentiment(text) {
    try {
      // Using Hugging Face API for sentiment analysis (free tier available)
      const response = await fetch(
        "https://api-inference.huggingface.co/models/cardiffnlp/twitter-roberta-base-sentiment-latest",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.HF_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inputs: text.substring(0, 500), // Limit text length
          }),
        }
      );

      const data = await response.json();
      return data[0]; // Returns array of sentiment scores
    } catch (error) {
      console.error("Sentiment analysis error:", error);
      return null;
    }
  }

  // Writing assistance - suggest improvements
  async getWritingSuggestions(text) {
    const prompt = `
        Review this personal story for a social impact blog and provide helpful writing suggestions.
        Focus on:
        1. Clarity and readability
        2. Emotional impact
        3. Structure and flow
        4. Sensitivity (this is a personal story that may contain difficult topics)

        Story: ${text}

        Provide 2-3 brief, constructive suggestions in a supportive tone.
        `;

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 200,
            temperature: 0.7,
          }),
        }
      );

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error("Writing suggestions error:", error);
      return null;
    }
  }

  // Find similar stories for recommendations
  async findSimilarStories(story, allStories) {
    // Simple implementation using keyword matching
    // In production, you'd use more sophisticated similarity algorithms
    const storyWords = this.extractKeywords(story.title + " " + story.content);
    const similarities = [];

    for (const otherStory of allStories) {
      if (otherStory.id === story.id) continue;

      const otherWords = this.extractKeywords(
        otherStory.title + " " + otherStory.content
      );
      const similarity = this.calculateSimilarity(storyWords, otherWords);

      if (similarity > 0.1) {
        // Threshold for similarity
        similarities.push({
          story: otherStory,
          similarity: similarity,
        });
      }
    }

    return similarities
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 3) // Return top 3 similar stories
      .map((item) => item.story);
  }

  // Helper method to extract keywords
  extractKeywords(text) {
    const stopWords = [
      "the",
      "a",
      "an",
      "and",
      "or",
      "but",
      "in",
      "on",
      "at",
      "to",
      "for",
      "of",
      "with",
      "by",
      "is",
      "was",
      "are",
      "were",
      "be",
      "been",
      "have",
      "has",
      "had",
      "do",
      "does",
      "did",
      "will",
      "would",
      "could",
      "should",
    ];

    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .split(" ")
      .filter((word) => word.length > 2 && !stopWords.includes(word));
  }

  // Helper method to calculate similarity between keyword arrays
  calculateSimilarity(words1, words2) {
    const set1 = new Set(words1);
    const set2 = new Set(words2);
    const intersection = new Set([...set1].filter((x) => set2.has(x)));
    const union = new Set([...set1, ...set2]);

    return intersection.size / union.size; // Jaccard similarity
  }

  // Generate story summary
  async generateSummary(content) {
    const prompt = `
        Create a brief, compelling summary (1-2 sentences) for this personal story.
        Make it engaging but respectful of the personal nature of the content.

        Story: ${content.substring(0, 800)}...

        Summary:
        `;

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 60,
            temperature: 0.7,
          }),
        }
      );

      const data = await response.json();
      return data.choices[0].message.content.trim();
    } catch (error) {
      console.error("Summary generation error:", error);
      return null;
    }
  }
}

// Export AI services
window.UmojaAI = new AIServices();
