export const getPromptSuggestions = (persona: string) => {
  const suggestions: Record<string, Record<string, string>[]> = {
    "personal-assistant": [
      { emoji: "📅", text: "Help me plan my week" },
      { emoji: "📧", text: "Draft an email for me" },
      { emoji: "📝", text: "I need an agenda for my meeting" },
    ],
    "wellness-assistant": [
      { emoji: "😌", text: "I'm feeling stressed..." },
      { emoji: "💤", text: "How can I sleep better?" },
      { emoji: "🧘", text: "Guide me through a meditation session" },
    ],
    "relationship-advisor": [
      { emoji: "💬", text: "Help me communicate with my partner" },
      { emoji: "😰", text: "I feel insecure in my relationship" },
      { emoji: "💕", text: "How can I grow closer to my partner?" },
    ],
    companion: [
      { emoji: "👋", text: "Hey, how was your day?" },
      { emoji: "🃏", text: "Want to play a game?" },
      { emoji: "🎬", text: "What movie would you recommend?" },
    ],
  };

  return suggestions[persona] || suggestions.companion;
};

export default getPromptSuggestions;
