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
  
  var onSuggestionSelected: ((JournalingSuggestion) -> Void)?
  @Environment(\.presentationMode) var presentationMode
  
  var body: some View {
    VStack {
      
      JournalingSuggestionsPicker {
        Text("Select Journaling Suggestion")
      }
      onCompletion: { suggestion in
        suggestionTitle = suggestion.title
        
        if let onSuggestionSelected = onSuggestionSelected {
          onSuggestionSelected(suggestion)
          presentationMode.wrappedValue.dismiss()
        }
      }
      
//      Text(suggestionTitle ?? "")
      
//      Button(action: close) {
//        Text("Add")
//      }
    }
  }
  
//  func journalingBridgePage() -> some View {
//
//  }
}

//#Preview {
//  JournalPickerView(onSuggestionSelected: {})
//}


