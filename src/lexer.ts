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

export class Lexer {
  private input: string;
  private pos = 0;
  private line = 1;

  constructor(input: string) {
    this.input = input;
  }

  private peek(): string {
  return this.input[this.pos] ?? "";
}

  private advance(): string {
    const char = this.input[this.pos++] ?? "";
    if (char === "\n") this.line++;
    return char;
    }
    
  tokenize(): Token[] {
    const tokens: Token[] = [];

    while (this.pos < this.input.length) {
      let char = this.peek();

      if (/\s/.test(char)) {
        let value = "";
        while (/\s/.test(this.peek())) {
          value += this.advance();
        }
        tokens.push({ value, type: "WHITESPACE", line: this.line });
      }

      else if (char === "/" && this.input[this.pos + 1] === "/") {
        let value = "";
        while (this.peek() !== "\n" && this.pos < this.input.length) {
          value += this.advance();
        }
        tokens.push({ value, type: "COMMENT", line: this.line });
      }

      else if (char === "/" && this.input[this.pos + 1] === "*") {
        let value = this.advance() + this.advance();
        while (
          !(this.peek() === "*" && this.input[this.pos + 1] === "/")
        ) {
          value += this.advance();
        }
        value += this.advance() + this.advance();
        tokens.push({ value, type: "COMMENT", line: this.line });
      }

      else if (char === '"') {
        let value = this.advance();
        while (this.peek() !== '"') {
          value += this.advance();
        }
        value += this.advance();
        tokens.push({ value, type: "STRING", line: this.line });
      }

      else if (char === "'") {
        let value = this.advance();
        while (this.peek() !== "'") {
          value += this.advance();
        }
        value += this.advance();
        tokens.push({ value, type: "CHAR", line: this.line });
      }

      else if (/[0-9]/.test(char)) {
        let value = "";
        while (/[0-9]/.test(this.peek())) {
          value += this.advance();
        }
        tokens.push({ value, type: "NUMBER", line: this.line });
      }

      else if (/[a-zA-Z_]/.test(char)) {
        let value = "";
        while (/[a-zA-Z0-9_]/.test(this.peek())) {
          value += this.advance();
        }

        const type: TokenType = KEYWORDS.has(value)
          ? "KEYWORD"
          : "IDENTIFIER";

        tokens.push({ value, type, line: this.line });
      }

      else {
        tokens.push({
          value: this.advance(),
          type: "OPERATOR",
          line: this.line,
        });
      }
    }

    return tokens;
  }
}