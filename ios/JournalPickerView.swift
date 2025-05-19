//
//  JournalPickerView.swift
//  Dayta
//
//  Created by Gabriel Eidelman on 3/31/25.
//

import Foundation
import SwiftUI
import JournalingSuggestions

struct JournalPickerView: View {
  @State var suggestionTitle: String? = nil
  
  var onSuggestionSelected: (([String: Any]) -> Void)?  // Send dictionary to JS
  @Environment(\.presentationMode) var presentationMode
  
  var body: some View {
    VStack {
      JournalingSuggestionsPicker {
        Text("Select Journaling Suggestion")
      }
      onCompletion: { suggestion in
        suggestionTitle = suggestion.title
        
        // Access DateInterval
        let interval = suggestion.date
        var timeblock: [String: Any]? = nil
        
        if let interval = interval {
          let start = interval.start
          let end = interval.end
          let duration = end.timeIntervalSince(start)

          
          timeblock = [ 
            "startTime": start.timeIntervalSince1970,
            "endTime": end.timeIntervalSince1970,
            "duration": duration
          ]
        }
        
        // Build dictionary for React Native
        let suggestionDict: [String: Any] = [
          "text": suggestion.title,
//          "category": suggestion.category?.rawValue ?? NSNull(),
//          "location": suggestion.metadata.location?.description ?? NSNull(),
//          "date": interval?.start.timeIntervalSince1970 ?? NSNull(),
          "timeblock": timeblock ?? NSNull()
        ]
        
        if let onSuggestionSelected = onSuggestionSelected {
          onSuggestionSelected(suggestionDict)
        }
        presentationMode.wrappedValue.dismiss()
      }
    }
  }
}
