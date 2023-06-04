"use client";
import styles from "@/styles/lessons.module.css";
import { Container } from "react-bootstrap";
import { useState } from "react";

function Lessons() {
  const [semester, setSemester] = useState(3);

  function handleSemesterClick(_semester) {
    console.log(_semester);
  }

  return (
    <main>
      <Container className="mt-4">
        <h4 className={styles["header"]}>Επιλέξτε εξάμηνο:</h4>
        <div className={styles["semesters-box"]}>
          <div className={styles["semester-item"]}>
            <button
              className={styles["semester-btn"]}
              onClick={() => handleSemesterClick(1)}
            >
              Εξάμηνο 1
            </button>
          </div>
          <div className={styles["semester-item"]}>
            <button
              className={styles["semester-btn"]}
              onClick={() => handleSemesterClick(2)}
            >
              Εξάμηνο 2
            </button>
          </div>
          <div className={styles["semester-item"]}>
            <button className={styles["semester-btn"]}>Εξάμηνο 3</button>
          </div>
          <div className={styles["semester-item"]}>
            <button className={styles["semester-btn"]}>Εξάμηνο 4</button>
          </div>
          <div className={styles["semester-item"]}>
            <button className={styles["semester-btn"]}>Εξάμηνο 5</button>
          </div>
          <div className={styles["semester-item"]}>
            <button className={styles["semester-btn"]}>Εξάμηνο 6</button>
          </div>
          <div className={styles["semester-item"]}>
            <button className={styles["semester-btn"]}>Εξάμηνο 7</button>
          </div>
          <div className={styles["semester-item"]}>
            <button className={styles["semester-btn"]}>Εξάμηνο 8</button>
          </div>
        </div>
      </Container>

      <Container className="mt-5 mb-3">
        <h4 className={styles["header"]}>Εξάμηνο {semester}</h4>
        <div>something</div>
      </Container>
    </main>
  );
}

export default Lessons;
