import { NativeModules } from "react-native";

const { JournalSuggestionsModule } = NativeModules;

type JournalSuggestion = {
  text: string;
  date: number; // Timestamp
  category: string;
  location?: string;
};

const fetchSuggestions = async (): Promise<JournalSuggestion[]> => {
  return new Promise((resolve, reject) => {
    JournalSuggestionsModule.fetchSuggestions((error: string | null, suggestions: JournalSuggestion[]) => {
      if (error) {
        reject(new Error(error));
      } else {
        console.log(suggestions);
        resolve(suggestions);
      }
    });
  });
};

export { fetchSuggestions, JournalSuggestion };
