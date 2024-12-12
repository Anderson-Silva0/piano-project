const noteNames = [
    "C4", "C#4", "D4", "D#4",
    "E4", "F4", "F#4", "G4",
    "G#4", "A4", "A#4", "B4", "C5"
];

const noteStartSeconds = new Map([
    ["C4", 0.1],
    ["D4", 0],
    ["E4", 0],
    ["F4", 0.5],
    ["G4", 0.5],
    ["A4", 0.5],
    ["B4", 0.9],
    ["C5", 0]
]);

function generateKeys() {
    const pianoContainer = document.getElementById("piano-container");

    for (let i = 0; i < noteNames.length; i++) {
        const note = noteNames[i];

        const noteKey = document.createElement("div");
        if (!note.includes("#")) {
            noteKey.classList.add("natural-notes");
            clickEffect(noteKey, true, note);
            pianoContainer.appendChild(noteKey);
        } else {
            const lastNoteKey = pianoContainer.lastChild;
            if (lastNoteKey) {
                noteKey.classList.add("sharp-notes");
                clickEffect(noteKey, false);
                lastNoteKey.appendChild(noteKey);
            }
        }
    }
}

function clickEffect(key, isNaturalKey, noteString) {
    key.addEventListener("mousedown", (e) => {
        if (!isNaturalKey) {
            e.stopPropagation();
        }
        key.classList.add("active");
        playNoteSound(noteString);
    });

    key.addEventListener("mouseup", () => {
        key.classList.remove("active");
    });

    key.addEventListener("mouseleave", () => {
        key.classList.remove("active");
    });
}

function playNoteSound(noteString){
    var audio = new Audio(`/noteSounds/${noteString}-note.mp3`);

    if (noteStartSeconds && noteStartSeconds.has(noteString)) {
        audio.currentTime = noteStartSeconds.get(noteString);
        audio.play();
    }

    setTimeout(() => {
        audio.pause();
        audio.currentTime = 0;
    }, 2000);
}

document.addEventListener("DOMContentLoaded", () => generateKeys());