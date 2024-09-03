// utils/dailyCombo.ts

interface CardCombo {
    title: string;
    level: number;
  }
  
  type CardCategory = 'Performance' | 'Usability' | 'Incentives' | 'Security';
  
  const cardTitles: Record<CardCategory, string[]> = {
    Performance: [
      "Consensus Algorithms", "Network Design", "Data Structures", "Shard Technology", "Scalability Solutions",
      "Fault Tolerance", "Security Protocols", "Privacy Features", "Cross-Chain Interop", "Energy Efficiency",
      "Latency Reduction", "Hybrid Networks", "Performance Optimization", "Node Infrastructure", "Elastic Network"
    ],
    Usability: [
      "User Interface", "Wallet Solutions", "Onboarding Guides", "Accessibility Options", "User Experience",
      "Game Elements", "Personalized Content", "Data Analytics", "User Engagement", "Decentralized Apps"
    ],
    Incentives: [
      "Token Economy", "Governance Models", "Incentive Programs", "Staking Rewards", "Bonding Mechanisms",
      "DeFi Protocols", "Dynamic Rewards", "Community Building", "Active Participation"
    ],
    Security: [
      "Threat Detection", "Security Audits", "Incident Response", "Regulatory Compliance", "Insurance Protections",
      "Zero-Trust Security", "Decentralized Protection", "Adaptive Authentication", "Network Monitoring",
      "Identity Management", "Data Security"
    ]
  };
  
  function generateDailyCombos(): CardCombo[][] {
    const combos: CardCombo[][] = [];
    const cardLevels: Record<string, number> = {};
  
    for (let i = 0; i < 20; i++) {
      const dailyCombo: CardCombo[] = [];
      const categories: CardCategory[] = ['Performance', 'Usability', 'Incentives', 'Security'];
  
      // Ensure only three categories are selected randomly
      const selectedCategories = categories.sort(() => 0.5 - Math.random()).slice(0, 3);
  
      selectedCategories.forEach((category) => {
        const cards = cardTitles[category];
        const randomCard = cards[Math.floor(Math.random() * cards.length)];
  
        if (!cardLevels[randomCard]) {
          cardLevels[randomCard] = 1;
        } else {
          cardLevels[randomCard] += 1;
        }
  
        dailyCombo.push({
          title: randomCard,
          level: cardLevels[randomCard],
        });
      });
  
      combos.push(dailyCombo);
    }
  
    return combos;
  }
  
  // Correct the export statements
  export { generateDailyCombos, cardTitles };
  export type { CardCombo }; // Use 'export type' for types
  