// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
 
  /* 
   * Select a horn from the drop down menu
   */
  const hornSelectElement = document.querySelector('#horn-select');
  const hornImage = document.querySelector('#expose img');
  const audio = document.querySelector('audio');

  hornSelectElement.addEventListener('change', () => {

    // get the selected horn's value
    const hornValue = hornSelectElement.value;

    // Set the correct image for each selected horn value
    hornImage.setAttribute('src', 'assets/images/' + hornValue + '.svg');
    
    // Set the correct audio sound file for each selected horn value
    audio.setAttribute('src', 'assets/audio/' + hornValue + '.mp3');

  });
  
  /* 
   *  Change the volume on the slider
   */
  const volumeSlider = document.querySelector('#volume');
  const volumeImage = document.querySelector('#volume-controls img');

  volumeSlider.addEventListener('input', () => {

    // Get the volume slider's value
    const volumeValue = volumeSlider.value;

    // Adjust the volume icon for each the volume value
    if (volumeValue == 0) {
      volumeImage.setAttribute('src', 'assets/icons/volume-level-0.svg');
    } else if (volumeValue < 33) {
      volumeImage.setAttribute('src', 'assets/icons/volume-level-1.svg');
    } else if (volumeValue < 67) {
      volumeImage.setAttribute('src', 'assets/icons/volume-level-2.svg');
    } else {
      volumeImage.setAttribute('src', 'assets/icons/volume-level-3.svg');
    }

    // Adjust the volume audio for each the volume value
    const volume = volumeValue / 100;
    audio.volume = volume;

  });

  /* 
   *  Click the “Play Sound” button
   */
  const playButton = document.querySelector('button');

  playButton.addEventListener('click', () => {

    // Play out loud at the specified volume for each selected horn
    audio.play();

    // If the Party Horn is selected, shoot out confetti
    if (hornSelectElement.value === 'party-horn') {
      const jsConfetti = new JSConfetti();

      setTimeout(() => {
        jsConfetti.addConfetti({
          emojis: ['🎉'],
          emojiSize: 100,
          confettiNumber: 50,
        });
      }, 50);
    }

  });
}

