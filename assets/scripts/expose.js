// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {

  /**
   * Select type of horn from drop-down
   */
  const selectHorn = document.querySelector("#horn-select");
  const hornImg = document.querySelector("#expose img");
  const audio = document.querySelector("audio");
  
  selectHorn.addEventListener("change", () => {
    const hornVal = selectHorn.value;

    // change image based on value
    hornImg.setAttribute("src", "assets/images/" + hornVal + ".svg");
    // change alt text
    hornImg.setAttribute("alt", hornVal + " selected");

    // change audio based on value
    audio.setAttribute("src", "assets/audio/" + hornVal + ".mp3");
  });

  /**
   * Volume slider
   */
  const slider = document.querySelector("#volume");
  const sliderImg = document.querySelector("#volume-controls img");

  slider.addEventListener("input", () => {
    const sliderVal = slider.value;

    // change icon and alt text
    if (sliderVal == 0) {
      sliderImg.setAttribute("src", "assets/icons/volume-level-0.svg");
      sliderImg.setAttribute("alt", "Volume level 0");
    } else if (sliderVal < 33) {
      sliderImg.setAttribute("src", "assets/icons/volume-level-1.svg");
      sliderImg.setAttribute("alt", "Volume level 1");
    } else if (sliderVal < 67) {
      sliderImg.setAttribute("src", "assets/icons/volume-level-2.svg");
      sliderImg.setAttribute("alt", "Volume level 2");
    } else {
      sliderImg.setAttribute("src", "assets/icons/volume-level-3.svg");
      sliderImg.setAttribute("alt", "Volume level 3");
    }

    // corresponding volume set to volume slider's value
    audio.volume = sliderVal / 100;
  });

  /**
   * Play audio button
   */
  const button = document.querySelector("button");

  button.addEventListener("click", () => {
    // play the audio
    audio.play();

    // check if party-horn was selected
    if (selectHorn.value === "party-horn") {
      // play confetti animation
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