document.addEventListener('DOMContentLoaded', function () {
  const CONFIG = {
    photos: [
      "Assets/photo2.jpg.jpeg",
      "Assets/photo1.jpg.png",
      "Assets/photo3.jpg.jpeg",
      "Assets/photo4.jpg.jpeg",
      "Assets/photo5.jpg.jpeg",
      "Assets/photo6.jpg.jpeg"
    ],
    captions: [
      "My sunshine — always.",
      "The one who taught me to be brave.",
      "Moments we'll never forget.",
      "Love you to the moon.",
      "Forever my home.",
      "Your laughter is my favorite song."
    ],
    defaultSong: "Assets/mama.mp3.mp3" 
  };


  document.getElementById("date").textContent = new Date().toLocaleDateString();
  const gallery = document.getElementById('gallery');
  const playBtn = document.getElementById('playBtn');
  const confettiBtn = document.getElementById('confettiBtn');
  const cakeBtn = document.getElementById('cakeBtn');
  const song = document.getElementById('song');
  const msgInput = document.getElementById('msgInput');
  const msgs = document.getElementById('msgs');
  const addMsg = document.getElementById('addMsg');
  const clearMsgs = document.getElementById('clearMsgs');
  const confettiCanvas = document.getElementById('confetti');
  const ctx = confettiCanvas.getContext('2d');

  
  document.querySelectorAll('.gallery .photo img').forEach(img => {
    img.addEventListener('click', () => {
      document.getElementById('mainPhoto').src = img.src;
    });
  });

  
  if (CONFIG.defaultSong) song.src = CONFIG.defaultSong;
  playBtn.addEventListener('click', () => {
    if (!song.src) return alert('No song set yet.');
    if (song.paused) { song.play(); playBtn.textContent = 'Pause Song'; }
    else { song.pause(); playBtn.textContent = 'Play Song'; }
  });

  
  const savedMsgs = JSON.parse(localStorage.getItem('birthdayMessages')) || [];
  savedMsgs.forEach(text => {
    const msg = document.createElement('div');
    msg.className = 'msg';
    msg.textContent = text;
    msgs.append(msg);
  });
  msgs.scrollTop = msgs.scrollHeight;

  
  addMsg.addEventListener('click', () => {
    const text = msgInput.value.trim();
    if (!text) return alert('Write something sweet!');

    const msg = document.createElement('div');
    msg.className = 'msg';
    msg.textContent = text;

    msgs.append(msg); 
    msgInput.value = '';
    msgs.scrollTop = msgs.scrollHeight;

    
    let savedMsgs = JSON.parse(localStorage.getItem('birthdayMessages')) || [];
    savedMsgs.push(text);
    localStorage.setItem('birthdayMessages', JSON.stringify(savedMsgs));
  });

  
  clearMsgs.addEventListener('click', () => {
    if (confirm('Clear all messages?')) {
      msgs.innerHTML = '';
      localStorage.removeItem('birthdayMessages'); 
    }
  });

  let W = confettiCanvas.width = window.innerWidth;
  let H = confettiCanvas.height = window.innerHeight;
  window.addEventListener('resize', () => {
    W = confettiCanvas.width = window.innerWidth;
    H = confettiCanvas.height = window.innerHeight;
  });

  const pieces = [];
  function makeConfetti() {
    for (let i = 0; i < 100; i++) {
      pieces.push({
        x: Math.random() * W,
        y: Math.random() * H - H,
        size: 6 + Math.random() * 6,
        color: `hsl(${Math.random() * 360},70%,60%)`,
        speed: 2 + Math.random() * 3
      });
    }
  }

  function drawConfetti() {
    ctx.clearRect(0, 0, W, H);
    pieces.forEach(p => {
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, p.size, p.size);
      p.y += p.speed;
      if (p.y > H) p.y = -10;
    });
    if (pieces.length > 0) requestAnimationFrame(drawConfetti);
  }

  
  confettiBtn.addEventListener('click', () => {
    pieces.length = 0;
    makeConfetti();
    drawConfetti();
    setTimeout(() => pieces.length = 0, 5000);
  });

  
  cakeBtn.addEventListener('click', () => {
    const cake = document.createElement('div');
    cake.className = 'cake-popup';
    cake.innerHTML = `
      <div class="cake">
        <div class="layer layer1"></div>
        <div class="layer layer2"></div>
        <div class="layer layer3"></div>
        <div class="candle"></div>
      </div>
      <p class="cake-text">Happy Birthday, Mama 🎂💖</p>
    `;
    document.body.appendChild(cake);
    pieces.length = 0;
    makeConfetti();
    drawConfetti();
    setTimeout(() => cake.remove(), 4000);
  });
});
