import fs from 'fs';
import { colleges } from '../data/colleges';

const newData = [
  { "name": "NIT Trichy", "location": "Tiruchirappalli, Tamil Nadu", "cutoffRank": 1224, "examType": "JEE_MAIN", "fees": 600000, "rating": 4.8, "description": "Top-ranked NIT in India.", "image_url": "https://images.unsplash.com/photo-1562774053-701939374585" },
  { "name": "NIT Surathkal", "location": "Mangaluru, Karnataka", "cutoffRank": 1615, "examType": "JEE_MAIN", "fees": 550000, "rating": 4.7, "description": "Premier NIT with a beach campus.", "image_url": "https://images.unsplash.com/photo-1562774053-701939374585" },
  { "name": "NIT Rourkela", "location": "Rourkela, Odisha", "cutoffRank": 2940, "examType": "JEE_MAIN", "fees": 500000, "rating": 4.6, "description": "One of the largest NIT campuses.", "image_url": "https://images.unsplash.com/photo-1562774053-701939374585" },
  { "name": "NIT Warangal", "location": "Warangal, Telangana", "cutoffRank": 2186, "examType": "JEE_MAIN", "fees": 580000, "rating": 4.7, "description": "First NIT established in India.", "image_url": "https://images.unsplash.com/photo-1562774053-701939374585" },
  { "name": "NIT Allahabad", "location": "Prayagraj, Uttar Pradesh", "cutoffRank": 4191, "examType": "JEE_MAIN", "fees": 520000, "rating": 4.6, "description": "Known for its coding culture.", "image_url": "https://images.unsplash.com/photo-1562774053-701939374585" },
  { "name": "IIIT Hyderabad", "location": "Hyderabad, Telangana", "cutoffRank": 866, "examType": "JEE_MAIN", "fees": 1400000, "rating": 4.9, "description": "World-class CS research institute.", "image_url": "https://images.unsplash.com/photo-1562774053-701939374585" },
  { "name": "IIIT Allahabad", "location": "Prayagraj, Uttar Pradesh", "cutoffRank": 5202, "examType": "JEE_MAIN", "fees": 1200000, "rating": 4.7, "description": "Premier institute for IT.", "image_url": "https://images.unsplash.com/photo-1562774053-701939374585" },
  { "name": "IIIT Lucknow", "location": "Lucknow, Uttar Pradesh", "cutoffRank": 9824, "examType": "JEE_MAIN", "fees": 1100000, "rating": 4.5, "description": "Fastest growing IIIT.", "image_url": "https://images.unsplash.com/photo-1562774053-701939374585" }
];

// Deduplicate by name
const existingNames = new Set(colleges.map(c => c.name));
const filteredNewData = newData.filter(c => !existingNames.has(c.name));

const updatedColleges = [...colleges, ...filteredNewData.map(c => ({
  ...c,
  courses: [{ name: "B.Tech CSE", duration: "4 Years" }],
  placements: [{ year: 2024, highestPackage: 50, averagePackage: 15 }],
  reviews: [{ userName: "Student", rating: 5, text: "Excellent faculty and placements." }]
}))];

const output = `export const colleges = ${JSON.stringify(updatedColleges, null, 2)};\n`;
fs.writeFileSync('C:\\Users\\hp\\OneDrive\\Desktop\\UniCompare\\data\\colleges.ts', output);
console.log(`Added ${filteredNewData.length} new NITs/IIITs.`);
