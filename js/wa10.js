const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

const insertX = ['Spiderman', 'Batman', 'the Green Goblin'];
const insertY = ['the backyard', 'Mars', 'Australia'];
const insertZ = ['went to the bathroom', 'had to walk backwards', 'turned into a magic jumping bean'];

const storyText = 'It was a cold dreary Monday, so :insertx: bopped around town. When they got to :inserty:, their jaws dropped, then :insertz: and Bob did a 720 and did a back handspring away, and wasn’t seen again — :insertx: Bob did 30 squats, and then it was all a dream.';

randomize.addEventListener('click', result);

function randomValueFromArray(array) {
  const random = Math.floor(Math.random() * array.length);
  return array[random];
}

function result() {
  let newStory = storyText;

  const xItem = randomValueFromArray(insertX);
  const yItem = randomValueFromArray(insertY);
  const zItem = randomValueFromArray(insertZ);

  newStory = newStory.replaceAll(':insertx:', xItem);
  newStory = newStory.replaceAll(':inserty:', yItem);
  newStory = newStory.replaceAll(':insertz:', zItem);

  if (customName.value !== '') {
    const name = customName.value;
    newStory = newStory.replaceAll('Bob', name);
  }

  if (document.getElementById("uk").checked) {
    // Define old English story only for UK version
    const oldEnglishStory = 'Twas half past 12 with the clouds about, thus :insertx: strolled the village. Upon arrival, :inserty:, mouth agape in disbelief, then :insertz:. Bob hopped, skipped, and bumbled then somersaulted away; legend has it - :insertx: Bob did aerobics, then abruptly awoke from his slumber.';
    
    newStory = oldEnglishStory.replaceAll(":insertx:", xItem)
                              .replaceAll(":inserty:", yItem)
                              .replaceAll(":insertz:", zItem);
    
    if (customName.value !== '') {
      const name = customName.value;
      newStory = newStory.replaceAll('Bob', name);
    }
  }

  story.textContent = newStory;
  story.style.visibility = 'visible';
}
