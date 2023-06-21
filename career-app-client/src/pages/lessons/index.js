import styles from "@/styles/lessons.module.css";
import { Container } from "react-bootstrap";
import { useState } from "react";
import AdminLayout from "@/components/admin.layout";
import semesters from "../../../public/data/semesters.json";
import { getSession } from "next-auth/react";
import axios from "axios";

function getLessonsFromSemester(semesters, semester_index) {
  return semesters[semester_index - 1].lessons;
}

export default function Lessons({ semestersData }) {
  // Variable that reads the json file and converts it to arrays of objects
  const [localSemesters, setLocalSemesters] = useState(
    Object.values(semesters)[0]
  );
  const [lessons, setLessons] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState(0);

  function handleSemesterClick(index) {
    var tempLessons = getLessonsFromSemester(localSemesters, index);
    setSelectedSemester(index);
    setLessons(tempLessons);
  }

  return (
    <main>
      <Container className="mt-4">
        <h4 className={styles["header"]}>Επιλέξτε εξάμηνο:</h4>
        <div className={styles["semesters-box"]}>
          {localSemesters.map((semester) => {
            var semester_index = localSemesters.indexOf(semester) + 1;
            return (
              <>
                <div className={styles["semester-item"]}>
                  <button
                    className={styles["semester-btn"]}
                    onClick={() => handleSemesterClick(semester_index)}
                  >
                    Εξάμηνο {semester_index}
                  </button>
                </div>
              </>
            );
          })}
        </div>
      </Container>

      <Container className="mt-5 mb-4">
        <h4 className={`${styles["header"]}`}>
          {selectedSemester > 0 ? <b>Εξάμηνο {selectedSemester}</b> : <b></b>}
        </h4>
        <ol id={styles["info-box"]}>
          {lessons.map((lesson) => {
            return (
              <>
                <li>
                  <h5 className="mt-5" style={{ color: "red" }}>
                    {lesson.title}
                  </h5>
                  <h5 className="mt-4">
                    <b>Περιγραφή</b>
                  </h5>
                  <div style={{ textAlign: "justify" }}>
                    {lesson.description}
                  </div>
                  <h5 className="mt-4">
                    <b>Hard Skills</b>
                  </h5>
                  <div style={{ textAlign: "justify" }}>
                    <ul>
                      {lesson.hard_skills.map((hard_skill) => {
                        return (
                          <li style={{ margin: "10px 0" }}>
                            {hard_skill.skill}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <h5 className="mt-4">
                    <b>Soft Skills</b>
                  </h5>
                  <div style={{ textAlign: "justify" }}>
                    <ul>
                      {lesson.soft_skills.map((soft_skill) => {
                        return (
                          <li style={{ margin: "10px 0" }}>
                            {soft_skill.skill}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </li>
              </>
            );
          })}
        </ol>
      </Container>
    </main>
  );
}

Lessons.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);

  if (!session) return null;

  let data = "";
  try {
    let reqInstance = axios.create({
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    const url = `https://localhost:7155/api/Users/${session.user.userId}`;

    const res = await reqInstance.get(url);
    data = res.data;
  } catch (err) {
    return { err };
  } finally {
    return { props: { data } };
  }
}
