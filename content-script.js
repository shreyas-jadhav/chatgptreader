let spokenText = ``;
let speaking = false;

// for half a second, check if there is `result-streaming` class;
// if there is, then we are on the results page
setInterval(function () {
  if (document.querySelector(".result-streaming")) {
    // get all the paragraphs within the `result-streaming` class
    const paragraphs = document.querySelectorAll(".result-streaming p");

    let allText = ``;
    // loop through each paragraph
    for (let i = 0; i < paragraphs.length; i++) {
      const paragraph = paragraphs[i].innerHTML;
      // speak the paragraph;
      allText += paragraph;
    }

    // remove text that is already spoken;
    allText = allText.replace(spokenText, "");

    // speak upto there is a full stop or a comma in the end;
    let nextStop = allText.lastIndexOf(`.`);
    if (nextStop === -1) {
      nextStop = allText.lastIndexOf(`!`);
    }
    if (nextStop === -1) {
      nextStop = allText.lastIndexOf(`?`);
    }
    if (nextStop === -1) {
      nextStop = allText.lastIndexOf(`,`);
    }

    if (nextStop === -1 && allText.length > 200) {
      nextStop = allText.lastIndexOf(` `);
    }

    const textToSpeak = allText.substring(0, nextStop + 1);

    spokenText += textToSpeak;
    // speak the text
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    speechSynthesis.speak(utterance);
  } else spokenText = ``;
}, 10);

console.log(`Enabled  `);
