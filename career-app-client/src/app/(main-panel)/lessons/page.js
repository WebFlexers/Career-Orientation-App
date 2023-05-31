"use client";
import styles from "@/styles/lessons.module.css";
import { Container } from "react-bootstrap";

export default function Lessons() {
  return (
    <main>
      <Container className="mt-4">
        <h4 className={styles["header"]}>Επιλέξτε εξάμηνο:</h4>
        <div id="semesters-btns-box">
          <button className={styles["semesters-btn"]}>Εξάμηνο 1</button>
          <button className={styles["semesters-btn"]}>Εξάμηνο 2</button>
          <button className={styles["semesters-btn"]}>Εξάμηνο 3</button>
          <button className={styles["semesters-btn"]}>Εξάμηνο 4</button>
          <button className={styles["semesters-btn"]}>Εξάμηνο 5</button>
          <button className={styles["semesters-btn"]}>Εξάμηνο 6</button>
          <button className={styles["semesters-btn"]}>Εξάμηνο 7</button>
          <button className={styles["semesters-btn"]}>Εξάμηνο 8</button>
        </div>
      </Container>

      <Container className="mt-5">
        <h4 className={styles["header"]}>Εξάμηνο 1</h4>
      </Container>
    </main>
  );
}
