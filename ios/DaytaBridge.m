//
//  DaytaBridge.m
//  Dayta
//
//  Created by Gabriel Eidelman on 3/30/25.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(JournalSuggestionsModule, NSObject)
RCT_EXTERN_METHOD(presentSuggestionsPicker:(RCTResponseSenderBlock)callback)

RCT_EXTERN_METHOD(fetchSuggestions:(RCTResponseSenderBlock)callback)
@end

