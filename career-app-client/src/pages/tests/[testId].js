import { Container, Row } from "react-bootstrap";
import styles from "@/styles/tests.module.css";
import { Formik, Field, Form } from "formik";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";

export default function Test() {
  const router = useRouter();
  // Get data from url
  const { IsRevision } = router.query;

  const { data: session, status } = useSession();

  const preferenceAnswers = [
    { label: "Καθόλου", value: "None" },
    { label: "Πολύ Λίγο", value: "A little bit" },
    { label: "Λίγο", value: "A bit" },
    { label: "Πολύ", value: "Much" },
    { label: "Πάρα Πολύ", value: "Very much" },
  ];

  if (status === "unauthenticated") {
    return <h2 style={{ textAlign: "center" }}>Log in to view this page!</h2>;
  }

  return (
    <>
      <Container fluid className={styles["header"]}>
        <div className={styles["header-content"]}>
          <h1>Τεστ - Εξάμηνο 1</h1>
          <h4>
            Επιλέξτε απάντηση σύμφωνα με τις γνώσεις ή τις προτιμήσεις σας
          </h4>
        </div>
      </Container>
      <Container fluid className={`mt-4 ${styles["test-box"]}`}>
        <ol>
          <Formik
            initialValues={{}}
            onSubmit={async (values) => {
              alert(JSON.stringify(values, null, 2));
            }}
          >
            {({ values }) => (
              <Form>
                <li>
                  <div
                    role="group"
                    aria-labelledby="question-group"
                    className="mt-3 mb-3"
                  >
                    <div className={styles["question-header"]}>
                      Θα μας σώσει το ΜΕΡΑ25 και το σχέδιο Δήμητρα?
                    </div>
                    <div className={styles["answers-box"]}>
                      {preferenceAnswers.map((answer) => {
                        return (
                          <>
                            <label>
                              <Field
                                type="radio"
                                name="answer1"
                                value={answer.value}
                                className="me-2"
                              />
                              {answer.label}
                            </label>
                            <br />
                          </>
                        );
                      })}
                    </div>
                  </div>
                </li>
                <button
                  type="submit"
                  className="admin-btn mt-3"
                  style={{ backgroundColor: "#fcb426" }}
                >
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </ol>
      </Container>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);

  if (!session) return null;

  const track = ctx.query.track;
  const semester = ctx.query.semester;
  const revisionYear = ctx.query.revisionYear;

  let testData = "";
  try {
    let reqInstance = axios.create({
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    const url = `https://localhost:7155/api/StudentTests?Track=${track}&Semester=${semester}&RevisionYear=${revisionYear}`;

    const res = await reqInstance.get(url);
    testData = res.data;
  } catch (err) {
    return { err };
  } finally {
    return { props: { testData } };
  }
}
