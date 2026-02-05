import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();

const packageJsonPath = path.join(root, "package.json");
const configPath = path.join(root, "src", "lib", "config.ts");
const jsrPath = path.join(root, "jsr.json");

const packageJson = JSON.parse(await fs.readFile(packageJsonPath, "utf8"));
const version = packageJson.version;

if (!version || typeof version !== "string") {
  throw new Error("package.json version is missing or invalid");
}

async function replaceInFile(filePath, replacer) {
  const content = await fs.readFile(filePath, "utf8");
  const next = replacer(content);
  if (next !== content) {
    await fs.writeFile(filePath, next, "utf8");
  }
}

await replaceInFile(configPath, (content) =>
  content.replace(
    /export const SDK_VERSION = "[^"]+";/,
    `export const SDK_VERSION = "${version}";`,
  )
);

await replaceInFile(jsrPath, (content) => {
  const data = JSON.parse(content);
  data.version = version;
  return JSON.stringify(data, null, 2) + "\n";
});

console.log(`Synced version to ${version}`);
