// src/utils/textGenerator.js
const texts = [
  "Practice makes a man perfect.",
  "Typing fast helps you code better.",
  "Consistency is the key to success.",
  "Never stop learning new things.",
];

export const getRandomText = () => {
  return texts[Math.floor(Math.random() * texts.length)];
};
