// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  /**
   * select type of voice from drop-down
   */
  const synth = window.speechSynthesis;
  const voiceSelect = document.querySelector("#voice-select");
  let voices = [];

  function populateVoiceList() {
    // get voices
    voices = synth.getVoices();

    // clear out dropdown options
    voiceSelect.innerHTML = "";

    // default
    const defaultOption = document.createElement("option");
    defaultOption.textContent = "Select Voice";
    voiceSelect.appendChild(defaultOption); // add to drop-down

    // loop through voices array
    for (let i = 0; i < voices.length; i++) {
        const option = document.createElement("option");

        option.textContent = `${voices[i].name} (${voices[i].lang})`;
        option.value = voices[i].name;
        option.idx = i;

        voiceSelect.appendChild(option); // add to drop-down
    }
  }

  /**
   * Speech synthesizer is loaded
   */
  populateVoiceList();
  if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = populateVoiceList;
  }

  /**
   * Button click
   */
  const button = document.querySelector("button");
  const textbox = document.querySelector("#text-to-speak");

  button.addEventListener("click", () => {
    const utterance = new SpeechSynthesisUtterance(textbox.value);
    utterance.voice = voices[voiceSelect.idx];

    // change face
    const smileImg = document.querySelector("img");

    // mouth is open
    utterance.addEventListener("start", () => {
        smileImg.src = "assets/images/smiling-open.png";
    });

    // mouth closed
    utterance.addEventListener("end", () => {
        smileImg.src = "assets/images/smiling.png";
    });

    // synthesizer speak
    synth.speak(utterance);

  });
}