import { useState } from 'react';
import { Play, BookOpen, Clock, Zap, X, ChevronDown } from 'lucide-react';
import EXERCISE_DATA from '../data/exerciseData';
import './FitnessTab.css';

export default function FitnessTab() {
    const [activeCategory, setActiveCategory] = useState(null); // null = show all
    const [openExercise, setOpenExercise] = useState(null);

    const categories = EXERCISE_DATA;
    const filtered = activeCategory
        ? categories.filter(c => c.category === activeCategory)
        : categories;

    const handleOpen = (exercise) => {
        setOpenExercise(openExercise?.id === exercise.id ? null : exercise);
    };

    return (
        <div className="fitness-tab">
            <div className="tab-header-block">
                <Zap size={24} className="tab-header-icon" />
                <h2>Fitness Guide</h2>
                <p>Expert exercises with video demos and step-by-step instructions</p>
            </div>

            {/* Category pills */}
            <div className="category-pills">
                <button
                    className={`cat-pill ${activeCategory === null ? 'active' : ''}`}
                    onClick={() => setActiveCategory(null)}
                >
                    All
                </button>
                {categories.map(cat => (
                    <button
                        key={cat.category}
                        className={`cat-pill ${activeCategory === cat.category ? 'active' : ''}`}
                        style={{ '--cat-color': cat.color }}
                        onClick={() => setActiveCategory(cat.category === activeCategory ? null : cat.category)}
                    >
                        {cat.category}
                    </button>
                ))}
            </div>

            {/* Exercise categories */}
            {filtered.map(cat => (
                <div key={cat.category} className="exercise-category">
                    <h3 className="cat-title" style={{ color: cat.color }}>{cat.category}</h3>
                    <div className="exercise-grid">
                        {cat.exercises.map(ex => (
                            <div key={ex.id} className={`exercise-card ${openExercise?.id === ex.id ? 'expanded' : ''}`}>
                                <div className="exercise-header" onClick={() => handleOpen(ex)}>
                                    <div className="exercise-icon" style={{ background: `${cat.color}20`, color: cat.color }}>
                                        {ex.type === 'video' ? <Play size={18} /> : <BookOpen size={18} />}
                                    </div>
                                    <div className="exercise-info">
                                        <span className="exercise-name">{ex.name}</span>
                                        <div className="exercise-meta">
                                            <span className="meta-tag"><Clock size={11} /> {ex.duration}</span>
                                            <span className={`diff-badge diff-${ex.difficulty.toLowerCase()}`}>{ex.difficulty}</span>
                                        </div>
                                    </div>
                                    <ChevronDown size={16} className={`expand-icon ${openExercise?.id === ex.id ? 'rotated' : ''}`} />
                                </div>

                                {openExercise?.id === ex.id && (
                                    <div className="exercise-detail">
                                        <p className="exercise-desc">{ex.description}</p>

                                        {ex.type === 'video' ? (
                                            <div className="video-embed">
                                                <iframe
                                                    src={`https://www.youtube.com/embed/${ex.videoId}`}
                                                    title={ex.name}
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                />
                                            </div>
                                        ) : (
                                            <div className="text-guide">
                                                <h4>Step-by-step Guide</h4>
                                                <ol>
                                                    {ex.guide.map((step, i) => (
                                                        <li key={i}>{step}</li>
                                                    ))}
                                                </ol>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
