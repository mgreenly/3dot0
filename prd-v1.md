# Product Requirements Document - Software 3.0 Agent Demo

## Overview
A web-based presentation app that simulates an interaction with a Software 3.0 agent named Claude, displaying content progressively like a slideshow.

## Technical Requirements
- **Files**: Exactly 3 files - `index.html`, `site.js`, `site.css`
- **Dependencies**: Bootstrap via CDN only
- **Browser Support**: Modern browsers with ES6 support

## Visual Design
- **Theme**: Match Anthropic.com color scheme
- **Layout**: Vertical scrolling with content appending below
- **Components**:
  - Header greeting: "Happy Wednesday, Mike!"
  - Text input box
  - Microphone toggle icon

## Core Features

### Navigation
- **Triggers**: Spacebar press or microphone icon click
- **Behavior**: Append new slide content below existing content
- **History**: All previous slides remain visible (scroll up for history)

### Microphone Icon
- **States**: On/Off visual toggle
- **Function**: Advances slides when clicked

### Slide System
- **Structure**: Each slide is a self-contained HTML content block
- **Content**: HTML-formatted text with optional images
- **Architecture**: Clean separation between slides for easy editing

## User Flow
1. User sees greeting and text input box
2. User clicks microphone or presses spacebar
3. New slide content appears below
4. Previous content scrolls up but remains accessible
5. Process repeats until presentation ends

## Implementation Notes
- Maintain clear code separation for individual slide content
- Use semantic HTML for accessibility
- Implement smooth scrolling for better UX
- Ensure responsive design for various screen sizes