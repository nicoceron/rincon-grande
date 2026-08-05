export type RouteMedia = {
  type: 'image' | 'video';
  src: string;
  alt: string;
  poster?: string;
  position?: string;
  transition?: string[];
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

const image = (src: string, alt: string, position?: string, transition?: string[]): RouteMedia => ({
  type: 'image',
  src,
  alt,
  position,
  transition,
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
    eyebrow: 'Rincón Grande · Limay',
    title: 'An authentic corner of Patagonia',
    intro: 'Beside the Limay River, in Nahuel Huapi National Park, an intimate estate for experiencing the land.',
    hero: image(
      '/assets/rincon/hero-lodge.webp',
      'Rincón Grande lodge among Patagonian trees',
      undefined,
      ['/assets/rincon/lodge-river.webp', '/assets/rincon/lodge-exterior.webp'],
    ),
    sections: [
      {
        id: 'history',
        eyebrow: 'The Place',
        title: 'An estate on the banks of the Limay',
        body: [
          'Rincón Grande sits in Nahuel Huapi National Park, at Route 237 km 1614, 40 minutes from Bariloche airport. The landscape, river, and intimate scale of the lodge set the pace for every stay.',
        ],
        layout: 'timeline',
        cards: [
          {
            title: 'Location',
            body: 'Nahuel Huapi National Park, Neuquén: a corner opening onto the Limay River and the Patagonian steppe.',
            image: image('/assets/rincon/lodge-aerial.webp', 'Aerial view of the Limay River and Rincón Grande surroundings'),
          },
          {
            title: 'The Lodge',
            body: 'Cypress and stone architecture, a glass-walled living room above the river, and life gathered around the fire.',
            image: image('/assets/rincon/lodge-living.webp', 'Rincón Grande living room overlooking the landscape'),
          },
          {
            title: 'The Team',
            body: 'Attentive service and close guiding: the staff is part of the immersion in the land.',
            image: image('/assets/rincon/fishing-guide.webp', 'Rincón Grande guide beside the river'),
          },
          {
            title: 'Conservation',
            body: 'A light touch and a custodial approach to the landscape, woods, and river.',
            image: image('/assets/rincon/landscape-limay.webp', 'Limay River landscape in Patagonia'),
          },
        ],
      },
      {
        id: 'experience',
        eyebrow: 'The Lodge',
        title: 'Where architecture meets the landscape',
        body: [
          'Cypress wood, stone, and the wood-burning fireplace create a warm home integrated into its surroundings. Every space is designed to look outward and return to the heart of the fire.',
          'The lodge welcomes small groups and keeps a personal scale: the stay feels close, quiet, and deeply Patagonian.',
        ],
        media: image('/assets/rincon/lodge-fireplace.webp', 'Wood-burning fireplace and lodge materials'),
        layout: 'split',
      },
      {
        id: 'philosophy',
        eyebrow: 'Guardianship of the Limay',
        title: 'The river sets the pace',
        body: [
          'Catch-and-release fishing, care for the river, and a light touch guide our relationship with the land. Nature is not the backdrop to the experience: it is the center.',
          'Silence, fire, and landscape come together in a form of hospitality that leaves room to observe, listen, and return changed.',
        ],
        media: image('/assets/rincon/hero-limay.webp', 'The Limay River at sunset'),
        layout: 'split',
        tone: 'stone',
      },
    ],
    cta: {
      eyebrow: 'Rincón Grande · Limay',
      title: 'Experience the land your way',
      label: 'Check availability',
      href: '/rooms',
    },
  },

  rooms: {
    slug: 'rooms',
    eyebrow: 'The Lodge',
    title: 'An intimate refuge beside the river',
    intro: 'Three en-suite suites and an additional bedroom accommodate up to eight guests, surrounded by cypress, stone, and landscape.',
    hero: image(
      '/assets/rincon/lodge-living.webp',
      'Lodge interior overlooking the landscape',
      undefined,
      ['/assets/rincon/room-bedroom.webp', '/assets/rincon/lodge-fireplace.webp'],
    ),
    sections: [
      {
        id: 'rooms-collection',
        eyebrow: 'Our collection',
        title: 'Spaces to settle into',
        layout: 'cards',
        cards: [
          {
            title: 'Cypress Suite',
            body: 'An intimate suite with an en-suite bathroom and natural materials.',
            image: image('/assets/rincon/room-bedroom.webp', 'Rincón Grande suite with cypress wood'),
            meta: [{ label: 'Suite', value: '2 guests' }],
          },
          {
            title: 'Stone Suite',
            body: 'Calm, natural light, and a direct relationship with the landscape.',
            image: image('/assets/rincon/lodge-fireplace.webp', 'Warm lodge interior'),
            meta: [{ label: 'Suite', value: '2 guests' }],
          },
          {
            title: 'Limay Suite',
            body: 'Rest beside the river, with Patagonia always present.',
            image: image('/assets/rincon/lodge-river.webp', 'Limay River in front of the lodge'),
            meta: [{ label: 'Suite', value: '2 guests' }],
          },
          {
            title: 'Additional Bedroom',
            body: "An additional bedroom to complete your group's stay.",
            image: image('/assets/rincon/lodge-exterior.webp', 'Rincón Grande lodge among trees'),
            meta: [{ label: 'Bedroom', value: '2 guests' }],
          },
          {
            title: 'Glass-Walled Living Room',
            body: 'The glass-walled common space brings the lodge together around the landscape.',
            image: image('/assets/rincon/lodge-living.webp', 'Glass-walled lodge living room'),
            meta: [{ label: 'Common space', value: '8 guests' }],
          },
          {
            title: 'Wood-Burning Fireplace',
            body: 'Shared life unfolds around the fire.',
            image: image('/assets/rincon/lodge-fireplace.webp', 'Lodge wood-burning fireplace'),
            meta: [{ label: 'Common space', value: 'Lodge' }],
          },
          {
            title: 'Cypress and Stone',
            body: 'Warm architecture, integrated into the surroundings.',
            image: image('/assets/rincon/lodge-garden.webp', 'Lodge exterior in the Patagonian landscape'),
            meta: [{ label: 'Materials', value: 'Lodge' }],
          },
          {
            title: 'Exclusive Lodge',
            body: 'The entire lodge for your group, accommodating up to eight guests.',
            image: image('/assets/rincon/lodge-aerial.webp', 'Aerial view of the lodge and river'),
            meta: [{ label: 'Exclusive use', value: 'Up to 8 guests' }],
          },
        ],
      },
      {
        id: 'special-requests',
        eyebrow: 'Exclusive use',
        title: 'The whole lodge, for your group',
        body: [
          'Three suites, an additional bedroom, and shared spaces for enjoying the landscape without hurry. Ask about an exclusive lodge stay.',
        ],
        media: image('/assets/rincon/lodge-exterior.webp', 'The complete Rincón Grande lodge'),
        layout: 'split',
        tone: 'stone',
      },
      {
        id: 'faq',
        eyebrow: 'Frequently asked questions',
        title: 'Before you arrive',
        layout: 'faq',
        questions: [
          'How many guests can the lodge accommodate?',
          'How many suites does Rincón Grande have?',
          'Where is the lodge located?',
          'Can I reserve the entire lodge?',
          'Which activities can be combined?',
          'How do I check availability?',
        ],
      },
    ],
    cta: {
      eyebrow: 'Find your corner',
      title: 'Make the Limay your next pause',
      label: 'Check availability',
      href: '/contact',
    },
  },

  dining: {
    slug: 'dining',
    eyebrow: 'Dining',
    title: 'Flavors of Patagonia',
    intro: 'Gourmet cuisine, regional wines, and meals designed to accompany every program.',
    hero: image(
      '/assets/rincon/lodge-living.webp',
      'Rincón Grande lodge table and living room',
      undefined,
      ['/assets/rincon/campfire.webp', '/assets/rincon/sunset-field.webp'],
    ),
    gallery: {
      label: 'Rincón Grande dining gallery',
      items: [
        image('/assets/rincon/lodge-living.webp', 'Lodge interior prepared for gathering'),
        image('/assets/rincon/campfire.webp', 'Fire burning at Rincón Grande'),
        image('/assets/rincon/lodge-fireplace.webp', 'Lodge wood-burning fireplace'),
        image('/assets/rincon/sunset-field.webp', 'Patagonian landscape at the end of the day'),
        image('/assets/rincon/lodge-garden.webp', 'Lodge among gardens and trees'),
        image('/assets/rincon/hero-limay.webp', 'The Limay River beside the estate'),
        image('/assets/rincon/lodge-exterior.webp', 'Rincón Grande lodge exterior'),
      ],
    },
    sections: [
      {
        id: 'restaurant',
        eyebrow: 'Patagonian cuisine',
        title: 'Flavors born from the land',
        body: [
          'The culinary offering follows the landscape: gourmet Patagonian cuisine, regional produce, and mountain wines to enjoy without hurry.',
          "Menus are adapted to each group's program, from a day in the field to a hunting or fishing stay.",
        ],
        media: image('/assets/rincon/lodge-living.webp', 'Lodge gathering space'),
        layout: 'split',
      },
      {
        id: 'chef',
        eyebrow: 'At the table',
        title: 'Gathering around the fire',
        body: [
          'Every meal follows the rhythm of the estate: a warm table, carefully chosen ingredients, and time to talk, look at the landscape, and begin again.',
        ],
        media: image('/assets/rincon/campfire.webp', 'Fire burning beside the lodge'),
        layout: 'split',
        tone: 'stone',
      },
      {
        id: 'bar',
        eyebrow: 'Regional wines',
        title: 'A toast to the landscape',
        body: [
          'The selection of regional wines accompanies Patagonian flavors and the moments that unfold beside the river after a day outdoors.',
        ],
        media: image('/assets/rincon/sunset-field.webp', 'Patagonian landscape at sunset'),
        layout: 'split',
      },
      {
        id: 'experiences',
        eyebrow: 'Moments at the table',
        title: 'More than a meal',
        layout: 'cards',
        cards: [
          {
            title: 'Field Day',
            body: 'A tailored program that brings together outdoor activities and a shared lunch.',
            image: image('/assets/rincon/campfire.webp', 'Field day beside the fire'),
          },
          {
            title: 'Hunting and Fishing',
            body: 'The kitchen accompanies the hunting, fishing, and Patagonian Double programs.',
            image: image('/assets/rincon/hero-limay.webp', 'Limay River in Patagonia'),
          },
          {
            title: 'Private Gatherings',
            body: 'The estate as a setting for celebrations, meetings, and wine tastings.',
            image: image('/assets/rincon/lodge-garden.webp', 'Lodge prepared for a gathering'),
          },
        ],
      },
    ],
    cta: {
      eyebrow: 'Dining at Rincón Grande',
      title: 'Let the table be part of the journey',
      label: 'Inquire',
      href: '/contact',
    },
  },

  wellness: {
    slug: 'wellness',
    eyebrow: 'Currents',
    title: 'Fly Fishing',
    intro: "3.5 km of private riverfront on the Limay River, one of Patagonia's most iconic fly-fishing rivers.",
    hero: image(
      '/assets/rincon/angler-wide.webp',
      'Fly fisherman on the Limay River',
      undefined,
      ['/assets/rincon/angler-detail.webp', '/assets/rincon/fishing-guide.webp'],
    ),
    sections: [
      {
        id: 'wellness',
        eyebrow: 'Fishing at Rincón Grande',
        title: 'Read the river day by day',
        body: [
          'Fishing never repeats itself: read the river day by day with your guide, attending to the water, light, and movement of each outing.',
          'The private Limay riverbank lets you find the rhythm of the place and experience catch-and-release fishing with care for the land.',
        ],
        media: image('/assets/rincon/angler-wide.webp', 'Fly fishing on the Limay'),
        layout: 'split',
      },
      {
        id: 'spa',
        eyebrow: 'The Limay River',
        title: 'A private riverbank to find your rhythm',
        body: [
          'Three and a half kilometers of private riverbank open a close, guided fishing experience deeply connected to the landscape.',
        ],
        media: image('/assets/rincon/angler-vertical.webp', 'Fly fisherman standing in the river'),
        layout: 'split',
        tone: 'stone',
      },
      {
        id: 'heat-therapy',
        eyebrow: 'The day',
        title: 'Water, silence, and reading the landscape',
        body: [
          'Each outing adapts to the river conditions and the experience level of the anglers. Your guide accompanies the day with knowledge, patience, and care.',
          'March through May is a special season for seeking migratory trout as part of a combined hunting program.',
        ],
        media: image('/assets/rincon/angler-detail.webp', 'Fly-fishing detail on the Limay'),
        layout: 'split',
      },
      {
        id: 'fitness',
        eyebrow: 'Combined program',
        title: 'The Patagonian Double',
        body: [
          'Seven nights and six days combining fishing on the Limay River and hunting on the same estate, with no transfers between regions.',
          'A way to extend the journey and experience two rhythms of the land in one program.',
        ],
        media: image('/assets/rincon/landscape-limay.webp', 'Open landscape along the Limay River'),
        layout: 'split',
        tone: 'dark',
      },
    ],
    cta: {
      eyebrow: 'Fishing on the Limay',
      title: 'Read the river at your own pace',
      label: 'Inquire about the program',
      href: '/contact',
    },
  },

  winter: {
    slug: 'experiences/winter',
    eyebrow: 'The Pulse',
    title: 'Patagonia Hunting',
    intro: 'Fair chase across open steppe and Andean forest, with quiet tradition and responsible stewardship.',
    hero: image(
      '/assets/rincon/hunting-wide.webp',
      'Hunters in the Patagonian steppe',
      undefined,
      ['/assets/rincon/hunting-action.webp', '/assets/rincon/hunting-rocks.webp'],
    ),
    secondaryLinks: [
      { label: 'Fishing', href: '/experiences/summer' },
      { label: 'Hunting', href: '/experiences/winter', active: true },
    ],
    sections: [
      {
        id: 'cold-weather-adventures',
        eyebrow: 'Hunting',
        title: 'A quiet tradition across open steppe and Andean forest',
        layout: 'centered',
      },
      {
        id: 'skiing',
        eyebrow: 'Red Stag Program',
        title: '5 nights · 4 hunting days',
        body: [
          'Free-range red stag, guided 1:1 or 2:1, with two nights at the Main Lodge and three at Hunter’s Camp. Season: March 1 to April 30.',
        ],
        media: image('/assets/rincon/hunting-action.webp', 'Hunter in the Patagonian steppe'),
        layout: 'split',
      },
      {
        id: 'trails',
        eyebrow: 'The Patagonian Double',
        title: 'Hunting and fishing in one journey',
        body: [
          'Seven nights and six days combining hunting and fishing on the same estate, with the Limay River and steppe as two sides of one landscape.',
        ],
        media: image('/assets/rincon/hunting-action-alt.webp', 'Hunting day in open country'),
        layout: 'split',
        tone: 'stone',
      },
      {
        id: 'shopping',
        eyebrow: 'Fair chase',
        title: 'Land and responsible stewardship',
        body: [
          'The experience is built on respect for the surroundings, reading the landscape, and a quiet hunting tradition in open spaces.',
        ],
        media: image('/assets/rincon/hunting-rocks.webp', 'Hunters among rocks and mountains'),
        layout: 'split',
      },
    ],
    gallery: {
      label: 'Rincón Grande hunting gallery',
      items: [
        image('/assets/rincon/hunting-wide.webp', 'Hunters in the steppe'),
        image('/assets/rincon/hunting-action.webp', 'Hunting day in Patagonia'),
        image('/assets/rincon/antlers.webp', 'Antlers around the lodge'),
        image('/assets/rincon/landscape-peak.webp', 'Patagonian mountains'),
      ],
    },
    cta: {
      eyebrow: 'A precise experience',
      title: 'Ask about the hunting program',
      label: 'View program',
      href: 'https://booking.com',
    },
  },

  contact: {
    slug: 'contact',
    eyebrow: 'Rincón Grande · Limay',
    title: 'Contact',
    intro: 'Write to us to ask about availability, fishing and hunting programs, lodge stays, or private gatherings.',
    hero: image(
      '/assets/rincon/hero-limay.webp',
      'The Limay River beside Rincón Grande',
    ),
    sections: [
      {
        id: 'contact-details',
        eyebrow: "Let's talk",
        title: 'We are here to help plan your stay',
        layout: 'facts',
        cards: [
          { title: 'WhatsApp', body: '+54 9 2944 209090' },
          { title: 'Instagram', body: '@rincongrandelimay' },
          { title: 'Address', body: 'National Route 237, km 1614\nNeuquén, Patagonia' },
        ],
      },
    ],
  },
};
