export type RouteMedia = {
  type: 'image' | 'video';
  src: string;
  alt: string;
  poster?: string;
  position?: string;
};

export type RouteMeta = {
  label: string;
  value: string;
};

export type RouteCard = {
  eyebrow?: string;
  title: string;
  body?: string;
  image?: RouteMedia;
  meta?: RouteMeta[];
};

export type RouteSection = {
  id: string;
  eyebrow?: string;
  title: string;
  body?: string[];
  media?: RouteMedia;
  layout?: 'split' | 'centered' | 'timeline' | 'cards' | 'facts' | 'faq';
  tone?: 'cream' | 'stone' | 'dark';
  cards?: RouteCard[];
  questions?: string[];
};

export type RouteGallery = {
  label: string;
  items: RouteMedia[];
};

export type RoutePageData = {
  slug: string;
  eyebrow: string;
  title: string;
  intro: string;
  hero?: RouteMedia;
  secondaryLinks?: { label: string; href: string; active?: boolean; external?: boolean }[];
  sections: RouteSection[];
  gallery?: RouteGallery;
  cta?: {
    eyebrow: string;
    title: string;
    label: string;
    href: string;
  };
};

const image = (src: string, alt: string, position?: string): RouteMedia => ({
  type: 'image',
  src,
  alt,
  position,
});

const video = (src: string, poster: string, alt: string): RouteMedia => ({
  type: 'video',
  src,
  poster,
  alt,
});

export const routePages: Record<string, RoutePageData> = {
  about: {
    slug: 'about',
    eyebrow: 'About Us',
    title: 'About The Regent',
    intro: "Discover the legacy of Lake Tahoe's premier boutique retreat since 1928.",
    hero: video('/assets/routes/source/about-hero.mp4', '/assets/routes/source/about-hero-poster.webp', 'Lake Tahoe and the Regent beside the water'),
    sections: [
      {
        id: 'history',
        eyebrow: 'Our History',
        title: 'Nearly a Century of Excellence',
        body: [
          "From our founding as an intimate alpine lodge to today's premier boutique retreat, The Regent has continuously evolved while honoring the traditions that define us. Discover the milestones that shaped Lake Tahoe's most distinguished destination.",
        ],
        layout: 'timeline',
        cards: [
          {
            title: '1928',
            body: "Founded as an intimate alpine retreat for San Francisco's elite, the original lodge featured twelve guest rooms built from local timber and Sierra granite, offering unparalleled views of Lake Tahoe's pristine waters.",
            image: image('/assets/routes/source/about-1928.webp', 'Lake Tahoe and The Regent in 1928'),
          },
          {
            title: '1965',
            body: 'A major expansion introduced modern amenities while preserving historic charm. The iconic stone fireplace lobby and lakeside terrace established the property as Lake Tahoe\'s premier luxury destination.',
            image: image('/assets/routes/source/about-1965.webp', 'The Regent during its mid-century expansion'),
          },
          {
            title: '1998',
            body: "Complete restoration honored architectural heritage while adding contemporary comforts. Reimagined suites with spa bathrooms and private balconies earned recognition as one of North America's most distinguished mountain resorts.",
            image: image('/assets/routes/source/about-1998.webp', 'The Regent after its 1998 restoration'),
          },
          {
            title: '2026',
            body: "Latest renovation blends timeless elegance with modern sustainability. New rooftop terraces, world-class spa, and curated dining experiences reflect our commitment to exceptional hospitality and nearly a century of Lake Tahoe tradition.",
            image: image('/assets/routes/source/about-2026.webp', 'The Regent today'),
          },
        ],
      },
      {
        id: 'experience',
        eyebrow: 'The Regent Experience',
        title: 'Where Heritage Meets Modern Luxury',
        body: [
          'At The Regent, every detail reflects our commitment to excellence. From carefully preserved architecture to curated interiors, we honor tradition while embracing contemporary comfort and refined design.',
          'Our dedication to exceptional service creates an atmosphere of timeless sophistication. Whether relaxing in your suite or exploring Lake Tahoe, experience the distinction that has defined The Regent since 1928.',
        ],
        media: image('/assets/routes/source/about-experience.webp', 'Warmly lit Regent interiors', '50% 50%'),
        layout: 'split',
      },
      {
        id: 'philosophy',
        eyebrow: 'Our Philosophy',
        title: 'Elevated Hospitality, Personalized Service',
        body: [
          'We believe true luxury lies in the details. Every guest experience is thoughtfully crafted to exceed expectations, from personalized concierge services to curated amenities that anticipate your every need.',
          'Our intimate scale allows us to deliver unparalleled attention and care. With a commitment to excellence in every interaction, we create memorable stays that reflect the warmth and sophistication The Regent is known for.',
        ],
        media: image('/assets/routes/source/about-philosophy.webp', 'A quiet, refined Regent guest experience'),
        layout: 'split',
        tone: 'stone',
      },
    ],
    cta: {
      eyebrow: 'Est 1928',
      title: 'Ready to Experience The Regent?',
      label: 'Plan Your Stay',
      href: '/rooms',
    },
  },

  rooms: {
    slug: 'rooms',
    eyebrow: 'Rooms & Suites',
    title: 'Find Your Perfect Retreat',
    intro: 'Thoughtfully designed accommodations featuring premium amenities and stunning Lake Tahoe views.',
    hero: video('/assets/routes/source/rooms-hero.mp4', '/assets/routes/source/rooms-hero-poster.webp', 'A Regent suite with alpine views'),
    sections: [
      {
        id: 'rooms-collection',
        eyebrow: 'Our collection',
        title: 'Rooms & Suites',
        layout: 'cards',
        cards: [
          {
            title: 'Alpine Vista Suite',
            body: 'Panoramic mountain views with modern alpine elegance',
            image: image('/assets/routes/source/room-1.jpg', 'Alpine Vista Suite bedroom'),
            meta: [{ label: '28 m²', value: '1 King · 2 Guests' }],
          },
          {
            title: 'Lakeside Retreat',
            body: 'Serene lake views steps from the shoreline',
            image: image('/assets/routes/source/room-2.webp', 'Lakeside Retreat bedroom'),
            meta: [{ label: '32 m²', value: '1 Queen · 2 Guests' }],
          },
          {
            title: 'Summit Penthouse',
            body: 'Two-story luxury with rooftop terrace access',
            image: image('/assets/routes/source/room-3.webp', 'Summit Penthouse interior'),
            meta: [{ label: '54 m²', value: '1 California King · 4 Guests' }],
          },
          {
            title: 'Forest Haven Twin',
            body: 'Family-friendly woodland escape',
            image: image('/assets/routes/source/room-4.webp', 'Forest Haven Twin room'),
            meta: [{ label: '94 m²', value: '2 Twins · 4 Guests' }],
          },
          {
            title: 'Fireside Lodge Junior Suite',
            body: 'Cozy mountain ambiance with premium comfort',
            image: image('/assets/routes/source/room-5.webp', 'Fireside Lodge Junior Suite'),
            meta: [{ label: '45 m²', value: '1 King · 2 Guests' }],
          },
          {
            title: 'Tahoe Terrace Double',
            body: 'Versatile accommodation with alpine charm',
            image: image('/assets/routes/source/room-6.webp', 'Tahoe Terrace Double room'),
            meta: [{ label: '112 m²', value: '2 Queens · 4 Guests' }],
          },
          {
            title: 'Powder Peak Loft',
            body: 'Ski-in convenience with contemporary style',
            image: image('/assets/routes/source/room-7.webp', 'Powder Peak Loft'),
            meta: [{ label: '75 m²', value: '1 King · 2 Guests' }],
          },
          {
            title: 'Crystal Cove Bungalow',
            body: 'Private garden-level sanctuary',
            image: image('/assets/routes/source/room-8.webp', 'Crystal Cove Bungalow'),
            meta: [{ label: '86 m²', value: '1 King · 3 Guests' }],
          },
        ],
      },
      {
        id: 'special-requests',
        eyebrow: 'Special Requests?',
        title: 'Make Your Stay Uniquely Yours',
        body: [
          'Planning a celebration or need specific accommodations? Our team is here to help personalize your stay. Contact our concierge to arrange special amenities, room preferences, or unique experiences tailored to your needs.',
        ],
        media: image('/assets/routes/source/rooms-special.webp', 'A Regent room being prepared for a guest'),
        layout: 'split',
        tone: 'stone',
      },
      {
        id: 'faq',
        eyebrow: 'Questions & Answers',
        title: 'Frequently Asked Questions',
        layout: 'faq',
        questions: [
          'What are your check-in and check-out times?',
          'Do you offer parking?',
          'Are pets allowed?',
          'What dining options are available?',
          'What is your cancellation policy?',
          'Is the hotel accessible?',
        ],
      },
    ],
    cta: {
      eyebrow: 'Find your retreat',
      title: 'Make The Regent Your Next Escape',
      label: 'Contact Us',
      href: '/contact',
    },
  },

  dining: {
    slug: 'dining',
    eyebrow: 'Exquisite Dining',
    title: 'Dining at The Regent',
    intro: 'Seasonal menus crafted from locally sourced ingredients.',
    hero: video('/assets/routes/source/dining-hero.mp4', '/assets/routes/source/dining-hero-poster.webp', 'A beautifully plated dish at The Regent'),
    gallery: {
      label: 'Dining at The Regent gallery',
      items: [
        image('/assets/routes/source/dining-1.webp', 'A Regent dining room prepared for service'),
        image('/assets/routes/source/dining-2.webp', 'A seasonal dish at The Regent'),
        image('/assets/routes/source/dining-3.webp', 'A table set for dinner at The Regent'),
        image('/assets/routes/source/dining-4.webp', 'A refined dining detail at The Regent'),
        image('/assets/routes/source/dining-5.webp', 'A chef-prepared dish at The Regent'),
        image('/assets/routes/source/dining-6.webp', 'An intimate table at The Regent'),
        image('/assets/routes/source/dining-7.webp', 'A seasonal ingredient at The Regent'),
      ],
    },
    sections: [
      {
        id: 'restaurant',
        eyebrow: 'Our Restaurant',
        title: 'Locally Sourced, Seasonally Inspired',
        body: [
          'Our restaurant features seasonal menus built around ingredients sourced from local farms and regional purveyors. The menu changes throughout the year to reflect what\'s available, with a focus on fresh produce, sustainable seafood, and quality meats from nearby suppliers.',
          'Dining options include indoor seating with lake views and an outdoor terrace during warmer months. The wine list features California vintages, with options available by the glass or bottle. Breakfast, lunch, and dinner service are available daily, with in-room dining upon request.',
        ],
        media: image('/assets/routes/source/dining-1.webp', 'The Regent restaurant dining room'),
        layout: 'split',
      },
      {
        id: 'chef',
        eyebrow: 'Meet the Chef',
        title: 'Chef Marco Benedetti',
        body: [
          'Trained in Northern Italy, Chef Marco Benedetti brings over 20 years of experience to The Regent. His approach combines traditional Italian techniques with locally sourced ingredients to create seasonal menus that celebrate regional flavors.',
        ],
        media: image('/assets/routes/source/dining-2.webp', 'Chef Marco Benedetti in the Regent kitchen'),
        layout: 'split',
        tone: 'stone',
      },
      {
        id: 'bar',
        eyebrow: 'The Bar',
        title: 'Craft Cocktails & Curated Wines',
        body: [
          'Our bar features an extensive selection of craft cocktails, premium spirits, and wines from California and beyond. The menu includes classic preparations alongside seasonal creations using house-made syrups and fresh ingredients.',
        ],
        media: image('/assets/routes/source/dining-3.webp', 'A Regent cocktail in the bar'),
        layout: 'split',
      },
      {
        id: 'experiences',
        eyebrow: 'Dining Experiences',
        title: 'More Than Just a Meal',
        layout: 'cards',
        cards: [
          {
            title: 'Private Dining',
            body: 'Host intimate gatherings in our private dining room for up to 16 guests. Our team customizes menus and wine selections for celebrations, business dinners, or special occasions.',
            image: image('/assets/routes/source/dining-4.webp', 'An intimate private dining table'),
          },
          {
            title: 'Seasonal Menus',
            body: 'Our menu rotates four times annually to reflect seasonal availability. Each season brings distinct ingredients, from spring vegetables to winter game, ensuring fresh, locally sourced dishes year-round.',
            image: image('/assets/routes/source/dining-5.webp', 'Seasonal ingredients prepared for dinner'),
          },
          {
            title: 'Wine Program',
            body: 'Our wine list features over 200 selections from California, Italy, and France. The sommelier provides pairing guidance, and monthly wine dinners showcase specific regions with curated multi-course menus.',
            image: image('/assets/routes/source/dining-6.webp', 'A curated selection of Regent wines'),
          },
        ],
      },
    ],
    cta: {
      eyebrow: 'Dining at The Regent',
      title: 'Reserve Your Table',
      label: 'Contact Us',
      href: '/contact',
    },
  },

  wellness: {
    slug: 'wellness',
    eyebrow: 'Restore & Rejuvenate',
    title: 'Wellness & Spa',
    intro: 'Indulge in therapeutic treatments and holistic wellness experiences designed to restore balance.',
    hero: video('/assets/routes/source/wellness-hero.mp4', '/assets/routes/source/wellness-hero-poster.jpg', 'A peaceful wellness retreat at The Regent'),
    sections: [
      {
        id: 'wellness',
        eyebrow: 'Wellness at The Regent',
        title: 'Holistic Wellness in an Alpine Setting',
        body: [
          'Our wellness offerings include a full-service spa, fitness center, and curated programs. From therapeutic massages to guided yoga sessions, each experience is tailored to your needs.',
          'Facilities feature treatment rooms with mountain views, heated indoor pool, steam room, sauna, and relaxation lounge. Our team creates personalized wellness journeys for relaxation, recovery, or fitness maintenance.',
        ],
        media: image('/assets/routes/source/wellness-about.webp', 'A guest relaxing in the Regent spa'),
        layout: 'split',
      },
      {
        id: 'spa',
        eyebrow: 'Spa',
        title: 'Thoughtful Treatments, Restorative Rituals',
        body: [
          'Our spa offers therapeutic massages, facials, and body treatments using premium organic products. Each treatment is customized in private rooms with mountain views.',
        ],
        media: image('/assets/routes/source/wellness-spa.webp', 'A tranquil spa treatment room'),
        layout: 'split',
        tone: 'stone',
      },
      {
        id: 'heat-therapy',
        eyebrow: 'Heat Therapy',
        title: 'Warmth for Muscle Recovery',
        body: [
          'Detoxify and relax in our traditional sauna and eucalyptus-infused steam room. Both spaces offer therapeutic heat for muscle recovery and stress relief.',
          'Available daily for spa guests and hotel visitors. Complimentary towels, robes, and filtered water provided.',
        ],
        media: image('/assets/routes/source/wellness-sauna.webp', 'The Regent sauna and heat therapy space'),
        layout: 'split',
      },
      {
        id: 'fitness',
        eyebrow: 'Fitness',
        title: 'Fitness',
        body: [
          'Our fitness center offers state-of-the-art cardio equipment, free weights, and strength training machines with lake views.',
          'Personal training sessions and customized workout programs are available upon request with advance notice and scheduling.',
        ],
        media: image('/assets/routes/source/wellness-fitness.webp', 'The Regent fitness center'),
        layout: 'split',
        tone: 'dark',
      },
    ],
    cta: {
      eyebrow: 'Begin Your Wellness Journey',
      title: 'From spa treatments to fitness programs, discover personalized wellness experiences.',
      label: 'Book Your Treatment',
      href: '/contact',
    },
  },

  winter: {
    slug: 'experiences/winter',
    eyebrow: 'Winter',
    title: 'Winter at The Regent',
    intro: 'From world-class skiing to cozy fireside relaxation, discover unforgettable winter adventures.',
    hero: video('/assets/routes/source/winter-hero.mp4', '/assets/routes/source/winter-hero-poster.webp', 'A skier moving through fresh alpine snow'),
    secondaryLinks: [
      { label: 'Summer', href: '/experiences/summer' },
      { label: 'Winter', href: '/experiences/winter', active: true },
    ],
    sections: [
      {
        id: 'cold-weather-adventures',
        eyebrow: 'Cold-Weather Adventures',
        title: 'Discover World-Class Skiing, Scenic Snow-Covered Trails, and Cozy Fireside Retreats This Winter',
        layout: 'centered',
      },
      {
        id: 'skiing',
        eyebrow: 'On the Slopes',
        title: 'Skiing & Snowboarding',
        body: [
          'Carve through fresh powder on world-class slopes with stunning alpine views. Access multiple premier resorts offering terrain for every skill level.',
        ],
        media: image('/assets/routes/source/winter-2.webp', 'Skiers on a snow-covered alpine slope'),
        layout: 'split',
      },
      {
        id: 'trails',
        eyebrow: 'Winter Trails',
        title: 'Snowshoe & Cross-Country',
        body: [
          'Trek through pristine winter landscapes and discover hidden trails winding through snow-laden forests. Guided tours available for all experience levels.',
        ],
        media: image('/assets/routes/source/winter-3.webp', 'A snowshoe trail through a winter forest'),
        layout: 'split',
        tone: 'stone',
      },
      {
        id: 'shopping',
        eyebrow: 'Local Shopping',
        title: 'Village Shopping',
        body: [
          'Browse boutique galleries, artisan shops, and luxury retail in charming alpine towns. Discover unique handcrafted goods and locally made treasures.',
        ],
        media: image('/assets/routes/source/winter-6.webp', 'A charming alpine village in winter'),
        layout: 'split',
      },
    ],
    gallery: {
      label: 'Winter at The Regent gallery',
      items: [
        image('/assets/routes/source/winter-1.webp', 'A cozy winter interior at The Regent'),
        image('/assets/routes/source/winter-4.webp', 'A winter landscape near The Regent'),
        image('/assets/routes/source/winter-5.webp', 'A fireside winter moment at The Regent'),
        image('/assets/routes/source/winter-6.webp', 'A snowy alpine detail near The Regent'),
      ],
    },
    cta: {
      eyebrow: 'A season to remember',
      title: 'Ready to Start Your Adventure?',
      label: 'Book Your Stay',
      href: 'https://booking.com',
    },
  },

  contact: {
    slug: 'contact',
    eyebrow: 'Contact',
    title: 'Get in Touch',
    intro: "Whether you're planning your next mountain escape, have questions about our suites, or need assistance with reservations, our team is ready to help. Reach out today and let us craft your perfect Lake Tahoe experience.",
    hero: image('/assets/routes/source/contact.webp', 'Lake Tahoe beside The Regent'),
    sections: [
      {
        id: 'contact-details',
        eyebrow: 'Contact The Regent',
        title: 'We are here to help plan your stay',
        layout: 'facts',
        cards: [
          { title: 'Email', body: 'hotel@regent.com' },
          { title: 'Address', body: '2847 Lakeshore Boulevard\nSouth Lake Tahoe, CA 96150' },
          { title: 'Phone', body: '+1 555 123 4567' },
        ],
      },
    ],
  },
};
