/* ═══════════════════════════════════════════
   Health Data – default values for every
   dashboard component. This is the single
   source of truth for initial / fallback data.
   ═══════════════════════════════════════════ */

const HEALTH_DEFAULTS = {
    steps: { current: 2367, goal: 6000 },
    exercise: { minutes: 25, goal: 60 },
    calories: { burned: 96, goal: 300 },

    workout: {
        totalTime: '1:27:11',
        sessions: 5,
        kcal: 371,
    },

    sleep: {
        hours: 8,
        minutes: 20,
        bedtime: '11:40 pm',
        wakeup: '8:00 am',
        quality: 80,
    },

    body: { muscle: 40, fat: 30, water: 30 },

    water: { current: 0, goal: 2000, increment: 250 },

    medications: {
        description:
            'Track your medications, get reminders, and learn about drug interactions.',
    },

    vitals: {
        heartRate: { value: 72, max: 200 },
        bloodOxygen: { value: 98, max: 100 },
        bloodPressure: { value: 120, max: 180 },
    },

    /* Which cards are visible on the dashboard */
    interests: [
        'stats',
        'steps',
        'activity',
        'workout',
        'sleep',
        'body',
        'water',
        'medications',
        'vitals',
    ],
};

/* Human-friendly labels for each interest toggle */
export const INTEREST_LABELS = {
    stats: 'Activity Rings',
    steps: 'Step Counter',
    activity: 'Quick Activities',
    workout: 'Workout Summary',
    sleep: 'Sleep Tracker',
    body: 'Body Composition',
    water: 'Water Intake',
    medications: 'Medications',
    vitals: 'Vitals Monitor',
};

export default HEALTH_DEFAULTS;
