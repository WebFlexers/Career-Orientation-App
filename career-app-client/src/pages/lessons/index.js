import styles from "@/styles/lessons.module.css";
import { Container } from "react-bootstrap";
import { useState } from "react";
import AdminLayout from "@/components/admin.layout";
import semesters from "../../../public/data/semesters.json";
import { getSession } from "next-auth/react";
import axios from "axios";
import useSessionStorage from "@/hooks/useSessionStorage";
import { useSession } from "next-auth/react";

export default function Lessons(props) {
  const role = useSessionStorage("role");
  const [courses, setCourses] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState(0);
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

  const handleSemesterClick = async (semester_index) => {
    var track = "";
    var IsProspectiveStudent = false;

    if (track != null && semester_index > 4 && role != "Αμύητος")
      track = props.userData.track;

    if (role == "Αμύητος") IsProspectiveStudent = true;

    const url = `https://localhost:7155/api/Courses?Semester=${semester_index}&Track=${track}&IsProspectiveStudent=${IsProspectiveStudent}`;

    const res = await axios.get(url);

    const tempCourses = res.data;

    setSelectedSemester(semester_index);
    setCourses(tempCourses);
  };

  return (
    <main>
      <Container className="mt-4">
        <h4 className={styles["header"]}>Επιλέξτε εξάμηνο:</h4>
        <div className={styles["semesters-box"]}>
          {semestersIndexes.map((semester) => {
            if (
              semestersIndexes.indexOf(semester) >= props.userData.semester &&
              props.userData.semester != null
            )
              return;

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
          {courses?.map((course) => {
            return (
              <>
                <li key={courses.indexOf(course)}>
                  <h5 className="mt-5" style={{ color: "red" }}>
                    {course.name}
                    &nbsp;({course.track == null ? <>Κορμού</> : course.track})
                  </h5>
                  <h5 className="mt-4">
                    <b>Περιγραφή</b>
                  </h5>
                  <div style={{ textAlign: "justify" }}>
                    {course.description}
                  </div>
                  <h5 className="mt-4">
                    <b>Hard Skills</b>
                  </h5>
                  <div style={{ textAlign: "justify" }}>
                    <ul>
                      {course.skills.map((skill) => {
                        if (skill.type == "Hard")
                          return (
                            <>
                              <li
                                style={{ margin: "10px 0" }}
                                key={course.skills.indexOf(skill)}
                              >
                                {skill.name}
                              </li>
                            </>
                          );
                      })}
                    </ul>
                  </div>
                  <h5 className="mt-4">
                    <b>Soft Skills</b>
                  </h5>
                  <div style={{ textAlign: "justify" }}>
                    <ul>
                      {course.skills.map((skill) => {
                        if (skill.type == "Soft")
                          return (
                            <>
                              <li
                                style={{ margin: "10px 0" }}
                                key={course.skills.indexOf(skill)}
                              >
                                {skill.name}
                              </li>
                            </>
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

  let userData = "";
  try {
    let reqInstance = axios.create({
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    const url = `https://localhost:7155/api/Users/${session.user.userId}`;

    const res = await reqInstance.get(url);
    userData = res.data;
  } catch (err) {
    return { err };
  } finally {
    return { props: { userData } };
  }
}
