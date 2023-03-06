//console.clear();
/*
//setup
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

//volume controls
const gainNode = audioCtx.createGain();
const volumeControl = document.querySelector('[data-action="volume"]');
volumeControl.addEventListener('input', function() {
	gainNode.gain.value = this.value;
}, false);

*/
//buttons

const db = document.getElementById('db');
const onoff = ['salmon', 'white'];

db.addEventListener('click', function onClick() {
  db.style.backgroundColor = onoff[index];
  index = index >= onoff.length - 1 ? 0 : index + 1;
});







/*



// A minor pentatonic scale
const root-pitch = 220;
const third-pitch = 261.63;
const fourth-pitch = 293.66;
const fifth-pitch = 329.63;
const seventh-pitch = 392;
const octave-pitch = 440;


const osc1 = audioCont.createOscillator();
const osc2 = audioCont.createOscillator();
const osc3 = audioCont.createOscillator();
const osc4 = audioCont.createOscillator();
const osc5 = audioCont.createOscillator();
const osc6 = audioCont.createOscillator();

osc1.type = osc2.type = osc3.type = osc4.type = osc5.type = osc6.type = 'square';

osc1.frequency.setValueAtTime(A3, audioCont.currentTime);
osc2.frequency.setValueAtTime(C4, audioCont.currentTime);
osc3.frequency.setValueAtTime(D4, audioCont.currentTime);
osc4.frequency.setValueAtTime(E4, audioCont.currentTime);
osc5.frequency.setValueAtTime(G4, audioCont.currentTime);
osc6.frequency.setValueAtTime(A4, audioCont.currentTime);


osc1.connect(audioCont.destination);
osc2.connect(audioCont.destination);
osc3.connect(audioCont.destination);
osc4.connect(audioCont.destination);
osc5.connect(audioCont.destination);
osc6.connect(audioCont.destination);

//osc6.start();
//document.getElementById("osc1").onclick = console.log("Test");
const osc1_button = document.getElementById("osc1");
if (osc1_button.addEventListener)
    osc1_button.addEventListener("click", osc1.start(), false);
else if (osc1_button.attachEvent)
    osc1_button.attachEvent('onclick', osc1.start();
*/
