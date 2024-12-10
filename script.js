const jsonVal = [
    "apple",
    "banana",
    "orange",
    "grape",
    "kiwi",
    "pear",
    "peach",
    "plum",
    "melon",
    "lemon",
    "pineapple",
    "mango",
    "papaya",
    "coconut",
    "strawberry",
    "blueberry",
    "raspberry",
    "blackberry",
    "cherry",
    "apricot",
    "tomato",
    "carrot",
    "potato",
    "onion",
    "garlic",
    "pepper",
    "lettuce",
    "broccoli",
    "spinach",
    "zucchini",
    "cucumber",
    "celery",
    "cauliflower",
    "asparagus",
    "mushroom",
    "pumpkin",
    "radish",
    "beetroot",
    "turnip",
    "parsnip",
    "elephant",
    "giraffe",
    "tiger",
    "lion",
    "cheetah",
    "leopard",
    "zebra",
    "rhino",
    "hippo",
    "buffalo",
    "kangaroo",
    "koala",
    "panda",
    "sloth",
    "chimpanzee",
    "gorilla",
    "orangutan",
    "lemur",
    "meerkat",
    "otter",
    "shark",
    "whale",
    "dolphin",
    "seal",
    "octopus",
    "jellyfish",
    "lobster",
    "crab",
    "shrimp",
    "starfish",
    "eagle",
    "sparrow",
    "parrot",
    "penguin",
    "ostrich",
    "flamingo",
    "peacock",
    "hummingbird",
    "owl",
    "falcon",
    "house",
    "apartment",
    "mansion",
    "cottage",
    "bungalow",
    "castle",
    "villa",
    "shack",
    "chalet",
    "palace",
    "bed",
    "chair",
    "table",
    "desk",
    "sofa",
    "couch",
    "cabinet",
    "wardrobe",
    "bookshelf",
    "dresser",
    "car",
    "bicycle",
    "motorcycle",
    "scooter",
    "truck",
    "bus",
    "train",
    "airplane",
    "helicopter",
    "boat",
    "submarine",
    "rocket",
    "spaceship",
    "hovercraft",
    "tram",
    "trolley",
    "taxi",
    "ferry",
    "yacht",
    "canoe",
    "violin",
    "guitar",
    "piano",
    "trumpet",
    "flute",
    "drums",
    "clarinet",
    "saxophone",
    "cello",
    "harp",
    "concert",
    "symphony",
    "melody",
    "harmony",
    "rhythm",
    "tempo",
    "note",
    "scale",
    "chord",
    "tune",
    "dog",
    "cat",
    "rabbit",
    "hamster",
    "goldfish",
    "parakeet",
    "ferret",
    "guinea",
    "chinchilla",
    "gerbil",
    "winter",
    "spring",
    "summer",
    "autumn",
    "snow",
    "rain",
    "hail",
    "sleet",
    "fog",
    "storm",
    "mountain",
    "river",
    "lake",
    "ocean",
    "forest",
    "desert",
    "valley",
    "canyon",
    "island",
    "waterfall",
    "kitchen",
    "bathroom",
    "bedroom",
    "livingroom",
    "garage",
    "basement",
    "attic",
    "hallway",
    "balcony",
    "patio",
    "science",
    "history",
    "math",
    "geography",
    "chemistry",
    "biology",
    "physics",
    "astronomy",
    "literature",
    "philosophy",
    "football",
    "basketball",
    "tennis",
    "golf",
    "soccer",
    "baseball",
    "hockey",
    "cricket",
    "rugby",
    "volleyball",
  ];
  const myArray = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  let container = document.getElementById("container");
  let guessedLetters = [];
  let inputBoxes = [];
  let remainingTries = 8; // Set max tries (wrong guesses)
  const hangmanImage = document.getElementById("hangman-image");

  //creating buttons
  for (i = 0; i < myArray.length; i++) {
    const myBtn = document.createElement("button");
    myBtn.textContent = myArray[i];
    myBtn.value = myArray[i];
    myBtn.classList.add("custom-button");
    container.appendChild(myBtn);
  }

  //generating random word
  const word = document.getElementById("word");
  const randomIndex = Math.floor(Math.random() * jsonVal.length);
  const randomWord = jsonVal[randomIndex];
  word.innerHTML = randomWord;

  //displaying input boxes
  const display = document.getElementById("display-word");
  for (j = 0; j < randomWord.length; j++) {
    const input = document.createElement("input");
    input.type = "text";
    input.readOnly = true; // Prevent manual input
    input.maxLength = 1; // Allow only one character per box
    input.classList.add("myInput");
    display.appendChild(input);
    inputBoxes.push(input); // Store input box references
  }

  function updateHangmanImage() {
    if (remainingTries <= 0) {
      hangmanImage.src = "./images/h-10.jpg"; //final image
    } else {
      hangmanImage.src = `./images/h-${10 - remainingTries}.jpg`; //changin image
    }
  }

  // Handling button clicks
  document.querySelectorAll(".custom-button").forEach((button) => {
    button.addEventListener("click", () => {
      const guessedLetter = button.value.toLowerCase();

      let isCorrectGuess = false;
      // Check the guessed letter against the word
      for (let i = 0; i < randomWord.length; i++) {
        if (randomWord[i] === guessedLetter) {
          inputBoxes[i].value = guessedLetter; // Correct guess, update the box
          isCorrectGuess = true;
        }
      }
      // If wrong guess
      if (!isCorrectGuess) {
        remainingTries--; // Decrease remaining tries
        updateHangmanImage(); // Update the hangman image based on remaining tries

        // Disable the button after a guess
        button.disabled = true;
        button.style.backgroundColor = "tomato"; // Optionally change color for wrong guesses
      }
      // Check if player has lost or won
      if (remainingTries === 0) {
        alert("Game Over! You lost. Try again.");
        disableAllButtons(); // Disable all buttons when game over
        location.reload();
      } else if (isWordGuessed()) {
        alert("You won! Congratulations!");
        disableAllButtons(); // Disable all buttons when player wins
        location.reload();
      }
    });
  });
  // Function to check if the word has been completely guessed
  function isWordGuessed() {
    return inputBoxes.every((input) => input.value !== "");
  }
  // Disable all buttons
  function disableAllButtons() {
    document
      .querySelectorAll(".custom-button")
      .forEach((button) => (button.disabled = true));
  }