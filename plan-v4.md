# Implementation Plan v4 - Software 3.0 Agent Demo

## Overview
Update the implementation to restore slide 3 with a new demonstration of Software 3.0 agent capabilities for code generation.

## Changes from v3

### 1. Restore Slide 3
- Add back slide 3 to the SLIDES array
- Include transition action in slide 2 to enable progression to slide 3

### 2. New Slide 3 Content
Demonstrate Software 3.0 agent handling a complex development request:
- Dictation: "create a new golang app in the projects folder called echo. It should have a landing page indicating its name and version and an endpoint at echo/ endpoint that replies to posts with the same content posted to it."
- Response: Detailed mock response with code blocks showing the build process

### 3. Multi-line Input Support
- Change input from single-line to textarea
- Auto-resize textarea based on content
- Maintain visual consistency with existing design

### 4. Code Block Support
- Add CSS for code block styling
- Implement code block rendering in responses
- Ensure code blocks appear immediately (not animated)

## Implementation Details

### Step 1: Update Slide 2 to Include Transition

Update slide 2 in the SLIDES array to restore the transition action:

```javascript
{
  id: 'slide-2',
  actions: [
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
}
```

### Step 2: Add Slide 3

Add the new slide 3 to the SLIDES array with detailed response:

```javascript
{
  id: 'slide-3',
  actions: [
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
      content: `Creating Go application structure...<phase-break><br>📁 projects/echo/<br>├── main.go<br>├── go.mod<br>└── README.md

<phase-break>Writing: main.go<phase-break><pre><code class="language-go">package main

import (
    "fmt"
    "io"
    "net/http"
)

const version = "1.0.0"

func main() {
    http.HandleFunc("/", homeHandler)
    http.HandleFunc("/echo/", echoHandler)
    
    fmt.Println("Echo server starting on :8080...")
    http.ListenAndServe(":8080", nil)
}

func homeHandler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Echo Server v%s", version)
}

func echoHandler(w http.ResponseWriter, r *http.Request) {
    if r.Method == "POST" {
        body, _ := io.ReadAll(r.Body)
        w.Write(body)
    }
}</code></pre><br><phase-break>Initializing Go module...<phase-break><pre><code class="language-bash">go mod init projects/echo</code></pre><br><phase-break>✅ Application created successfully! Run with:<phase-break><pre><code class="language-bash">$ cd projects/echo && go run main.go</code></pre>`,
      delay: WORD_DELAY
    },
    {
      type: 'transition',
      delay: CONFIG.TRANSITION_DELAY
    }
  ]
}
```

### Step 3: Update Input HTML to Textarea

Update the input HTML generation in both `renderInitialInput` and `createNewInput`:

```javascript
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

// Similar update needed in createNewInput method
```

### Step 4: Add Auto-resize Function

Add a function to handle textarea auto-resizing:

```javascript
function autoResizeTextarea(textarea) {
  textarea.style.height = 'auto';
  textarea.style.height = Math.min(textarea.scrollHeight, 150) + 'px'; // Max height of 150px
}

// Add to handleDictation to resize as text is added:
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
```

### Step 5: Add CSS for Textarea and Code Blocks

Add to site.css:

```css
/* Update chat-input for textarea */
.chat-input {
  width: 100%;
  min-height: 56px;
  padding: 1rem 3.5rem 1rem 1.5rem;
  font-size: 1rem;
  font-family: inherit;
  border: 1px solid var(--claude-border);
  border-radius: 28px;
  background: var(--claude-white);
  color: var(--claude-text);
  transition: border-color 0.2s ease, height 0.2s ease;
  outline: none;
  resize: none;
  overflow-y: auto;
  line-height: 1.5;
}

/* Code block styles */
pre {
  background: #1e1e1e;
  color: #d4d4d4;
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
  margin: 1rem 0;
}

code {
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 0.9rem;
}

pre code {
  background: none;
  padding: 0;
  border-radius: 0;
}

/* Inline code */
:not(pre) > code {
  background: var(--claude-bg);
  padding: 0.2em 0.4em;
  border-radius: 3px;
  font-size: 0.875rem;
}

/* Language label */
code[class*="language-"]::before {
  content: attr(class);
  display: block;
  font-size: 0.75rem;
  color: #858585;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
}

code.language-go::before {
  content: "GO";
}

code.language-bash::before {
  content: "BASH";
}

/* Syntax highlighting for Go */
.language-go .keyword {
  color: #C586C0; /* Purple for keywords */
}

.language-go .string {
  color: #CE9178; /* Orange for strings */
}

.language-go .function {
  color: #DCDCAA; /* Yellow for functions */
}

.language-go .type {
  color: #4EC9B0; /* Teal for types */
}

/* Additional Go syntax highlighting classes... */

/* Inline spinner for progress messages */
.inline-spinner {
  display: inline-block;
  margin-left: 0.5rem;
  vertical-align: middle;
}

.inline-spinner .spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid var(--claude-border);
  border-top-color: var(--claude-orange);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
```

### Step 6: Update animateWords for Phased Rendering

Update the animateWords function to handle phased rendering with spinners between phases:

```javascript
async function animateWords(element, content, delayPerWord) {
  // Check if content contains phase breaks
  if (content.includes('<phase-break>')) {
    const phases = content.split('<phase-break>');
    
    for (const phase of phases) {
      if (phase.trim()) {
        await animateWords(element, phase, delayPerWord);
        
        // Show spinner after each phase except the last
        if (phases.indexOf(phase) < phases.length - 1) {
          const spinner = document.createElement('span');
          spinner.className = 'inline-spinner';
          spinner.innerHTML = '<span class="spinner"></span>';
          element.appendChild(spinner);
          
          await sleep(2000); // 2 second spinner
          spinner.remove();
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
    // Existing image handling...
  } else {
    // Check for emoji/icon at start of content
    // Existing icon and text handling...
  }
}

## Testing Checklist

1. ✓ Slide 2 transition creates new input for slide 3
2. ✓ Slide 3 dictation shows the full Golang app request
3. ✓ Input field expands to multiple lines for long text
4. ✓ Progress messages animate with proper word spacing
5. ✓ Spinner appears after each progress message for 2s
6. ✓ Code blocks appear immediately after their phase completes
7. ✓ Each phase renders completely before the next begins
8. ✓ Line breaks render properly in file structure display
9. ✓ Code syntax highlighting displays correctly
10. ✓ Final non-functional input appears after slide 3 completes
11. ✓ Presentation ends after 3 slides
12. ✓ All timing remains consistent

## Implementation Notes

- After slide 3 completes, a final non-functional input is rendered to ensure proper scrolling
- Go code blocks include syntax highlighting with semantic HTML spans for different token types
- Bash code blocks display without syntax highlighting
- The final input has a disabled microphone button and cannot accept interaction
- The long dictation text in slide 3 will take longer to animate due to its length
- Line breaks (`<br>` tags) are preserved and render immediately without animation
- Code blocks appear instantly without word-by-word animation
- The homeHandler now returns simple text instead of HTML to avoid rendering issues
- File structure display uses `<br>` tags to maintain proper formatting
- File name labels use format "Writing: filename" for clarity and proper spacing
- Line breaks are required after code blocks to prevent text from running together
- Final command is rendered as a code block with bash prompt ($)
- Phased rendering uses `<phase-break>` tags to split content
- Spinners appear between phases (2s duration) without any text
- Each phase completes fully before the spinner and next phase begin
- Important: Text animation appends content instead of replacing to keep all phases visible
- Phase spinners use div containers for proper spacing between phases
- Transition delay reduced to 0.5s for quicker progression between slides
- Text animation uses innerHTML instead of textContent to properly render HTML tags like `<br>`
- Token-based splitting preserves spaces between words by checking for whitespace tokens
- Syntax highlighting added with VS Code dark theme colors for Go code only

## File Changes Summary

1. **site.js**: Update slide 2 to add back transition action (required)
2. **site.js**: Add slide 3 to SLIDES array with detailed response (required)
3. **site.js**: Update input rendering to use textarea (required)
4. **site.js**: Add autoResizeTextarea function (required)
5. **site.js**: Update animateWords to handle phased rendering (required)
6. **site.js**: Fix text animation to append instead of replace content (required)
7. **site.js**: Fix spacing preservation in token-based animation (required)
8. **site.js**: Add final non-functional input after slide 3 (required)
8. **site.css**: Update .chat-input styles for textarea (required)
9. **site.css**: Add code block styling (required)
10. **site.css**: Add phase spinner styling (required)
11. **site.css**: Add syntax highlighting for Go code only (required)