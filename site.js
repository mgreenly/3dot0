// Configuration
const CONFIG = {
  WORDS_PER_MINUTE: 600,      // Response output speed (10x faster)
  DICTATION_WPM: 240,         // Input dictation speed (2x faster)
  PROCESSING_DELAY: 2000,     // Spinner duration in ms
  SCROLL_DELAY: 300,          // Delay before auto-scroll
  CHAR_VARIANCE: 50,          // Random variance in typing speed (ms)
  TRANSITION_DELAY: 500       // Delay before showing new input (0.5s)
};

// Calculate delays
const WORD_DELAY = 60000 / CONFIG.WORDS_PER_MINUTE;
const DICTATION_DELAY = 60000 / CONFIG.DICTATION_WPM;

// State management
const state = {
  currentSlideIndex: -1,
  isProcessing: false,
  microphoneActive: false
};

// Slide definitions
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
        content: `<img src="media/saturnrocket.webp" alt="Saturn V rocket launch" style="width: 50%; float: left; margin-right: 1rem; margin-bottom: 0.5rem;">The Saturn family of rockets were American super heavy-lift launch vehicles developed by NASA for the Apollo program. The Saturn V remains the tallest, heaviest, and most powerful rocket ever brought to operational status. Standing 363 feet tall and weighing 6.2 million pounds when fully fueled, it could lift 310,000 pounds to low Earth orbit. The Saturn V successfully launched 13 times, including all Apollo moon missions, demonstrating remarkable reliability for such a complex machine.`,
        delay: WORD_DELAY
      },
      {
        type: 'transition',
        delay: CONFIG.TRANSITION_DELAY
      }
    ]
  },
  {
    id: 'slide-2',
    actions: [
      // Note: Input already created by previous slide's transition
      {
        type: 'dictate',
        target: '.slide-input:not(.faded) .chat-input',
        text: 'pause notifications for 1 hour',
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
        content: `🔇 All notifications paused.`,
        delay: WORD_DELAY
      },
      {
        type: 'transition',
        delay: CONFIG.TRANSITION_DELAY
      }
    ]
  },
  {
    id: 'slide-3',
    actions: [
      // Note: Input already created by previous slide's transition
      {
        type: 'dictate',
        target: '.slide-input:not(.faded) .chat-input',
        text: 'create a new golang app in the projects folder called echo. It should have a landing page indicating its name and version and an endpoint at echo/ endpoint that replies to posts with the same content posted to it.',
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
        content: `Creating Go application structure...<phase-break><br>📁 projects/echo/<br>├── main.go<br>├── go.mod<br>└── README.md<br><br><phase-break>Writing: main.go<phase-break><pre><code class="language-go"><span class="keyword">package</span> <span class="type">main</span>

<span class="keyword">import</span> <span class="punctuation">(</span>
    <span class="string">"fmt"</span>
    <span class="string">"io"</span>
    <span class="string">"net/http"</span>
<span class="punctuation">)</span>

<span class="keyword">const</span> <span class="type">version</span> <span class="operator">=</span> <span class="string">"1.0.0"</span>

<span class="keyword">func</span> <span class="function">main</span><span class="punctuation">()</span> <span class="punctuation">{</span>
    <span class="type">http</span><span class="punctuation">.</span><span class="function">HandleFunc</span><span class="punctuation">(</span><span class="string">"/"</span><span class="punctuation">,</span> <span class="function">homeHandler</span><span class="punctuation">)</span>
    <span class="type">http</span><span class="punctuation">.</span><span class="function">HandleFunc</span><span class="punctuation">(</span><span class="string">"/echo/"</span><span class="punctuation">,</span> <span class="function">echoHandler</span><span class="punctuation">)</span>
    
    <span class="type">fmt</span><span class="punctuation">.</span><span class="function">Println</span><span class="punctuation">(</span><span class="string">"Echo server starting on :8080..."</span><span class="punctuation">)</span>
    <span class="type">http</span><span class="punctuation">.</span><span class="function">ListenAndServe</span><span class="punctuation">(</span><span class="string">":8080"</span><span class="punctuation">,</span> <span class="keyword">nil</span><span class="punctuation">)</span>
<span class="punctuation">}</span>

<span class="keyword">func</span> <span class="function">homeHandler</span><span class="punctuation">(</span><span class="type">w</span> <span class="type">http.ResponseWriter</span><span class="punctuation">,</span> <span class="type">r</span> <span class="operator">*</span><span class="type">http.Request</span><span class="punctuation">)</span> <span class="punctuation">{</span>
    <span class="type">fmt</span><span class="punctuation">.</span><span class="function">Fprintf</span><span class="punctuation">(</span><span class="type">w</span><span class="punctuation">,</span> <span class="string">"Echo Server v%s"</span><span class="punctuation">,</span> <span class="type">version</span><span class="punctuation">)</span>
<span class="punctuation">}</span>

<span class="keyword">func</span> <span class="function">echoHandler</span><span class="punctuation">(</span><span class="type">w</span> <span class="type">http.ResponseWriter</span><span class="punctuation">,</span> <span class="type">r</span> <span class="operator">*</span><span class="type">http.Request</span><span class="punctuation">)</span> <span class="punctuation">{</span>
    <span class="keyword">if</span> <span class="type">r</span><span class="punctuation">.</span><span class="type">Method</span> <span class="operator">==</span> <span class="string">"POST"</span> <span class="punctuation">{</span>
        <span class="type">body</span><span class="punctuation">,</span> <span class="type">_</span> <span class="operator">:=</span> <span class="type">io</span><span class="punctuation">.</span><span class="function">ReadAll</span><span class="punctuation">(</span><span class="type">r</span><span class="punctuation">.</span><span class="type">Body</span><span class="punctuation">)</span>
        <span class="type">w</span><span class="punctuation">.</span><span class="function">Write</span><span class="punctuation">(</span><span class="type">body</span><span class="punctuation">)</span>
    <span class="punctuation">}</span>
<span class="punctuation">}</span></code></pre><br><phase-break>Initializing Go module...<phase-break><pre><code class="language-bash">go mod init projects/echo</code></pre><br><phase-break>✅ Application created successfully! Run with:<phase-break><pre><code class="language-bash">$ cd projects/echo && go run main.go</code></pre>`,
        delay: WORD_DELAY
      },
      {
        type: 'transition',
        delay: CONFIG.TRANSITION_DELAY
      }
    ]
  }
];

// Utility functions
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function autoResizeTextarea(textarea) {
  textarea.style.height = 'auto';
  textarea.style.height = Math.min(textarea.scrollHeight, 150) + 'px'; // Max height of 150px
}

async function animateWords(element, content, delayPerWord) {
  // Check if content contains phase breaks
  if (content.includes('<phase-break>')) {
    const phases = content.split('<phase-break>');
    
    for (const phase of phases) {
      if (phase.trim()) {
        await animateWords(element, phase, delayPerWord);
        
        // Show spinner after each phase except the last
        if (phases.indexOf(phase) < phases.length - 1) {
          const spinnerContainer = document.createElement('div');
          spinnerContainer.className = 'phase-spinner';
          spinnerContainer.innerHTML = '<span class="spinner"></span>';
          element.appendChild(spinnerContainer);
          
          await sleep(2000); // 2 second spinner
          spinnerContainer.remove();
        }
      }
    }
    return;
  }
  
  // Check if content contains code blocks
  if (content.includes('<pre>')) {
    // Split content by code blocks
    const parts = content.split(/(<pre>[\s\S]*?<\/pre>)/);
    
    for (const part of parts) {
      if (part.startsWith('<pre>')) {
        // Insert code block immediately
        const codeBlock = document.createElement('div');
        codeBlock.innerHTML = part;
        element.appendChild(codeBlock.firstChild);
      } else if (part.trim()) {
        // Animate regular text
        const textSpan = document.createElement('span');
        textSpan.classList.add('typing-cursor');
        element.appendChild(textSpan);
        
        // Split by words but preserve HTML tags like <br>
        const tokens = part.trim().split(/(\s+|<br>|<br\/>|<br\s\/>)/);
        for (let i = 0; i < tokens.length; i++) {
          const token = tokens[i];
          if (token.match(/^<br/)) {
            textSpan.innerHTML += token;
          } else if (token.match(/^\s+$/)) {
            // Preserve spaces between words
            textSpan.innerHTML += ' ';
          } else if (token.trim()) {
            textSpan.innerHTML += token;
            scrollToElement(element);
            const variance = Math.random() * CONFIG.CHAR_VARIANCE - CONFIG.CHAR_VARIANCE / 2;
            await sleep(delayPerWord + variance);
          }
        }
        
        textSpan.classList.remove('typing-cursor');
      }
    }
  } else if (content.includes('<img')) {
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
      
      // Scroll to keep typing cursor visible
      scrollToElement(element);
      
      // Add natural variance to typing speed
      const variance = Math.random() * CONFIG.CHAR_VARIANCE - CONFIG.CHAR_VARIANCE / 2;
      await sleep(delayPerWord + variance);
    }
    
    textSpan.classList.remove('typing-cursor');
  } else {
    // Check for emoji/icon at start of content
    const iconMatch = content.match(/^(\p{Emoji}|\p{Extended_Pictographic})\s*/u);
    
    if (iconMatch) {
      // Extract icon and remaining text
      const icon = iconMatch[0].trim();
      const textContent = content.substring(iconMatch[0].length).trim();
      
      // Create icon span with appropriate styling
      const iconSpan = document.createElement('span');
      iconSpan.className = 'response-icon';
      iconSpan.textContent = icon + ' ';
      element.appendChild(iconSpan);
      
      // Create text span for animation
      const textSpan = document.createElement('span');
      textSpan.classList.add('typing-cursor');
      element.appendChild(textSpan);
      
      // Animate remaining text with HTML support
      const tokens = textContent.trim().split(/(\s+|<br>|<br\/>|<br\s\/>)/);
      for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        if (token.match(/^<br/)) {
          textSpan.innerHTML += token;
        } else if (token.match(/^\s+$/)) {
          // Preserve spaces between words
          textSpan.innerHTML += ' ';
        } else if (token.trim()) {
          textSpan.innerHTML += token;
          scrollToElement(element);
          const variance = Math.random() * CONFIG.CHAR_VARIANCE - CONFIG.CHAR_VARIANCE / 2;
          await sleep(delayPerWord + variance);
        }
      }
      
      textSpan.classList.remove('typing-cursor');
    } else {
      // Original text-only animation
      // Create a new span for this text animation
      const textSpan = document.createElement('span');
      textSpan.classList.add('typing-cursor');
      element.appendChild(textSpan);
      
      // Split by words but preserve HTML tags like <br>
      const tokens = content.trim().split(/(\s+|<br>|<br\/>|<br\s\/>)/);
      for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        if (token.match(/^<br/)) {
          textSpan.innerHTML += token;
        } else if (token.match(/^\s+$/)) {
          // Preserve spaces between words
          textSpan.innerHTML += ' ';
        } else if (token.trim()) {
          textSpan.innerHTML += token;
          scrollToElement(element);
          const variance = Math.random() * CONFIG.CHAR_VARIANCE - CONFIG.CHAR_VARIANCE / 2;
          await sleep(delayPerWord + variance);
        }
      }
      
      textSpan.classList.remove('typing-cursor');
    }
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

function toggleMicrophone(active) {
  // Find the last mic button (the active one)
  const micButtons = document.querySelectorAll('.mic-button');
  const micButton = micButtons[micButtons.length - 1];
  
  if (!micButton) return;
  
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

// Removed clearPromptInput - no longer needed with dynamic inputs

function renderInitialInput() {
  const container = document.getElementById('slides-container');
  const inputDiv = document.createElement('div');
  inputDiv.className = 'input-wrapper slide-input fade-in';
  inputDiv.innerHTML = `
    <textarea class="chat-input" placeholder="How can I help you today?" readonly rows="1"></textarea>
    <button class="mic-button" aria-label="Toggle microphone">
      <svg class="mic-icon" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
        <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
      </svg>
    </button>
  `;
  container.appendChild(inputDiv);
}

// Slide Manager class
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
      console.error('No input found for selector:', action.target);
      return;
    }
    toggleMicrophone(true);
    
    // Type the text into the input field
    const words = action.text.split(' ');
    input.value = '';
    
    for (let i = 0; i < words.length; i++) {
      input.value += (i > 0 ? ' ' : '') + words[i];
      autoResizeTextarea(input); // Auto-resize as we type
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
    
    // Check if this is the final input (after slide 3)
    const isFinal = this.currentIndex >= this.slides.length - 1;
    
    inputDiv.innerHTML = `
      <textarea class="chat-input" placeholder="${action.placeholder || 'How can I help you today?'}" readonly rows="1"></textarea>
      <button class="mic-button${isFinal ? ' disabled' : ''}" aria-label="Toggle microphone" ${isFinal ? 'disabled' : ''}>
        <svg class="mic-icon" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
          <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
        </svg>
      </button>
    `;
    
    if (isFinal) {
      inputDiv.classList.add('final');
    }
    
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

// Initialize the app
function initializeApp() {
  const slideManager = new SlideManager(SLIDES);
  
  // Render initial input on page load
  renderInitialInput();
  
  // Microphone click - delegate to handle dynamic inputs
  document.addEventListener('click', (e) => {
    const micButton = e.target.closest('.mic-button');
    if (micButton && !micButton.disabled && !state.isProcessing) {
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

// Start the app when DOM is ready
document.addEventListener('DOMContentLoaded', initializeApp);