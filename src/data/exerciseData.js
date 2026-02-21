/* ═══════════════════════════════════════════
   Exercise Guide – categorised exercises
   with YouTube videos or text instructions
   ═══════════════════════════════════════════ */

const EXERCISE_DATA = [
    {
        category: 'Strength',
        color: '#ef5350',
        exercises: [
            {
                id: 's1',
                name: 'Push-ups',
                type: 'video',
                videoId: 'IODxDxX7oi4',
                description: 'Classic bodyweight exercise targeting chest, shoulders, and triceps.',
                duration: '10 min',
                difficulty: 'Beginner',
            },
            {
                id: 's2',
                name: 'Squats',
                type: 'video',
                videoId: 'YaXPRqUwItQ',
                description: 'Fundamental lower body exercise for quads, glutes, and hamstrings.',
                duration: '12 min',
                difficulty: 'Beginner',
            },
            {
                id: 's3',
                name: 'Plank Hold',
                type: 'text',
                guide: [
                    'Get into a forearm plank position with elbows directly below shoulders.',
                    'Keep your body in a straight line from head to heels.',
                    'Engage your core and glutes — don\'t let your hips sag or pike up.',
                    'Hold for 30–60 seconds. Rest 15 seconds. Repeat 3–4 times.',
                    'Breathe steadily throughout. Focus on bracing your abs.',
                ],
                description: 'Isometric core exercise that builds endurance and stability.',
                duration: '5 min',
                difficulty: 'Beginner',
            },
            {
                id: 's4',
                name: 'Deadlifts',
                type: 'video',
                videoId: 'r4MzxtBKyNE',
                description: 'Compound lift targeting the entire posterior chain — back, glutes, and hamstrings.',
                duration: '15 min',
                difficulty: 'Intermediate',
            },
        ],
    },
    {
        category: 'Cardio',
        color: '#42a5f5',
        exercises: [
            {
                id: 'c1',
                name: 'Jump Rope',
                type: 'video',
                videoId: 'FJmRQ5iTXKE',
                description: 'High-intensity cardio that improves coordination and burns major calories.',
                duration: '15 min',
                difficulty: 'Intermediate',
            },
            {
                id: 'c2',
                name: 'Brisk Walking',
                type: 'text',
                guide: [
                    'Walk at a pace of 5–6 km/h — fast enough that talking feels slightly breathless.',
                    'Maintain upright posture with shoulders relaxed and arms swinging naturally.',
                    'Land heel-first, rolling through to the toe for each step.',
                    'Aim for 30–45 minutes daily. Use a step tracker to stay motivated.',
                    'Stay hydrated and wear supportive shoes.',
                ],
                description: 'Low-impact cardio perfect for beginners and active recovery days.',
                duration: '30 min',
                difficulty: 'Beginner',
            },
            {
                id: 'c3',
                name: 'Cycling',
                type: 'video',
                videoId: 'sVKFdBaUJEg',
                description: 'Great low-impact cardio that strengthens legs and improves endurance.',
                duration: '20 min',
                difficulty: 'Beginner',
            },
        ],
    },
    {
        category: 'Flexibility',
        color: '#7c4dff',
        exercises: [
            {
                id: 'f1',
                name: 'Morning Yoga Flow',
                type: 'video',
                videoId: 'g_tea8ZNk5A',
                description: 'Gentle yoga sequence to start your day with energy and flexibility.',
                duration: '20 min',
                difficulty: 'Beginner',
            },
            {
                id: 'f2',
                name: 'Hamstring Stretch',
                type: 'text',
                guide: [
                    'Sit on the floor with one leg extended and the other bent inward.',
                    'Reach forward toward your toes, keeping your back straight.',
                    'Hold for 20–30 seconds, breathing deeply into the stretch.',
                    'Switch legs and repeat. Do 3 rounds per side.',
                    'Never bounce — use slow, steady pressure to deepen the stretch.',
                ],
                description: 'Essential stretch for runners and anyone with tight legs.',
                duration: '8 min',
                difficulty: 'Beginner',
            },
            {
                id: 'f3',
                name: 'Full Body Stretch',
                type: 'video',
                videoId: 'g_tea8ZNk5A',
                description: 'Complete stretching routine for all major muscle groups.',
                duration: '15 min',
                difficulty: 'Beginner',
            },
        ],
    },
    {
        category: 'HIIT',
        color: '#ff9800',
        exercises: [
            {
                id: 'h1',
                name: 'Tabata Burpees',
                type: 'video',
                videoId: 'TU8QYVW0gDU',
                description: '20 seconds max effort, 10 seconds rest — classic Tabata protocol.',
                duration: '4 min',
                difficulty: 'Advanced',
            },
            {
                id: 'h2',
                name: 'Mountain Climbers',
                type: 'text',
                guide: [
                    'Start in a high plank position, hands shoulder-width apart.',
                    'Drive your right knee toward your chest, then quickly switch legs.',
                    'Maintain a strong plank — don\'t let hips bounce.',
                    'Go as fast as you can for 30 seconds, then rest 15 seconds.',
                    'Repeat for 8 rounds. This is brutal but extremely effective.',
                ],
                description: 'Full-body HIIT drill that torches calories and builds core strength.',
                duration: '6 min',
                difficulty: 'Intermediate',
            },
            {
                id: 'h3',
                name: 'Box Jumps',
                type: 'video',
                videoId: 'NBY9-kTuHEk',
                description: 'Explosive plyometric exercise for power and leg strength.',
                duration: '10 min',
                difficulty: 'Advanced',
            },
        ],
    },
];

export default EXERCISE_DATA;
