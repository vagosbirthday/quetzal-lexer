export type TokenType =
  | "NUMBER"
  | "IDENTIFIER"
  | "STRING"
  | "CHAR"
  | "KEYWORD"
  | "OPERATOR";

export interface Token {
  value: string;
  type: TokenType;
  line: number;
}