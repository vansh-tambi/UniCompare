import mongoose from 'mongoose';
import College from '../src/models/College';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/unicompare';

const mockColleges = [
  {
    name: "Indian Institute of Technology (IIT) Bombay",
    location: "Mumbai, Maharashtra",
    fees: 1150000,
    rating: 4.9,
    description: "A premier engineering and research institution in India known for its rigorous academics and excellent placements.",
    image_url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    courses: [
      { name: "B.Tech in Computer Science", duration: "4 Years" },
      { name: "M.Tech in Data Science", duration: "2 Years" }
    ],
    placements: [
      { year: 2023, highestPackage: 150, averagePackage: 23 },
      { year: 2024, highestPackage: 180, averagePackage: 25 }
    ],
    reviews: [
      { userName: "Aarav P.", rating: 5, text: "Incredible campus life and peer group." },
      { userName: "Neha S.", rating: 4, text: "Academics are tough but totally worth it." }
    ]
  },
  {
    name: "Delhi Technological University (DTU)",
    location: "New Delhi, Delhi",
    fees: 850000,
    rating: 4.5,
    description: "Formerly Delhi College of Engineering, DTU is renowned for its strong alumni network and tech culture.",
    image_url: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    courses: [
      { name: "B.Tech in Software Engineering", duration: "4 Years" },
      { name: "MBA", duration: "2 Years" }
    ],
    placements: [
      { year: 2023, highestPackage: 64, averagePackage: 16 },
      { year: 2024, highestPackage: 82, averagePackage: 18 }
    ],
    reviews: [
      { userName: "Rahul M.", rating: 4, text: "Great coding culture and tech societies." },
      { userName: "Priya T.", rating: 5, text: "Placements are top-notch for tech branches." }
    ]
  },
  {
    name: "Birla Institute of Technology and Science (BITS) Pilani",
    location: "Pilani, Rajasthan",
    fees: 2200000,
    rating: 4.8,
    description: "A leading private institute in India offering excellent education and a zero-attendance policy.",
    image_url: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    courses: [
      { name: "B.E. in Computer Science", duration: "4 Years" },
      { name: "M.Sc. in Economics", duration: "4 Years (Dual Degree)" }
    ],
    placements: [
      { year: 2023, highestPackage: 120, averagePackage: 28 },
      { year: 2024, highestPackage: 133, averagePackage: 30 }
    ],
    reviews: [
      { userName: "Ankit V.", rating: 5, text: "The zero attendance policy gives immense freedom to innovate." },
      { userName: "Sanya K.", rating: 4, text: "Fees are on the higher side, but the ROI is solid." }
    ]
  },
  {
    name: "National Institute of Technology (NIT) Trichy",
    location: "Tiruchirappalli, Tamil Nadu",
    fees: 600000,
    rating: 4.7,
    description: "One of the top-ranked NITs offering top-tier engineering programs and excellent industry tie-ups.",
    image_url: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    courses: [
      { name: "B.Tech in ECE", duration: "4 Years" },
      { name: "B.Tech in CSE", duration: "4 Years" }
    ],
    placements: [
      { year: 2023, highestPackage: 90, averagePackage: 20 },
      { year: 2024, highestPackage: 105, averagePackage: 22 }
    ],
    reviews: [
      { userName: "Vignesh R.", rating: 5, text: "Festivals here are legendary. academics are rigorous." },
      { userName: "Divya N.", rating: 4, text: "Great ROI and massive alumni base." }
    ]
  },
  {
    name: "Vellore Institute of Technology (VIT)",
    location: "Vellore, Tamil Nadu",
    fees: 1600000,
    rating: 4.2,
    description: "A highly sought-after private university known for its massive infrastructure and global exposure.",
    image_url: "https://images.unsplash.com/photo-1525926472898-a0f0237c0eb8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    courses: [
      { name: "B.Tech in IT", duration: "4 Years" },
      { name: "B.Tech in CSE", duration: "4 Years" }
    ],
    placements: [
      { year: 2023, highestPackage: 75, averagePackage: 9 },
      { year: 2024, highestPackage: 88, averagePackage: 10 }
    ],
    reviews: [
      { userName: "Karan B.", rating: 4, text: "Huge student crowd, but opportunities are endless if you are proactive." },
      { userName: "Meera C.", rating: 4, text: "Excellent campus facilities." }
    ]
  },
  {
    name: "Indian Institute of Technology (IIT) Delhi",
    location: "New Delhi, Delhi",
    fees: 1100000,
    rating: 4.9,
    description: "Globally recognized institute located in the capital, renowned for research and entrepreneurship.",
    image_url: "https://images.unsplash.com/photo-1590847953258-29775db20e40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    courses: [
      { name: "B.Tech in Mathematics and Computing", duration: "4 Years" },
      { name: "B.Tech in CSE", duration: "4 Years" }
    ],
    placements: [
      { year: 2023, highestPackage: 160, averagePackage: 24 },
      { year: 2024, highestPackage: 200, averagePackage: 26 }
    ],
    reviews: [
      { userName: "Rohan P.", rating: 5, text: "Unmatched startup culture." },
      { userName: "Sneha J.", rating: 5, text: "The heart of Delhi makes the college experience amazing." }
    ]
  },
  {
    name: "International Institute of Information Technology (IIIT) Hyderabad",
    location: "Hyderabad, Telangana",
    fees: 1400000,
    rating: 4.8,
    description: "India's premier institute for computer science research and coding culture.",
    image_url: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    courses: [
      { name: "B.Tech in CSE", duration: "4 Years" },
      { name: "MS by Research in AI", duration: "2 Years" }
    ],
    placements: [
      { year: 2023, highestPackage: 100, averagePackage: 30 },
      { year: 2024, highestPackage: 110, averagePackage: 32 }
    ],
    reviews: [
      { userName: "Aditya S.", rating: 5, text: "Intense workload but the best place for CS in India." },
      { userName: "Isha V.", rating: 5, text: "Research facilities are outstanding." }
    ]
  },
  {
    name: "Manipal Institute of Technology (MIT)",
    location: "Manipal, Karnataka",
    fees: 1800000,
    rating: 4.3,
    description: "Renowned for its vibrant campus life and well-rounded educational environment.",
    image_url: "https://images.unsplash.com/photo-1613896640137-bb5b31496315?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    courses: [
      { name: "B.Tech in Mechatronics", duration: "4 Years" },
      { name: "B.Tech in CSE", duration: "4 Years" }
    ],
    placements: [
      { year: 2023, highestPackage: 45, averagePackage: 12 },
      { year: 2024, highestPackage: 55, averagePackage: 13 }
    ],
    reviews: [
      { userName: "Rishabh M.", rating: 4, text: "Amazing college life and student projects." },
      { userName: "Tanya G.", rating: 4, text: "A bit expensive but great global exposure." }
    ]
  },
  {
    name: "College of Engineering, Pune (COEP)",
    location: "Pune, Maharashtra",
    fees: 400000,
    rating: 4.6,
    description: "One of the oldest engineering colleges in Asia, known for its rich legacy and excellent academics.",
    image_url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    courses: [
      { name: "B.Tech in Mechanical", duration: "4 Years" },
      { name: "B.Tech in CSE", duration: "4 Years" }
    ],
    placements: [
      { year: 2023, highestPackage: 50, averagePackage: 11 },
      { year: 2024, highestPackage: 60, averagePackage: 12 }
    ],
    reviews: [
      { userName: "Saurabh J.", rating: 5, text: "Heritage campus and great core placements." },
      { userName: "Mitali D.", rating: 4, text: "Technical clubs are very active." }
    ]
  },
  {
    name: "SRM Institute of Science and Technology",
    location: "Chennai, Tamil Nadu",
    fees: 1500000,
    rating: 4.1,
    description: "A prominent private university offering a wide array of programs and large-scale placements.",
    image_url: "https://images.unsplash.com/photo-1544830113-176841261d71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    courses: [
      { name: "B.Tech in CSE (AI & ML)", duration: "4 Years" },
      { name: "B.Tech in Aerospace", duration: "4 Years" }
    ],
    placements: [
      { year: 2023, highestPackage: 50, averagePackage: 8 },
      { year: 2024, highestPackage: 55, averagePackage: 8.5 }
    ],
    reviews: [
      { userName: "Arun K.", rating: 4, text: "Great infrastructure but intense competition during placements." },
      { userName: "Shalini S.", rating: 4, text: "Good faculty and well-equipped labs." }
    ]
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    await College.deleteMany({});
    console.log('Cleared existing colleges');

    await College.insertMany(mockColleges);
    console.log('Successfully seeded database with mock colleges');

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
