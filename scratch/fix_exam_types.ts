import fs from 'fs';
import { colleges } from '../data/colleges';

const updatedColleges = colleges.map(college => {
  let examType = 'JEE_MAIN';
  if (college.name.startsWith('IIT')) {
    examType = 'JEE_ADVANCED';
  } else if (college.name.includes('AIIMS')) {
    examType = 'NEET';
  }
  return { ...college, examType };
});

const output = `export const colleges = ${JSON.stringify(updatedColleges, null, 2)};\n`;
fs.writeFileSync('C:\\Users\\hp\\OneDrive\\Desktop\\UniCompare\\data\\colleges.ts', output);
console.log('Updated exam types for all colleges.');
