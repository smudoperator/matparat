import React from 'react';
import './DinnerCard.css';

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

function byteArrayToBase64(byteArray: Uint8Array): string {
    let binary = '';
    const len = byteArray.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(byteArray[i]);
    }
    return window.btoa(binary); // Base64 encode
}

const DinnerCard: React.FC<DinnerCardProps> = ({ name, description, imageData }) => {
    return (
        <div className="dinner-card">
            {imageData ? (
                <img src={imageData} alt={name} className="dinner-image" />
            ) : (
                <div className="placeholder-image">No Image Available</div>
            )}
            <h3>{name}</h3>
            <p>{description}</p>
        </div>
    );
};

export default DinnerCard;
