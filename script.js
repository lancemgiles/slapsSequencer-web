const audioCont = new (window.AudioContext || window.webkitAudioContext)();


// A minor pentatonic scale
const A3 = 220;
const C4 = 261.63;
const D4 = 293.66;
const E4 = 329.63;
const G4 = 392;
const A4 = 440;

const oscillator1 = audioCont.createOscillator();
const oscillator2 = audioCont.createOscillator();
const oscillator3 = audioCont.createOscillator();
const oscillator4 = audioCont.createOscillator();
const oscillator5 = audioCont.createOscillator();
const oscillator6 = audioCont.createOscillator();


oscillator1.type = oscillator2.type = oscillator3.type = oscillator4.type = oscillator5.type = oscillator6.type = 'triangle';


oscillator1.frequency.setValueAtTime(A3, audioCont.currentTime);
oscillator2.frequency.setValueAtTime(C4, audioCont.currentTime);
oscillator3.frequency.setValueAtTime(D4, audioCont.currentTime);
oscillator4.frequency.setValueAtTime(E4, audioCont.currentTime);
oscillator5.frequency.setValueAtTime(G4, audioCont.currentTime);
oscillator6.frequency.setValueAtTime(A4, audioCont.currentTime);
