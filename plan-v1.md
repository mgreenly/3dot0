# Implementation Plan - Software 3.0 Agent Demo

## Architecture Overview
Create a slide-based presentation system with clean separation between slides, making it easy to add, edit, or reorder content without touching the core logic.

## Step-by-Step Implementation Plan

### Step 1: Project Structure & HTML Foundation
1. Create `index.html` with:
   - Bootstrap CDN link
   - Basic semantic structure
   - Container for slide content
   - Fixed header with greeting and input
   - Microphone icon button

### Step 2: CSS Styling (`site.css`)
1. Define Anthropic color variables:
   - Primary: #D4A574 (beige/tan)
   - Background: #FAF9F7 (light cream)
   - Text: #1F1F1F (dark gray)
   - Accent: #8B7355 (brown)

2. Style components:
   - Fixed header styling
   - Microphone icon states (on/off)
   - Slide container with smooth scrolling
   - Animations for slide transitions

### Step 3: JavaScript Architecture (`site.js`)

#### 3.1 Slide Data Structure
```javascript
const SLIDES = [
  {
    id: 'slide-1',
    content: () => `<div>HTML content for slide 1</div>`,
    onEnter: () => {} // Optional callback
  },
  {
    id: 'slide-2',
    content: () => `<div>HTML content for slide 2</div>`,
    onEnter: () => {}
  }
  // Easy to add more slides here
];
```

#### 3.2 Core Components
1. **SlideManager Class**
   - `currentSlideIndex`: Track position
   - `renderSlide(index)`: Render specific slide
   - `advance()`: Move to next slide
   - `isComplete()`: Check if at end

2. **UI Controller**
   - `initializeEventListeners()`: Setup spacebar & click
   - `toggleMicrophone()`: Handle mic icon states
   - `appendSlideToDOM(html)`: Add slide content
   - `scrollToLatest()`: Smooth scroll to new content

#### 3.3 Event Handling
1. Spacebar keypress listener
2. Microphone click listener
3. Both trigger `slideManager.advance()`

### Step 4: Slide Content Organization
1. Each slide in the SLIDES array is self-contained
2. Use template literals for complex HTML
3. Support for:
   - Text content
   - Images
   - Code blocks
   - Interactive elements

### Step 5: Implementation Details

#### 5.1 HTML Structure
```html
<div class="app-container">
  <header class="fixed-header">
    <h1>Happy Wednesday, Mike!</h1>
    <div class="input-group">
      <input type="text" class="chat-input" />
      <button class="mic-button">
        <i class="mic-icon"></i>
      </button>
    </div>
  </header>
  <main class="slides-container">
    <!-- Slides append here -->
  </main>
</div>
```

#### 5.2 CSS Classes
- `.slide-entry`: Individual slide wrapper
- `.slide-content`: Slide HTML container
- `.mic-active`: Microphone on state
- `.fade-in`: Entry animation

#### 5.3 JavaScript Functions
```javascript
// Main entry point
init() {
  setupEventListeners();
  renderInitialState();
}

// Clean slide rendering
renderSlide(slideData) {
  const html = slideData.content();
  appendSlideToDOM(html);
  if (slideData.onEnter) slideData.onEnter();
}
```

### Step 6: Testing & Refinement
1. Test keyboard navigation
2. Verify microphone toggle visual feedback
3. Check smooth scrolling behavior
4. Ensure responsive design
5. Validate slide separation

### Step 7: Example Slides
Create 5-6 example slides demonstrating:
1. Welcome message
2. Claude introduction
3. Capabilities overview
4. Interactive demo
5. Code example
6. Conclusion

## Key Benefits of This Architecture
- **Maintainability**: Each slide is independent
- **Extensibility**: Easy to add new slides
- **Readability**: Clear separation of concerns
- **Flexibility**: Slides can contain any HTML
- **Simplicity**: Minimal dependencies, clean code