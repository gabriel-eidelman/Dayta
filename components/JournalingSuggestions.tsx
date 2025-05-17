import { NativeModules } from "react-native";

const { JournalSuggestionsModule } = NativeModules;

// Updated type definition with only the properties we're using
type JournalSuggestion = {
  text: string;
  date?: number;
  category?: string;
  location?: string;
  timeblock?: {
    startTime: number;    // Unix timestamp (ms)
    endTime: number;      // Unix timestamp (ms)
    duration: number; // milliseconds
  } | null;
};

// The existing function to fetch dummy suggestions
const fetchSuggestion = async (): Promise<JournalSuggestion> => {
  return new Promise((resolve, reject) => {
    JournalSuggestionsModule.fetchSuggestions((error: string | null, suggestion: JournalSuggestion) => {
      if (error) {
        reject(new Error(error));
      } else {
        console.log(suggestion);
        resolve(suggestion);
      }
    });
  });
};

// New function to show the picker
const showSuggestionsPicker = async (): Promise<JournalSuggestion> => {
  return new Promise((resolve, reject) => {
    JournalSuggestionsModule.presentSuggestionsPicker((error: string | null, suggestion: JournalSuggestion) => {
      if (error) {
        console.log("error");
        reject(new Error(error));
      } else {
        console.log('Selected suggestion:', suggestion);
        resolve(suggestion);
      }
    });
  });
};

export { fetchSuggestion, showSuggestionsPicker, JournalSuggestion };