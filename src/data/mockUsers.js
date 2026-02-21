/* ═══════════════════════════════════════════
   Mock Users – simulated user database for
   search / competition features (no backend)
   ═══════════════════════════════════════════ */

const generateWeeklyHistory = (baseSteps, baseCals) => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map(day => ({
        day,
        steps: Math.floor(baseSteps * (0.8 + Math.random() * 0.4)),
        walkingTime: `${Math.floor(30 + Math.random() * 40)}m`,
        calories: Math.floor(baseCals * (0.8 + Math.random() * 0.4)),
        sleepTime: `${Math.floor(6 + Math.random() * 3)}h ${Math.floor(Math.random() * 60)}m`,
        water: Math.floor(1500 + Math.random() * 1500),
        runningTime: Math.random() > 0.5 ? `${Math.floor(15 + Math.random() * 30)}m` : '0m',
    }));
};

const MOCK_USERS = [
    {
        id: 'u1',
        name: 'Sarah Chen',
        email: 'sarah@fitness.com',
        avatar: 'SC',
        steps: 8432,
        calories: 287,
        sleep: { hours: 7, minutes: 45 },
        water: 1750,
        weeklyHistory: generateWeeklyHistory(8000, 300),
    },
    {
        id: 'u2',
        name: 'Mike Johnson',
        email: 'mike@fitness.com',
        avatar: 'MJ',
        steps: 5120,
        calories: 198,
        sleep: { hours: 6, minutes: 30 },
        water: 2200,
        weeklyHistory: generateWeeklyHistory(5000, 200),
    },
    {
        id: 'u3',
        name: 'Priya Sharma',
        email: 'priya@fitness.com',
        avatar: 'PS',
        steps: 11045,
        calories: 412,
        sleep: { hours: 8, minutes: 10 },
        water: 2500,
        weeklyHistory: generateWeeklyHistory(11000, 400),
    },
    {
        id: 'u4',
        name: 'Alex Rivera',
        email: 'alex@fitness.com',
        avatar: 'AR',
        steps: 3890,
        calories: 145,
        sleep: { hours: 9, minutes: 5 },
        water: 1200,
        weeklyHistory: generateWeeklyHistory(4000, 150),
    },
    {
        id: 'u5',
        name: 'Emma Wilson',
        email: 'emma@fitness.com',
        avatar: 'EW',
        steps: 7650,
        calories: 310,
        sleep: { hours: 7, minutes: 0 },
        water: 1900,
        weeklyHistory: generateWeeklyHistory(7500, 300),
    },
    {
        id: 'u6',
        name: 'Raj Patel',
        email: 'raj@fitness.com',
        avatar: 'RP',
        steps: 9200,
        calories: 356,
        sleep: { hours: 8, minutes: 40 },
        water: 2100,
        weeklyHistory: generateWeeklyHistory(9000, 350),
    },
];

export default MOCK_USERS;
