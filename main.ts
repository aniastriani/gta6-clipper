// gta6-clipper-01 entry: hand the video address to the grader.
//
// The entry is the YouTube video itself; this program only passes its address
// along. It reads VIDEO.json from the repository root and writes the exact same
// bytes to /output/VIDEO.json, where the gate reads them. Nothing else is
// written, so two runs always produce the same output.
//
// Local run:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const linkPath = join(botDir, "VIDEO.json");
let linkBytes: Buffer;
try {
  linkBytes = readFileSync(linkPath);
} catch (error) {
  console.error(`cannot read ${linkPath}: ${(error as Error).message}`);
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "VIDEO.json"), linkBytes);
