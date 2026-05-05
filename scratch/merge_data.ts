import fs from 'fs';
import { colleges } from '../data/colleges';
import { iits } from '../data/new_iits';

// Filter out old mock IITs
const nonIITs = colleges.filter(c => !c.name.startsWith('IIT '));

// Merge new IITs
const finalColleges = [...iits, ...nonIITs];

const output = `export const colleges = ${JSON.stringify(finalColleges, null, 2)};\n`;
fs.writeFileSync('C:\\Users\\hp\\OneDrive\\Desktop\\UniCompare\\data\\colleges.ts', output);
console.log(`Merged ${iits.length} IITs and ${nonIITs.length} other colleges.`);
