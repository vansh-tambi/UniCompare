export const colleges = [
  // IITs
  {
    name: "IIT Bombay",
    location: "Mumbai, Maharashtra",
    fees: 1150000,
    rating: 4.9,
    description: "The top-ranked engineering institute in India with a legendary CSE department.",
    image_url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f",
    cutoffRank: 66,
    examType: "JEE",
    courses: [{ name: "B.Tech CSE", duration: "4 Years" }],
    placements: [{ year: 2024, highestPackage: 180, averagePackage: 25 }],
    reviews: [{ userName: "Aryan", rating: 5, text: "Best coding culture." }]
  },
  {
    name: "IIT Delhi",
    location: "New Delhi, Delhi",
    fees: 1100000,
    rating: 4.9,
    description: "Premier research and engineering hub in the capital.",
    image_url: "https://images.unsplash.com/photo-1590847953258-29775db20e40",
    cutoffRank: 126,
    examType: "JEE",
    courses: [{ name: "B.Tech CSE", duration: "4 Years" }],
    placements: [{ year: 2024, highestPackage: 200, averagePackage: 26 }],
    reviews: [{ userName: "Sia", rating: 5, text: "Unmatched peer group." }]
  },
  {
    name: "IIT Madras",
    location: "Chennai, Tamil Nadu",
    fees: 1050000,
    rating: 4.8,
    description: "Ranked #1 by NIRF for multiple consecutive years.",
    image_url: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952",
    cutoffRank: 171,
    examType: "JEE",
    courses: [{ name: "B.Tech CSE", duration: "4 Years" }],
    placements: [{ year: 2024, highestPackage: 160, averagePackage: 22 }],
    reviews: [{ userName: "Vignesh", rating: 5, text: "Amazing campus life." }]
  },
  {
    name: "IIT Kanpur",
    location: "Kanpur, Uttar Pradesh",
    fees: 1000000,
    rating: 4.8,
    description: "Famous for its strong academic rigor and technical festivals.",
    image_url: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a",
    cutoffRank: 271,
    examType: "JEE",
    courses: [{ name: "B.Tech CSE", duration: "4 Years" }],
    placements: [{ year: 2024, highestPackage: 150, averagePackage: 21 }],
    reviews: [{ userName: "Rahul", rating: 4, text: "Rigorous but rewarding." }]
  },
  // NITs
  {
    name: "NIT Trichy",
    location: "Tiruchirappalli, Tamil Nadu",
    fees: 600000,
    rating: 4.7,
    description: "The top-ranked NIT in India with excellent industry connections.",
    image_url: "https://images.unsplash.com/photo-1525926472898-a0f0237c0eb8",
    cutoffRank: 5164,
    examType: "JEE",
    courses: [{ name: "B.Tech CSE", duration: "4 Years" }],
    placements: [{ year: 2024, highestPackage: 105, averagePackage: 22 }],
    reviews: [{ userName: "Karthik", rating: 5, text: "Excellent placements." }]
  },
  {
    name: "NIT Surathkal",
    location: "Mangaluru, Karnataka",
    fees: 550000,
    rating: 4.6,
    description: "Beautiful campus located right on the beach.",
    image_url: "https://images.unsplash.com/photo-1562774053-701939374585",
    cutoffRank: 6200,
    examType: "JEE",
    courses: [{ name: "B.Tech CSE", duration: "4 Years" }],
    placements: [{ year: 2024, highestPackage: 95, averagePackage: 20 }],
    reviews: [{ userName: "Neha", rating: 4, text: "Best beach campus." }]
  },
  // IIITs
  {
    name: "IIIT Hyderabad",
    location: "Hyderabad, Telangana",
    fees: 1400000,
    rating: 4.8,
    description: "Premier institute for computer science research and coding culture.",
    image_url: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8",
    cutoffRank: 3104,
    examType: "JEE",
    courses: [{ name: "B.Tech CSE", duration: "4 Years" }],
    placements: [{ year: 2024, highestPackage: 110, averagePackage: 32 }],
    reviews: [{ userName: "Aditya", rating: 5, text: "Heaven for coders." }]
  },
  {
    name: "IIIT Allahabad",
    location: "Prayagraj, Uttar Pradesh",
    fees: 1200000,
    rating: 4.6,
    description: "Known for its amazing coding culture and technical infrastructure.",
    image_url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
    cutoffRank: 6094,
    examType: "JEE",
    courses: [{ name: "B.Tech IT", duration: "4 Years" }],
    placements: [{ year: 2024, highestPackage: 90, averagePackage: 28 }],
    reviews: [{ userName: "Samir", rating: 4, text: "Top notch IT curriculum." }]
  },
  // AIIMS
  {
    name: "AIIMS New Delhi",
    location: "Ansari Nagar, New Delhi",
    fees: 2000,
    rating: 5.0,
    description: "The most prestigious medical institute in India.",
    image_url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d",
    cutoffRank: 47,
    examType: "NEET",
    courses: [{ name: "MBBS", duration: "5.5 Years" }],
    placements: [{ year: 2024, highestPackage: 50, averagePackage: 18 }],
    reviews: [{ userName: "Dr. Aman", rating: 5, text: "The peak of medical education." }]
  },
  {
    name: "AIIMS Bhopal",
    location: "Bhopal, Madhya Pradesh",
    fees: 2500,
    rating: 4.7,
    description: "A leading new AIIMS with state-of-the-art facilities.",
    image_url: "https://images.unsplash.com/photo-1586773860418-d372a67659b5",
    cutoffRank: 465,
    examType: "NEET",
    courses: [{ name: "MBBS", duration: "5.5 Years" }],
    placements: [{ year: 2024, highestPackage: 35, averagePackage: 15 }],
    reviews: [{ userName: "Dr. Priya", rating: 4, text: "Great infrastructure." }]
  }
];
