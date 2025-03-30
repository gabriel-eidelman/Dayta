//
//  JournalingSuggestionsModule.swift
//  Dayta
//
//  Created by Gabriel Eidelman on 3/30/25.
//

import Foundation
import React
import JournalingSuggestions

@objc(JournalSuggestionsModule)
class JournalSuggestionsModule: NSObject, RCTBridgeModule {
    
    static func moduleName() -> String {
        return "JournalSuggestionsModule"
    }

    @objc
    func fetchSuggestions(_ callback: @escaping RCTResponseSenderBlock) {
        // Fetch journaling suggestions from Apple's API
      let suggestions: [[String: Any]] = [
          ["text": "Worked out", "date": Date().timeIntervalSince1970, "category": "Exercise", "location": "Gym"],
          ["text": "Read a book", "date": Date().addingTimeInterval(-86400).timeIntervalSince1970, "category": "Reading", "location": "Home"],
          ["text": "Cooked dinner", "date": Date().addingTimeInterval(-172800).timeIntervalSince1970, "category": "Cooking", "location": "Kitchen"]
      ]
      callback([NSNull(), suggestions])
    }
}


