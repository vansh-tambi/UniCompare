import fs from 'fs';
import { colleges } from '../data/colleges';

const updatedColleges = colleges.map(c => {
  if (c.name === 'NIT Trichy') {
    return { ...c, image_url: '/colleges/nit_trichy.png' };
  }
  if (c.name === 'AIIMS Bhopal') {
    return { ...c, image_url: '/colleges/aiims_bhopal.png' };
  }
  if (c.image_url.includes('photo-1562774053-701939374585')) {
    return { ...c, image_url: '/colleges/generic.png' };
  }
  return c;
});

const output = `export const colleges = ${JSON.stringify(updatedColleges, null, 2)};\n`;
fs.writeFileSync('C:\\Users\\hp\\OneDrive\\Desktop\\UniCompare\\data\\colleges.ts', output);
console.log('Updated college images.');
