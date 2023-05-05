// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  // TODO
  /*
   * Select a Voice from the drop down menu
   */
  const synth = window.speechSynthesis;
  const voiceSelectElement = document.querySelector('#voice-select');
  let voices = [];

  function populateVoiceList() {
    // Get the available voices
    voices = synth.getVoices();

    // Clear the dropdown options
    voiceSelectElement.innerHTML = '';
  
    // Loop through the voices and add an option for each one to the dropdown
    for (let i = 0; i < voices.length; i++) {
      const option = document.createElement('option');
      option.textContent = `${voices[i].name} (${voices[i].lang})`;
      option.value = voices[i].name;
      option.idx = i;
      voiceSelectElement.appendChild(option);
    }
  }
  // When SpeechSynthesizer should be loaded, populate the “Select Voice” dropdown
  populateVoiceList();
  if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = populateVoiceList;
  }


  /*
   * Click the  “Press to Talk” button
   */
  const button = document.querySelector('button');
  const textBox = document.querySelector('#text-to-speak');

  button.addEventListener('click', () => {
  
    const utterance = new SpeechSynthesisUtterance(textBox.value); 
    utterance.voice = voices[voiceSelectElement.idx];
  
    /*
    * While the synthesizer is speaking, change the face image
    */
    const smileImg = document.querySelector('img');

    utterance.addEventListener('start', () => {
      smileImg.src = 'assets/images/smiling-open.png';
    });

    utterance.addEventListener('end', () => {
      smileImg.src = 'assets/images/smiling.png';
    });

    // Speak the text
    synth.speak(utterance);

  });

  
}
