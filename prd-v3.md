# Product Requirements Document v3 - Software 3.0 Agent Demo

## Overview
A web-based presentation app that simulates an interaction with a Software 3.0 agent named Claude, displaying content progressively like a slideshow with realistic typing and response animations.

## Changes from v2
- **Slide 2 Content**: Updated to demonstrate notification control functionality
  - Prompt: "pause notifications for 1 hour"
  - Response: Mute icon followed by "All notifications paused."
- **Total Slides**: Reduced to 2 slides only (removed slide 3)
  - After slide 2, no further interaction occurs

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

**Note**: After slide 2 completes, no new input is rendered. The presentation ends with these two slides.

## Response Content Features
- **Mixed Media**: Responses can contain both text and images/icons
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
  TRANSITION_DELAY: 1000   // Delay before showing new input
};
```

## User Flow
1. Page loads with greeting and initial empty input field
2. User clicks microphone or presses spacebar
3. First prompt text dictates into field word by word
4. Spinner shows for 2 seconds in response div
5. Response generates word by word below
6. After 1 second, input fades and new input appears
7. User clicks microphone or presses spacebar again
8. Second prompt text dictates into field word by word
9. Spinner shows for 2 seconds in response div
10. Response generates word by word below
11. Presentation ends - no new input is rendered

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