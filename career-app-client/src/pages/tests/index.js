import lessonStyles from "@/styles/lessons.module.css";
import testsStyles from "@/styles/tests.module.css";
import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AdminLayout from "@/components/admin.layout";
import useSessionStorage from "@/hooks/useSessionStorage";
import { getSession } from "next-auth/react";
import axios from "axios";
import Image from "next/image";

export default function Tests(props) {
  const router = useRouter();
  const role = useSessionStorage("role");
  const track = useSessionStorage("track");
  let prospectiveStudentTest2Style = {};

  console.log(props.test);

  function handleTestClick(index, isRevision, isCompleted) {
    if (isCompleted) {
      alert("Έχετε ήδη ολοκληρώσει το συγκεκριμένο τεστ!");
      return;
    }

    if (role == "Αμύητος") {
      if (index == 2 && !props.tests[0]?.isCompleted) {
        alert("Πρέπει να ολοκληρώσετε το Τεστ 1 για να προχωρήσετε στο Τεστ 2");
        return;
      }

      const url = `/tests/${index}?generalTestId=${index}`;
      router.push(url);
      return;
    }

    var tempTrack = "";
    var semester = "";
    var revisionYear = "";

    if (!isRevision) {
      semester = index;
      if (index > 4) {
        tempTrack = track;
      }
    } else {
      revisionYear = index;
      if (index > 2) {
        tempTrack = track;
      }
    }

    const url = `/tests/${index}?track=${tempTrack}&semester=${semester}&revisionYear=${revisionYear}`;
    router.push(url);
  }

  if (role == "Αμύητος") {
    if (props.tests[1]?.isCompleted)
      prospectiveStudentTest2Style = {
        backgroundColor: "green",
        color: "white",
      };
    else {
      if (!props.tests[0]?.isCompleted)
        prospectiveStudentTest2Style = {
          backgroundColor: "#cccccc",
          color: "#666666",
        };
    }
  }

  return (
    <main>
      <Container className="mt-4 mb-4" style={{ textAlign: "center" }}>
        <h4 className={lessonStyles["header"]}>
          Πριν προβείτε στην επίλυση των παρακάτω τεστ, μελετήστε το υλικό
          <br />
          που βρίσκεται στην ενότητα Διδασκαλία.
        </h4>
        <button
          className="admin-btn mt-3"
          onClick={() => {
            router.push("/lessons");
          }}
        >
          Μετάβαση
        </button>
      </Container>
      <Container className="mt-5" style={{ textAlign: "center" }}>
        <h4 className="mb-4">Επιλέξτε τεστ:</h4>
        {(role == "Φοιτητής" || role == "Απόφοιτος") && (
          <>
            <div className={`mt-3 ${testsStyles["tests-box"]}`}>
              {props.tests.map((test) => {
                return (
                  <>
                    <div className={testsStyles["tests-item"]}>
                      {test.revisionYear == null ? (
                        <>
                          <button
                            className="admin-btn"
                            onClick={() =>
                              handleTestClick(
                                test.semester,
                                false,
                                test.isCompleted
                              )
                            }
                            style={
                              test.isCompleted
                                ? {
                                    backgroundColor: "green",
                                    color: "white",
                                  }
                                : null
                            }
                          >
                            <>Εξάμηνο {test.semester}</>
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="admin-btn"
                            onClick={() =>
                              handleTestClick(
                                test.revisionYear,
                                true,
                                test.isCompleted
                              )
                            }
                            style={
                              test.isCompleted
                                ? {
                                    backgroundColor: "green",
                                    color: "white",
                                  }
                                : null
                            }
                          >
                            <>Επαναληπτικό</>
                          </button>
                        </>
                      )}
                    </div>
                  </>
                );
              })}
            </div>
          </>
        )}
        {role == "Αμύητος" && (
          <>
            <div className={testsStyles["interested-tests-box"]}>
              <div className={testsStyles["tests-item"]}>
                <button
                  className="admin-btn"
                  onClick={() =>
                    handleTestClick(
                      props.tests[0]?.generalTestId,
                      false,
                      props.tests[0]?.isCompleted
                    )
                  }
                  style={
                    props.tests[0]?.isCompleted
                      ? {
                          backgroundColor: "green",
                          color: "white",
                        }
                      : null
                  }
                >
                  Τεστ {props.tests[0]?.generalTestId}
                </button>
              </div>
              <div className={testsStyles["tests-item"]}>
                <button
                  className="admin-btn"
                  onClick={() =>
                    handleTestClick(
                      props.tests[1]?.generalTestId,
                      false,
                      props.tests[1]?.isCompleted
                    )
                  }
                  style={prospectiveStudentTest2Style}
                >
                  Τεστ {props.tests[1]?.generalTestId}
                </button>
              </div>
            </div>
          </>
        )}
      </Container>
      {props.hasCompletedAllTests && (
        <>
          <Container className="mt-5 mb-4" style={{ textAlign: "center" }}>
            <h4 className={lessonStyles["header"]}>
              <div
                className="mb-3"
                style={{ fontSize: "1.2em", color: "#01ab87" }}
              >
                Συγχαρητήρια!
              </div>{" "}
              Ολοκληρώσατε όλα τα τεστς. Μεταβείτε στην ενότητα
              &quot;Συστάσεις&quot; για να δείτε τα αποτελέσματα!
            </h4>
            <button
              className="admin-btn mt-3"
              onClick={() => {
                router.push("/referrals");
              }}
            >
              Μετάβαση
            </button>
          </Container>
        </>
      )}
    </main>
  );
}

Tests.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);

  if (!session) return null;
  console.log(session);

  let tests = [];
  let hasCompletedAllTests = false;
  try {
    let reqInstance = axios.create({
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    const url = `${process.env.NEXT_PUBLIC_API_HOST}/api/ProspectiveStudentTests/Completed`;
    const res = await reqInstance.get(url);
    if (res) {
      tests = res.data.testsCompletionState;
      hasCompletedAllTests = res.data.hasCompletedAllEssentialTests;
    }

    const url2 = `${process.env.NEXT_PUBLIC_API_HOST}/api/StudentTests/Completed`;
    const res2 = await reqInstance.get(url2);
    if (res2) {
      tests = res2.data.testsCompletionState;
      hasCompletedAllTests = res2.data.hasCompletedAllTests;
    }
  } catch (err) {
    console.log(err);
  } finally {
    return { props: { tests, hasCompletedAllTests } };
  }
}
