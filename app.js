/**
 * Baby Jeeshika's Ear Piercing E-Invitation Application
 * Interactive Mobile-First Web Experience with Golden Seal Opening & Particle Canvas
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- DOM Elements ---
  const videoLayer = document.getElementById('screen-video-layer');
  const videoEnvelope = document.getElementById('video-envelope');
  const sealHotspot = document.getElementById('seal-hotspot');
  const btnOpenSeal = document.getElementById('btn-open-seal');
  const btnSkipVideo = document.getElementById('btn-skip-video');
  const flashOverlay = document.getElementById('flash-overlay');
  const celebrationLayer = document.getElementById('screen-celebration-layer');
  const canvas = document.getElementById('particle-canvas');
  const mainGlassCard = document.getElementById('main-glass-card');
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  const btnToggleCard = document.getElementById('btn-toggle-card');
  const dockViewIcon = document.getElementById('dock-view-icon');
  const btnToggleAudio = document.getElementById('btn-toggle-audio');
  const dockMusicIcon = document.getElementById('dock-music-icon');
  const audioBgm = document.getElementById('audio-bgm');
  const bgVideoLive = document.getElementById('bg-video-live');
  const btnToggleVideoBg = document.getElementById('btn-toggle-video-bg');
  const btnReplayEnvelope = document.getElementById('btn-replay-envelope');
  const btnAddCalendar = document.getElementById('btn-add-calendar');
  const btnShareWhatsapp = document.getElementById('btn-share-whatsapp');
  const wishForm = document.getElementById('wish-form');
  const wishNameInput = document.getElementById('wish-name');
  const wishMsgInput = document.getElementById('wish-msg');
  const wishesContainer = document.getElementById('wishes-container');
  const wishesCount = document.getElementById('wishes-count');
  const wishChips = document.querySelectorAll('.wish-chip');

  // --- State Variables ---
  let isEnvelopeOpened = false;
  let isAudioPlaying = false;
  let audioContext = null;
  let synthDroneGain = null;
  let synthMelodyInterval = null;
  let isCardCollapsed = false;
  let isLiveVideoActive = false;
  let transitionTriggered = false;

  // =========================================================================
  // 1. SCREEN 1: Video Envelope & Golden Seal Opening Interaction
  // =========================================================================

  // Initial video setup: paused at 0s so intact "JEESHIKA" seal is visible
  videoEnvelope.currentTime = 0;
  videoEnvelope.pause();

  function triggerSealOpen() {
    if (isEnvelopeOpened) return;
    isEnvelopeOpened = true;

    // Immediately hide tap prompt with scaling out
    sealHotspot.style.transition = 'transform 0.4s ease-out, opacity 0.4s ease-out';
    sealHotspot.style.transform = 'translate(-50%, -50%) scale(1.35)';
    sealHotspot.style.opacity = '0';
    sealHotspot.style.pointerEvents = 'none';

    // Show skip button
    if (btnSkipVideo) {
      btnSkipVideo.style.opacity = '1';
      btnSkipVideo.style.pointerEvents = 'auto';
    }

    // Unmute video on user gesture
    videoEnvelope.muted = false;

    // Start celebratory music
    playFestiveAudio();

    // Play video
    const playPromise = videoEnvelope.play();
    if (playPromise !== undefined) {
      playPromise.catch(err => {
        console.warn('Video play warning:', err);
      });
    }

    // Monitor playback time to trigger golden sparkle cross-fade at >= 5.15s
    const checkTime = () => {
      if (transitionTriggered) return;

      // When golden sparkle explosion fills the screen (around 5.15s - 5.2s)
      if (videoEnvelope.currentTime >= 5.15) {
        transitionTriggered = true;
        triggerSparkleCrossFade();
        return;
      }

      if (!videoEnvelope.paused && !videoEnvelope.ended) {
        requestAnimationFrame(checkTime);
      }
    };

    videoEnvelope.addEventListener('timeupdate', () => {
      if (!transitionTriggered && videoEnvelope.currentTime >= 5.15) {
        transitionTriggered = true;
        triggerSparkleCrossFade();
      }
    });

    videoEnvelope.addEventListener('ended', () => {
      if (!transitionTriggered) {
        transitionTriggered = true;
        triggerSparkleCrossFade();
      }
    });

    requestAnimationFrame(checkTime);
  }

  // Skip video directly to invitation
  if (btnSkipVideo) {
    btnSkipVideo.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!transitionTriggered) {
        transitionTriggered = true;
        triggerSparkleCrossFade();
      }
    });
  }

  // Trigger cross-fade into Screen 2
  function triggerSparkleCrossFade() {
    // 1. Golden flash overlay spikes to golden brilliance
    flashOverlay.style.transition = 'opacity 0.25s ease-in';
    flashOverlay.style.opacity = '0.9';

    setTimeout(() => {
      // 2. Video layer smoothly fades to 0 over 1.2s
      videoLayer.style.opacity = '0';
      videoLayer.style.pointerEvents = 'none';

      // 3. Golden flash softly dissolves, revealing Screen 2 celebration
      flashOverlay.style.transition = 'opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
      flashOverlay.style.opacity = '0';

      // 4. Start particles and interactions
      startParticleEngine();

      setTimeout(() => {
        videoLayer.style.display = 'none';
        videoEnvelope.pause();
      }, 1300);
    }, 200);
  }

  // Event Listeners for opening seal
  btnOpenSeal.addEventListener('click', triggerSealOpen);
  sealHotspot.addEventListener('click', triggerSealOpen);

  // =========================================================================
  // 2. AUDIO ENGINE (BGM File + Web Audio API Procedural Carnatic Synthesizer)
  // =========================================================================

  function playFestiveAudio() {
    isAudioPlaying = true;
    updateAudioUI(true);

    // Try HTML5 audio file (bgm.mp3 / bgm.wav)
    audioBgm.volume = 0.45;
    const audioPromise = audioBgm.play();

    if (audioPromise !== undefined) {
      audioPromise.catch(() => {
        // Fallback to Web Audio API Carnatic Synthesizer
        initWebAudioSynth();
      });
    }
  }

  function pauseFestiveAudio() {
    isAudioPlaying = false;
    updateAudioUI(false);
    audioBgm.pause();
    if (synthDroneGain) {
      try {
        synthDroneGain.gain.setValueAtTime(0, audioContext.currentTime);
      } catch (e) { }
    }
    if (synthMelodyInterval) {
      clearInterval(synthMelodyInterval);
      synthMelodyInterval = null;
    }
  }

  function toggleAudio() {
    if (isAudioPlaying) {
      pauseFestiveAudio();
    } else {
      if (audioBgm.src && !audioBgm.error) {
        audioBgm.play().then(() => {
          isAudioPlaying = true;
          updateAudioUI(true);
        }).catch(() => {
          initWebAudioSynth();
        });
      } else {
        initWebAudioSynth();
      }
    }
  }

  function updateAudioUI(playing) {
    if (playing) {
      btnToggleAudio.classList.add('active');
      dockMusicIcon.classList.remove('vinyl-paused');
      dockMusicIcon.classList.add('vinyl-spin');
    } else {
      btnToggleAudio.classList.remove('active');
      dockMusicIcon.classList.remove('vinyl-spin');
      dockMusicIcon.classList.add('vinyl-paused');
    }
  }

  // Web Audio Procedural Carnatic Ambient Synthesizer (Raga Mohanam)
  function initWebAudioSynth() {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!audioContext) {
        audioContext = new AudioContextClass();
      }
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }

      isAudioPlaying = true;
      updateAudioUI(true);

      // Tanpura Drone (Sa + Pa)
      synthDroneGain = audioContext.createGain();
      synthDroneGain.gain.setValueAtTime(0.08, audioContext.currentTime);
      synthDroneGain.connect(audioContext.destination);

      const droneSa = audioContext.createOscillator();
      droneSa.type = 'sine';
      droneSa.frequency.setValueAtTime(261.63, audioContext.currentTime); // C4
      droneSa.connect(synthDroneGain);
      droneSa.start();

      const dronePa = audioContext.createOscillator();
      dronePa.type = 'sine';
      dronePa.frequency.setValueAtTime(392.00, audioContext.currentTime); // G4
      dronePa.connect(synthDroneGain);
      dronePa.start();

      // Raga Mohanam melody notes: Sa, Ri, Ga, Pa, Dha, Sa' (Pentatonic)
      const scale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 659.25];
      let step = 0;

      const playMelodyNote = () => {
        if (!isAudioPlaying || !audioContext) return;
        const now = audioContext.currentTime;
        const osc = audioContext.createOscillator();
        const noteGain = audioContext.createGain();

        // Alternate flute/chime timbre
        osc.type = step % 3 === 0 ? 'triangle' : 'sine';
        const freq = scale[step % scale.length];
        step = (step + 1 + Math.floor(Math.random() * 2)) % scale.length;
        osc.frequency.setValueAtTime(freq, now);

        noteGain.gain.setValueAtTime(0, now);
        noteGain.gain.linearRampToValueAtTime(0.12, now + 0.15);
        noteGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

        osc.connect(noteGain);
        noteGain.connect(audioContext.destination);

        osc.start(now);
        osc.stop(now + 1.3);
      };

      if (!synthMelodyInterval) {
        synthMelodyInterval = setInterval(playMelodyNote, 1400);
      }
    } catch (e) {
      console.warn('Web Audio Synth failed:', e);
    }
  }

  btnToggleAudio.addEventListener('click', toggleAudio);

  // =========================================================================
  // 3. HTML5 CANVAS PARTICLE ENGINE (Floating Gold Dust & 3D Falling Petals)
  // =========================================================================

  let ctx = canvas.getContext('2d');
  let animationFrameId = null;
  let particles = [];
  let petals = [];
  let clickBursts = [];

  function resizeCanvas() {
    const rect = celebrationLayer.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  }

  window.addEventListener('resize', resizeCanvas);

  // Gold Dust Particle Class
  class GoldParticle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * canvas.width;
      this.y = initial ? Math.random() * canvas.height : canvas.height + 10;
      this.radius = Math.random() * 2.2 + 0.8;
      this.speedY = Math.random() * 0.7 + 0.3;
      this.swaySpeed = Math.random() * 0.03 + 0.01;
      this.swayAngle = Math.random() * Math.PI * 2;
      this.swayRadius = Math.random() * 1.5 + 0.5;
      this.alpha = Math.random() * 0.6 + 0.25;
      this.twinkleSpeed = Math.random() * 0.04 + 0.01;
    }

    update() {
      this.y -= this.speedY;
      this.swayAngle += this.swaySpeed;
      this.x += Math.sin(this.swayAngle) * this.swayRadius;
      this.alpha = 0.4 + 0.35 * Math.sin(this.swayAngle * 2);

      if (this.y < -10 || this.x < -10 || this.x > canvas.width + 10) {
        this.reset(false);
      }
    }

    draw(ctx) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 225, 120, ${this.alpha})`;
      ctx.shadowColor = 'rgba(212, 175, 55, 0.8)';
      ctx.shadowBlur = this.radius * 3;
      ctx.fill();
      ctx.restore();
    }
  }

  // Realistic 2.5D Fluttering Pink Rose/Lotus Petal Class
  class PetalParticle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * canvas.width;
      this.y = initial ? Math.random() * canvas.height : -30;
      this.size = Math.random() * 12 + 10;
      this.speedY = Math.random() * 1.2 + 0.7;
      this.speedX = Math.random() * 0.8 - 0.4;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * 0.03;
      this.flipAngle = Math.random() * Math.PI * 2;
      this.flipSpeed = Math.random() * 0.03 + 0.015;
      this.colorIndex = Math.floor(Math.random() * 3);
      // Soft rose & lotus shades
      this.colors = [
        { outer: '#FAD2E1', inner: '#F7CAD0' },
        { outer: '#FFCCD5', inner: '#FFB5A7' },
        { outer: '#FFE3E0', inner: '#FBB1BD' }
      ];
      this.opacity = Math.random() * 0.35 + 0.65;
    }

    update() {
      this.y += this.speedY;
      this.x += this.speedX + Math.sin(this.flipAngle) * 0.7;
      this.rotation += this.rotationSpeed;
      this.flipAngle += this.flipSpeed;

      if (this.y > canvas.height + 30) {
        this.reset(false);
      }
    }

    draw(ctx) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      // 3D flip effect via horizontal scale
      ctx.scale(Math.cos(this.flipAngle), 1);
      ctx.globalAlpha = this.opacity;

      const pal = this.colors[this.colorIndex];
      const grad = ctx.createRadialGradient(0, 0, 2, 0, 0, this.size);
      grad.addColorStop(0, pal.inner);
      grad.addColorStop(1, pal.outer);

      // Curved petal path using Bezier curves
      ctx.beginPath();
      ctx.moveTo(0, -this.size * 0.7);
      ctx.bezierCurveTo(this.size * 0.6, -this.size * 0.5, this.size * 0.7, this.size * 0.4, 0, this.size * 0.8);
      ctx.bezierCurveTo(-this.size * 0.7, this.size * 0.4, -this.size * 0.6, -this.size * 0.5, 0, -this.size * 0.7);
      ctx.fillStyle = grad;
      ctx.fill();

      // Subtle center vein
      ctx.beginPath();
      ctx.moveTo(0, -this.size * 0.5);
      ctx.lineTo(0, this.size * 0.6);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 0.8;
      ctx.stroke();

      ctx.restore();
    }
  }

  // Click Sparkle Burst Particle
  class TouchSparkle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4 + 1.5;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed - 1.0;
      this.life = 1.0;
      this.decay = Math.random() * 0.03 + 0.02;
      this.size = Math.random() * 3 + 1.5;
      this.isHeart = Math.random() > 0.7;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += 0.08; // gravity
      this.life -= this.decay;
    }

    draw(ctx) {
      if (this.life <= 0) return;
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.globalAlpha = Math.max(0, this.life);

      if (this.isHeart) {
        ctx.fillStyle = '#FF6B8B';
        ctx.beginPath();
        ctx.arc(-2, -2, 2, 0, Math.PI * 2);
        ctx.arc(2, -2, 2, 0, Math.PI * 2);
        ctx.lineTo(0, 4);
        ctx.fill();
      } else {
        ctx.fillStyle = '#FFE58F';
        ctx.shadowColor = '#D4AF37';
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
  }

  function startParticleEngine() {
    resizeCanvas();
    particles = Array.from({ length: 45 }, () => new GoldParticle());
    petals = Array.from({ length: 22 }, () => new PetalParticle());

    function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Render gold particles
      for (let p of particles) {
        p.update();
        p.draw(ctx);
      }

      // Render falling flower petals
      for (let petal of petals) {
        petal.update();
        petal.draw(ctx);
      }

      // Render interactive touch bursts
      for (let i = clickBursts.length - 1; i >= 0; i--) {
        const s = clickBursts[i];
        s.update();
        s.draw(ctx);
        if (s.life <= 0) {
          clickBursts.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(loop);
    }

    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    loop();
  }

  // Interactive Tap/Touch Sparkles on Screen 2
  celebrationLayer.addEventListener('pointerdown', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    for (let i = 0; i < 14; i++) {
      clickBursts.push(new TouchSparkle(x, y));
    }
  });

  // =========================================================================
  // 4. TAB NAVIGATION & SMART SAFE-ZONE CARD MANAGEMENT
  // =========================================================================

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTabId = btn.getAttribute('data-tab');

      // Update button states
      tabButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Switch tab pane
      tabPanes.forEach(pane => {
        if (pane.id === targetTabId) {
          pane.classList.add('active');
        } else {
          pane.classList.remove('active');
        }
      });

      // Expand card if it was collapsed
      if (isCardCollapsed) {
        toggleCardCollapse(false);
      }
    });
  });

  // Toggle Card Collapse (Allows unobstructed viewing of Baby Jeeshika in bottom-left)
  function toggleCardCollapse(forceState) {
    if (forceState !== undefined) {
      isCardCollapsed = forceState;
    } else {
      isCardCollapsed = !isCardCollapsed;
    }

    if (isCardCollapsed) {
      mainGlassCard.classList.add('collapsed');
      dockViewIcon.textContent = '📝';
      btnToggleCard.title = 'அழைப்பிதழ் விவரங்களைக் காட்டு';
    } else {
      mainGlassCard.classList.remove('collapsed');
      dockViewIcon.textContent = '👁️';
      btnToggleCard.title = 'புகைப்படத்தை மட்டும் பார் (சுருக்கு)';
    }
  }

  btnToggleCard.addEventListener('click', () => toggleCardCollapse());

  // Live Animated Baby Video Background Toggle
  btnToggleVideoBg.addEventListener('click', () => {
    isLiveVideoActive = !isLiveVideoActive;
    if (isLiveVideoActive) {
      bgVideoLive.play();
      bgVideoLive.classList.add('active');
      btnToggleVideoBg.textContent = 'நிறுத்து';
      btnToggleVideoBg.classList.add('bg-amber-200');
    } else {
      bgVideoLive.pause();
      bgVideoLive.classList.remove('active');
      btnToggleVideoBg.textContent = 'இயக்கு';
      btnToggleVideoBg.classList.remove('bg-amber-200');
    }
  });

  // Replay Envelope Video
  btnReplayEnvelope.addEventListener('click', () => {
    transitionTriggered = false;
    isEnvelopeOpened = false;

    // Reset video layer
    videoLayer.style.display = 'block';
    videoLayer.style.opacity = '1';
    videoLayer.style.pointerEvents = 'auto';

    videoEnvelope.currentTime = 0;
    videoEnvelope.pause();

    if (btnSkipVideo) {
      btnSkipVideo.style.opacity = '0';
      btnSkipVideo.style.pointerEvents = 'none';
    }

    // Reset seal button
    sealHotspot.style.transition = 'none';
    sealHotspot.style.transform = 'translate(-50%, -50%) scale(1)';
    sealHotspot.style.opacity = '1';
    sealHotspot.style.pointerEvents = 'auto';
  });

  // =========================================================================
  // 5. COUNTDOWN TIMER
  // =========================================================================

  // Auspicious Muhurtham: May 24, 2026 at 09:15 AM
  const targetDate = new Date('2026-05-24T09:15:00+05:30').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
      document.getElementById('cd-days').textContent = '00';
      document.getElementById('cd-hours').textContent = '00';
      document.getElementById('cd-mins').textContent = '00';
      document.getElementById('cd-secs').textContent = '00';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('cd-days').textContent = String(days).padStart(2, '0');
    document.getElementById('cd-hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('cd-mins').textContent = String(mins).padStart(2, '0');
    document.getElementById('cd-secs').textContent = String(secs).padStart(2, '0');
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();

  // =========================================================================
  // 6. ADD TO CALENDAR (Google Calendar & .ics Download)
  // =========================================================================

  btnAddCalendar.addEventListener('click', () => {
    const title = encodeURIComponent("பேபி. ஜீஷிகா காதுகுத்து விழா (Baby Jeeshika Ear Piercing Ceremony)");
    const details = encodeURIComponent("எங்கள் அன்பு மகள் பேபி. ஜீஷிகாவின் செவிப்பொன் சேர்ப்பு விழா சுபமுகூர்த்த நன்னாள். இடம்: ஶ்ரீ அங்காளம்மன் கோவில், கொக்கலை, மரப்பாறை, தமிழ்நாடு – 637410.");
    const location = encodeURIComponent("Sri Angalamman Temple, Kokkalai, Marapparai, Tamil Nadu – 637410");
    // Start: 20270118T120000, End: 20270118T130000
    const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20270118T063000Z/20270118T073000Z&details=${details}&location=${location}`;

    // Prompt user with choices or trigger ics
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Jeeshika Invitation//EN',
      'BEGIN:VEVENT',
      'SUMMARY:பேபி. ஜீஷிகா செவிப்பொன் சேர்ப்பு விழா',
      'DESCRIPTION:Baby Jeeshika Ear Piercing Ceremony',
      'LOCATION:Sri Angalamman Temple, Kokkalai, Marapparai, Tamil Nadu – 637410',
      'DTSTART:20270118T063000Z',
      'DTEND:20270118T073000Z',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'Baby_Jeeshika_Ear_Piercing.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Also open Google Calendar in new tab as convenience
    window.open(googleCalUrl, '_blank');
  });

  // =========================================================================
  // 7. WHATSAPP INVITATION SHARE
  // =========================================================================

  btnShareWhatsapp.addEventListener('click', () => {
    const shareText = `🌸 *அன்போடு அழைக்கின்றோம்!* 🌸\n\nஎங்களின் இல்லத்து இளவரசி *பேபி. ஜீஷிகாவின் செவிப்பொன் சேர்ப்பு விழா* சுபமுகூர்த்த நன்னாளிற்கு தாங்களும் தங்கள் குடும்பத்தாரும் வருகை தந்து எமது செல்வ மகளை ஆசீர்வதிக்க அன்புடன் வேண்டுகிறோம். ✨\n\n📅 *நாள்:* 18 ஜனவரி 2027, திங்கட்கிழமை (மதியம் 12:00 - 1:00)\n🏛️ *இடம்:* ஶ்ரீ அங்காளம்மன் கோவில், கொக்கலை, மரப்பாறை, தமிழ்நாடு – 637410\n\n✨ *டிஜிட்டல் அழைப்பிதழ் காண:* ${window.location.href}`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  });

  // =========================================================================
  // 8. INTERACTIVE GUEST BLESSING WALL
  // =========================================================================

  const defaultWishes = [
    { name: "தாய்மாமன் செந்தில்குமார்", msg: "குலவிளக்கு ஜீஷிகா குட்டி ஆரோக்கியமும் எல்லா நலனும் பெற்று நூறாண்டு காலம் வாழ்க! 🌸", time: "முன்னதாக" },
    { name: "கவிதா அத்தை", msg: "அன்பு மருமகள் ஜீஷிகாவுக்கு என் மனமார்ந்த ஆசிகள்! சீரும் சிறப்புடன் வாழ்க! 💖", time: "முன்னதாக" },
    { name: "ரமேஷ் & குடும்பத்தினர்", msg: "தெய்வ அருள் நிறைந்து வளமோடு பல்லாண்டு வாழ நல்வாழ்த்துக்கள்! ✨", time: "முன்னதாக" }
  ];

  function getStoredWishes() {
    try {
      const stored = localStorage.getItem('jeeshika_wishes');
      return stored ? JSON.parse(stored) : defaultWishes;
    } catch (e) {
      return defaultWishes;
    }
  }

  function saveWishes(list) {
    try {
      localStorage.setItem('jeeshika_wishes', JSON.stringify(list));
    } catch (e) { }
  }

  function renderWishes() {
    const wishes = getStoredWishes();
    wishesCount.textContent = `(${wishes.length})`;
    wishesContainer.innerHTML = '';

    wishes.forEach(w => {
      const item = document.createElement('div');
      item.className = 'bg-white/80 p-1.5 rounded-lg border border-amber-200/60 text-[11px]';
      item.innerHTML = `
        <div class="flex items-center justify-between font-bold text-[#6B1D2F]">
          <span>${escapeHTML(w.name)}</span>
          <span class="text-[9px] text-gray-500 font-normal">${escapeHTML(w.time || 'சமீபத்தில்')}</span>
        </div>
        <p class="text-gray-700 mt-0.5 leading-snug font-tamil-serif">${escapeHTML(w.msg)}</p>
      `;
      wishesContainer.appendChild(item);
    });
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
  }

  // Quick preset chips
  wishChips.forEach(chip => {
    chip.addEventListener('click', () => {
      wishMsgInput.value = chip.textContent.trim();
      wishMsgInput.focus();
    });
  });

  // Submit new wish
  wishForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = wishNameInput.value.trim();
    const msg = wishMsgInput.value.trim();
    if (!name || !msg) return;

    const wishes = getStoredWishes();
    wishes.unshift({
      name: name,
      msg: msg,
      time: 'இப்போது'
    });
    saveWishes(wishes);
    renderWishes();

    // Trigger celebration confetti
    triggerCardConfetti();

    wishNameInput.value = '';
    wishMsgInput.value = '';
  });

  function triggerCardConfetti() {
    const cardRect = mainGlassCard.getBoundingClientRect();
    const colors = ['#D4AF37', '#FF6B8B', '#FFE58F', '#6B1D2F', '#48BB78', '#FFF'];

    for (let i = 0; i < 28; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      piece.style.left = (cardRect.width / 2 + (Math.random() - 0.5) * 120) + 'px';
      piece.style.top = '40px';
      piece.style.setProperty('--tx', `${(Math.random() - 0.5) * 200}px`);
      piece.style.setProperty('--ty', `${Math.random() * 160 + 60}px`);
      piece.style.setProperty('--rot', `${Math.random() * 720 - 360}deg`);

      mainGlassCard.appendChild(piece);
      setTimeout(() => piece.remove(), 1800);
    }
  }

  renderWishes();
});
