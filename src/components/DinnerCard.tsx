import React from 'react';
import './DinnerCard.css';
import { byteArrayToBase64, stringToUint8Array } from '../utils/help';

interface DinnerCardProps {
    name: string;
    description: string;
    imageData: string | null;
    type: string;
    meatType: string;
    skillLevel: string;
    ingredients: string[];
    tags: string[];
}

const DinnerCard = ({ name, description, imageData }: DinnerCardProps) => {
    return (
        <div className="dinner-card">
            {imageData ? (
                <img 
                    src={`data:image/jpeg;base64,${byteArrayToBase64(stringToUint8Array(imageData))}`} 
                    alt={name} 
                    className="dinner-card-image" 
                />
            ) : (
                <div className="placeholder-image">No Image Available</div>
            )}
            <div className="dinner-card-content">
            <h3>{name}</h3>
            <p>{description}</p>
            </div>
        </div>
    );
};

export default DinnerCard;
