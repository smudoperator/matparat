// src/pages/Home.tsx

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import dinnerService from "../services/DinnerService";
import styles from "./Home.module.css";

const Home: React.FC = () => {
  const navigate = useNavigate();

  // Ping the API to wake it up from eepy sleep
  useEffect(() => {
    const pingApi = async () => {
      try {
        await dinnerService.getDinnerById("fakeid");
      } catch (error) {}
    };

    pingApi();
  }, []);

  const planDinners = () => {
    navigate("/CreateDinnerPlan");
  };

  const handleSignUp = () => {
    // For now, just navigate to the dinners page
    navigate("/Dinners");
  };

  return (
    <div className={styles.container}>
      <div className={styles.homeContent}>
        <h1>Sett seil mot en hverdag uten bekymring</h1>
        <p className={styles.homeSubtitle}>
          La MatPirat planlegge morgendagens fangst og nyt en smakfull reise
          gjennom ukens måltider.
        </p>
        <button className={styles.button} onClick={planDinners}>
          Kjør
        </button>

        {/* Promotional Section */}
        <div className={styles.promoSection}>
          <div className={styles.promoBadge}>Limited Time Offer!</div>
          <h2>Sign Up Now for a FREE 3-Week Dinner Plan!</h2>
          <p>
            Get personalized dinner plans tailored to your preferences. No
            credit card required!
          </p>
          <div className={styles.promoFeatures}>
            <div className={styles.promoFeature}>
              <span className={styles.promoFeatureIcon}>✓</span>
              <span>21 customized dinner recipes</span>
            </div>
            <div className={styles.promoFeature}>
              <span className={styles.promoFeatureIcon}>✓</span>
              <span>Automated shopping lists</span>
            </div>
            <div className={styles.promoFeature}>
              <span className={styles.promoFeatureIcon}>✓</span>
              <span>Nutritional information included</span>
            </div>
            <div className={styles.promoFeature}>
              <span className={styles.promoFeatureIcon}>✓</span>
              <span>Leftover planning tips</span>
            </div>
          </div>
          <button className={styles.promoButton} onClick={handleSignUp}>
            Get My Free Plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
