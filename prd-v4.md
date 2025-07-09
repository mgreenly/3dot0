# Product Requirements Document v4 - Software 3.0 Agent Demo

## Overview
A web-based presentation app that simulates an interaction with a Software 3.0 agent named Claude, displaying content progressively like a slideshow with realistic typing animations.

## Changes from v3
- **Slide 3 Addition**: Added third slide demonstrating code generation capability
  - Creates a Golang application with specific requirements
  - Shows Software 3.0 agent's ability to handle complex development tasks
- **Total Slides**: Restored to 3 slides (was reduced to 2 in v3)

## Technical Requirements
- **Files**: Exactly 3 files - `index.html`, `site.js`, `site.css`
- **Dependencies**: Bootstrap via CDN only
- **Browser Support**: Modern browsers with ES6 support

## Visual Design
- **Theme**: Match Anthropic.com color scheme
- **Layout**: Vertical scrolling with content appending below
- **Components**:
  - Header greeting: "Happy Wednesday, Mike!"
  - Text input box labeled "prompt"
  - Microphone toggle icon

## Core Features

### Navigation
- **Triggers**: Spacebar press or microphone icon click
- **Behavior**: Append new slide content below existing content
- **History**: All previous slides remain visible (scroll up for history)

### Input Field
- **Auto-resize**: Input field expands to multiple rows when text exceeds single line
- **Max Height**: Reasonable maximum height with scroll for very long inputs
- **Smooth Transition**: Animate height changes for smooth UX

### Microphone Icon
- **States**: On/Off visual toggle
- **Function**: Initiates slide sequence when clicked

### Text Animation System
- **Input Dictation**: Words appear one at a time in the prompt field
- **Response Generation**: Words appear one at a time at configurable rate
- **Default Rate**: 600 words per minute (10 words per second)
- **Configuration**: Single variable to control word output rate

## Slide Output Pattern

Each slide follows this consistent pattern:
1. **User Interaction**: User clicks microphone or presses spacebar on active (non-faded) input
2. **Dictation**: User's question appears word by word in the active input field
3. **Fade Input**: Immediately fade and disable the input after dictation completes
4. **Processing**: Show spinner in response div
5. **Response**: Display Claude's answer word by word
6. **Transition**: Wait 0.5 seconds, render new input below (except after final slide)

Note: The input is faded immediately after dictation to prevent further interaction during response generation.

## Initial State
- Display greeting "Happy Wednesday, Mike!" in header
- Render initial empty input field below header in slides container
- Input field should match slide input styling
- SlideManager starts at index -1
- First microphone click or spacebar advances to index 0 (first slide)

## Slide Specifications

### Slide 1: Saturn Rockets
- **Dictation**: "Tell me about Saturn rockets."
- **Response**: Image of Saturn V rocket (left-aligned, 50% width) with descriptive text about the Saturn family of rockets

### Slide 2: Notification Control
- **Dictation**: "pause notifications for 1 hour"
- **Response**: 
  - Mute icon (inline with text)
  - Text: "All notifications paused."
  - Icon should appear immediately, followed by animated text

### Slide 3: Golang Application Creation
- **Dictation**: "create a new golang app in the projects folder called echo. It should have a landing page indicating its name and version and an endpoint at echo/ endpoint that replies to posts with the same content posted to it."
- **Response**: A detailed mock response with phased rendering:
  - Response renders in distinct phases, each starting with a progress message
  - After each progress message, a spinner shows for 2 seconds before continuing
  - Phases are separated by spinners, not included inline with text
  
  Phases:
  1. "Creating Go application structure..." → [spinner 2s] → file structure
  2. "Writing: main.go" → [spinner 2s] → GO code block
  3. "Initializing Go module..." → [spinner 2s] → BASH command
  4. "✅ Application created successfully! Run with:" → [spinner 2s] → final command
  
  Example rendering (all content remains visible):
  ```
  Creating Go application structure...
  [spinner 2s]
  
  📁 projects/echo/
  ├── main.go
  ├── go.mod
  └── README.md
  
  Writing: main.go
  [spinner 2s]
  [GO code block]
  
  Initializing Go module...
  [spinner 2s]
  [BASH: go mod init projects/echo]
  
  ✅ Application created successfully! Run with:
  [spinner 2s]
  [BASH: $ cd projects/echo && go run main.go]
  ```

**Note**: After slide 3 completes, a final non-functional input is rendered to trigger proper scrolling and provide visual closure. This input has a disabled microphone button and cannot accept any interaction.

## Response Content Features
- **Mixed Media**: Responses can contain both text and images/icons
- **Phased Rendering**:
  - Responses can be split into distinct phases
  - Each phase renders completely before the next begins
  - All phases remain visible after rendering (cumulative display)
  - Phases are separated by spinner pauses
  - Useful for showing multi-step processes
- **Progress Indicators**:
  - Spinners shown between phases (not inline with text)
  - Fixed 2 second duration for phase transitions
  - No "Thinking..." text, just the spinner
  - Used to simulate processing time between steps
- **Line Breaks**: 
  - HTML `<br>` tags are preserved and rendered as actual line breaks
  - Line breaks render immediately without animation delay
  - Essential for formatted output like file structures
  - Required after code blocks to prevent text from running together
  - Animation uses innerHTML to properly interpret HTML tags
  - Spaces between words are preserved during token-based animation
- **Code Blocks**:
  - Support for syntax-highlighted code blocks
  - Code should appear in monospace font with appropriate background
  - Code blocks appear immediately, not animated
  - Proper formatting with language indicators
  - Dark theme for code blocks matching Claude's style
  - Syntax highlighting for Go code only using VS Code dark theme colors:
    - Keywords: Purple (#C586C0)
    - Strings: Orange (#CE9178)
    - Functions: Yellow (#DCDCAA)
    - Types: Teal (#4EC9B0)
    - Comments: Green (#6A9955)
    - Numbers: Light green (#B5CEA8)
  - Bash code blocks display without syntax highlighting
- **Icon Handling**:
  - Icons can be displayed inline with text
  - Icons appear immediately when response starts
  - Text after icons animates normally
- **Image Handling**: 
  - Images appear immediately when response starts
  - Text animates word-by-word around images
  - Response divs expand properly to contain floated images
  - Images can be styled with inline CSS (width, float, margins)
- **Layout**: Response containers use clearfix to prevent layout issues

## Icon Implementation
- **Mute Icon**: Use SVG or Unicode character (🔇) for mute symbol
- **Styling**: Icons should match the response text color and size appropriately
- **Positioning**: Inline with text, proper vertical alignment

## Configuration Requirements
```javascript
// Central configuration object
const CONFIG = {
  WORDS_PER_MINUTE: 600,   // Response output speed (10 words per second)
  DICTATION_WPM: 240,      // Input dictation speed (2x faster)
  PROCESSING_DELAY: 2000,  // Spinner duration in ms
  TRANSITION_DELAY: 500    // Delay before showing new input (0.5s)
};
```

## User Flow
1. Page loads with greeting and initial empty input field
2. User clicks microphone or presses spacebar
3. First prompt text dictates into field word by word
4. Spinner shows for 2 seconds in response div
5. Response generates word by word below
6. After 0.5 seconds, new input appears
7. User clicks microphone or presses spacebar again
8. Second prompt text dictates into field word by word
9. Spinner shows for 2 seconds in response div
10. Response generates word by word below
11. After 0.5 seconds, new input appears
12. User clicks microphone or presses spacebar again
13. Third prompt text dictates into field word by word
14. Spinner shows for 2 seconds in response div
15. Response generates word by word below
16. Presentation ends with final non-functional input

## Scrolling Behavior
- **Auto-scroll**: As response text grows, viewport automatically scrolls to keep new content visible
- **Continuous tracking**: Scroll position updates with each new word, not just at slide completion
- **Bottom spacing**: Maintain reasonable empty space below content (minimum 100px)
- **Smooth scrolling**: Use smooth scroll behavior for natural feel
- **User override**: If user manually scrolls up, pause auto-scroll until response completes

## Implementation Notes
- Word timing calculation: `60000 / WORDS_PER_MINUTE` ms per word
- Use CSS transitions for smooth animations
- Maintain state for microphone on/off
- Ensure animations complete before allowing next action
- All timing values should reference CONFIG object
- Auto-scroll must track typing cursor position
- Icons in responses should be handled similarly to images (immediate display)
- When splitting text by tokens for HTML preservation, spaces must be explicitly preserved