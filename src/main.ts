import * as fs from "fs";
import { Lexer } from "./lexer";

const file = process.argv[2];

if (!file) {
  console.error("Usa: npx ts-node src/main.ts archivo.quetzal");
  process.exit(1);
}

const code = fs.readFileSync(file, "utf-8");

const lexer = new Lexer(code);
const tokens = lexer.tokenize();

tokens.forEach((t) => {
  console.log(`Token: ${t.value} | Line: ${t.line} | Type: ${t.type}`);
});