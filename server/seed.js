import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import { Product } from "./models/productModel.js";

const products = [
  
  {
  name: "OnePlus Nord Buds 3 Pro",
  description:
    "OnePlus Nord Buds 3 Pro earbuds with hybrid active noise cancellation, immersive audio drivers, low latency gaming mode, crystal clear microphones and long lasting battery performance suitable for everyday listening and entertainment.",
  price: 3999,
  discount: 35,
  image: {
    url: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=500",
    publicId: "OnePlusNordBuds3Pro",
  },
  category: "Earbuds",
  stock: 120,
},

{
  name: "boAt Airdopes 141",
  description:
    "boAt Airdopes 141 truly wireless earbuds provide immersive bass, ENx technology for clear calls, quick charging support and ergonomic design for music, gaming and comfortable all day usage.",
  price: 1499,
  discount: 50,
  image: {
    url: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
    publicId: "BoatAirdopes141",
  },
  category: "Earbuds",
  stock: 150,
},

{
  name: "realme Buds Air 6",
  description:
    "realme Buds Air 6 offers active noise cancellation, premium audio quality, dual device pairing, long battery life and lightweight design built for travel, entertainment and daily productivity.",
  price: 4499,
  discount: 25,
  image: {
    url: "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=500",
    publicId: "RealmeBudsAir6",
  },
  category: "Earbuds",
  stock: 90,
},

{
  name: "JBL Wave Beam",
  description:
    "JBL Wave Beam wireless earbuds deliver signature deep bass sound, voice aware technology, comfortable fit and durable battery performance for workouts, travel and entertainment activities.",
  price: 3799,
  discount: 30,
  image: {
    url: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500",
    publicId: "JBLWaveBeam",
  },
  category: "Earbuds",
  stock: 70,
},

{
  name: "Samsung Galaxy Buds FE",
  description:
    "Samsung Galaxy Buds FE feature balanced sound output, active noise cancellation, touch controls, seamless device integration and secure ergonomic fit for long listening sessions.",
  price: 6999,
  discount: 15,
  image: {
    url: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500",
    publicId: "SamsungGalaxyBudsFE",
  },
  category: "Earbuds",
  stock: 85,
},

{
  name: "Sony WF-C500",
  description:
    "Sony WF-C500 earbuds include enhanced audio processing, water resistance, lightweight design and customizable sound settings through application support for personalized listening experiences.",
  price: 5499,
  discount: 20,
  image: {
    url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    publicId: "SonyWFC500",
  },
  category: "Headphones",
  stock: 60,
},

{
  name: "OPPO Enco Buds 2",
  description:
    "OPPO Enco Buds 2 deliver rich bass performance, AI noise cancellation, fast charging support and compact design suitable for work calls, music and gaming sessions.",
  price: 1799,
  discount: 45,
  image: {
    url: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500",
    publicId: "OPPOEncoBuds2",
  },
  category: "Earbuds",
  stock: 130,
},

{
  name: "Redmi Buds 5",
  description:
    "Redmi Buds 5 wireless earbuds provide active noise cancellation, premium sound tuning, lightweight fit and stable Bluetooth connectivity for entertainment and productivity needs.",
  price: 2999,
  discount: 35,
  image: {
    url: "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=500",
    publicId: "RedmiBuds5",
  },
  category: "Earbuds",
  stock: 110,
},

{
  name: "Boult Audio Z40",
  description:
    "Boult Audio Z40 earbuds include Zen ENC technology, long battery performance, gaming mode support and rich bass audio designed for immersive music and calling experience.",
  price: 1599,
  discount: 55,
  image: {
    url: "https://images.unsplash.com/photo-1608156639585-b3a032ef9689?w=500",
    publicId: "BoultAudioZ40",
  },
  category: "Earbuds",
  stock: 140,
},

{
  name: "pTron Bassbuds Duo",
  description:
    "pTron Bassbuds Duo wireless earbuds offer HD microphone support, compact charging case, deep bass sound quality and comfortable design for daily travel and entertainment use.",
  price: 999,
  discount: 50,
  image: {
    url: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500",
    publicId: "PTronBassbudsDuo",
  },
  category: "Earbuds",
  stock: 160,
},  

  {
    name: "iPhone 16",
    description:
      "Apple iPhone 16 powered by the latest generation processor, featuring a Super Retina display, advanced AI camera capabilities, long battery performance and premium design suitable for gaming, photography and productivity.",
    price: 79999,
    discount: 8,
    image: {
      url: "https://images.unsplash.com/photo-1592286927505-1def25115558?w=500",
      publicId: "iPhone16",
    },
    category: "Mobiles",
    stock: 100,
  },

  {
    name: "Samsung Galaxy S25",
    description:
      "Samsung Galaxy S25 smartphone with flagship processor, vibrant AMOLED display, enhanced camera technology, AI features and powerful battery backup delivering a premium experience for work and entertainment.",
    price: 84999,
    discount: 10,
    image: {
      url: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500",
      publicId: "SamsungGalaxyS25",
    },
    category: "Mobiles",
    stock: 90,
  },

  {
    name: "OnePlus 13R",
    description:
      "OnePlus 13R features a smooth AMOLED display, Snapdragon processor, ultra fast charging support, flagship camera performance and optimized software experience designed for gaming and multitasking users.",
    price: 42999,
    discount: 12,
    image: {
      url: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
      publicId: "OnePlus13R",
    },
    category: "Mobiles",
    stock: 130,
  },

  {
    name: "Google Pixel 10",
    description:
      "Google Pixel 10 smartphone offers advanced computational photography, AI powered software features, clean Android experience, premium camera quality and intelligent tools designed for modern productivity needs.",
    price: 74999,
    discount: 7,
    image: {
      url: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500",
      publicId: "GooglePixel10",
    },
    category: "Mobiles",
    stock: 75,
  },

  {
    name: "Xiaomi 15 Pro",
    description:
      "Xiaomi 15 Pro delivers flagship camera technology, premium curved display, high refresh rate, powerful chipset and ultra fast charging capabilities for immersive entertainment and everyday performance.",
    price: 59999,
    discount: 15,
    image: {
      url: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=500",
      publicId: "Xiaomi15Pro",
    },
    category: "Mobiles",
    stock: 95,
  },

  {
    name: "Nothing Phone 3",
    description:
      "Nothing Phone 3 combines transparent premium design, Glyph interface technology, smooth software experience, excellent cameras and optimized hardware for a clean and unique smartphone experience.",
    price: 45999,
    discount: 10,
    image: {
      url: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=500",
      publicId: "NothingPhone3",
    },
    category: "Mobiles",
    stock: 110,
  },

  {
    name: "Motorola Edge 60",
    description:
      "Motorola Edge 60 smartphone provides curved pOLED display, fast processor, near stock Android interface, AI camera enhancements and dependable battery performance for multitasking and entertainment.",
    price: 34999,
    discount: 18,
    image: {
      url: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=500",
      publicId: "MotorolaEdge60",
    },
    category: "Mobiles",
    stock: 80,
  },

  {
    name: "Realme GT 8 Pro",
    description:
      "Realme GT 8 Pro features a flagship chipset, high refresh display, gaming optimizations, premium camera system and fast charging support designed for power users and mobile gamers.",
    price: 38999,
    discount: 20,
    image: {
      url: "https://images.unsplash.com/photo-1583573636246-18cb2246697f?w=500",
      publicId: "RealmeGT8Pro",
    },
    category: "Mobiles",
    stock: 150,
  },

  {
    name: "Vivo X200",
    description:
      "Vivo X200 smartphone brings premium photography capabilities, AI enhancements, vibrant AMOLED screen, powerful processor and stylish design for users who prioritize camera and performance together.",
    price: 52999,
    discount: 14,
    image: {
      url: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=500",
      publicId: "VivoX200",
    },
    category: "Mobiles",
    stock: 100,
  },

  {
    name: "OPPO Find X9",
    description:
      "OPPO Find X9 features premium hardware design, intelligent camera system, AI features, fast charging support and powerful performance delivering a balanced flagship smartphone experience for users.",
    price: 64999,
    discount: 9,
    image: {
      url: "https://images.unsplash.com/photo-1603899122634-f086ca5f5ddd?w=500",
      publicId: "OPPOFindX9",
    },
    category: "Mobiles",
    stock: 70,
  }, 

  {
    name: "Apple MacBook Air M4",
    description:
      "Apple MacBook Air M4 laptop featuring a powerful M4 chip, 13.6 inch Liquid Retina display, lightweight aluminum design, all day battery life and excellent performance for productivity, development and creative workflows.",
    price: 114999,
    discount: 8,
    image: {
      url: "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?w=500",
      publicId: "MacBookAirM4",
    },
    category: "Laptops",
    stock: 60,
  },

  {
    name: "Dell XPS 15",
    description:
      "Dell XPS 15 laptop with Intel Core processor, premium InfinityEdge display, high performance graphics, excellent battery optimization and sleek lightweight design suitable for development and multitasking workloads.",
    price: 139999,
    discount: 10,
    image: {
      url: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",
      publicId: "DellXPS15",
    },
    category: "Laptops",
    stock: 40,
  },

  {
    name: "HP Spectre x360",
    description:
      "HP Spectre x360 convertible laptop featuring OLED touchscreen display, premium metal build, powerful Intel processor, long battery life and flexible 360 degree hinge for work and entertainment.",
    price: 124999,
    discount: 12,
    image: {
      url: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500",
      publicId: "HPSpectrex360",
    },
    category: "Laptops",
    stock: 55,
  },

  {
    name: "ASUS ROG Strix G18",
    description:
      "ASUS ROG Strix G18 gaming laptop equipped with high refresh rate display, dedicated graphics card, powerful processor and advanced cooling system designed for gaming and demanding tasks.",
    price: 159999,
    discount: 15,
    image: {
      url: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500",
      publicId: "ASUSROGStrixG18",
    },
    category: "Laptops",
    stock: 45,
  },

  {
    name: "Lenovo Legion 7",
    description:
      "Lenovo Legion 7 laptop with premium gaming design, powerful graphics performance, vibrant display, efficient thermal management and advanced hardware suitable for gaming and professional work.",
    price: 149999,
    discount: 18,
    image: {
      url: "https://images.unsplash.com/photo-1593642702749-b7d2a804fbcf?w=500",
      publicId: "LenovoLegion7",
    },
    category: "Laptops",
    stock: 50,
  },

  {
    name: "Acer Predator Helios Neo",
    description:
      "Acer Predator Helios Neo gaming laptop featuring Intel processor, RTX graphics, fast refresh display, optimized cooling and immersive performance for gaming, editing and heavy productivity tasks.",
    price: 118999,
    discount: 20,
    image: {
      url: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=500",
      publicId: "AcerPredatorHeliosNeo",
    },
    category: "Laptops",
    stock: 70,
  },

  {
    name: "MSI Katana 17",
    description:
      "MSI Katana 17 laptop with gaming focused hardware, powerful graphics capabilities, large immersive display, high speed performance and advanced thermal technology for uninterrupted productivity sessions.",
    price: 112999,
    discount: 14,
    image: {
      url: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=500",
      publicId: "MSIKatana17",
    },
    category: "Laptops",
    stock: 65,
  },

  {
    name: "Samsung Galaxy Book 5",
    description:
      "Samsung Galaxy Book 5 laptop designed with a premium lightweight body, vivid AMOLED display, long battery life and seamless ecosystem integration for productivity and entertainment purposes.",
    price: 95999,
    discount: 10,
    image: {
      url: "https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=500",
      publicId: "SamsungGalaxyBook5",
    },
    category: "Laptops",
    stock: 75,
  },

  {
    name: "ASUS Vivobook S16",
    description:
      "ASUS Vivobook S16 features a slim design, modern processor architecture, vibrant display panel, smooth multitasking performance and dependable battery backup suitable for students and professionals.",
    price: 72999,
    discount: 22,
    image: {
      url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500",
      publicId: "ASUSVivobookS16",
    },
    category: "Laptops",
    stock: 100,
  },

  {
    name: "Lenovo IdeaPad Slim 5",
    description:
      "Lenovo IdeaPad Slim 5 laptop offers lightweight portability, modern processor performance, clear display quality, reliable battery backup and comfortable keyboard experience for daily productivity tasks.",
    price: 68999,
    discount: 25,
    image: {
      url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500",
      publicId: "LenovoIdeaPadSlim5",
    },
    category: "Laptops",
    stock: 90,
  }, 

  {
    name: "Mi Power Bank 3i 20000mAh",
    description:
      "Mi Power Bank 3i with massive 20000mAh battery capacity, dual USB output ports, fast charging support, advanced chip protection and sleek portable design suitable for smartphones, tablets and travel usage.",
    price: 2499,
    discount: 35,
    image: {
      url: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500",
      publicId: "MiPowerBank3i20000",
    },
    category: "Powerbanks",
    stock: 140,
  },

  {
    name: "Ambrane Stylo Boost 20000mAh",
    description:
      "Ambrane Stylo Boost power bank features fast charging support, premium compact design, multiple output ports and dependable battery performance ideal for travel, work and everyday smartphone charging.",
    price: 2199,
    discount: 40,
    image: {
      url: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=500",
      publicId: "AmbraneStyloBoost",
    },
    category: "Powerbanks",
    stock: 110,
  },

  {
    name: "URBN 20000mAh Nano Power Bank",
    description:
      "URBN Nano power bank with lightweight construction, fast charging technology, Type C support, compact body and long lasting battery performance designed for portable everyday charging requirements.",
    price: 1999,
    discount: 30,
    image: {
      url: "https://images.unsplash.com/photo-1585338447937-7082f8fc763d?w=500",
      publicId: "URBNNanoPowerBank",
    },
    category: "Powerbanks",
    stock: 150,
  },

  {
    name: "boAt EnergyShroom PB400",
    description:
      "boAt EnergyShroom PB400 power bank delivers reliable fast charging performance, dual USB outputs, premium finish and multiple protection layers for safe charging throughout travel and work sessions.",
    price: 1799,
    discount: 45,
    image: {
      url: "https://images.unsplash.com/photo-1609592806596-b43c0e2b2f31?w=500",
      publicId: "BoatPB400",
    },
    category: "Powerbanks",
    stock: 95,
  },

  {
    name: "Redmi 10000mAh Fast Charge",
    description:
      "Redmi power bank with 10000mAh capacity includes dual input ports, fast charging support, lightweight portable body and advanced protection system suitable for daily charging needs.",
    price: 1499,
    discount: 30,
    image: {
      url: "https://images.unsplash.com/photo-1615526675159-e248c3021d3f?w=500",
      publicId: "RedmiPowerBank10000",
    },
    category: "Powerbanks",
    stock: 130,
  },

  {
    name: "Anker PowerCore Slim 10000",
    description:
      "Anker PowerCore Slim offers compact design, PowerIQ charging technology, premium build quality and dependable battery backup allowing efficient charging for smartphones and portable devices.",
    price: 2999,
    discount: 15,
    image: {
      url: "https://images.unsplash.com/photo-1587033411391-5d9e51cce126?w=500",
      publicId: "AnkerPowerCoreSlim",
    },
    category: "Powerbanks",
    stock: 80,
  },

  {
    name: "Portronics Luxcell Bind 20K",
    description:
      "Portronics Luxcell power bank equipped with high capacity battery, quick charging technology, sleek design and multi device compatibility for uninterrupted charging during travel and office use.",
    price: 1899,
    discount: 38,
    image: {
      url: "https://images.unsplash.com/photo-1601972602237-8c79241e468b?w=500",
      publicId: "PortronicsLuxcell20K",
    },
    category: "Powerbanks",
    stock: 125,
  },

  {
    name: "Syska Power Juice 200",
    description:
      "Syska Power Juice power bank includes intelligent charging technology, durable construction, multiple device charging support and compact design making it suitable for regular use and travel.",
    price: 1699,
    discount: 42,
    image: {
      url: "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=500",
      publicId: "SyskaPowerJuice200",
    },
    category: "Powerbanks",
    stock: 120,
  },

  {
    name: "Spigen ArcPack 10000mAh",
    description:
      "Spigen ArcPack power bank features compact premium design, fast charging support, efficient battery management system and lightweight build for convenient portable charging performance.",
    price: 2799,
    discount: 20,
    image: {
      url: "https://images.unsplash.com/photo-1603539444875-76e7684265dd?w=500",
      publicId: "SpigenArcPack",
    },
    category: "Powerbanks",
    stock: 90,
  },

  {
    name: "Stuffcool SuperPower 20000mAh",
    description:
      "Stuffcool SuperPower delivers high capacity battery backup, rapid charging technology, multiple charging outputs and modern portable design suitable for power users and travelers.",
    price: 3299,
    discount: 18,
    image: {
      url: "https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=500",
      publicId: "StuffcoolSuperPower",
    },
    category: "Powerbanks",
    stock: 70,
  }, 

  {
  name: "Apple Watch Series 11",
  description:
    "Apple Watch Series 11 featuring an advanced Retina display, health monitoring sensors, fitness tracking capabilities, long battery optimization and seamless connectivity designed for productivity and active lifestyles.",
  price: 48999,
  discount: 10,
  image: {
    url: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500",
    publicId: "AppleWatchSeries11",
  },
  category: "Smartwatches",
  stock: 70,
},

{
  name: "Samsung Galaxy Watch 8",
  description:
    "Samsung Galaxy Watch 8 smartwatch with AMOLED display, advanced sleep monitoring, heart rate tracking, fitness analysis and smooth integration with smartphones for health and productivity purposes.",
  price: 32999,
  discount: 15,
  image: {
    url: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500",
    publicId: "SamsungGalaxyWatch8",
  },
  category: "Smartwatches",
  stock: 90,
},

{
  name: "Noise ColorFit Pro 6",
  description:
    "Noise ColorFit Pro 6 smartwatch includes Bluetooth calling, multiple sports modes, health monitoring features, vibrant display and long lasting battery performance for daily activity tracking.",
  price: 4999,
  discount: 45,
  image: {
    url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    publicId: "NoiseColorFitPro6",
  },
  category: "Smartwatches",
  stock: 140,
},

{
  name: "boAt Lunar Connect Ace",
  description:
    "boAt Lunar Connect Ace smartwatch features Bluetooth calling support, premium metal body, large HD display and advanced health monitoring features suitable for everyday use and fitness tracking.",
  price: 3499,
  discount: 50,
  image: {
    url: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500",
    publicId: "BoatLunarConnectAce",
  },
  category: "Smartwatches",
  stock: 150,
},

{
  name: "Fire-Boltt Ninja Call Pro Max",
  description:
    "Fire-Boltt Ninja smartwatch offers large display size, Bluetooth calling functionality, multiple fitness tracking modes and long battery backup for active users and daily productivity needs.",
  price: 2499,
  discount: 55,
  image: {
    url: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500",
    publicId: "FireBolttNinjaCallProMax",
  },
  category: "Smartwatches",
  stock: 160,
},

{
  name: "Amazfit GTR 5",
  description:
    "Amazfit GTR 5 smartwatch provides premium design, accurate health sensors, GPS support, long battery life and fitness tracking capabilities suitable for outdoor and professional users.",
  price: 15999,
  discount: 20,
  image: {
    url: "https://images.unsplash.com/photo-1510017803434-a899398421b3?w=500",
    publicId: "AmazfitGTR5",
  },
  category: "Smartwatches",
  stock: 75,
},

{
  name: "OnePlus Watch 3",
  description:
    "OnePlus Watch 3 combines premium aesthetics, health tracking tools, AMOLED display, smart notifications and dependable battery performance for users seeking productivity and fitness features.",
  price: 19999,
  discount: 18,
  image: {
    url: "https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=500",
    publicId: "OnePlusWatch3",
  },
  category: "Smartwatches",
  stock: 80,
},

{
  name: "Huawei Watch GT 6",
  description:
    "Huawei Watch GT 6 smartwatch features accurate fitness metrics, elegant design, vibrant display and long battery life delivering a premium smartwatch experience for modern users.",
  price: 18999,
  discount: 22,
  image: {
    url: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=500",
    publicId: "HuaweiWatchGT6",
  },
  category: "Smartwatches",
  stock: 65,
},

{
  name: "Realme Watch S2",
  description:
    "Realme Watch S2 smartwatch with stylish design, fitness tracking support, health monitoring features and long battery performance suitable for students, professionals and fitness enthusiasts.",
  price: 5999,
  discount: 35,
  image: {
    url: "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=500",
    publicId: "RealmeWatchS2",
  },
  category: "Smartwatches",
  stock: 120,
},

{
  name: "Fastrack Reflex Vox",
  description:
    "Fastrack Reflex Vox smartwatch equipped with Bluetooth calling support, stylish appearance, multiple sports modes and health tracking capabilities for daily use and activity monitoring.",
  price: 2999,
  discount: 40,
  image: {
    url: "https://images.unsplash.com/photo-1617043786394-f977fa12eddf?w=500",
    publicId: "FastrackReflexVox",
  },
  category: "Smartwatches",
  stock: 110,
}, 

  {
    name: "Canon EOS R10",
    description:
      "Canon EOS R10 mirrorless camera featuring advanced autofocus technology, 24.2MP image sensor, high speed continuous shooting and 4K video recording capabilities designed for photography and content creation.",
    price: 89999,
    discount: 12,
    image: {
      url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500",
      publicId: "CanonEOSR10",
    },
    category: "Cameras",
    stock: 40,
  },

  {
    name: "Nikon D7500",
    description:
      "Nikon D7500 DSLR camera equipped with excellent image quality, powerful autofocus system, durable body design and professional shooting features for photography enthusiasts and creators.",
    price: 79999,
    discount: 15,
    image: {
      url: "https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?w=500",
      publicId: "NikonD7500",
    },
    category: "Cameras",
    stock: 35,
  },

  {
    name: "Sony Alpha A6700",
    description:
      "Sony Alpha A6700 camera offers AI powered autofocus, premium image quality, cinematic video recording and compact lightweight design suitable for creators and photographers.",
    price: 109999,
    discount: 10,
    image: {
      url: "https://images.unsplash.com/photo-1502920917128-1aa500764ce7?w=500",
      publicId: "SonyAlphaA6700",
    },
    category: "Cameras",
    stock: 28,
  },

  {
    name: "Fujifilm X-T5",
    description:
      "Fujifilm X-T5 mirrorless camera with professional photography controls, exceptional color science and premium image processing designed for enthusiasts and content creators.",
    price: 124999,
    discount: 8,
    image: {
      url: "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?w=500",
      publicId: "FujiXT5",
    },
    category: "Cameras",
    stock: 25,
  },

  {
    name: "OnePlus Pad 4",
    description:
      "OnePlus Pad 4 tablet featuring immersive display quality, powerful processor performance, premium build design and productivity focused capabilities suitable for entertainment and multitasking.",
    price: 62999,
    discount: 5,
    image: {
      url: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500",
      publicId: "OnePlusPad4",
    },
    category: "Tablets",
    stock: 120,
  },

  {
    name: "Samsung Galaxy Tab S10",
    description:
      "Samsung Galaxy Tab S10 with AMOLED display technology, S Pen support, premium performance and long battery life designed for work, entertainment and productivity usage.",
    price: 68999,
    discount: 10,
    image: {
      url: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500",
      publicId: "GalaxyTabS10",
    },
    category: "Tablets",
    stock: 80,
  },

  {
    name: "Apple iPad Air M3",
    description:
      "Apple iPad Air M3 powered by advanced processor architecture, premium Liquid Retina display and seamless multitasking features suitable for creativity and productivity tasks.",
    price: 75999,
    discount: 7,
    image: {
      url: "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?w=500",
      publicId: "iPadAirM3",
    },
    category: "Tablets",
    stock: 90,
  },

  {
    name: "Lenovo Tab P12",
    description:
      "Lenovo Tab P12 tablet equipped with large display, smooth performance, entertainment features and long lasting battery backup suitable for students and professionals.",
    price: 29999,
    discount: 20,
    image: {
      url: "https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=500",
      publicId: "LenovoTabP12",
    },
    category: "Tablets",
    stock: 100,
  },

  {
    name: "Logitech MX Master 3S",
    description:
      "Logitech MX Master 3S wireless mouse featuring precise tracking technology, ergonomic design and customizable controls designed for developers and productivity users.",
    price: 9999,
    discount: 10,
    image: {
      url: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500",
      publicId: "LogitechMXMaster3S",
    },
    category: "Mouses",
    stock: 140,
  },

  {
    name: "Razer DeathAdder V3",
    description:
      "Razer DeathAdder V3 gaming mouse equipped with lightweight design, high precision optical sensor and customizable performance for gaming and productivity use.",
    price: 5999,
    discount: 15,
    image: {
      url: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500",
      publicId: "RazerDeathAdderV3",
    },
    category: "Mouses",
    stock: 100,
  },

  {
    name: "HP Wireless Mouse X200",
    description:
      "HP X200 wireless mouse offering comfortable ergonomic grip, reliable wireless connectivity and smooth performance suitable for office and personal productivity tasks.",
    price: 999,
    discount: 30,
    image: {
      url: "https://images.unsplash.com/photo-1613141412501-9012977f1969?w=500",
      publicId: "HPMouseX200",
    },
    category: "Mouses",
    stock: 180,
  },

  {
    name: "Apple Magic Keyboard",
    description:
      "Apple Magic Keyboard featuring premium build quality, comfortable key travel, wireless connectivity and seamless integration with Apple ecosystem devices.",
    price: 8999,
    discount: 5,
    image: {
      url: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500",
      publicId: "AppleMagicKeyboard",
    },
    category: "Keyboards",
    stock: 70,
  },

  {
    name: "Logitech G Pro X",
    description:
      "Logitech G Pro X mechanical keyboard with customizable RGB lighting, premium switches and compact design built for gamers and professionals.",
    price: 12999,
    discount: 18,
    image: {
      url: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=500",
      publicId: "LogitechGProX",
    },
    category: "Keyboards",
    stock: 90,
  },

  {
    name: "Razer BlackWidow V4",
    description:
      "Razer BlackWidow V4 keyboard featuring mechanical switches, customizable RGB effects and premium build quality designed for gaming enthusiasts.",
    price: 14999,
    discount: 15,
    image: {
      url: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500",
      publicId: "RazerBlackWidowV4",
    },
    category: "Keyboards",
    stock: 75,
  },

  {
    name: "Redragon K552 Kumara",
    description:
      "Redragon K552 Kumara compact keyboard with mechanical switches, anti ghosting support and durable construction designed for gaming and productivity.",
    price: 3999,
    discount: 35,
    image: {
      url: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500",
      publicId: "RedragonK552",
    },
    category: "Keyboards",
    stock: 110,
  },
  

  {
    name: "Canon EOS 90D",
    description:
      "Canon EOS 90D DSLR camera with 32.5MP sensor, advanced autofocus technology, high speed continuous shooting and professional image quality designed for creators and photography enthusiasts.",
    price: 104999,
    discount: 10,
    image: {
      url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=500",
      publicId: "CanonEOS90D",
    },
    category: "Cameras",
    stock: 45,
  },

  {
    name: "Nikon Z6 II",
    description:
      "Nikon Z6 II mirrorless camera equipped with dual processors, premium image quality, fast autofocus performance and advanced video recording capabilities for professionals and creators.",
    price: 129999,
    discount: 12,
    image: {
      url: "https://images.unsplash.com/photo-1516724562728-afc824a36e84?w=500",
      publicId: "NikonZ6II",
    },
    category: "Cameras",
    stock: 35,
  },

  {
    name: "Sony Alpha A7 IV",
    description:
      "Sony Alpha A7 IV features excellent image processing, AI autofocus capabilities, premium video quality and lightweight design suitable for photographers and content creators.",
    price: 179999,
    discount: 8,
    image: {
      url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500",
      publicId: "SonyAlphaA7IV",
    },
    category: "Cameras",
    stock: 28,
  },

  {
    name: "Panasonic Lumix G95",
    description:
      "Panasonic Lumix G95 camera with excellent stabilization technology, durable construction, premium image quality and advanced video recording support for professional creators.",
    price: 84999,
    discount: 18,
    image: {
      url: "https://images.unsplash.com/photo-1502920917128-1aa500764ce7?w=500",
      publicId: "PanasonicLumixG95",
    },
    category: "Cameras",
    stock: 40,
  },

  {
    name: "Xiaomi Pad 7 Pro",
    description:
      "Xiaomi Pad 7 Pro tablet featuring immersive display quality, powerful processor architecture, smooth multitasking capabilities and premium design for productivity and entertainment users.",
    price: 44999,
    discount: 15,
    image: {
      url: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500",
      publicId: "XiaomiPad7Pro",
    },
    category: "Tablets",
    stock: 110,
  },

  {
    name: "Realme Pad X",
    description:
      "Realme Pad X equipped with large display size, powerful multimedia performance, dependable battery life and lightweight construction suitable for students and entertainment needs.",
    price: 23999,
    discount: 20,
    image: {
      url: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500",
      publicId: "RealmePadX",
    },
    category: "Tablets",
    stock: 120,
  },

  {
    name: "Honor Pad V9",
    description:
      "Honor Pad V9 tablet with immersive viewing experience, premium design quality, excellent processor performance and all day battery backup for multitasking and entertainment.",
    price: 35999,
    discount: 17,
    image: {
      url: "https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=500",
      publicId: "HonorPadV9",
    },
    category: "Tablets",
    stock: 95,
  },

  {
    name: "ASUS ROG Chakram X",
    description:
      "ASUS ROG Chakram X gaming mouse featuring high precision optical sensor, customizable controls and ergonomic design for professional gaming and productivity workflows.",
    price: 8499,
    discount: 18,
    image: {
      url: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500",
      publicId: "ASUSROGChakramX",
    },
    category: "Mouses",
    stock: 100,
  },

  {
    name: "Logitech G502 Hero",
    description:
      "Logitech G502 Hero gaming mouse with customizable buttons, accurate sensor technology and premium ergonomic design suitable for gamers and power users.",
    price: 4999,
    discount: 20,
    image: {
      url: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500",
      publicId: "LogitechG502Hero",
    },
    category: "Mouses",
    stock: 150,
  },

  {
    name: "Dell WM126 Wireless Mouse",
    description:
      "Dell WM126 wireless mouse offering lightweight construction, reliable wireless connectivity and comfortable design for everyday office work and productivity requirements.",
    price: 899,
    discount: 35,
    image: {
      url: "https://images.unsplash.com/photo-1613141412501-9012977f1969?w=500",
      publicId: "DellWM126",
    },
    category: "Mouses",
    stock: 180,
  },

  {
    name: "Corsair K95 RGB Platinum",
    description:
      "Corsair K95 RGB Platinum mechanical keyboard featuring premium switches, customizable RGB lighting and durable aluminum frame designed for gamers and creators.",
    price: 15999,
    discount: 12,
    image: {
      url: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500",
      publicId: "CorsairK95RGB",
    },
    category: "Keyboards",
    stock: 80,
  },

  {
    name: "HyperX Alloy Origins",
    description:
      "HyperX Alloy Origins keyboard with compact mechanical design, responsive key switches and durable construction suitable for gaming and productivity workflows.",
    price: 7999,
    discount: 20,
    image: {
      url: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500",
      publicId: "HyperXAlloyOrigins",
    },
    category: "Keyboards",
    stock: 95,
  },

  {
    name: "Zebronics Zeb Max Pro",
    description:
      "Zebronics Zeb Max Pro keyboard with premium design, RGB lighting effects and comfortable typing experience suitable for office users and gamers.",
    price: 2499,
    discount: 30,
    image: {
      url: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500",
      publicId: "ZebronicsZebMaxPro",
    },
    category: "Keyboards",
    stock: 130,
  },
  
];

// ---------------------------------------------------------------

const addData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    console.log("MongoDB Connected");

    // await Product.deleteMany({});

    await Product.insertMany(products);

    console.log("Products Added");

    process.exit();
  } catch (error) {
    console.log(error);

    process.exit(1);
  }
};

addData();
