import React from 'react';

const escapeHtml = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const jsKeywords = [
  'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while',
  'switch', 'case', 'default', 'break', 'continue', 'new', 'class', 'extends',
  'import', 'from', 'export', 'async', 'await', 'try', 'catch', 'throw', 'typeof',
  'instanceof', 'this', 'super', 'null', 'undefined', 'true', 'false', 'in', 'of'
].join('|');

const csharpKeywords = [
  'public', 'private', 'protected', 'internal', 'static', 'void', 'string',
  'int', 'bool', 'float', 'double', 'decimal', 'class', 'namespace', 'using',
  'new', 'return', 'var', 'if', 'else', 'switch', 'case', 'default', 'break',
  'continue', 'foreach', 'for', 'while', 'do', 'try', 'catch', 'finally', 'throw',
  'true', 'false', 'null', 'this', 'base', 'override', 'virtual', 'sealed'
].join('|');

const highlightText = (text, language) => {
  const keywordPattern = new RegExp(`\\b(${language === 'csharp' ? csharpKeywords : jsKeywords})\\b`, 'g');
  return text
    .replace(/(\/\/[^\n]*)/g, '<span class="token comment">$1</span>')
    .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="token comment">$1</span>')
    .replace(/(`(?:\\.|[^`])*`)/g, '<span class="token string">$1</span>')
    .replace(/("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')/g, '<span class="token string">$1</span>')
    .replace(/\b(0x[0-9a-fA-F]+|\d+\.?\d*|\.\d+)\b/g, '<span class="token number">$1</span>')
    .replace(keywordPattern, '<span class="token keyword">$1</span>')
    .replace(/\b(true|false|null|undefined)\b/g, '<span class="token boolean">$1</span>');
};

const formatCode = (text, language) => {
  const escaped = escapeHtml(text);
  return highlightText(escaped, language);
};

export default function CodeBlock({ language = 'js', text, className }) {
  return (
    <pre className={className ? `code-block ${className}` : 'code-block'}>
      <code className={`language-${language}`} dangerouslySetInnerHTML={{ __html: formatCode(text, language) }} />
    </pre>
  );
}
