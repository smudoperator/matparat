// src/pages/Dinners.tsx

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dinnerService from '../services/DinnerService';
import { Dinner } from '../types/interfaces';
import styles from './Dinners.module.css';
import { DinnerTypeLabels, MeatTypeLabels, SkillLevelLabels } from '../types/enums';
import { byteArrayToBase64, stringToUint8Array } from '../utils/help';

const Dinners = () => {
    const [dinners, setDinners] = useState<Dinner[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [showIdColumn, setShowIdColumn] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDinners = async () => {
            try {
                const fetchedDinners = await dinnerService.getDinners();
                setDinners(fetchedDinners);
            } 
            catch (err) {
                setError('Failed to fetch dinners.');
            } 
            finally {
                setLoading(false);
            }
        };

        fetchDinners();
    }, []);

    const handleToggleColumn = () => {
      setShowIdColumn(!showIdColumn);
    };

    function stringToUint8Array(data: string): Uint8Array {
        // Assuming the string is a base64-encoded string representing the byte array
        const binaryString = window.atob(data); // Decode base64 string to binary string
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
    
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
    
        return bytes;
    }

    const editDinner = (id: string) => {
      navigate(`/Dinners/edit/${id}`)
    }

    const deleteDinner = async (id: string) => {
      try {
        const confirmed = window.confirm("Are you sure you want to delete this dinner?");
        if (confirmed) {
            await dinnerService.deleteDinner(id)
            setDinners((prevDinners) => prevDinners.filter(dinner => dinner.id !== id)); // Update local state
        }
      } 
      catch (err) {
        setError('Failed to delete dinner.');
      }
    }

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
                        <th></th> 
                        <th></th>
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
                        {dinner.imageData ? (
                            <img
                                src={`data:image/jpeg;base64,${byteArrayToBase64(stringToUint8Array(dinner.imageData))}`}
                                alt={dinner.name}
                                style={{ maxWidth: '100px' }}
                            />
                        ) : (
                            'No image'
                        )}
                    </td>
                    {showIdColumn && <td>{dinner.id}</td>}
                    <td>
                        <button onClick={() => editDinner(dinner.id)}>Edit dinner</button>
                    </td>
                    <td>
                        <button onClick={() => deleteDinner(dinner.id)}>Delete dinner</button>
                    </td>
                </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dinners;