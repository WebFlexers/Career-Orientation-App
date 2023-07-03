import lessonStyles from "@/styles/lessons.module.css";
import testsStyles from "@/styles/tests.module.css";
import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AdminLayout from "@/components/admin.layout";
import useSessionStorage from "@/hooks/useSessionStorage";
import { getSession } from "next-auth/react";
import axios from "axios";

export default function Tests(props) {
  const router = useRouter();
  const role = useSessionStorage("role");
  const track = useSessionStorage("track");
  var activeSemester = parseInt(useSessionStorage("semester"));

  const studentTests = [
    { label: "Εξάμηνο 1", isRevision: false, index: 1 },
    { label: "Εξάμηνο 2", isRevision: false, index: 2 },
    { label: "Επαναληπτικό", isRevision: true, index: 1 },
    { label: "Εξάμηνο 3", isRevision: false, index: 3 },
    { label: "Εξάμηνο 4", isRevision: false, index: 4 },
    { label: "Επαναληπτικό", isRevision: true, index: 2 },
    { label: "Εξάμηνο 5", isRevision: false, index: 5 },
    { label: "Εξάμηνο 6", isRevision: false, index: 6 },
    { label: "Επαναληπτικό", isRevision: true, index: 3 },
    { label: "Εξάμηνο 7", isRevision: false, index: 7 },
    { label: "Εξάμηνο 8", isRevision: false, index: 8 },
    { label: "Επαναληπτικό", isRevision: true, index: 4 },
  ];

  var interestedTests = [
    { label: "Τεστ 1", index: 1, isCompleted: false },
    { label: "Τεστ 2", index: 2, isCompleted: false },
  ];

  function handleTestClick(index, isRevision, isCompleted) {
    if (isCompleted) {
      alert("Έχετε ήδη το ολοκληρώσει το συγκεκριμένο τεστ!");
      return;
    }

    if (role == "Αμύητος") {
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

  return (
    <main>
      <Container className="mt-4 mb-4" style={{ textAlign: "center" }}>
        <h4 className={lessonStyles["header"]}>
          Πριν προβείτε στην επίλυση των παρακάτω τεστ, μελετήστε το υλικό{" "}
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
              {studentTests.map((test) => {
                if (role == "Απόφοιτος") activeSemester = 8;
                // Show tests based on the active semester
                if (
                  studentTests.indexOf(test) + 1 >
                  activeSemester + Math.floor(activeSemester / 2)
                ) {
                  return null;
                }

                return (
                  <>
                    <div className={testsStyles["tests-item"]}>
                      <button
                        className="admin-btn"
                        onClick={() =>
                          handleTestClick(test.index, test.isRevision, false)
                        }
                      >
                        {test.label}
                      </button>
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
              {interestedTests.map((test) => {
                return (
                  <>
                    <div className={testsStyles["tests-item"]}>
                      <button
                        className="admin-btn"
                        onClick={() =>
                          handleTestClick(test.index, false, test.isCompleted)
                        }
                        style={
                          test.isCompleted
                            ? { backgroundColor: "green", color: "white" }
                            : null
                        }
                      >
                        {test.label}
                      </button>
                    </div>
                  </>
                );
              })}
            </div>
          </>
        )}
      </Container>
    </main>
  );
}

Tests.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);

  if (!session) return null;

  let userData = "";
  let sessionToken = "";
  try {
    let reqInstance = axios.create({
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    const url = `https://localhost:7155/api/Users/${session.user.userId}`;

    const res = await reqInstance.get(url);
    userData = res.data;
    sessionToken = session.accessToken;
  } catch (err) {
    return { err };
  } finally {
    return { props: { userData, sessionToken } };
  }
}
