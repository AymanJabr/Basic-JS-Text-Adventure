//contains the text element, so that we can manipulate the text
const textElement = document.getElementById("text");
//contains the group of 4 option buttons, used to make the player interact with the game
const optionButtonsElement = document.getElementById("option-buttons");

//used to define the current state of
//the player, such as what items he has
//and stats
let state = {};

//starts the game by initializing state to nothing and getting the first Text node
function startGame() {
  state = {};
  showTextNode(1);
}

//takes the index of a node, and shows the text at that node?
function showTextNode(textNodeIndex) {
  //gets the node whose id is passed as an argument
  const textNode = textNodes.find((textNode) => textNode.id === textNodeIndex);
  //sets the text to the one of the current node
  textElement.innerText = textNode.text;
  //removes all previous buttons from the options-buttons element
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild);
  }

  //gets the options element of the current text node, and for each child of the options element...
  textNode.options.forEach((option) => {
    //if showOption returns true for that option element
    if (showOption(option)) {
      //creates a button for each option
      const button = document.createElement("button");
      //adds the text element to the button, adds the class 'btn' to it and sets an event listener for it to take it to the selectOptions function
      button.innerText = option.text;
      button.classList.add("btn");
      button.addEventListener("click", () => selectOption(option));
      //add button to the options-buttons element
      optionButtonsElement.appendChild(button);
    }
  });
}

//returns true if the option element has no required states of if the required state is present in the state{} object
function showOption(option) {
  return option.requiredState == null || option.requiredState(state);
}

//function called when a button is selected
function selectOption(option) {
  //the next option id is saved, if this is the last node, the game is reset
  const nextTextNodeId = option.nextText;
  if (nextTextNodeId <= 0) {
    return startGame();
  }
  //the state is updated, and the next node is shown
  state = Object.assign(state, option.setState);
  showTextNode(nextTextNodeId);
}

//the actual game, using textNodes
const textNodes = [
  {
    id: 1,
    text:
      "You wake up in a strange place and you see a jar of blue goo near you.",
    options: [
      {
        text: "Take the goo",
        setState: { blueGoo: true },
        nextText: 2,
      },
      {
        text: "Leave the goo",
        nextText: 2,
      },
    ],
  },
  {
    id: 2,
    text:
      "You venture forth in search of answers to where you are when you come across a merchant.",
    options: [
      {
        text: "Trade the goo for a sword",
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, sword: true },
        nextText: 3,
      },
      {
        text: "Trade the goo for a shield",
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, shield: true },
        nextText: 3,
      },
      {
        text: "Ignore the merchant",
        nextText: 3,
      },
    ],
  },
  {
    id: 3,
    text:
      "After leaving the merchant you start to feel tired and stumble upon a small town next to a dangerous looking castle.",
    options: [
      {
        text: "Explore the castle",
        nextText: 4,
      },
      {
        text: "Find a room to sleep at in the town",
        nextText: 5,
      },
      {
        text: "Find some hay in a stable to sleep in",
        nextText: 6,
      },
    ],
  },
  {
    id: 4,
    text:
      "You are so tired that you fall asleep while exploring the castle and are killed by some terrible monster in your sleep.",
    options: [
      {
        text: "Restart",
        nextText: -1,
      },
    ],
  },
  {
    id: 5,
    text:
      "Without any money to buy a room you break into the nearest inn and fall asleep. After a few hours of sleep the owner of the inn finds you and has the town guard lock you in a cell.",
    options: [
      {
        text: "Restart",
        nextText: -1,
      },
    ],
  },
  {
    id: 6,
    text:
      "You wake up well rested and full of energy ready to explore the nearby castle.",
    options: [
      {
        text: "Explore the castle",
        nextText: 7,
      },
    ],
  },
  {
    id: 7,
    text:
      "While exploring the castle you come across a horrible monster in your path.",
    options: [
      {
        text: "Try to run",
        nextText: 8,
      },
      {
        text: "Attack it with your sword",
        requiredState: (currentState) => currentState.sword,
        nextText: 9,
      },
      {
        text: "Hide behind your shield",
        requiredState: (currentState) => currentState.shield,
        nextText: 10,
      },
      {
        text: "Throw the blue goo at it",
        requiredState: (currentState) => currentState.blueGoo,
        nextText: 11,
      },
    ],
  },
  {
    id: 8,
    text: "Your attempts to run are in vain and the monster easily catches.",
    options: [
      {
        text: "Restart",
        nextText: -1,
      },
    ],
  },
  {
    id: 9,
    text:
      "You foolishly thought this monster could be slain with a single sword.",
    options: [
      {
        text: "Restart",
        nextText: -1,
      },
    ],
  },
  {
    id: 10,
    text: "The monster laughed as you hid behind your shield and ate you.",
    options: [
      {
        text: "Restart",
        nextText: -1,
      },
    ],
  },
  {
    id: 11,
    text:
      "You threw your jar of goo at the monster and it exploded. After the dust settled you saw the monster was destroyed. Seeing your victory you decide to claim this castle as your and live out the rest of your days there.",
    options: [
      {
        text: "Congratulations. Play Again.",
        nextText: -1,
      },
    ],
  },
];

startGame();
