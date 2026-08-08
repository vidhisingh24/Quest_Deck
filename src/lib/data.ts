import { 
  UserProfile, 
  RoadmapNode, 
  InteractiveMission, 
  QuizQuestion, 
  Achievement, 
  LeaderboardUser, 
  WeeklyStudyStat,
  DailyQuest,
  ShopItem,
  AIQuestionnaireAnswers
} from './types';

export const ALEX_USER: UserProfile = {
  id: 'usr_demo_1',
  name: 'Alex Rivers',
  email: 'alex@questdeck.edu',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
  level: 4,
  xp: 1850,
  coins: 620,
  streak: 7,
  lastStudyDate: new Date().toISOString(),
  careerGoal: 'Full-Stack Systems Architect',
  skillLevel: 'Intermediate',
  dailyStudyTime: 60,
  learningStyle: 'Sprint & Build',
  interests: ['Web Dev', 'Networking', 'AI & Algorithms', 'Database Systems'],
  isOnboarded: true,
  isPrivateOnLeaderboard: false,
  chronotype: 'morning',
  pacePreference: 'speedrun',
  targetGoal: 'job'
};

export const MAYA_USER: UserProfile = {
  id: 'usr_demo_2',
  name: 'Maya Patel',
  email: 'maya@questdeck.edu',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80',
  level: 3,
  xp: 1320,
  coins: 480,
  streak: 12,
  lastStudyDate: new Date().toISOString(),
  careerGoal: 'Cybersecurity Analyst & DevSecOps',
  skillLevel: 'Beginner',
  dailyStudyTime: 30,
  learningStyle: 'Deep Dive & Practice',
  interests: ['Web Dev', 'Cybersecurity', 'Cloud & DevOps'],
  isOnboarded: true,
  isPrivateOnLeaderboard: false,
  chronotype: 'night',
  pacePreference: 'mastery',
  targetGoal: 'projects'
};

export const INITIAL_USER: UserProfile = ALEX_USER;

export const MULTI_SUBJECT_ROADMAPS: Record<string, RoadmapNode[]> = {
  'Web Dev': [
    {
      id: 'node_web_1',
      title: '1. The DOM & Browser Event Loop',
      category: 'Web Dev',
      description: 'Master non-blocking asynchronous event delegation, call stacks, microtasks, and DOM manipulation.',
      level: 1,
      xpReward: 250,
      coinReward: 20,
      estimatedMinutes: 20,
      status: 'completed',
      icon: 'Code2',
      prerequisites: [],
      conceptTags: ['DOM API', 'Event Loop', 'Promises', 'Microtasks'],
      deliverable: 'Interactive DOM Event Visualizer',
      practicePrompt: 'Build a custom event listener debugger that logs bubble vs capture phases.',
      resourceLink: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop'
    },
    {
      id: 'node_web_2',
      title: '2. CSS Grid & Modern Responsive Layouts',
      category: 'Web Dev',
      description: 'Architect complex fluid CSS grid templates, flexbox alignment, and media query breakpoints.',
      level: 1,
      xpReward: 280,
      coinReward: 22,
      estimatedMinutes: 25,
      status: 'completed',
      icon: 'Layout',
      prerequisites: ['node_web_1'],
      conceptTags: ['CSS Grid', 'Flexbox', 'Container Queries', 'Subgrid'],
      deliverable: 'Dashboard UI Grid Component',
      practicePrompt: 'Design a responsive 3-column dashboard using zero hardcoded pixel widths.',
      resourceLink: 'https://css-tricks.com/snippets/css/complete-guide-grid/'
    },
    {
      id: 'node_web_3',
      title: '3. React Component Architecture & State Hooks',
      category: 'Web Dev',
      description: 'Deep dive into React 19 hooks, virtual DOM reconciliations, custom hooks, and memoization.',
      level: 2,
      xpReward: 350,
      coinReward: 30,
      estimatedMinutes: 35,
      status: 'unlocked',
      icon: 'Code2',
      prerequisites: ['node_web_2'],
      conceptTags: ['React 19', 'useState', 'useEffect', 'useMemo'],
      deliverable: 'Interactive Quest Quiz Runner',
      practicePrompt: 'Create a custom hook useLocalStorage that synchronizes state with browser storage.',
      resourceLink: 'https://react.dev/learn'
    },
    {
      id: 'node_web_4',
      title: '4. RESTful API Design & Fetch Hydration',
      category: 'Web Dev',
      description: 'Design idempotent REST endpoints, HTTP status codes, headers, and CORS policies.',
      level: 3,
      xpReward: 400,
      coinReward: 35,
      estimatedMinutes: 40,
      status: 'locked',
      icon: 'Server',
      prerequisites: ['node_web_3'],
      conceptTags: ['REST API', 'Fetch', 'CORS', 'HTTP Headers'],
      deliverable: 'Weather API Client Component',
      practicePrompt: 'Write a fetch wrapper with automatic retry logic and token refresh header.',
      resourceLink: 'https://restfulapi.net/'
    },
    {
      id: 'node_web_5',
      title: '5. Next.js App Router & Server Components',
      category: 'Web Dev',
      description: 'Build high-performance Server-Side Rendered (SSR) routes, static site generation, and server actions.',
      level: 4,
      xpReward: 500,
      coinReward: 45,
      estimatedMinutes: 50,
      status: 'locked',
      icon: 'Zap',
      prerequisites: ['node_web_4'],
      conceptTags: ['Next.js 14', 'RSC', 'Server Actions', 'Dynamic Routes'],
      deliverable: 'Full Stack QuestDeck Portal',
      practicePrompt: 'Implement a server action to handle user registration with schema validation.',
      resourceLink: 'https://nextjs.org/docs'
    }
  ],
  'Networking': [
    {
      id: 'node_net_1',
      title: '1. The Data Packet Journey',
      category: 'Networking',
      description: 'Trace a 1500-byte IP packet routing through routers, DNS servers, and firewalls.',
      level: 1,
      xpReward: 250,
      coinReward: 15,
      estimatedMinutes: 15,
      status: 'completed',
      icon: 'Network',
      prerequisites: [],
      conceptTags: ['IP Packets', 'OSI Model', 'Routers', 'Ethernet'],
      deliverable: 'Packet Tracer Logs',
      practicePrompt: 'Simulate packet hop latency across 3 intermediate gateway routers.'
    },
    {
      id: 'node_net_2',
      title: '2. Subnetting & CIDR Address Space',
      category: 'Networking',
      description: 'Calculate subnet masks, broadcast IPs, and gateway boundaries for enterprise networks.',
      level: 2,
      xpReward: 300,
      coinReward: 20,
      estimatedMinutes: 20,
      status: 'unlocked',
      icon: 'Network',
      prerequisites: ['node_net_1'],
      conceptTags: ['CIDR', 'Subnetting', 'Subnet Mask', 'Gateway'],
      deliverable: 'Subnet Calculator Script',
      practicePrompt: 'Subnet a /24 network into 4 equal subnets for separate departments.'
    }
  ],
  'Cybersecurity': [
    {
      id: 'node_sec_1',
      title: '1. SQL Injection & Input Sanitization',
      category: 'Cybersecurity',
      description: 'Identify unescaped SQL vulnerabilities, bypass authentication, and patch parameterized queries.',
      level: 1,
      xpReward: 300,
      coinReward: 25,
      estimatedMinutes: 20,
      status: 'completed',
      icon: 'ShieldCheck',
      prerequisites: [],
      conceptTags: ['SQLi', 'Parameterized Queries', 'OWASP Top 10', 'Sanitization'],
      deliverable: 'Patched Auth Endpoint',
      practicePrompt: 'Exploit a vulnerable login form with classic single quote payloads, then fix it.'
    }
  ],
  'AI & Algorithms': [
    {
      id: 'node_ai_1',
      title: '1. Linear Regression & Gradient Descent',
      category: 'AI & Algorithms',
      description: 'Compute cost functions, MSE loss, and optimize weights using learning rates and gradient vectors.',
      level: 1,
      xpReward: 300,
      coinReward: 25,
      estimatedMinutes: 25,
      status: 'completed',
      icon: 'BrainCircuit',
      prerequisites: [],
      conceptTags: ['Gradient Descent', 'Loss Function', 'Weights & Biases', 'Vectorization'],
      deliverable: 'Gradient Descent Visualizer',
      practicePrompt: 'Implement gradient descent step formula in TypeScript using vector arrays.'
    }
  ]
};

export const INITIAL_ROADMAP = MULTI_SUBJECT_ROADMAPS['Web Dev'];

export function generatePersonalizedRoadmap(
  category: string, 
  user: UserProfile,
  priorKnowledge: 'beginner' | 'basics' | 'advanced' = 'beginner'
): RoadmapNode[] {
  const baseNodes = MULTI_SUBJECT_ROADMAPS[category] || MULTI_SUBJECT_ROADMAPS['Web Dev'];
  
  const isMorning = user.chronotype === 'morning';
  const isSpeedrun = user.pacePreference === 'speedrun';
  const isAlex = user.email.includes('alex');

  let startUnlockedIndex = 0;
  if (priorKnowledge === 'basics' || isAlex) {
    startUnlockedIndex = 2;
  } else if (priorKnowledge === 'advanced') {
    startUnlockedIndex = 3;
  }

  return baseNodes.map((node, index) => {
    let customTime = node.estimatedMinutes;
    let customXp = node.xpReward;
    let aiNote = '';

    if (isSpeedrun) {
      customTime = Math.max(10, Math.round(node.estimatedMinutes * 0.75));
      customXp = Math.round(node.xpReward * 1.2);
      aiNote = `⚡ Speedrun Pacing: High-yield ${customTime} min sprint.`;
    } else {
      customTime = Math.round(node.estimatedMinutes * 1.25);
      aiNote = `🧭 Deep Mastery: Includes hands-on micro-tasks (${customTime} mins).`;
    }

    if (isMorning) {
      aiNote += ` ☀️ Best tackled in your 07:00 AM focus window.`;
    } else {
      aiNote += ` 🌙 Best tackled in your 10:30 PM quiet focus window.`;
    }

    let nodeStatus: 'completed' | 'unlocked' | 'locked' = 'locked';
    if (index < startUnlockedIndex) {
      nodeStatus = 'completed';
      aiNote += ` ⏭️ Pre-cleared based on your existing prior knowledge assessment!`;
    } else if (index === startUnlockedIndex) {
      nodeStatus = 'unlocked';
      aiNote += ` 🎯 Starting stage based on your skill level!`;
    }

    return {
      ...node,
      id: `pers_${node.id}_${user.id}`,
      estimatedMinutes: customTime,
      xpReward: customXp,
      isPersonalized: true,
      aiRecommendationNote: aiNote,
      status: nodeStatus
    };
  });
}

export const ALEX_PERSONALIZED_ROADMAP = generatePersonalizedRoadmap('Web Dev', ALEX_USER, 'basics');
export const MAYA_PERSONALIZED_ROADMAP = generatePersonalizedRoadmap('Web Dev', MAYA_USER, 'beginner');

export const INITIAL_LEADERBOARD: LeaderboardUser[] = [
  {
    rank: 1,
    id: 'usr_top_1',
    name: 'Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=250&q=80',
    xp: 3450,
    streak: 18,
    badge: '🏆 Grand Master'
  },
  {
    rank: 2,
    id: 'usr_top_2',
    name: 'Marcus Vance',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    xp: 2980,
    streak: 14,
    badge: '🥈 Senior Questor'
  },
  {
    rank: 3,
    id: 'usr_demo_1',
    name: 'Alex Rivers',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    xp: 1850,
    streak: 7,
    badge: '🥉 Code Vanguard',
    isCurrentUser: true
  },
  {
    rank: 4,
    id: 'usr_demo_2',
    name: 'Maya Patel',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80',
    xp: 1320,
    streak: 12,
    badge: '⭐ Scholar Questor'
  },
  {
    rank: 5,
    id: 'usr_top_5',
    name: 'David Kim',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80',
    xp: 1100,
    streak: 4,
    badge: '🚀 Rising Apprentice'
  }
];

export const INITIAL_DAILY_QUESTS: DailyQuest[] = [
  {
    id: 'quest_1',
    title: 'Complete 1 Interactive Mission',
    rewardXp: 150,
    rewardCoins: 25,
    progress: 1,
    maxProgress: 1,
    isClaimed: false
  },
  {
    id: 'quest_2',
    title: 'Review 10 Flashcards Deck',
    rewardXp: 100,
    rewardCoins: 15,
    progress: 6,
    maxProgress: 10,
    isClaimed: false
  },
  {
    id: 'quest_3',
    title: 'Maintain 5-Day Study Streak',
    rewardXp: 200,
    rewardCoins: 30,
    progress: 5,
    maxProgress: 5,
    isClaimed: true
  }
];

export const INITIAL_SHOP_ITEMS: ShopItem[] = [
  {
    id: 'item_1',
    title: 'QuestDeck Official Cap 🧢',
    description: 'Embroidered high-quality QuestDeck Questor Cap. Shipped free to your address!',
    costCoins: 300,
    icon: 'Cap',
    category: 'Booster'
  },
  {
    id: 'item_2',
    title: 'Developer Tech T-Shirt 👕',
    description: 'Premium cotton QuestDeck "Learn by Playing" Developer T-Shirt.',
    costCoins: 500,
    icon: 'TShirt',
    category: 'Booster'
  },
  {
    id: 'item_3',
    title: 'Systems & Algorithms Handbook 📘',
    description: 'Physical printed copy of Systems Architecture & Algorithms Mastery Guide.',
    costCoins: 400,
    icon: 'Book',
    category: 'Certificate'
  },
  {
    id: 'item_4',
    title: 'Streak Freeze Shield 🛡️',
    description: 'Protects your daily learning streak if you miss a day of study.',
    costCoins: 100,
    icon: 'Shield',
    category: 'Streak'
  },
  {
    id: 'item_5',
    title: '2X XP Booster (24 Hours) ⚡',
    description: 'Doubles all XP earned from missions and flashcards for 24 hours.',
    costCoins: 150,
    icon: 'Zap',
    category: 'Booster'
  }
];

export const INITIAL_WEEKLY_STATS: WeeklyStudyStat[] = [
  { day: 'Mon', xp: 220, minutes: 35 },
  { day: 'Tue', xp: 340, minutes: 50 },
  { day: 'Wed', xp: 180, minutes: 30 },
  { day: 'Thu', xp: 450, minutes: 60 },
  { day: 'Fri', xp: 290, minutes: 45 },
  { day: 'Sat', xp: 380, minutes: 55 },
  { day: 'Sun', xp: 150, minutes: 25 }
];

export const WEEKLY_STATS = INITIAL_WEEKLY_STATS;

// Rich Multimodal Interactive Missions Database
export const MISSIONS_DATA: Record<string, InteractiveMission> = {
  'node_web_1': {
    id: 'node_web_1',
    title: 'The DOM & Browser Event Loop',
    topic: 'Web Dev',
    tagline: 'Master single-threaded non-blocking asynchronous JavaScript execution',
    description: 'Deep dive into event delegation, microtasks vs macrotasks, DOM call stack queues, and event bubbling phases.',
    xpReward: 250,
    coinReward: 20,
    durationMinutes: 20,
    articleContent: `### Understanding the Browser Single-Threaded Architecture

JavaScript inside modern web browsers runs on a single main thread. However, modern applications remain fluid and responsive despite heavy I/O operations because of the **Browser Event Loop**.

#### Key Components of the Engine:
1. **Call Stack**: Executes synchronous function calls in a Last-In, First-Out (LIFO) order.
2. **Web APIs**: Background browser C++ bindings handling DOM events, \`fetch()\` HTTP requests, and \`setTimeout()\` timers.
3. **Microtask Queue**: Holds resolved Promise callbacks (\`.then()\` / \`async/await\`) and \`queueMicrotask()\`. Executes **immediately** after current call stack clears.
4. **Macrotask Queue**: Holds \`setTimeout\`, \`setInterval\`, and I/O callbacks. Runs **one task per loop iteration** after clearing the microtask queue.

> [!NOTE]
> **Pro Tip**: Microtasks always starve Macrotasks if recursively scheduled! Always ensure microtask queues clear cleanly.`,
    keyFacts: [
      'JavaScript runs on a single main thread backed by V8 Engine and C++ Web APIs',
      'Microtasks (Promises) take priority over Macrotasks (setTimeout / setInterval)',
      'DOM events use Event Bubbling (inner to outer) and Event Capturing (outer to inner)',
      'Event Delegation allows 1 parent listener to handle hundreds of child elements efficiently'
    ],
    videoUrl: 'https://www.youtube.com/embed/8aGhZQkoFbQ',
    videoThumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
    videoDuration: '04:15',
    videoTimestamps: [
      { time: '00:15', label: '1. Call Stack vs Web APIs' },
      { time: '01:30', label: '2. Microtask Queue & Promises' },
      { time: '02:45', label: '3. Macrotask Queue & setTimeout' },
      { time: '03:50', label: '4. Event Delegation Best Practices' }
    ],
    codeSnippets: [
      {
        language: 'javascript',
        title: 'Call Stack vs Microtask Order',
        code: `console.log('1. Synchronous Start');

setTimeout(() => {
  console.log('4. Macrotask Timeout Callback');
}, 0);

Promise.resolve().then(() => {
  console.log('3. Microtask Promise Callback');
});

console.log('2. Synchronous End');`,
        explanation: 'Output order: 1. Synchronous Start -> 2. Synchronous End -> 3. Microtask Promise -> 4. Macrotask Timeout.'
      }
    ],
    curatedLinks: [
      { title: 'MDN: Concurrency Model and the Event Loop', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop', source: 'MDN Web Docs' },
      { title: 'JavaScript.info: Event Loop Tasks & Microtasks', url: 'https://javascript.info/event-loop', source: 'JS Info' }
    ],
    steps: []
  },
  'node_net_1': {
    id: 'node_net_1',
    title: 'The Data Packet Journey',
    topic: 'Networking',
    tagline: 'Route a 1500-byte IP packet through network gateways',
    description: 'Act as a network packet travelling from your laptop browser to a remote web server across routers and firewalls.',
    xpReward: 250,
    coinReward: 15,
    durationMinutes: 15,
    articleContent: `### The Life of an Ethernet IP Packet

When you type \`https://questdeck.edu\` into your browser, your OS constructs an IP packet wrapped in Ethernet frames.

#### Key Encapsulation Layers:
1. **Application Layer (Layer 7)**: HTTP/HTTPS GET request payload.
2. **Transport Layer (Layer 4)**: TCP header with Source Port 54210 and Destination Port 443 (HTTPS), SYN/ACK sequence numbers.
3. **Network Layer (Layer 3)**: IP header containing Source IP (\`192.168.1.45\`) and Destination IP (\`104.21.45.12\`), plus TTL = 64.
4. **Data Link Layer (Layer 2)**: MAC address headers for local default gateway router.

> [!IMPORTANT]
> **TTL (Time To Live)** decrements by 1 at every router hop. If TTL reaches 0, the router drops the packet and sends ICMP Time Exceeded!`,
    keyFacts: [
      'Maximum Transmission Unit (MTU) for Ethernet is standard 1500 bytes',
      'TTL prevents packets from looping endlessly in misconfigured network topologies',
      'Stateful firewalls track TCP 3-way handshake states (SYN -> SYN-ACK -> ACK)',
      'NAT gateways translate private IP addresses (192.168.x.x) to public WAN IPs'
    ],
    videoUrl: 'https://www.youtube.com/embed/3QhU9jd03a0',
    videoThumbnail: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80',
    videoDuration: '05:30',
    videoTimestamps: [
      { time: '00:20', label: '1. TCP 3-Way Handshake' },
      { time: '01:45', label: '2. IP Routing & TTL Decrement' },
      { time: '03:10', label: '3. NAT Address Translation' },
      { time: '04:40', label: '4. Stateful Firewall Packet Drop' }
    ],
    codeSnippets: [
      {
        language: 'bash',
        title: 'Traceroute IP Hop Inspection',
        code: `$ traceroute questdeck.edu
1  192.168.1.1 (gateway)  1.2 ms
2  10.240.0.1 (isp-edge)  12.4 ms
3  104.21.45.12 (cloudflare) 18.1 ms`,
        explanation: 'Traceroute sends ICMP/UDP packets with increasing TTL values (1, 2, 3...) to discover intermediate gateway hops.'
      }
    ],
    curatedLinks: [
      { title: 'RFC 791: Internet Protocol Specification', url: 'https://datatracker.ietf.org/doc/html/rfc791', source: 'IETF RFC' },
      { title: 'Cloudflare: How Does IP Routing Work?', url: 'https://www.cloudflare.com/learning/network-layer/what-is-routing/', source: 'Cloudflare Learning' }
    ],
    steps: []
  },
  'node_sec_1': {
    id: 'node_sec_1',
    title: 'SQL Injection & Input Sanitization',
    topic: 'Cybersecurity',
    tagline: 'Defend web applications against OWASP Top 10 vulnerabilities',
    description: 'Identify unescaped SQL vulnerabilities, bypass authentication, and patch parameterized queries.',
    xpReward: 300,
    coinReward: 25,
    durationMinutes: 20,
    articleContent: "### Understanding SQL Injection (SQLi)\n\nSQL Injection happens when untrusted user input is directly concatenated into dynamic SQL query strings without sanitization.\n\n#### Vulnerable Code Pattern:\nSELECT * FROM users WHERE email = USER_INPUT AND password = USER_PASS;\n\nIf an attacker enters ' OR '1'='1 into the email field, the query resolves to:\nSELECT * FROM users WHERE email = '' OR '1'='1' AND password = '';\nSince '1'='1' is always true, authentication is bypassed!\n\n#### The Patch: Prepared Statements (Parameterized Queries)\nPrepared statements separate SQL code structure from data parameters. The SQL engine compiles the query template first, rendering input parameters strictly as data values.",
    keyFacts: [
      'SQLi is ranked in the top OWASP vulnerabilities impacting web backends',
      'Never concatenate raw strings into database query execution functions',
      'Parameterized queries and ORMs (Prisma, Drizzle) automatically neutralize SQLi payload characters',
      'Enforce least-privilege DB user accounts (e.g. read-only roles where write access is unneeded)'
    ],
    videoUrl: 'https://www.youtube.com/embed/_jKylhJtSmI',
    videoThumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
    videoDuration: '06:10',
    videoTimestamps: [
      { time: '00:30', label: '1. Exploit Demonstration' },
      { time: '02:15', label: '2. Query Concatenation Flaw' },
      { time: '04:00', label: '3. Parameterized Query Fix' }
    ],
    codeSnippets: [
      {
        language: 'typescript',
        title: 'Parameterized Query Fix in Node.js',
        code: `import { Client } from 'pg';

async function loginUser(email: string, passHash: string) {
  // Safe: Parameterized query uses placeholders $1 and $2
  const text = 'SELECT id, email, role FROM users WHERE email = $1 AND password_hash = $2';
  const values = [email, passHash];
  
  const res = await client.query(text, values);
  return res.rows[0];
}`,
        explanation: 'Using placeholders ($1, $2) prevents input strings from altering query syntax.'
      }
    ],
    curatedLinks: [
      { title: 'OWASP SQL Injection Prevention Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html', source: 'OWASP' }
    ],
    steps: []
  }
};

export const QUIZ_DATA: Record<string, QuizQuestion[]> = {
  'node_web_1': [
    {
      id: 'qw1',
      question: 'Which callback queue takes highest priority when the JavaScript call stack becomes empty?',
      options: [
        'Microtask Queue (Promises / async-await)',
        'Macrotask Queue (setTimeout / setInterval)',
        'RequestAnimationFrame Queue',
        'Web Worker Input Queue'
      ],
      correctIndex: 0,
      aiExplanation: 'The Event Loop checks and completely flushes the Microtask Queue (Promise callbacks) before processing any Macrotask (setTimeout) callbacks!'
    },
    {
      id: 'qw2',
      question: 'Why is Event Delegation preferred for dynamic HTML list items?',
      options: [
        'It attaches 1 event listener to a common parent element instead of hundreds of child nodes',
        'It bypasses the JavaScript call stack entirely',
        'It prevents CSS flexbox re-layouts',
        'It converts event objects into WebAssembly buffers'
      ],
      correctIndex: 0,
      aiExplanation: 'Event Delegation takes advantage of Event Bubbling to manage multiple target children with a single parent event handler, conserving browser memory.'
    }
  ],
  'node_net_1': [
    {
      id: 'qn1',
      question: 'What happens when an IP packet TTL (Time-to-Live) counter reaches 0 during routing?',
      options: [
        'The router drops the packet and sends back an ICMP Time Exceeded message',
        'The packet automatically duplicates itself to find another route',
        'The packet stays buffered in router RAM indefinitely',
        'The packet converts into an ARP broadcast request'
      ],
      correctIndex: 0,
      aiExplanation: 'When TTL reaches 0, routers drop the packet to prevent infinite routing loops and send an ICMP Type 11 (Time Exceeded) message to the source IP.'
    }
  ],
  'node_sec_1': [
    {
      id: 'qs1',
      question: 'How do Parameterized Queries (Prepared Statements) prevent SQL Injection attacks?',
      options: [
        'They send SQL query structure and parameter data separately so input strings cannot alter code syntax',
        'They encrypt the database password using AES-256',
        'They block all incoming HTTP POST requests',
        'They convert SQL queries into static JSON files'
      ],
      correctIndex: 0,
      aiExplanation: 'Prepared statements pre-compile the SQL structure before substituting parameters, rendering input strings purely as literal data values.'
    }
  ]
};

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach_1',
    title: 'First Mission Cleared',
    description: 'Successfully completed your first interactive simulator scenario.',
    icon: 'Trophy',
    unlockedAt: '2026-08-01',
    progress: 1,
    maxProgress: 1,
    category: 'Missions'
  },
  {
    id: 'ach_2',
    title: '5-Day Streak Master',
    description: 'Learned continuously for 5 consecutive days without skipping.',
    icon: 'Flame',
    unlockedAt: '2026-08-05',
    progress: 5,
    maxProgress: 5,
    category: 'Streaks'
  },
  {
    id: 'ach_3',
    title: 'XP Centurion (1,000 XP)',
    description: 'Crossed the 1,000 XP milestone on your learning journey.',
    icon: 'Zap',
    unlockedAt: '2026-08-03',
    progress: 1850,
    maxProgress: 1000,
    category: 'XP'
  }
];
