import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/dashboard.module.css";
import AdminLayout from "@/components/admin.layout";
import { useSession, getSession } from "next-auth/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import useSessionStorage from "@/hooks/useSessionStorage";
import { useRouter } from "next/router";

export default function Dashboard(props) {
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const { data: session } = useSession();
  const role = useSessionStorage("role");

  // Store username and students role in sessionStorage
  useEffect(() => {
    if (window) {
      let role = "";
      let semester = 0;
      let track = "";

      if (props.data.isProspectiveStudent == true) {
        role = "Αμύητος";
      } else if (props.data.isGraduate == true) {
        role = "Απόφοιτος";
        track = props.data.track;
      } else {
        role = "Φοιτητής";
        semester = props.data.semester;
        track = props.data.track;
      }

      sessionStorage.setItem("username", props.data.username);
      sessionStorage.setItem("role", role);
      sessionStorage.setItem("semester", semester);
      sessionStorage.setItem("track", track);

      getCourses();
    }
  }, [courses]);

  async function getCourses() {
    if (props.data.isProspectiveStudent == true) {
      return;
    }

    let data = [];
    try {
      let reqInstance = axios.create({
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });

      const url = `https://localhost:7155/api/Grades`;

      const res = await reqInstance.get(url);
      data = res.data;
    } catch (err) {
    } finally {
      let tempSemestersList = [];
      data.map((course) => {
        if (!tempSemestersList.includes(course.semester))
          tempSemestersList.push(course.semester);
      });
      setCourses(data);
      setSemesters(tempSemestersList);
    }
  }

  if (props.data.isProspectiveStudent == true) {
    return (
      <>
        <Container>
          <h3 className="mt-4">Βαθμοί</h3>
        </Container>
        <Container>
          <div>Δεν υπάρχουν βαθμοί!</div>
        </Container>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <Container>
          <h3 className="mt-4">Βαθμοί</h3>
        </Container>
        <Container className="mt-3 mb-3">
          <div id={styles["grades-box"]}>
            {semesters.map((semester) => {
              return (
                <>
                  <Row className={styles["box"]}>
                    <Col className={styles["header"]} style={{ color: "red" }}>
                      <b>Εξάμηνο {semester}</b>
                    </Col>
                  </Row>
                  {courses.map((course) => {
                    if (course.semester != semester) return;
                    return (
                      <>
                        <Row className={styles["box"]}>
                          <Col className={styles["title"]}>
                            {course.courseName}
                          </Col>
                          <Col className={styles["grade"]}>
                            <b>{course.grade}</b>
                          </Col>
                        </Row>
                      </>
                    );
                  })}
                </>
              );
            })}
          </div>
        </Container>
      </main>
    </>
  );
}

Dashboard.getLayout = function getLayout(page) {
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
