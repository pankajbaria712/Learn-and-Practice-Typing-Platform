const codeSnippets = [
  `function add(a, b) {
      return a + b;
    }`,

  `for (let i = 0; i < 10; i++) {
      console.log(i);
    }`,

  `const greet = (name) => {
      console.log("Hello, " + name);
    };`,
];

export function getRandomCodeSnippet() {
  return codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
}
