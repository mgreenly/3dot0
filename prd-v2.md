# Product Requirements Document v2 - Software 3.0 Agent Demo

## Overview
A web-based presentation app that simulates an interaction with a Software 3.0 agent named Claude, displaying content progressively like a slideshow with realistic typing and response animations.

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
6. **Transition**: Wait 1 second, render new input below

Note: The input is faded immediately after dictation to prevent further interaction during response generation.

## Initial State
- Display greeting "Happy Wednesday, Mike!" in header
- Render initial empty input field below header in slides container
- Input field should match slide input styling
- SlideManager starts at index -1
- First microphone click or spacebar advances to index 0 (first slide)

## First Slide Sequence

### Step 1: Initial Input
- Initial input field already visible from page load
- Empty text input with placeholder "How can I help you today?"
- Microphone icon in default (off) state

### Step 2: Dictation (Triggered by mic click or spacebar)
- Microphone icon switches to "on" state
- Text "Tell me about Saturn rockets." appears word by word in the active (non-faded) input field
- Dictation timing: Natural pace (approximately 240 words per minute)
- Important: Dictation targets the last non-faded input, not just the last input

### Step 3: Fade Current Input
- Immediately after dictation completes, fade the input
- Add disabled state to prevent further interaction
- Microphone icon becomes inactive

### Step 4: Processing
- Create response div with Claude header
- Display loading spinner inside the response div for 2 seconds
- Spinner indicates AI is "thinking"

### Step 5: Response
- Spinner disappears when response begins
- Claude's response appears word by word in the same div
- Output rate: 600 words per minute (configurable)
- Response content about Saturn rockets

### Step 6: Transition to Next Input
- Wait 1 second after response completes
- Render new empty input field below the response
- New input ready for next slide when user clicks microphone

## Slide System
- **Structure**: Each slide is a self-contained sequence of actions
- **Content**: HTML-formatted text with animations
- **Architecture**: Clean separation between slides for easy editing
- **Timing**: All animations configurable from central location

## Response Content Features
- **Mixed Media**: Responses can contain both text and images
- **Image Handling**: 
  - Images appear immediately when response starts
  - Text animates word-by-word around images
  - Response divs expand properly to contain floated images
  - Images can be styled with inline CSS (width, float, margins)
- **Layout**: Response containers use clearfix to prevent layout issues

## Configuration Requirements
```javascript
// Central configuration object
const CONFIG = {
  WORDS_PER_MINUTE: 600,   // Response output speed (10 words per second)
  DICTATION_WPM: 240,      // Input dictation speed (2x faster)
  PROCESSING_DELAY: 2000,  // Spinner duration in ms
  TRANSITION_DELAY: 1000   // Delay before showing new input
};
```

## User Flow
1. Page loads with greeting and initial empty input field
2. User clicks microphone or presses spacebar
3. Prompt text dictates into field word by word
4. Spinner shows for 2 seconds in response div
5. Response generates word by word below
6. After 1 second, input fades and new input appears
7. Ready for next interaction

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