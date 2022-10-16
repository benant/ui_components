const fs = require('fs');
const showdown = require('showdown')
const converter = new showdown.Converter()

console.log("Converting Markdown to HTML...");

// markdown source
const content = fs.readFileSync("README.md", 'utf8');

// converted to HTML
const rendered = converter.makeHtml(content);

// gen index.html
const htmlFile = `<!DOCTYPE html><html lang="ko"><head><meta charset="UTF-8" /><title>Web UI Components</title><link rel="stylesheet" href="retro.css"></head><body>${rendered}</body></html>`;
fs.writeFileSync("./index.html", htmlFile, {encoding:'utf8'});
console.log("HTML generated.");

