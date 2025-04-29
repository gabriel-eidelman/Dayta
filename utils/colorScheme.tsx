interface ColorScheme {
    background: string,
    cardBorder: string,
    strongDarkGray: string,
    mutedDarkGray: string,
    plusButton: string,
    white: string,
}

/*
Component	New Color
Screen Background	#F5F5F4 (soft off-white)
Journal Cards Background	#FFFFFF (pure white) or slight variation
Card Border / Outline	#E0E0DD (soft divider border around cards)
Title ("Journal")	#222222 (strong dark gray)
Date Text ("Friday April 19")	#666666 (muted dark gray)
Time on Card	#666666
Activity Title on Card	#222222
Floating "+" Button	Background #D8CAB8, Icon inside #222222
Bottom Navigation (if used)	background #FFFFFF, icons in #666666
*/
const lightScheme: ColorScheme = {
    background: "#F5F5F4",
    cardBorder: "#E0E0DD",
    strongDarkGray: "#222222",
    mutedDarkGray: "#666666",
    plusButton: "#D8CAB8",
    white: "#FFFFFF",
    // primary: "#1e90ff",
    // secondary: "#ff6347",
    // accent: "#32cd32",
};

const darkScheme: ColorScheme = {
    background: "#1C1C1B",    // very dark warm gray, soft on the eyes
    cardBorder: "#333331",    // slightly lighter for subtle card separation
    strongDarkGray: "#F5F5F4", // inverted light text
    mutedDarkGray: "#AAAAAA",  // muted, but clear enough for subtitles
    plusButton: "#B5A58D",     // muted tan, echoes the plus button color
    white: "#FFFFFF",          // keep true white for occasional highlights
    // primary: "#6495ED",     // optional: soft cornflower blue for links/buttons
    // secondary: "#FF8264",   // optional: softened coral
    // accent: "#7ED957",      // optional: fresh green accent
};

const getColorScheme = (isDarkMode: boolean): ColorScheme => {
    return isDarkMode ? darkScheme : lightScheme;
}
const scheme = getColorScheme(false); // Default to light mode

export default scheme;