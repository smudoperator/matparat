import React, { useState } from 'react';
import apiService from '../services/DinnerService'; // Adjust the path if needed
import { CreateDinner, Dinner } from '../types/interfaces';
import { DinnerType, MeatType, SkillLevel } from '../types/enums'; // Adjust the path if needed
import styles from './AddDinner.module.css'; // Import the CSS module for styling

const AddDinnerPage = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState<DinnerType>(DinnerType.Fish); // Default to Fish
    const [meatType, setMeatType] = useState<MeatType>(MeatType.Beef); // Default to Beef
    const [skillLevel, setSkillLevel] = useState<SkillLevel>(SkillLevel.Easy); // Default to Easy
    const [ingredients, setIngredients] = useState<string>('');
    const [tags, setTags] = useState<string>('');
    const [image, setImage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64String = reader.result as string;
            const base64Data = base64String.split(',')[1]; // Strip the prefix for image byte
            setImage(base64Data);
          };
          reader.readAsDataURL(file);
        }
      };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const dinner: CreateDinner = {
            name,
            description,
            type,
            meatType,
            skillLevel,
            ingredients: ingredients.split(',').map(ingredient => ingredient.trim()),
            tags: tags.split(',').map(tag => tag.trim()),
            imageData: image
        };

        try {
            await apiService.addDinner(dinner); // Should get a proper snackbar
            setSuccess('Dinner added successfully!');
        } catch (err) {
            setError('Failed to add dinner.');
        }
    };

    return (
        <div className={styles.container}>
            <h1>Add New Dinner</h1>
            {error && <p className={styles.error}>{error}</p>}
            {success && <p className={styles.success}>{success}</p>}
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="type">Type:</label>
                    <select id="type" value={type} onChange={e => setType(parseInt(e.target.value) as DinnerType)}>
                        {Object.entries(DinnerType).map(([key, value]) => (
                            <option key={value} value={value}>{key}</option>
                        ))}
                    </select>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="meatType">Meat Type:</label>
                    <select id="meatType" value={meatType} onChange={e => setMeatType(parseInt(e.target.value) as MeatType)}>
                        {Object.entries(MeatType).map(([key, value]) => (
                            <option key={value} value={value}>{key}</option>
                        ))}
                    </select>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="skillLevel">Skill Level:</label>
                    <select id="skillLevel" value={skillLevel} onChange={e => setSkillLevel(parseInt(e.target.value) as SkillLevel)}>
                        {Object.entries(SkillLevel).map(([key, value]) => (
                            <option key={value} value={value}>{key}</option>
                        ))}
                    </select>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="ingredients">Ingredients (comma-separated):</label>
                    <input
                        type="text"
                        id="ingredients"
                        value={ingredients}
                        onChange={e => setIngredients(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="tags">Tags (comma-separated):</label>
                    <input
                        type="text"
                        id="tags"
                        value={tags}
                        onChange={e => setTags(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="image">Image:</label>
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    {image && <img src={image} alt="Selected preview" className={styles.imagePreview} />}
                </div>
                <button type="submit" className={styles.submitButton}>Add Dinner</button>
            </form>
        </div>
    );
};

export default AddDinnerPage;