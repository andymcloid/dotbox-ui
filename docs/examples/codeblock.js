const codeBlock = new Dotbox.CodeBlock({
    language: 'javascript',
    code: `function greet(name) {
    return \`Hello, \${name}!\`;
}

console.log(greet('World'));`
});

document.body.appendChild(codeBlock.getElement());