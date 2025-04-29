import { NativeModules } from "react-native";

const { JournalSuggestionsModule } = NativeModules;

// Updated type definition with only the properties we're using
type JournalSuggestion = {
  text: string;
  date?: number; // Optional now since it might not come from the picker
  category?: string; // Optional since it might not come from the picker
  location?: string; // Optional since it might not come from the picker
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