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
  console.log(props);

  // Store username and students role in sessionStorage
  useEffect(() => {
    if (window) {
      let role = "";
      let semester = 0;
      let track = "";

      if (props.userData.isProspectiveStudent == true) {
        role = "Αμύητος";
      } else if (props.userData.isGraduate == true) {
        role = "Απόφοιτος";
        track = props.userData.track;
      } else {
        role = "Φοιτητής";
        semester = props.userData.semester;
        track = props.userData.track;
      }

      sessionStorage.setItem("username", props.userData.username);
      sessionStorage.setItem("role", role);
      sessionStorage.setItem("semester", semester);
      sessionStorage.setItem("track", track);
    }
  }, []);

  if (props.userData.isProspectiveStudent == true) {
    return (
      <>
        <Container>
          <h3 className="mt-4">Βαθμοί</h3>
        </Container>
        <Container>
          <div className="mt-4">Δεν υπάρχουν βαθμοί!</div>
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
            {props.semestersData.map((semester) => {
              return (
                <>
                  <Row className={styles["box"]}>
                    <Col className={styles["header"]} style={{ color: "red" }}>
                      <b>Εξάμηνο {semester}</b>
                    </Col>
                  </Row>
                  {props.coursesData.map((course) => {
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

  let userData = "";
  let coursesData = "";
  let semestersData = [];
  try {
    let reqInstance = axios.create({
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    const url = `${process.env.NEXT_PUBLIC_API_HOST}/api/Users/${session.user.userId}`;
    const res = await reqInstance.get(url);
    userData = res.data;

    const url2 = `${process.env.NEXT_PUBLIC_API_HOST}/api/Grades`;
    const res2 = await reqInstance.get(url2);
    if (res2) {
      coursesData = res2.data;
    }
  } catch (err) {
    return { err };
  } finally {
    console.log(coursesData);

    if (coursesData != "") {
      let tempSemestersList = [];
      coursesData.map((course) => {
        if (!tempSemestersList.includes(course.semester))
          tempSemestersList.push(course.semester);
      });
      semestersData = tempSemestersList;
    }

    return { props: { userData, coursesData, semestersData } };
  }
}
