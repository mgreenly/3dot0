# Implementation Plan v2 - Software 3.0 Agent Demo

## Architecture Overview
Create a slide-based presentation system that simulates a Software 3.0 agent interaction with realistic typing animations, clean slide separation, and configurable timing controls.

## Core Configuration
```javascript
const CONFIG = {
  WORDS_PER_MINUTE: 600,      // Response output speed (10x faster)
  DICTATION_WPM: 240,         // Input dictation speed (2x faster)
  PROCESSING_DELAY: 2000,     // Spinner duration in ms
  SCROLL_DELAY: 300,          // Delay before auto-scroll
  CHAR_VARIANCE: 50,          // Random variance in typing speed (ms)
  TRANSITION_DELAY: 1000      // Delay before showing new input
};
```

## Step-by-Step Implementation Plan

### Step 1: HTML Foundation (`index.html`)
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Software 3.0 Demo</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="site.css">
</head>
<body>
  <div class="app-container">
    <header class="fixed-header">
      <div class="container">
        <h1 class="greeting">
          <span class="star-icon"></span>
          Happy Wednesday, Mike
        </h1>
      </div>
      <div class="model-selector">
        <span>Claude Sonnet 4</span>
        <span>▼</span>
      </div>
    </header>
    <main class="slides-container" id="slides-container">
      <!-- Initial input will be rendered here on page load -->
    </main>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
  <script src="site.js"></script>
</body>
</html>
```

### Step 2: CSS Styling (`site.css`)

#### 2.1 Anthropic Color Scheme & Variables
```css
:root {
  --anthropic-cream: #FAF9F7;
  --anthropic-tan: #D4A574;
  --anthropic-brown: #8B7355;
  --anthropic-dark: #1F1F1F;
  --anthropic-border: #E5E5E5;
  --header-height: 180px;
}
```

#### 2.2 Core Layout Styles
```css
body {
  background-color: var(--anthropic-cream);
  color: var(--anthropic-dark);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.app-container {
  min-height: 100vh;
  padding-top: var(--header-height);
}

.fixed-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: var(--anthropic-cream);
  border-bottom: 1px solid var(--anthropic-border);
  z-index: 1000;
  padding: 2rem 0;
}

.greeting {
  color: var(--anthropic-dark);
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.chat-input {
  border-color: var(--anthropic-border);
  background: white;
}

.mic-button {
  background: white;
  border: 1px solid var(--anthropic-border);
  transition: all 0.2s ease;
}

.mic-button.active {
  background: var(--anthropic-tan);
  color: white;
}

.slides-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  padding-bottom: 100px; /* Ensure space below content */
  min-height: calc(100vh - var(--header-height));
}
```

#### 2.3 Animation Classes
```css
.typing-cursor::after {
  content: '|';
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.fade-in {
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid var(--anthropic-border);
  border-top-color: var(--anthropic-tan);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.slide-input {
  margin-bottom: 1.5rem;
}

.slide-input.faded .chat-input {
  opacity: 0.5;
  background-color: var(--anthropic-bg);
}

.slide-input.faded .mic-button {
  opacity: 0.3;
  cursor: not-allowed;
}

/* Response content with clearfix for images */
.response-content {
  overflow: hidden; /* Clearfix for floated images */
}

.response-content::after {
  content: "";
  display: table;
  clear: both;
}

.response-content img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
```

### Step 3: JavaScript Implementation (`site.js`)

#### 3.1 Core Architecture
```javascript
// Configuration
const CONFIG = {
  WORDS_PER_MINUTE: 600,      // 10x faster than original
  DICTATION_WPM: 240,         // 2x faster than original
  PROCESSING_DELAY: 2000,
  SCROLL_DELAY: 300,
  CHAR_VARIANCE: 50
};

// Calculate delays
const WORD_DELAY = 60000 / CONFIG.WORDS_PER_MINUTE;
const DICTATION_DELAY = 60000 / CONFIG.DICTATION_WPM;

// State management
const state = {
  currentSlideIndex: -1,  // Start at -1 so first click goes to slide 0
  isProcessing: false,
  microphoneActive: false
};
```

#### 3.2 Slide Definition Structure
```javascript
const SLIDES = [
  {
    id: 'slide-1',
    actions: [
      // Note: First slide doesn't need new-input since initial input is already rendered
      {
        type: 'dictate',
        target: '.slide-input:not(.faded) .chat-input',
        text: 'Tell me about Saturn rockets.',
        delay: DICTATION_DELAY
      },
      {
        type: 'fade-current-input'
      },
      {
        type: 'spinner',
        duration: CONFIG.PROCESSING_DELAY
      },
      {
        type: 'response',
        content: `The Saturn family of rockets were American super heavy-lift launch vehicles 
                  developed by NASA for the Apollo program. The Saturn V remains the tallest, 
                  heaviest, and most powerful rocket ever brought to operational status.`,
        delay: WORD_DELAY
      },
      {
        type: 'transition',
        delay: CONFIG.TRANSITION_DELAY
      }
    ]
  },
  // Additional slides...
];
```

#### 3.3 Core Functions

##### Word Animation Engine
```javascript
async function animateWords(element, content, delayPerWord) {
  // Check if content contains HTML images
  if (content.includes('<img')) {
    // Extract image tag and text
    const imgMatch = content.match(/<img[^>]*>/);
    const imgTag = imgMatch ? imgMatch[0] : '';
    const textContent = content.replace(imgTag, '').trim();
    
    // Insert image immediately
    element.innerHTML = imgTag;
    
    // Create span for text animation
    const textSpan = document.createElement('span');
    textSpan.classList.add('typing-cursor');
    element.appendChild(textSpan);
    
    // Animate text
    const words = textContent.split(' ');
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      textSpan.textContent += (i > 0 ? ' ' : '') + word;
      scrollToElement(element);
      const variance = Math.random() * CONFIG.CHAR_VARIANCE - CONFIG.CHAR_VARIANCE / 2;
      await sleep(delayPerWord + variance);
    }
    
    textSpan.classList.remove('typing-cursor');
  } else {
    // Original text-only animation
    const words = content.split(' ');
    element.textContent = '';
    element.classList.add('typing-cursor');
    
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      element.textContent += (i > 0 ? ' ' : '') + word;
      scrollToElement(element);
      const variance = Math.random() * CONFIG.CHAR_VARIANCE - CONFIG.CHAR_VARIANCE / 2;
      await sleep(delayPerWord + variance);
    }
    
    element.classList.remove('typing-cursor');
  }
}

function scrollToElement(element) {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  const bottomPadding = 100; // Minimum space below content
  
  // Only scroll if element is near bottom of viewport
  if (rect.bottom > windowHeight - bottomPadding) {
    window.scrollTo({
      top: window.pageYOffset + rect.bottom - windowHeight + bottomPadding,
      behavior: 'smooth'
    });
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
```

##### Slide Manager
```javascript
class SlideManager {
  constructor(slides) {
    this.slides = slides;
    this.currentIndex = -1;
  }
  
  async advance() {
    if (state.isProcessing) return;
    
    this.currentIndex++;
    if (this.currentIndex >= this.slides.length) {
      this.currentIndex = 0; // Loop back to start
    }
    
    state.isProcessing = true;
    await this.executeSlide(this.slides[this.currentIndex]);
    state.isProcessing = false;
  }
  
  async executeSlide(slide) {
    for (const action of slide.actions) {
      await this.executeAction(action);
    }
  }
  
  async executeAction(action) {
    switch (action.type) {
      case 'new-input':
        await this.createNewInput(action);
        break;
      case 'dictate':
        await this.handleDictation(action);
        break;
      case 'fade-current-input':
        await this.fadeCurrentInput();
        break;
      case 'spinner':
        await this.showSpinner(action.duration);
        break;
      case 'response':
        await this.showResponse(action);
        break;
      case 'transition':
        await this.handleTransition(action);
        break;
    }
  }
  
  async handleDictation(action) {
    const input = document.querySelector(action.target);
    if (!input) {
      console.error('No active input found for selector:', action.target);
      return;
    }
    toggleMicrophone(true);
    
    // Type the text into the input field
    const words = action.text.split(' ');
    input.value = '';
    
    for (let i = 0; i < words.length; i++) {
      input.value += (i > 0 ? ' ' : '') + words[i];
      const variance = Math.random() * CONFIG.CHAR_VARIANCE - CONFIG.CHAR_VARIANCE / 2;
      await sleep(action.delay + variance);
    }
  }
  
  async showSpinner(duration) {
    // Create response div that will contain both spinner and response
    const container = document.getElementById('slides-container');
    const responseDiv = document.createElement('div');
    responseDiv.className = 'slide-entry response fade-in';
    responseDiv.innerHTML = `
      <div class="response-header">Claude</div>
      <div class="response-content">
        <div class="spinner-container">
          <div class="spinner"></div>
          <span>Thinking...</span>
        </div>
      </div>
    `;
    container.appendChild(responseDiv);
    scrollToLatest();
    
    // Store reference for response phase
    this.currentResponseDiv = responseDiv;
    await sleep(duration);
  }
  
  async showResponse(action) {
    // Use the existing response div created during spinner phase
    const responseDiv = this.currentResponseDiv;
    const contentEl = responseDiv.querySelector('.response-content');
    
    // Clear spinner and start typing response
    contentEl.innerHTML = '';
    await animateWords(contentEl, action.content, action.delay);
    toggleMicrophone(false);
  }
  
  async createNewInput(action) {
    const container = document.getElementById('slides-container');
    const inputDiv = document.createElement('div');
    inputDiv.className = 'input-wrapper slide-input fade-in';
    inputDiv.innerHTML = `
      <input type="text" class="chat-input" placeholder="${action.placeholder}" readonly>
      <button class="mic-button" aria-label="Toggle microphone">
        <svg class="mic-icon" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
          <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
        </svg>
      </button>
    `;
    container.appendChild(inputDiv);
    scrollToLatest();
  }
  
  async fadeCurrentInput() {
    // Fade the current active input
    const activeInput = document.querySelector('.slide-input:not(.faded)');
    if (activeInput) {
      activeInput.classList.add('faded');
      activeInput.querySelector('.chat-input').disabled = true;
    }
  }
  
  async handleTransition(action) {
    await sleep(action.delay);
    
    // Create new input for next interaction
    await this.createNewInput({ placeholder: 'How can I help you today?' });
  }
}
```

##### UI Controllers
```javascript
function toggleMicrophone(active) {
  const micButton = document.getElementById('mic-button');
  state.microphoneActive = active;
  
  if (active) {
    micButton.classList.add('active');
  } else {
    micButton.classList.remove('active');
  }
}

function scrollToLatest() {
  setTimeout(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  }, CONFIG.SCROLL_DELAY);
}

function clearPromptInput() {
  document.getElementById('prompt-input').value = '';
}
```

##### Event Listeners
```javascript
function initializeApp() {
  const slideManager = new SlideManager(SLIDES);
  
  // Render initial input on page load
  renderInitialInput();
  
  // Microphone click - delegate to handle dynamic inputs
  document.addEventListener('click', (e) => {
    if (e.target.closest('.mic-button') && !state.isProcessing) {
      slideManager.advance();
    }
  });
  
  // Spacebar press
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && !state.isProcessing) {
      e.preventDefault();
      slideManager.advance();
    }
  });
}

function renderInitialInput() {
  const container = document.getElementById('slides-container');
  const inputDiv = document.createElement('div');
  inputDiv.className = 'input-wrapper slide-input fade-in';
  inputDiv.innerHTML = `
    <input type="text" class="chat-input" placeholder="How can I help you today?" readonly>
    <button class="mic-button" aria-label="Toggle microphone">
      <svg class="mic-icon" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
        <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
      </svg>
    </button>
  `;
  container.appendChild(inputDiv);
}

// Start the app
document.addEventListener('DOMContentLoaded', initializeApp);
```

### Step 4: Additional Slide Examples

```javascript
// Slide 2: Follow-up
{
  id: 'slide-2',
  actions: [
    // Note: Input already created by previous slide's transition
    {
      type: 'dictate',
      target: '.slide-input:not(.faded) .chat-input',
      text: 'What made it so powerful?',
      delay: DICTATION_DELAY
    },
    {
      type: 'fade-current-input'
    },
    {
      type: 'spinner',
      duration: CONFIG.PROCESSING_DELAY
    },
    {
      type: 'response',
      content: `The Saturn V's incredible power came from its three-stage design...`,
      delay: WORD_DELAY
    },
    {
      type: 'transition',
      delay: CONFIG.TRANSITION_DELAY
    }
  ]
}
```

### Step 5: Testing Checklist
1. ✓ Microphone icon toggles visually on click
2. ✓ Spacebar advances slides
3. ✓ Dictation appears word by word at correct speed
4. ✓ Spinner displays for 2 seconds
5. ✓ Response appears word by word at 600 WPM
6. ✓ Auto-scroll follows typing cursor continuously
7. ✓ Bottom padding maintains 100px minimum space
8. ✓ Smooth scrolling behavior during word animation
9. ✓ Multiple slides cycle correctly
10. ✓ No actions trigger while processing
11. ✓ Responsive on mobile devices
12. ✓ Clean separation between slides in code

### Step 6: File Organization Benefits
- **HTML**: Minimal, semantic structure
- **CSS**: Clear variable usage, modular styles
- **JS**: 
  - CONFIG object for easy timing adjustments
  - SLIDES array for simple content management
  - Separated concerns (animation, UI, state)
  - Each slide completely self-contained

### Step 7: Future Enhancement Points
- Add more slide types (images, code blocks)
- Support for branching conversations
- Persistence of conversation history
- Export/import slide sequences
- Accessibility improvements (ARIA labels)