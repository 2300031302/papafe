import { useState, useCallback, useEffect } from 'react';
import HEALTH_DEFAULTS from './healthData';

const STORAGE_KEY = 'ht_health_data';

/* Deep-merge defaults with stored data so new keys are always present */
function mergeDefaults(stored) {
    const merged = { ...HEALTH_DEFAULTS };
    if (!stored) return merged;
    for (const key of Object.keys(merged)) {
        if (stored[key] !== undefined) {
            if (
                typeof merged[key] === 'object' &&
                !Array.isArray(merged[key]) &&
                merged[key] !== null
            ) {
                merged[key] = { ...merged[key], ...stored[key] };
            } else {
                merged[key] = stored[key];
            }
        }
    }
    return merged;
}

function readStorage() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? mergeDefaults(JSON.parse(raw)) : { ...HEALTH_DEFAULTS };
    } catch {
        return { ...HEALTH_DEFAULTS };
    }
}

export default function useHealthData() {
    const [data, setData] = useState(readStorage);

    /* Persist every change */
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }, [data]);

    /* ── Generic updater ── */
    const updateData = useCallback((patch) => {
        setData((prev) => {
            const next = { ...prev };
            for (const key of Object.keys(patch)) {
                if (
                    typeof next[key] === 'object' &&
                    !Array.isArray(next[key]) &&
                    next[key] !== null
                ) {
                    next[key] = { ...next[key], ...patch[key] };
                } else {
                    next[key] = patch[key];
                }
            }
            return next;
        });
    }, []);

    /* ── Water helpers ── */
    const addWater = useCallback((amount) => {
        setData((prev) => ({
            ...prev,
            water: {
                ...prev.water,
                current: Math.min(prev.water.current + (amount ?? prev.water.increment), 10000),
            },
        }));
    }, []);

    const removeWater = useCallback((amount) => {
        setData((prev) => ({
            ...prev,
            water: {
                ...prev.water,
                current: Math.max(prev.water.current - (amount ?? prev.water.increment), 0),
            },
        }));
    }, []);

    const resetWater = useCallback(() => {
        setData((prev) => ({
            ...prev,
            water: { ...prev.water, current: 0 },
        }));
    }, []);

    const setWaterGoal = useCallback((goal) => {
        const g = Number(goal);
        if (!g || g < 250) return;
        setData((prev) => ({
            ...prev,
            water: { ...prev.water, goal: g },
        }));
    }, []);

    /* ── Interest toggles ── */
    const toggleInterest = useCallback((id) => {
        setData((prev) => {
            const has = prev.interests.includes(id);
            return {
                ...prev,
                interests: has
                    ? prev.interests.filter((i) => i !== id)
                    : [...prev.interests, id],
            };
        });
    }, []);

    const isVisible = useCallback(
        (id) => data.interests.includes(id),
        [data.interests],
    );

    return {
        data,
        updateData,
        addWater,
        removeWater,
        resetWater,
        setWaterGoal,
        toggleInterest,
        isVisible,
    };
}
