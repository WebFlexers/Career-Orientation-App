import { Container, Row, Col } from "react-bootstrap";
import { useRouter } from "next/router";
import AdminLayout from "@/components/admin.layout";
import styles from "@/styles/progress.module.css";
import Chart from "chart.js/auto";
import "chart.js/auto"; // ADD THIS
import { useRef, useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import axios from "axios";
import useSessionStorage from "@/hooks/useSessionStorage";

export default function Progress(props) {
  const canvas = useRef();
  const chartId = useRef(null);
  const role = useSessionStorage("role");
  const [tests, setTests] = useState([]);

  let statusStyle = {};

  useEffect(() => {
    let tempAccessCountArray = [];
    let tempSemestersArray = [];
    let tempStr = "";

    props.semestersData.map(function (semester) {
      tempAccessCountArray.push(parseInt(semester.accessCount));
      tempStr = "Εξάμηνο " + semester.semester;
      tempSemestersArray.push(tempStr);
    });

    let accessCount = tempAccessCountArray;
    let semesterLabels = tempSemestersArray.sort();

    let ctx = canvas.current;

    if (chartId.current !== null) {
      return;
    }

    let chartStatus = Chart.getChart("myChart");
    if (chartStatus != undefined) {
      chartStatus.destroy();
    }

    const chart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: semesterLabels,
        datasets: [
          {
            data: accessCount,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(53, 184, 255, 0.2)",
              "rgba(255, 186, 53, 0.2)",
              "rgba(119, 255, 53, 0.2)",
              "rgba(255, 53, 219, 0.2)",
              "rgba(53, 255, 199, 0.2)",
              "rgba(206, 53, 255, 0.2)",
              "rgba(102, 255, 53, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(53, 184, 255, 1)",
              "rgba(255, 186, 53, 1)",
              "rgba(119, 255, 53, 1)",
              "rgba(255, 53, 219, 1)",
              "rgba(53, 255, 199, 1)",
              "rgba(206, 53, 255, 1)",
              "rgba(102, 255, 53, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Κατανομή επισκέψεων φοιτητή σε εξάμηνα",
          },
        },
      },
    });
    chartId.current = chart.id;
  }, []);

  return (
    <main>
      <Container>
        <h3 className="mt-4">Επισκεψημότητα</h3>
      </Container>
      <Container className="mt-3 mb-3">
        {props.semestersData?.length > 0 ? (
          <>
            <div id={styles["pie-box"]}>
              <canvas ref={canvas}></canvas>
            </div>
          </>
        ) : (
          <>
            <div className="mt-4">
              Για να σας δώσουμε στατιστικά επισκεψότητας πρέπει να πρώτα να
              επισκεφθείτε την ενότητα διδασκαλία και να μελετήσετε τα εξάμηνα!
            </div>
          </>
        )}
      </Container>
      <Container>
        <h3 className="mt-4">Τεστς</h3>
      </Container>
      <Container className="mt-3 mb-3">
        {props.testsData.map((test) => {
          {
            test.isCompleted
              ? (statusStyle = {})
              : (statusStyle = {
                  pointerEvents: "none",
                  backgroundColor: "red",
                  color: "white",
                });
          }
          return (
            <>
              <Row className="mt-4">
                <div className={styles["test-box"]}>
                  <Col>
                    {role == "Αμύητος" ? (
                      <>
                        <div clsssName={styles["title"]}>
                          Τεστ {test.generalTestId}
                        </div>
                      </>
                    ) : (
                      <>
                        {test.revisionYear == null ? (
                          <>
                            <div clsssName={styles["title"]}>
                              Εξάμηνο {test.semester}
                            </div>
                          </>
                        ) : (
                          <>
                            <div clsssName={styles["title"]}>
                              Επαναληπτικό {test.revisionYear}
                            </div>
                          </>
                        )}
                      </>
                    )}
                  </Col>
                  <Col>
                    {test.isCompleted ? (
                      <>
                        <button
                          className={styles["status-box"]}
                          style={{
                            pointerEvents: "none",
                            backgroundColor: "green",
                            color: "white",
                          }}
                        >
                          PASS
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className={styles["status-box"]}
                          style={{
                            pointerEvents: "none",
                            backgroundColor: "orange",
                            color: "white",
                          }}
                        >
                          PENDING
                        </button>
                      </>
                    )}
                  </Col>
                </div>
              </Row>
            </>
          );
        })}
      </Container>
    </main>
  );
}

Progress.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);

  if (!session) return null;

  let semestersData = "";
  let testsData = "";
  try {
    let reqInstance = axios.create({
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    var url = `${process.env.NEXT_PUBLIC_API_HOST}/api/Statistics/TeachingAccessStatistics`;
    var res = await reqInstance.get(url);
    semestersData = res.data;

    url = `${process.env.NEXT_PUBLIC_API_HOST}/api/ProspectiveStudentTests/Completed`;
    res = await reqInstance.get(url);
    if (res) {
      testsData = res.data.testsCompletionState;
    }

    url = `${process.env.NEXT_PUBLIC_API_HOST}/api/StudentTests/Completed`;
    res = await reqInstance.get(url);
    if (res) {
      testsData = res.data.testsCompletionState;
    }
  } catch (err) {
    console.log(err);
  } finally {
    return { props: { semestersData, testsData } };
  }
}
