import styles from "@/styles/lessons.module.css";
import { Container } from "react-bootstrap";
import { useState } from "react";
import AdminLayout from "@/components/admin.layout";
import semesters from "../../../public/data/semesters.json";
import { getSession } from "next-auth/react";
import axios from "axios";
import useSessionStorage from "@/hooks/useSessionStorage";

async function getLessonsFromSemester(semester_index, IsProspectiveStudent) {
  const url = `https://localhost:7155/api/Courses?Semester=${semester_index}&IsProspectiveStudent=${IsProspectiveStudent}`;

  const res = await axios.get(url);

  return res.data.courses;
}

export default function Lessons({ semestersData }) {
  // Variables
  // Semesters
  const semestersIndexes = [
    { index: 1 },
    { index: 2 },
    { index: 3 },
    { index: 4 },
    { index: 5 },
    { index: 6 },
    { index: 7 },
    { index: 8 },
  ];
  const role = useSessionStorage("role");
  const [courses, setCourses] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState(0);

  // Functions
  function handleSemesterClick(semester_index) {
    var tempCourses = [];
    if (role == "Αμύητος") {
      tempCourses = getLessonsFromSemester(semester_index, true);
    } else {
      tempCourses = getLessonsFromSemester(semester_index, false);
    }

    console.log("Ηελλο ςορλδ");
    console.log(tempCourses.);
    setSelectedSemester(semester_index);
    setCourses(tempCourses);
  }

  return (
    <main>
      <Container className="mt-4">
        <h4 className={styles["header"]}>Επιλέξτε εξάμηνο:</h4>
        <div className={styles["semesters-box"]}>
          {semestersIndexes.map((semester) => {
            return (
              <>
                <div className={styles["semester-item"]}>
                  <button
                    className={styles["semester-btn"]}
                    onClick={() => handleSemesterClick(semester.index)}
                  >
                    Εξάμηνο {semester.index}
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
          <li>
            <h5 className="mt-5" style={{ color: "red" }}>
              Ανάλυση 1
            </h5>
            <h5 className="mt-4">
              <b>Περιγραφή</b>
            </h5>
            <div style={{ textAlign: "justify" }}>Κάτι καλό</div>
            <h5 className="mt-4">
              <b>Hard Skills</b>
            </h5>
            <div style={{ textAlign: "justify" }}>
              <ul>
                <li style={{ margin: "10px 0" }}>Υπομονή</li>
              </ul>
            </div>
            <h5 className="mt-4">
              <b>Soft Skills</b>
            </h5>
            <div style={{ textAlign: "justify" }}>
              <ul>
                <li style={{ margin: "10px 0" }}>Παράνοια</li>
              </ul>
            </div>
          </li>
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
