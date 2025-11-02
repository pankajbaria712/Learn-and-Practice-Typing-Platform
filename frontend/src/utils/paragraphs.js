const paragraphs = [
  "Typing is an essential skill that everyone should learn to improve productivity.",
  "Practice makes perfect, and daily practice will help you type faster and more accurately.",
  "Consistency is the key to mastering typing speed and accuracy for coding or writing tasks.",
  "Use this typing practice app to monitor your progress and identify areas of improvement.",
  "Focusing on accuracy before speed will help you build a solid foundation in typing skills.",
];

const codeSnippets = [
  `function add(a, b) {\n  return a + b;\n}`,
  `const greet = (name) => {\n  console.log("Hello " + name);\n};`,
  `for (let i = 0; i < 10; i++) {\n  console.log(i);\n}`,
  `const arr = [1, 2, 3];\narr.forEach(num => console.log(num));`,
  `async function fetchData(url) {\n  const res = await fetch(url);\n  const data = await res.json();\n  return data;\n}`,
];

export function getRandomParagraph() {
  const randomIndex = Math.floor(Math.random() * paragraphs.length);
  return paragraphs[randomIndex];
}

export function getRandomCodeSnippet() {
  const randomIndex = Math.floor(Math.random() * codeSnippets.length);
  return codeSnippets[randomIndex];
}
