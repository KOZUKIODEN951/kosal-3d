// Ambient Audio Synthesizer & Web Audio Visualizer

let audioCtx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let analyser: AnalyserNode | null = null;
let isPlaying = false;
let oscillators: OscillatorNode[] = [];
let lfo: OscillatorNode | null = null;

export const initAudio = () => {
  if (audioCtx) return;
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
    
    masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0, audioCtx.currentTime);
    
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 64;
    analyser.smoothingTimeConstant = 0.8;
    
    masterGain.connect(analyser);
    analyser.connect(audioCtx.destination);
  } catch (e) {
    console.warn('Web Audio API not supported or blocked:', e);
  }
};

export const startAmbientSoundscape = () => {
  if (!audioCtx) initAudio();
  if (!audioCtx || !masterGain) return;

  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  stopAmbientSoundscape();

  // Create harmonic chord frequencies for deep, luxurious space atmosphere (Emotion Agency vibe)
  // Chord: D minor / F major ethereal progression (73.4Hz [D2], 110Hz [A2], 146.8Hz [D3], 220Hz [A3])
  const baseFreqs = [73.42, 110.0, 146.83, 220.0];
  
  // Filter for soft analog warmth
  const filter = audioCtx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(450, audioCtx.currentTime);
  filter.Q.setValueAtTime(3, audioCtx.currentTime);

  oscillators = baseFreqs.map((freq, idx) => {
    const osc = audioCtx!.createOscillator();
    const oscGain = audioCtx!.createGain();

    osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
    osc.frequency.setValueAtTime(freq, audioCtx!.currentTime);

    // Subtle detune for rich celestial chorus
    osc.detune.setValueAtTime((idx - 1.5) * 4, audioCtx!.currentTime);

    oscGain.gain.setValueAtTime(0.08 / (idx + 1), audioCtx!.currentTime);
    osc.connect(oscGain);
    oscGain.connect(filter);
    osc.start();
    return osc;
  });

  // Slow LFO modulating the filter for breathing movement
  lfo = audioCtx.createOscillator();
  const lfoGain = audioCtx.createGain();
  lfo.frequency.setValueAtTime(0.12, audioCtx.currentTime); // 8-second cycle
  lfoGain.gain.setValueAtTime(150, audioCtx.currentTime);
  lfo.connect(lfoGain);
  lfoGain.connect(filter.frequency);
  lfo.start();

  filter.connect(masterGain);

  // Fade in master volume smoothly
  masterGain.gain.cancelScheduledValues(audioCtx.currentTime);
  masterGain.gain.setValueAtTime(0, audioCtx.currentTime);
  masterGain.gain.linearRampToValueAtTime(0.15, audioCtx.currentTime + 2.5);

  isPlaying = true;
};

export const stopAmbientSoundscape = () => {
  if (!audioCtx || !masterGain) return;

  masterGain.gain.cancelScheduledValues(audioCtx.currentTime);
  masterGain.gain.linearRampToValueAtTime(0.0001, audioCtx.currentTime + 1.2);

  setTimeout(() => {
    oscillators.forEach(osc => {
      try { osc.stop(); osc.disconnect(); } catch (e) { /* ignore */ }
    });
    oscillators = [];
    if (lfo) {
      try { lfo.stop(); lfo.disconnect(); } catch (e) { /* ignore */ }
      lfo = null;
    }
  }, 1300);

  isPlaying = false;
};

export const toggleAudio = (): boolean => {
  if (isPlaying) {
    stopAmbientSoundscape();
    return false;
  } else {
    startAmbientSoundscape();
    return true;
  }
};

export const getAudioFrequencyData = (dataArray: Uint8Array): void => {
  if (analyser && isPlaying) {
    (analyser as any).getByteFrequencyData(dataArray);
  } else {
    dataArray.fill(0);
  }
};

export const playUiChime = (type: 'hover' | 'click' | 'success' = 'hover') => {
  if (!audioCtx) initAudio();
  if (!audioCtx || audioCtx.state === 'suspended') return;

  const now = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  if (type === 'hover') {
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(1320, now + 0.08);
    gain.gain.setValueAtTime(0.015, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
    osc.start(now);
    osc.stop(now + 0.09);
  } else if (type === 'click') {
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(220, now + 0.12);
    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
    osc.start(now);
    osc.stop(now + 0.13);
  } else if (type === 'success') {
    const freqs = [523.25, 659.25, 783.99, 1046.5]; // C major arpeggio
    freqs.forEach((f, i) => {
      const noteOsc = audioCtx!.createOscillator();
      const noteGain = audioCtx!.createGain();
      noteOsc.type = 'sine';
      noteOsc.frequency.setValueAtTime(f, now + i * 0.08);
      noteGain.gain.setValueAtTime(0.04, now + i * 0.08);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.08 + 0.3);
      noteOsc.connect(noteGain);
      noteGain.connect(audioCtx!.destination);
      noteOsc.start(now + i * 0.08);
      noteOsc.stop(now + i * 0.08 + 0.35);
    });
  }
};
