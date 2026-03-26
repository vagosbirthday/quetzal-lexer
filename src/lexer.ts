import { Token, TokenType } from "./token";

const KEYWORDS = new Set([
  "var",
  "if",
  "else",
  "loop",
  "break",
  "return",
  "inc",
  "dec",
  "and",
  "not",
  "true",
  "false",
]);

function isAlpha(char: string) {
  return /[a-zA-Z_]/.test(char);
}

function isInt(char: string) {
  return /[0-9]/.test(char);
}

function isWhitespace(char: string) {
  return /\s/.test(char);
}

export function tokenize(input: string): Token[] {
  const tokens: Token[] = [];
  const src = input.split("");
  let line = 1;

  function push(value: string, type: TokenType) {
    tokens.push({ value, type, line });
  }

  while (src.length > 0) {
    let char = src[0]!;

    if (char === "\n") {
      line++;
      src.shift();
    }

    else if (isWhitespace(char)) {
      src.shift();
    }

    // 🔹 COMMENTS //
    else if (char === "/" && src[1]! === "/") {
      while (src.length > 0 && src[0] !== "\n") {
        src.shift();
      }
    }

    else if (char === "/" && src[1]! === "*") {
      src.shift(); src.shift();

      while (src.length > 1) {
      const a: string = src[0]!;
      const b: string = src[1]!;

      if (a === "*" && b === "/") break;

      if (a === "\n") line++;
      src.shift();
    }

      src.shift(); src.shift();
    }

    else if (char === '"') {
      src.shift();
      let value = "";

      while (src.length > 0 && src[0] !== '"') {
        value += src.shift()!;
      }

      src.shift();
      push(value, "STRING");
    }

    else if (char === "'") {
      src.shift();
      let value = "";

      while (src.length > 0 && src[0] !== "'") {
        value += src.shift()!;
      }

      src.shift();
      push(value, "CHAR");
    }

    else if (isInt(char)) {
      let value = "";

      while (src.length > 0 && isInt(src[0]!)) {
        value += src.shift()!;
      }

      push(value, "NUMBER");
    }

    else if (isAlpha(char)) {
      let value = "";

      while (src.length > 0 && /[a-zA-Z0-9_]/.test(src[0]!)) {
        value += src.shift()!;
      }

      if (KEYWORDS.has(value)) {
        push(value, "KEYWORD");
      } else {
        push(value, "IDENTIFIER");
      }
    }

    else if (
      (char === "=" && src[1]! === "=") ||
      (char === "!" && src[1]! === "=") ||
      (char === "<" && src[1]! === "=") ||
      (char === ">" && src[1]! === "=")
    ) {
      push(char + src[1]!, "OPERATOR");
      src.shift(); src.shift();
    }

    else {
      push(src.shift()!, "OPERATOR");
    }
  }

  return tokens;
}