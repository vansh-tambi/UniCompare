const fs = require('fs');

const content = fs.readFileSync('C:\\Users\\hp\\.gemini\\antigravity\\brain\\fa6f2d53-34fe-4571-b00a-5de7d06b5bc8\\.system_generated\\steps\\247\\content.md', 'utf8');
const lines = content.split('\n');

const iitsMap = new Map();
let currentIIT = null;

let started = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  
  if (line === 'Closing Rank') {
    started = true;
    continue;
  }
  
  if (!started) continue;
  if (line === '') continue;
  
  if (line.startsWith('Indian Institute of Technology') || line.startsWith('IIT ')) {
    const name = line.replace('Indian Institute of Technology', 'IIT').trim();
    if (!iitsMap.has(name)) {
      iitsMap.set(name, {
        name: name,
        location: name.replace('IIT ', ''),
        fees: 1100000,
        rating: 4.8,
        description: `Premier engineering institute: ${name}`,
        image_url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f",
        cutoffRank: null,
        examType: "JEE",
        courses: [{ name: "B.Tech CSE", duration: "4 Years" }],
        placements: [{ year: 2024, highestPackage: 150, averagePackage: 20 }],
        reviews: [{ userName: "Student", rating: 5, text: "Excellent institute." }]
      });
    }
    currentIIT = iitsMap.get(name);
    continue;
  }
  
  if (currentIIT && line === 'Computer Science and Engineering') {
    const rankStr = lines[i+1] ? lines[i+1].trim() : '';
    if (rankStr && !isNaN(parseInt(rankStr))) {
      // If we already have a rank, keep the better (lower) one or just overwrite
      const newRank = parseInt(rankStr);
      if (!currentIIT.cutoffRank || newRank > currentIIT.cutoffRank) {
         currentIIT.cutoffRank = newRank;
      }
    }
  }
}

const finalIits = Array.from(iitsMap.values()).filter(iit => iit.cutoffRank !== null);

const output = `export const iits = ${JSON.stringify(finalIits, null, 2)};\n`;
fs.writeFileSync('C:\\Users\\hp\\OneDrive\\Desktop\\UniCompare\\data\\new_iits.ts', output);
console.log(`Extracted ${finalIits.length} IITs`);
