# Implementation Plan v3 - Software 3.0 Agent Demo

## Overview
Update the implementation to support the new slide 2 content demonstrating notification control with a mute icon, building on the existing v2 architecture.

## Changes from v2

### 1. Icon Support in Responses
- Add support for inline icons (emojis or SVG) in response content
- Icons should appear immediately, not animate word-by-word
- Text after icons should animate normally

### 2. Updated Slide Content
Replace slide 2 with notification control demonstration:
- Dictation: "pause notifications for 1 hour"
- Response: Mute icon (🔇) followed by "All notifications paused."

### 3. Slide Count Reduction
- Remove slide 3 entirely
- After slide 2 completes, do not render a new input
- Presentation ends after 2 slides

## Implementation Details

### Step 1: Update Slide 2 Definition

Replace the existing slide 2 in the SLIDES array and remove slide 3:

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
    }
    // Note: No transition action - presentation ends here
  ]
}
```

### Step 2: Enhance Word Animation for Icons

Update the `animateWords` function to handle inline icons:

```javascript
async function animateWords(element, content, delayPerWord) {
  // Check if content contains HTML images
  if (content.includes('<img')) {
    // ... existing image handling code ...
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
      
      // Animate remaining text
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
}
```

### Step 3: Add Icon Styling (Optional)

Add CSS for icon styling if needed:

```css
.response-icon {
  font-size: 1.2em;
  vertical-align: middle;
  margin-right: 0.25rem;
}
```

### Step 4: Alternative SVG Implementation

If preferring SVG over emoji, update slide 2 content:

```javascript
{
  type: 'response',
  content: `<svg class="mute-icon" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" style="display: inline-block; vertical-align: middle; margin-right: 0.5rem;">
    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
  </svg>All notifications paused.`,
  delay: WORD_DELAY
}
```

## Testing Checklist

1. ✓ Slide 2 shows new notification control content with "pause notifications for 1 hour"
2. ✓ Mute icon (🔇) appears immediately
3. ✓ Text "All notifications paused." animates word by word
4. ✓ Icon has proper spacing from text
5. ✓ Animation timing remains consistent
6. ✓ No new input appears after slide 2 completes
7. ✓ Presentation ends after 2 slides

## Implementation Notes

- The emoji approach (🔇) is simpler and requires no additional code changes beyond the content update
- The enhanced animateWords function provides more flexibility for future icon additions
- Icons can be emojis, Unicode symbols, or inline SVG elements
- The pattern can be extended to support icons anywhere in the response, not just at the beginning

## Minimal Implementation

For the quickest implementation, simply update the slide 2 content in the SLIDES array with the emoji version. The existing code will handle it correctly, with the emoji appearing as part of the first word.

## File Changes Summary

1. **site.js**: Update slide 2 in SLIDES array with new dictation text and remove transition action (required)
2. **site.js**: Remove slide 3 from SLIDES array (required)
3. **site.js**: Optionally enhance animateWords function for better icon handling
4. **site.css**: Optionally add .response-icon styling