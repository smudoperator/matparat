// src/pages/EditDinner.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Dinner } from '../types/interfaces';
import { DinnerType, MeatType, SkillLevel } from '../types/enums';
import dinnerService from '../services/DinnerService';
import styles from './EditDinner.module.css';

const EditDinner = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [dinner, setDinner] = useState<Dinner | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<DinnerType>(DinnerType.Fish);
  const [meatType, setMeatType] = useState<MeatType>(MeatType.Beef);
  const [skillLevel, setSkillLevel] = useState<SkillLevel>(SkillLevel.Easy);
  const [ingredients, setIngredients] = useState('');
  const [worthMakingLeftovers, setWorthMakingLeftovers] = useState<boolean>(false);
  const [notes, setNotes] = useState<string>('');
  const [tags, setTags] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchDinner = async () => {
      try {
        const fetchedDinner = await dinnerService.getDinnerById(id!);
        setDinner(fetchedDinner);
        setName(fetchedDinner.name);
        setDescription(fetchedDinner.description);
        setType(fetchedDinner.type);
        setMeatType(fetchedDinner.meatType);
        setSkillLevel(fetchedDinner.skillLevel);
        setIngredients(fetchedDinner.ingredients.join(', '));
        setWorthMakingLeftovers(fetchedDinner.worthMakingLeftovers);
        setNotes(fetchedDinner.notes);
        setTags(fetchedDinner.tags.join(', '));
        setImagePreview(fetchedDinner.imageData); // Set existing image preview
      } catch (error) {
        console.error('Failed to fetch dinner:', error);
      }
    };

    fetchDinner();
  }, [id]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const base64Data = base64String.split(',')[1]; // Strip the prefix for image byte
        setImage(base64Data); // Set the new image
        setImagePreview(base64String); // Set the preview
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id) {
      setError('Dinner Id is missing.');
      return;
    }

    const updatedDinner = {
      id,
      name,
      description,
      type,
      meatType,
      skillLevel,
      ingredients: ingredients.split(',').map((ingredient) => ingredient.trim()),
      worthMakingLeftovers,
      notes,
      tags: tags.split(',').map((tag) => tag.trim()),
      imageData: image || dinner?.imageData || null, // Retain existing image if no new one is uploaded
    };

    try {
      await dinnerService.updateDinner(updatedDinner);
      setSuccess('Dinner updated successfully!');
      navigate('/Dinners');
    } catch (error) {
      setError('Failed to update dinner.');
      console.error('Update failed:', error);
    }
  };

  const handleCheckboxChange = () => {
    setWorthMakingLeftovers((prev) => !prev);
  };

  if (!dinner) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1>Edit Dinner</h1>
      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>{success}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="type">Type:</label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(parseInt(e.target.value) as DinnerType)}
          >
            {Object.entries(DinnerType).map(([key, value]) => (
              <option key={value} value={value}>
                {key}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="meatType">Meat Type:</label>
          <select
            id="meatType"
            value={meatType}
            onChange={(e) => setMeatType(parseInt(e.target.value) as MeatType)}
          >
            {Object.entries(MeatType).map(([key, value]) => (
              <option key={value} value={value}>
                {key}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="skillLevel">Skill Level:</label>
          <select
            id="skillLevel"
            value={skillLevel}
            onChange={(e) =>
              setSkillLevel(parseInt(e.target.value) as SkillLevel)
            }
          >
            {Object.entries(SkillLevel).map(([key, value]) => (
              <option key={value} value={value}>
                {key}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="ingredients">Ingredients (comma-separated):</label>
          <input
            type="text"
            id="ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="worthMakingLeftovers">Worth making leftovers?</label>
          <input
            className="form-checkbox"
            type="checkbox"
            name="worthMakingLeftovers"
            checked={worthMakingLeftovers}
            onChange={handleCheckboxChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="notes">Notes:</label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="tags">Tags (comma-separated):</label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
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
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Selected preview"
              className={styles.imagePreview}
            />
          )}
        </div>
        <button type="submit" className={styles.submitButton}>
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditDinner;