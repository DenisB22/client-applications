import type { Destination } from '../types/destination';

export const destinations: Destination[] = [
  {
    id: 'santorini-greece',
    name: 'Santorini',
    country: 'Greece',
    region: 'Europe',
    description:
      'Whitewashed villages, volcanic cliffs, blue-domed churches, and sunset views over the Aegean.',
    imageUrl:
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80',
    rating: 4.8,
    budgetLevel: 'Premium',
    travelStyle: 'Relaxation',
    bestSeason: 'May to October',
    averageDays: 4,
    highlights: ['Oia sunset views', 'Caldera boat tour', 'Red Beach', 'Akrotiri ruins'],
    tips: [
      'Book sunset restaurants early during summer.',
      'Stay outside Oia for quieter evenings and better value.',
    ],
  },
  {
    id: 'kyoto-japan',
    name: 'Kyoto',
    country: 'Japan',
    region: 'Asia',
    description:
      'A graceful city of temples, gardens, tea houses, seasonal cuisine, and traditional neighborhoods.',
    imageUrl:
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    rating: 4.9,
    budgetLevel: 'Moderate',
    travelStyle: 'Culture',
    bestSeason: 'March to May or October to November',
    averageDays: 5,
    highlights: ['Fushimi Inari Shrine', 'Arashiyama Bamboo Grove', 'Gion', 'Kiyomizu-dera'],
    tips: [
      'Start popular temple visits early in the morning.',
      'Use buses and local trains to connect historic districts.',
    ],
  },
  {
    id: 'banff-canada',
    name: 'Banff',
    country: 'Canada',
    region: 'North America',
    description:
      'Rocky Mountain scenery with turquoise lakes, alpine hikes, wildlife viewing, and cozy mountain towns.',
    imageUrl:
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80',
    rating: 4.8,
    budgetLevel: 'Moderate',
    travelStyle: 'Nature',
    bestSeason: 'June to September',
    averageDays: 6,
    highlights: ['Lake Louise', 'Moraine Lake', 'Icefields Parkway', 'Sulphur Mountain'],
    tips: [
      'Reserve shuttle access for the most popular lakes.',
      'Pack layers because mountain weather changes quickly.',
    ],
  },
  {
    id: 'marrakech-morocco',
    name: 'Marrakech',
    country: 'Morocco',
    region: 'Africa',
    description:
      'Colorful souks, tiled courtyards, gardens, rooftop dining, and day trips toward the Atlas Mountains.',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Medina_souk%2C_Marrakech%2C_Morocco_-_panoramio.jpg/1280px-Medina_souk%2C_Marrakech%2C_Morocco_-_panoramio.jpg',
    rating: 4.6,
    budgetLevel: 'Budget',
    travelStyle: 'Culture',
    bestSeason: 'March to May or September to November',
    averageDays: 4,
    highlights: ['Jemaa el-Fnaa', 'Majorelle Garden', 'Bahia Palace', 'Medina souks'],
    tips: [
      'Choose a riad near the medina for easy walking access.',
      'Agree on taxi prices before starting the ride.',
    ],
  },
  {
    id: 'reykjavik-iceland',
    name: 'Reykjavik',
    country: 'Iceland',
    region: 'Europe',
    description:
      'A compact Nordic base for hot springs, waterfalls, lava fields, whale watching, and northern lights.',
    imageUrl:
      'https://images.unsplash.com/photo-1504829857797-ddff29c27927?auto=format&fit=crop&w=1200&q=80',
    rating: 4.7,
    budgetLevel: 'Premium',
    travelStyle: 'Adventure',
    bestSeason: 'February to March or June to August',
    averageDays: 5,
    highlights: ['Blue Lagoon', 'Golden Circle', 'Hallgrimskirkja', 'Northern lights tours'],
    tips: [
      'Rent a car only if you are comfortable with changing road conditions.',
      'Budget extra for food and guided day trips.',
    ],
  },
  {
    id: 'cape-town-south-africa',
    name: 'Cape Town',
    country: 'South Africa',
    region: 'Africa',
    description:
      'Coastal views, mountain trails, wineries, beaches, creative neighborhoods, and excellent food.',
    imageUrl:
      'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=1200&q=80',
    rating: 4.8,
    budgetLevel: 'Moderate',
    travelStyle: 'Food',
    bestSeason: 'November to March',
    averageDays: 6,
    highlights: ['Table Mountain', 'Cape Point', 'Bo-Kaap', 'Stellenbosch wineries'],
    tips: [
      'Check wind conditions before planning the Table Mountain cable car.',
      'Use trusted transport at night and plan neighborhoods ahead.',
    ],
  },
  {
    id: 'bali-indonesia',
    name: 'Bali',
    country: 'Indonesia',
    region: 'Asia',
    description:
      'Rice terraces, surf beaches, temples, wellness retreats, waterfalls, and relaxed island hospitality.',
    imageUrl:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
    rating: 4.7,
    budgetLevel: 'Budget',
    travelStyle: 'Relaxation',
    bestSeason: 'April to October',
    averageDays: 7,
    highlights: ['Ubud rice terraces', 'Uluwatu Temple', 'Nusa Penida', 'Seminyak beaches'],
    tips: [
      'Split your stay between inland Ubud and the coast.',
      'Leave extra time for traffic between popular areas.',
    ],
  },
  {
    id: 'lisbon-portugal',
    name: 'Lisbon',
    country: 'Portugal',
    region: 'Europe',
    description:
      'Hillside viewpoints, tiled streets, seafood, historic trams, nearby beaches, and day trips to Sintra.',
    imageUrl:
      'https://images.unsplash.com/photo-1513735492246-483525079686?auto=format&fit=crop&w=1200&q=80',
    rating: 4.7,
    budgetLevel: 'Moderate',
    travelStyle: 'Food',
    bestSeason: 'April to June or September to October',
    averageDays: 4,
    highlights: ['Alfama', 'Belem Tower', 'LX Factory', 'Sintra day trip'],
    tips: [
      'Wear comfortable shoes for steep streets and viewpoints.',
      'Reserve popular fado restaurants in advance.',
    ],
  },
  {
    id: 'patagonia-argentina-chile',
    name: 'Patagonia',
    country: 'Argentina and Chile',
    region: 'South America',
    description:
      'Remote glaciers, granite peaks, windswept trails, wildlife, and some of the world\'s best trekking.',
    imageUrl:
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
    rating: 4.9,
    budgetLevel: 'Premium',
    travelStyle: 'Adventure',
    bestSeason: 'November to March',
    averageDays: 10,
    highlights: ['Torres del Paine', 'Perito Moreno Glacier', 'El Chalten', 'Fitz Roy'],
    tips: [
      'Reserve park lodging and campsites months ahead.',
      'Pack windproof layers even during peak summer.',
    ],
  },
  {
    id: 'queenstown-new-zealand',
    name: 'Queenstown',
    country: 'New Zealand',
    region: 'Oceania',
    description:
      'A lakeside adventure hub with dramatic mountains, scenic drives, vineyards, and outdoor activities.',
    imageUrl:
      'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=1200&q=80',
    rating: 4.8,
    budgetLevel: 'Premium',
    travelStyle: 'Adventure',
    bestSeason: 'December to February or June to August',
    averageDays: 5,
    highlights: ['Lake Wakatipu', 'Milford Sound', 'Skyline Gondola', 'Gibbston Valley'],
    tips: [
      'Book adventure activities early during holiday periods.',
      'Use Queenstown as a base for day trips around the South Island.',
    ],
  },
];
