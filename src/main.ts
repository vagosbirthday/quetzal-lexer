import * as fs from "fs";
import { tokenize } from "./lexer";
import { Token } from "./token";

const file = process.argv[2];

if (!file) {
  console.error("Usa: npx ts-node src/main.ts archivo.quetzal");
  process.exit(1);
}

const code = fs.readFileSync(file, "utf-8");

const tokens = tokenize(code);

tokens.forEach((t: Token) => {
  console.log(`Token: ${t.value} | Line: ${t.line} | Type: ${t.type}`);
});