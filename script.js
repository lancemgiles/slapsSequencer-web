/*
	SLAPS (SLAPS Like A Punk Song) Web Audio Sequencer
	Copyright (C) 2023, Lance Giles & Dogman Devices

	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/


console.clear();

//setup
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

//volume controls
const gainNode = audioCtx.createGain();
const volumeControl = document.querySelector('[data-action="volume"]');
volumeControl.addEventListener('input', function() {
	gainNode.gain.value = this.value;
}, false);

// A minor pentatonic scale
const A3 = 220;
const C4 = 261.63;
const D4 = 293.66;
const E4 = 329.63;
const G4 = 392;
const A4 = 440;

// time
let tempo = 60.0;
const bpmControl = document.querySelector("#bpm");
const bpmValEl = document.querySelector("#bpmval");

bpmControl.addEventListener("input",(ev) => {
	tempo = parseInt(ev.target.value, 10);
  //bpmValEl.innerText = tempo;
}, false);

const lookahead = 25.0; //how often to call scheduling function in ms
const scheduleAheadTime = 0.1; //how far ahead to schedule in seconds

let currentNote = 0;
let nextNoteTime = 0.0;
let meter = 8; // number of steps in sequencer
function nextNote() {
	const secondsPerBeat = 60.0 / tempo;
	nextNoteTime += secondsPerBeat;
	currentNote = (currentNote + 1) % meter;
}
// oscillators

const sweepLength = 1;
const releaseTime = 0.5;
const attackTime = 0.2;
const sweepEnv = new GainNode(audioCtx);

function playOsc1(time) {
	const osc1 = new OscillatorNode(audioCtx, {
		frequency: A3,
		type: "triangle"
	});
	// sweepEnv.gain.cancelScheduledValues(time);
	// sweepEnv.gain.setValueAtTime(0, time);
	// sweepEnv.gain.linearRampToValueAtTime(1, time + attackTime);
	// sweepEnv.gain.linearRampToValueAtTime(
	// 	0,
	//   time + sweepLength - releaseTime
	// );
	// osc1.connect(sweepEnv).connect(audioCtx.destination);
	osc1.connect(audioCtx.destination);
	osc1.start(time);
	osc1.stop(time + sweepLength);
}
function playOsc2(time) {
	const osc2 = new OscillatorNode(audioCtx, {
		frequency: C4,
		type: "triangle"
	});
	osc2.connect(audioCtx.destination);
	osc2.start(time);
	osc2.stop(time + sweepLength);
}
function playOsc3(time) {
	const osc3 = new OscillatorNode(audioCtx, {
		frequency: D4,
		type: "triangle"
	});
	osc3.connect(audioCtx.destination);
	osc3.start(
		time);
	osc3.stop(time + sweepLength);
}
function playOsc4(time) {
	const osc4 = new OscillatorNode(audioCtx, {
		frequency: E4,
		type: "triangle"
	});
	osc4.connect(audioCtx.destination);
	osc4.start(
		time);
	osc4.stop(time + sweepLength);
}
function playOsc5(time) {
	const osc5 = new OscillatorNode(audioCtx, {
		frequency: G4,
		type: "triangle"
	});
	osc5.connect(audioCtx.destination);
	osc5.start(
		time);
	osc5.stop(time + sweepLength);
}
function playOsc6(time) {
	const osc6 = new OscillatorNode(audioCtx, {
		frequency: A4,
		type: "triangle"
	});
	osc6.connect(audioCtx.destination);
	osc6.start(
		time);
	osc6.stop(time + sweepLength);
}

const pads = document.querySelectorAll(".pads");

// Sequencer
const notesInQueue = [];

function scheduleNote(beatNumber, time) {
	notesInQueue.push({ note: beatNumber, time: time });

	if (pads[0].querySelectorAll("input")[beatNumber].checked) {
		playOsc1(time);
	}
	if (pads[1].querySelectorAll("input")[beatNumber].checked) {
		playOsc2(time);
	}
	if (pads[2].querySelectorAll("input")[beatNumber].checked) {
		playOsc3(time);
	}
	if (pads[3].querySelectorAll("input")[beatNumber].checked) {
		playOsc4(time);
	}
	if (pads[4].querySelectorAll("input")[beatNumber].checked) {
		playOsc5(time);
	}
	if (pads[5].querySelectorAll("input")[beatNumber].checked) {
		playOsc6(time);
	}
}

let timerID;
function scheduler() {
	while (nextNoteTime < audioCtx.currentTime + scheduleAheadTime) {
		scheduleNote(currentNote, nextNoteTime);
		nextNote();
	}
	timerID = setTimeout(scheduler, lookahead);
}

// animation
let lastNoteDrawn = meter - 1;
function draw() {
	let drawNote = lastNoteDrawn;
  const currentTime = audioCtx.currentTime;
  while (notesInQueue.length && notesInQueue[0].time < currentTime) {
    drawNote = notesInQueue[0].note;
    notesInQueue.shift();
  }
  if (lastNoteDrawn !== drawNote) {
    pads.forEach((pad) => {
      pad.querySelectorAll(".checkmark")[lastNoteDrawn].style.borderColor = "var(--normal)";
      pad.querySelectorAll(".checkmark")[drawNote].style.borderColor = "var(--highlight)";
    });
    lastNoteDrawn = drawNote;
  }
  requestAnimationFrame(draw);
}

// playback
const playButton = document.querySelector("#playBtn");
let isPlaying = false;

playButton.addEventListener("click", (ev) => {
	isPlaying = !isPlaying;

	if (isPlaying) {
		if (audioCtx.state === "suspended") {
			audioCtx.resume();
		}
		currentNote = 0;
		nextNoteTime = audioCtx.currentTime;
		scheduler();
		requestAnimationFrame(draw);
		ev.target.dataset.playing = "true";
	} else {
		clearTimeout(timerID);
		ev.target.dataset.playing = "false";
	}
});
