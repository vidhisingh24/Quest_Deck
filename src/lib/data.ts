import { 
  UserProfile, 
  RoadmapNode, 
  InteractiveMission, 
  QuizQuestion, 
  Achievement, 
  LeaderboardUser, 
  WeeklyStudyStat,
  DailyQuest,
  ShopItem
} from './types';

export const INITIAL_USER: UserProfile = {
  id: 'usr_demo_1',
  name: 'Alex Rivers',
  email: 'alex@quest.edu',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
  level: 3,
  xp: 1450,
  coins: 450, // Pre-seeded with 450 coins for instant LeetCode merch shopping!
  streak: 5,
  lastStudyDate: new Date().toISOString(),
  careerGoal: 'Full Stack Engineer & Cyber Defender',
  skillLevel: 'Intermediate',
  dailyStudyTime: 30,
  learningStyle: 'Interactive Simulators',
  interests: ['Networking', 'Cybersecurity', 'Web Dev', 'AI & Algorithms', 'Database Systems'],
  isOnboarded: true,
};

export const MULTI_SUBJECT_ROADMAPS: Record<string, RoadmapNode[]> = {
  'Networking': [
    {
      id: 'node_net_1',
      title: '1. The Data Packet Journey',
      category: 'Networking',
      description: 'Stage 1: Become a 1500-byte IP packet routing through routers, DNS servers, and firewalls.',
      level: 1,
      xpReward: 250,
      coinReward: 15,
      estimatedMinutes: 10,
      status: 'completed',
      icon: 'Network',
      prerequisites: [],
    },
    {
      id: 'node_net_2',
      title: '2. Subnetting & CIDR Address Space',
      category: 'Networking',
      description: 'Stage 1: Calculate subnet masks, broadcast IPs, and gateway boundaries for enterprise subnets.',
      level: 2,
      xpReward: 300,
      coinReward: 20,
      estimatedMinutes: 12,
      status: 'unlocked',
      icon: 'Network',
      prerequisites: ['node_net_1'],
    },
    {
      id: 'node_net_3',
      title: '3. DNS Hierarchy & Root Resolvers',
      category: 'Networking',
      description: 'Stage 2: Trace recursive DNS queries from local cache to root, TLD, and authoritative nameservers.',
      level: 2,
      xpReward: 320,
      coinReward: 22,
      estimatedMinutes: 12,
      status: 'locked',
      icon: 'Network',
      prerequisites: ['node_net_2'],
    },
    {
      id: 'node_net_4',
      title: '4. Stateful Firewall & NAT Gateways',
      category: 'Networking',
      description: 'Stage 3: Manage stateful connection tables and translate private IPs to public WAN addresses.',
      level: 3,
      xpReward: 380,
      coinReward: 28,
      estimatedMinutes: 15,
      status: 'locked',
      icon: 'Network',
      prerequisites: ['node_net_3'],
    },
    {
      id: 'node_net_5',
      title: '5. BGP Routing & Autonomous Systems',
      category: 'Networking',
      description: 'Stage 4: Configure Tier-1 ISP border gateway protocol paths and prevent routing loops.',
      level: 4,
      xpReward: 450,
      coinReward: 35,
      estimatedMinutes: 18,
      status: 'locked',
      icon: 'Network',
      prerequisites: ['node_net_4'],
    }
  ],
  'Cybersecurity': [
    {
      id: 'node_cyber_1',
      title: '1. Cyber Shield: Defend Apex Corp',
      category: 'Cybersecurity',
      description: 'Stage 1: Detect DDoS traffic spikes, sanitize SQL injection payloads, and isolate ransomware.',
      level: 1,
      xpReward: 300,
      coinReward: 20,
      estimatedMinutes: 15,
      status: 'unlocked',
      icon: 'ShieldCheck',
      prerequisites: [],
    },
    {
      id: 'node_cyber_2',
      title: '2. SQL Injection Payload Sanitization',
      category: 'Cybersecurity',
      description: 'Stage 2: Prevent raw string query concatenation using prepared parameterized statements.',
      level: 2,
      xpReward: 330,
      coinReward: 22,
      estimatedMinutes: 12,
      status: 'locked',
      icon: 'ShieldCheck',
      prerequisites: ['node_cyber_1'],
    }
  ],
  'Web Dev': [
    {
      id: 'node_web_1',
      title: '1. The Bug Hunter: IDE Master',
      category: 'Web Dev',
      description: 'Stage 1: Inspect live code. Fix CSS flexbox alignment glitches and JS async race conditions.',
      level: 2,
      xpReward: 350,
      coinReward: 25,
      estimatedMinutes: 12,
      status: 'unlocked',
      icon: 'Code2',
      prerequisites: [],
    }
  ],
  'Operating Systems': [
    {
      id: 'node_os_1',
      title: '1. Inside the Processor: CPU Scheduler',
      category: 'Operating Systems',
      description: 'Stage 1: Allocate CPU time slices, balance Round-Robin queues, and prevent process starvation.',
      level: 2,
      xpReward: 400,
      coinReward: 30,
      estimatedMinutes: 15,
      status: 'unlocked',
      icon: 'Cpu',
      prerequisites: [],
    }
  ],
  'AI & Algorithms': [
    {
      id: 'node_ai_1',
      title: '1. Neural Matrix: Weight Trainer',
      category: 'AI & Algorithms',
      description: 'Stage 1: Interact with forward-propagation weight matrices and adjust Adam learning rates.',
      level: 3,
      xpReward: 450,
      coinReward: 35,
      estimatedMinutes: 15,
      status: 'unlocked',
      icon: 'BrainCircuit',
      prerequisites: [],
    }
  ],
  'Database Systems': [
    {
      id: 'node_db_1',
      title: '1. SQL Query Plan Optimizer',
      category: 'Database Systems',
      description: 'Stage 1: Inspect PostgreSQL EXPLAIN trees, create B-Tree indexes, and eliminate full table scans.',
      level: 2,
      xpReward: 380,
      coinReward: 30,
      estimatedMinutes: 12,
      status: 'unlocked',
      icon: 'Database',
      prerequisites: [],
    }
  ],
  'Cloud & DevOps': [
    {
      id: 'node_cloud_1',
      title: '1. Kubernetes Pod Auto-Scaler',
      category: 'Cloud & DevOps',
      description: 'Stage 1: Configure NGINX ingress controllers, horizontal pod autoscalers (HPA), and containers.',
      level: 3,
      xpReward: 420,
      coinReward: 35,
      estimatedMinutes: 15,
      status: 'unlocked',
      icon: 'Cloud',
      prerequisites: [],
    }
  ],
  'Mobile App Dev': [
    {
      id: 'node_mobile_1',
      title: '1. React Native Viewport Master',
      category: 'Mobile App Dev',
      description: 'Stage 1: Fix native mobile gesture handlers, manage safe area viewports, and eliminate re-renders.',
      level: 2,
      xpReward: 350,
      coinReward: 25,
      estimatedMinutes: 12,
      status: 'unlocked',
      icon: 'Smartphone',
      prerequisites: [],
    }
  ]
};

export const INITIAL_ROADMAP: RoadmapNode[] = [
  ...MULTI_SUBJECT_ROADMAPS['Networking'],
  ...MULTI_SUBJECT_ROADMAPS['Cybersecurity'],
  ...MULTI_SUBJECT_ROADMAPS['Web Dev'],
  ...MULTI_SUBJECT_ROADMAPS['Operating Systems'],
  ...MULTI_SUBJECT_ROADMAPS['AI & Algorithms'],
  ...MULTI_SUBJECT_ROADMAPS['Database Systems'],
  ...MULTI_SUBJECT_ROADMAPS['Cloud & DevOps'],
  ...MULTI_SUBJECT_ROADMAPS['Mobile App Dev']
];

export const MISSIONS_DATA: Record<string, InteractiveMission> = {
  'node_net_1': {
    id: 'node_net_1',
    title: 'The Data Packet Journey',
    topic: 'Networking',
    tagline: 'You are a 1500-byte TCP packet. Route safely to destination!',
    description: 'Experience how computer networks transport information from your device across global routers and security nodes.',
    xpReward: 250,
    coinReward: 15,
    durationMinutes: 10,
    steps: [
      {
        id: 'step_1',
        title: 'Step 1: Outbound Interface & DNS Lookup',
        description: 'You are generated at local client IP 192.168.1.50. You want to request "https://quest.edu". What is your first decision?',
        systemContext: 'Src IP: 192.168.1.50 | Protocol: TCP | Dest Port: 443 | Payload: GET / HTTP/1.1',
        choices: [
          {
            id: 'c1',
            text: 'Send ARP Request to discover Local Gateway MAC address',
            isCorrect: true,
            explanation: 'Correct! Before leaving the local subnet, the packet must resolve the gateway hardware MAC address via ARP.'
          },
          {
            id: 'c2',
            text: 'Broadcast packet directly to public internet without gateway IP',
            isCorrect: false,
            explanation: 'Incorrect! Devices on local subnets cannot reach external IPs directly without routing through the gateway.'
          }
        ]
      }
    ]
  }
};

export const QUIZ_DATA: Record<string, QuizQuestion[]> = {
  'node_net_1': [
    {
      id: 'q1',
      question: 'What is the primary role of ARP (Address Resolution Protocol)?',
      options: [
        'To resolve IP addresses to physical MAC hardware addresses',
        'To encrypt HTTP web traffic',
        'To compress database images',
        'To generate random numbers'
      ],
      correctIndex: 0,
      aiExplanation: 'ARP resolves Layer 3 IP addresses into Layer 2 hardware MAC addresses on local subnets.'
    }
  ]
};

export const INITIAL_DAILY_QUESTS: DailyQuest[] = [
  { id: 'dq_1', title: 'Complete 1 Interactive Mission', rewardXp: 150, rewardCoins: 15, progress: 1, maxProgress: 1, isClaimed: false },
  { id: 'dq_2', title: 'Earn 300 Experience Points (XP)', rewardXp: 200, rewardCoins: 20, progress: 250, maxProgress: 300, isClaimed: false },
  { id: 'dq_3', title: 'Ask AI Mentor 1 Practice Question', rewardXp: 100, rewardCoins: 10, progress: 0, maxProgress: 1, isClaimed: false },
];

// LeetCode-style Physical Merch + Digital Powerups Store Data!
export const INITIAL_SHOP_ITEMS: ShopItem[] = [
  { id: 'shop_cap', title: 'Quest Official Developer Cap', description: 'Limited Edition embroidered Quest Snapback Cap (Physical Delivery)', costCoins: 400, icon: 'Shirt', category: 'Booster' },
  { id: 'shop_hoodie', title: 'Quest Master Hoodie & T-Shirt', description: 'Premium heavyweight cotton developer hoodie with Quest emblem', costCoins: 800, icon: 'Shirt', category: 'Booster' },
  { id: 'shop_books', title: 'Systems Design & Algorithms Book Pack', description: 'Hardcover book bundle: Designing Data-Intensive Applications & Algorithms', costCoins: 600, icon: 'Crown', category: 'Booster' },
  { id: 'shop_streak', title: 'Streak Freeze Shield', description: 'Protects your daily learning streak if you miss a day', costCoins: 100, icon: 'Shield', category: 'Streak' },
  { id: 'shop_xp', title: '2x XP Booster (2 Hours)', description: 'Doubles all XP earned from mission completions for 2 hours', costCoins: 150, icon: 'Zap', category: 'Booster' },
  { id: 'shop_frame', title: 'Gold Master Avatar Frame', description: 'Exclusive golden glowing avatar frame on leaderboards', costCoins: 250, icon: 'Crown', category: 'AvatarFrame' },
  { id: 'shop_cert', title: 'Verified Track Mastery Certificate', description: 'Printable verified certificate signed by Quest Academy', costCoins: 300, icon: 'Crown', category: 'Certificate' },
];

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  { id: 'ach_1', title: 'First Step Quest', description: 'Complete your first interactive mission', icon: 'Rocket', unlockedAt: '2026-08-05', progress: 1, maxProgress: 1, category: 'Missions' },
  { id: 'ach_2', title: '5-Day Warrior', description: 'Maintain a 5-day daily learning streak', icon: 'Flame', unlockedAt: '2026-08-06', progress: 5, maxProgress: 5, category: 'Streaks' },
];

// Pre-seeded 8 Student Ranks for Leaderboard Podium (Ranks 1-3) & Table Ranks (Ranks 4-8)!
export const INITIAL_LEADERBOARD: LeaderboardUser[] = [
  { rank: 1, id: 'u1', name: 'Sophia Chen', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', xp: 2840, streak: 14, badge: 'Grand Master' },
  { rank: 2, id: 'u2', name: 'Marcus Vance', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', xp: 2310, streak: 9, badge: 'Cyber Specialist' },
  { rank: 3, id: 'usr_demo_1', name: 'Alex Rivers (You)', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', xp: 1450, streak: 5, badge: 'Quest Explorer', isCurrentUser: true },
  { rank: 4, id: 'u4', name: 'Elena Rostova', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150', xp: 1290, streak: 4, badge: 'Systems Architect' },
  { rank: 5, id: 'u5', name: 'David Kim', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150', xp: 1100, streak: 3, badge: 'Code Pioneer' },
  { rank: 6, id: 'u6', name: 'Lucas Silva', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150', xp: 980, streak: 3, badge: 'AI Explorer' },
  { rank: 7, id: 'u7', name: 'Maya Lin', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150', xp: 870, streak: 2, badge: 'DevOps Specialist' },
  { rank: 8, id: 'u8', name: 'Ethan Hunt', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150', xp: 750, streak: 2, badge: 'Database Engineer' },
];

export const WEEKLY_STATS: WeeklyStudyStat[] = [
  { day: 'Mon', xp: 180, minutes: 25 },
  { day: 'Tue', xp: 240, minutes: 35 },
  { day: 'Wed', xp: 310, minutes: 40 },
  { day: 'Thu', xp: 200, minutes: 20 },
  { day: 'Fri', xp: 350, minutes: 45 },
  { day: 'Sat', xp: 420, minutes: 50 },
  { day: 'Sun', xp: 280, minutes: 30 },
];
