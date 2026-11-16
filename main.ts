// Moon Loop — make.fun ai-excited-01 entry.
// Copies the entry image to the output directory, byte for byte.
// Deterministic: the same input always produces the same output bytes.
import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const src = join(here, "entry.png");
const dst = join(outDir, "entry.png");

const size = statSync(src).size;
if (size > 1048576) {
  throw new Error(`entry.png is ${size} bytes, over the 1 MiB limit`);
}
mkdirSync(outDir, { recursive: true });
copyFileSync(src, dst);
console.log(`wrote ${dst} (${size} bytes)`);
