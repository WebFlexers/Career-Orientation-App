import lessonStyles from "@/styles/lessons.module.css";
import testsStyles from "@/styles/tests.module.css";
import { Container } from "react-bootstrap";
import { useState } from "react";
import { useRouter } from "next/router";
import AdminLayout from "@/components/admin.layout";
import Link from "next/link";

export default function Tests({ semestersData }) {
  const router = useRouter();
  const [role, setRole] = useState("Student");
  const [activeSemester, setActiveSemester] = useState(4);

  const studentTests = [
    { label: "Εξάμηνο 1", path: "/tests/examino1" },
    { label: "Εξάμηνο 2", path: "/tests/examino2" },
    { label: "Επαναληπτικό", path: "/tests/examino1" },
    { label: "Εξάμηνο 3", path: "/tests/examino1" },
    { label: "Εξάμηνο 4", path: "/tests/examino1" },
    { label: "Επαναληπτικό", path: "/tests/examino1" },
    { label: "Εξάμηνο 5", path: "/tests/examino1" },
    { label: "Εξάμηνο 6", path: "/tests/examino1" },
    { label: "Επαναληπτικό", path: "/tests/examino1" },
    { label: "Εξάμηνο 7", path: "/tests/examino1" },
    { label: "Εξάμηνο 8", path: "/tests/examino1" },
    { label: "Επαναληπτικό", path: "/tests/examino1" },
  ];

  const interestedTests = [
    { label: "Τεστ 1", path: "/tests/examino1" },
    { label: "Τεστ 2", path: "/tests/examino2" },
  ];

  function handleTestClick(index) {
    alert(index);
  }

  return (
    <main>
      <Container className="mt-4 mb-4" style={{ textAlign: "center" }}>
        <h4 className={lessonStyles["header"]}>
          Πριν προβείτε στην επίλυση των παρακάτω τεστ, μελετήστε το υλικό που
          βρίσκεται στην ενότητα Διδασκαλία.
        </h4>
        <button
          className="admin-btn mt-4"
          onClick={() => {
            router.push("/lessons");
          }}
        >
          Μετάβαση
        </button>
      </Container>
      <Container className="mt-4" style={{ textAlign: "center" }}>
        <h4 className="mb-4">Επιλέξτε τεστ:</h4>
        {role == "Student" && (
          <>
            <div className={testsStyles["tests-box"]}>
              {studentTests.map((test) => {
                // Show tests based on the active semester
                if (
                  studentTests.indexOf(test) + 1 >
                  activeSemester + Math.floor(activeSemester / 2)
                )
                  return null;

                return (
                  <>
                    <div className={testsStyles["tests-item"]}>
                      <button
                        className="admin-btn"
                        onClick={() =>
                          handleTestClick(studentTests.indexOf(test) + 1)
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
        {role == "Interested" && (
          <>
            <div className={testsStyles["interested-tests-box"]}>
              {interestedTests.map((test) => {
                return (
                  <>
                    <div className={testsStyles["tests-item"]}>
                      <button
                        className="admin-btn"
                        onClick={() => handleSemesterClick(1)}
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