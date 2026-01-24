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
      </div>
    </div>
  );
};

export default Home;
