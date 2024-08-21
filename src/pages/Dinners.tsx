// src/pages/Dinners.tsx

import { useEffect, useState } from 'react';
import dinnerService from '../services/DinnerService'; // Adjust the path if needed
import { Dinner } from '../types/interfaces';
import styles from './Dinners.module.css';
import { DinnerTypeLabels, MeatTypeLabels, SkillLevelLabels } from '../types/enums';

const Dinners = () => {
    const [dinners, setDinners] = useState<Dinner[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [showIdColumn, setShowIdColumn] = useState<boolean>(false);

    useEffect(() => {
        const fetchDinners = async () => {
            try {
                const fetchedDinners = await dinnerService.getDinners();
                setDinners(fetchedDinners);
            } catch (err) {
                setError('Failed to fetch dinners.');
            } finally {
                setLoading(false);
            }
        };

        fetchDinners();
    }, []);

    const handleToggleColumn = () => {
      setShowIdColumn(!showIdColumn);
    };

    if (loading) return <p>Loading... the api is eepy sleepy</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Dinners</h1>
            <button onClick={handleToggleColumn} className={styles.columnToggle}>
                Show id's
            </button>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Type</th>
                        <th>Meat Type</th>
                        <th>Skill Level</th>
                        <th>Ingredients</th>
                        <th>Tags</th>
                        <th>Image</th>
                        {showIdColumn && <th>Id</th>}
                    </tr>
                </thead>
                <tbody>
                    {dinners.map(dinner => (
                        <tr key={dinner.id}>
                            <td>{dinner.name}</td>
                            <td>{dinner.description}</td>
                            <td>{DinnerTypeLabels[dinner.type]}</td>
                            <td>{MeatTypeLabels[dinner.meatType]}</td>
                            <td>{SkillLevelLabels[dinner.skillLevel]}</td>
                            <td>{dinner.ingredients.join(', ')}</td>
                            <td>{dinner.tags.join(', ')}</td>
                            <td>
                                {dinner.image ? (
                                    <img src={dinner.image} alt={dinner.name} style={{ maxWidth: '100px' }} />
                                ) : (
                                    'No image'
                                )}
                            </td>
                            {showIdColumn && <td>{dinner.id}</td>}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dinners;