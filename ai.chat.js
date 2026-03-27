// av-chat.js — AV Docs Assistant frontend logic
// Place at: /js/av-chat.js

const DOC_NAMES = [
    "Booth Snake",
    "Floor Boxes 2023",
    "Leland Presonus I/O Routing",
    "Leland Sound Notes",
    "Midas (Sanctuary) Inputs",
    "SLink 2023 Locals Setup",
    "UltraEncode AIO Manual",
    "Un-Installed Lights & Gear",
    "VS-KB30 Keyboard Controller",
    "Wireless Units – Wilmington",
    "StudioLive Series III QSG",
    "Echo Express SE I Guide",
    "ATEM Constellation Manual"
  ];
  
  // Your Vercel serverless function endpoint
  const API_URL = '/api/chat';
  
  let history = [];
  let loading  = false;
  
  // Render doc pills on load
  document.addEventListener('DOMContentLoaded', () => {
    const strip = document.getElementById('docPills');
    if (strip) {
      DOC_NAMES.forEach(name => {
        const pill = document.createElement('div');
        pill.className = 'pill';
        pill.textContent = name;
        strip.appendChild(pill);
      });
    }
  
    const input = document.getElementById('msgInput');
    if (input) input.focus();
  });
  
  // Auto-grow textarea
  function autoResize(el) {
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 120) + 'px';
  }
  
  // Enter to send, Shift+Enter for newline
  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }
  
  // Suggestion chips
  function suggest(el) {
    document.getElementById('msgInput').value = el.textContent;
    sendMessage();
  }
  
  // Add a message bubble to the chat
  function addMessage(role, text, thinking = false) {
    // Remove welcome screen on first message
    const welcome = document.getElementById('welcomeWrap');
    if (welcome) welcome.remove();
  
    const chatBody = document.getElementById('chatBody');
  
    const row = document.createElement('div');
    row.className = 'message-row ' + role;
  
    const avatar = document.createElement('div');
    avatar.className = 'msg-avatar ' + (role === 'user' ? 'user' : 'bot');
    avatar.textContent = role === 'user' ? 'ME' : '🎛';
  
    const bubble = document.createElement('div');
    if (thinking) {
      bubble.className = 'msg-bubble thinking';
    } else if (role === 'user') {
      bubble.className = 'msg-bubble user';
    } else {
      bubble.className = 'msg-bubble bot';
    }
    bubble.textContent = text;
  
    row.appendChild(avatar);
    row.appendChild(bubble);
    chatBody.appendChild(row);
    chatBody.scrollTop = chatBody.scrollHeight;
  
    return row;
  }
  
  // Send a message to the API
  async function sendMessage() {
    if (loading) return;
  
    const input = document.getElementById('msgInput');
    const text  = input.value.trim();
    if (!text) return;
  
    // Clear input
    input.value       = '';
    input.style.height = 'auto';
  
    addMessage('user', text);
    history.push({ role: 'user', content: text });
  
    // Show thinking indicator
    const thinkingRow = addMessage('bot', 'Searching your docs…', true);
  
    loading = true;
    document.getElementById('sendBtn').disabled = true;
  
    try {
      const res  = await fetch(API_URL, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ messages: history })
      });
  
      const data = await res.json();
      thinkingRow.remove();
  
      const reply = data.reply || data.error || 'No response received.';
      addMessage('bot', reply);
      history.push({ role: 'assistant', content: reply });
  
    } catch (err) {
      thinkingRow.remove();
      addMessage('bot', 'Connection error: ' + err.message);
    }
  
    loading = false;
    document.getElementById('sendBtn').disabled = false;
    document.getElementById('msgInput').focus();
  }