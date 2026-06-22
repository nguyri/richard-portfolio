import React from 'react';
import './CodeBlock.css';

const jsKeywords = ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'import', 'export', 'true', 'false', 'null', 'undefined'];
const csharpKeywords = ['public', 'private', 'static', 'void', 'string', 'int', 'bool', 'class', 'new', 'return', 'if', 'else', 'foreach', 'true', 'false', 'null'];

const tokenizeCode = (text, language) => {
  const keywords = language === 'csharp' ? csharpKeywords : jsKeywords;

  const regex = new RegExp(
    `(\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/)|` + // 1: Comments
    `("(?:\\\\.|[^"\\\\])*"|'(?:\\\\.|[^'\\\\])*'|\`(?:\\\\.|[^\`])*\`)|` + // 2: Strings
    `\\b(${keywords.join('|')})\\b|` + // 3: Keywords
    `\\b(\\d+)\\b|` + // 4: Numbers
    `\\b(\\w+)(?=\\s*\\()|` + // 5: Function Calls
    `([\\+\\-\\*/=<>!&\\|\\{\\}\\(\\)\\[\\]\\.,;])`, // 6: Operators / Punctuation
    'g'
  );

  const nodes = [];
  let lastIndex = 0;
  let keyCounter = 0;

  text.replace(regex, (match, comment, string, keyword, number, func, punctuation, offset) => {
    if (offset > lastIndex) {
      nodes.push(text.slice(lastIndex, offset));
    }

    if (comment) {
      nodes.push(<span key={keyCounter++} className="token comment">{match}</span>);
    } else if (string) {
      nodes.push(<span key={keyCounter++} className="token string">{match}</span>);
    } else if (keyword) {
      const isBoolOrNull = ['true', 'false', 'null', 'undefined'].includes(keyword);
      nodes.push(
        <span key={keyCounter++} className={`token ${isBoolOrNull ? 'boolean' : 'keyword'}`}>
          {match}
        </span>
      );
    } else if (number) {
      nodes.push(<span key={keyCounter++} className="token number">{match}</span>);
    } else if (func) {
      nodes.push(<span key={keyCounter++} className="token function">{match}</span>);
    } else if (punctuation) {
      nodes.push(<span key={keyCounter++} className="token punctuation">{match}</span>);
    }

    lastIndex = offset + match.length;
    return match;
  });

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
};

export default function CodeBlock({ language = 'js', text, className, darkMode }) {
  // Use explicit theme modifiers for the code blocks
  const themeClass = darkMode ? 'code-block--dark' : 'code-block--light';

  return (
    <pre className={`code-block ${themeClass} ${className || ''}`}>
      <code className={`language-${language}`}>
        {tokenizeCode(text, language)}
      </code>
    </pre>
  );
}