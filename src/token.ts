export type TokenType =
  | "WHITESPACE"
  | "IDENTIFIER"
  | "NUMBER"
  | "STRING"
  | "CHAR"
  | "OPERATOR"
  | "COMMENT"
  | "KEYWORD";

export interface Token {
  value: string;
  type: TokenType;
  line: number;
}