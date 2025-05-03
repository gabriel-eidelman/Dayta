//
//  JournalingSuggestionsModule.swift
//  Dayta
//
//  Created by Gabriel Eidelman on 3/30/25.
//

import Foundation
import React
import SwiftUI
import UIKit
import JournalingSuggestions

@objc(JournalSuggestionsModule)
class JournalSuggestionsModule: NSObject, RCTBridgeModule {
    static func moduleName() -> String {
        return "JournalSuggestionsModule"
    }
    
    static func requiresMainQueueSetup() -> Bool {
        return true
    }
    // Add to JournalSuggestionsModule.swift
    private var lastSelectedSuggestion: [String: Any]? = nil
  
    @objc
    func presentSuggestionsPicker(_ callback: @escaping RCTResponseSenderBlock) {
        print("running journalsuggestions")

        DispatchQueue.main.async {
            // Get root view controller
            guard let rootViewController = UIApplication.shared.windows.first?.rootViewController else {
                callback(["Could not find root view controller", NSNull()])
                return
            }
            
            // Create the view with a callback to send data back to React Native
            let pickerView = JournalPickerView(onSuggestionSelected: { suggestion in
                // Convert suggestion to dictionary
                let suggestionDict: [String: Any] = [
                    "text": suggestion.title,
                ]
                
                self.lastSelectedSuggestion = suggestionDict

                // Send data back to React Native
                callback([NSNull(), suggestionDict])
            })
            
            // Wrap in UIHostingController
            let hostingController = UIHostingController(rootView: pickerView)
            hostingController.modalPresentationStyle = .pageSheet
            
            // Present the controller
            rootViewController.present(hostingController, animated: true)
        }
    }
    
    @objc
    func fetchSuggestions(_ callback: @escaping RCTResponseSenderBlock) {
      if let lastSuggestion = lastSelectedSuggestion {
          callback([NSNull(), [lastSuggestion]])
      } else {
        let suggestion: [String: Any] = ["text": "Cooked dinner"]
    
        callback([NSNull(), suggestion])
      }
    }
}
