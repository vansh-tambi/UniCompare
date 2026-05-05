import fs from 'fs';

const content = fs.readFileSync('C:\\Users\\hp\\.gemini\\antigravity\\brain\\fa6f2d53-34fe-4571-b00a-5de7d06b5bc8\\.system_generated\\steps\\457\\content.md', 'utf-8');

const nitMatches = content.matchAll(/### JEE Main 2023 cutoff for (NIT [\w\s,]+)[\s\S]+?Computer Science and Engineering[\s\S]+?Open\n\d+\n(\d+)\n(\d+)/g);

const colleges = [];
for (const match of nitMatches) {
  const name = match[1].trim();
  const cutoff = parseInt(match[3]); // Other State Open
  colleges.push({
    name,
    cutoffRank: cutoff,
    examType: 'JEE_MAIN'
  });
}

console.log(JSON.stringify(colleges, null, 2));
