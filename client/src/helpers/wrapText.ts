export function wrapText(text: string, maxLineLength = 30) {
  let wrappedText = '';
  let currentLine = '';

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    currentLine += char;

    if (currentLine.length >= maxLineLength) {
      wrappedText += currentLine + '\n';
      currentLine = '';
    }
  }

  if (currentLine) {
    wrappedText += currentLine;
  }

  return wrappedText;
}
