import React from 'react';

export default function CodeBlock({ language, text, className }) {
  return (
    <pre className={className ? `code-block ${className}` : 'code-block'}>
      <code>{text}</code>
    </pre>
  );
}
