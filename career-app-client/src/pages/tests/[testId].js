import { Container, Row } from "react-bootstrap";
import styles from "@/styles/tests.module.css";
import { Formik, Field, Form } from "formik";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import useSessionStorage from "@/hooks/useSessionStorage";

export default function Test(props) {
  // Variables and consts
  const router = useRouter();
  const role = useSessionStorage("role");
  const { data: session, status } = useSession();
  const { track, semester, revisionYear } = router.query;
  const { isRevision, universityTestId, questions, generalTestId } =
    props.testData;
  const [successMsg, setSuccessMsg] = useState("");

  const preferenceAnswers = [
    { label: "Πολύ Λίγο", value: "1" },
    { label: "Λίγο", value: "2" },
    { label: "Ουδέτερο", value: "3" },
    { label: "Πολύ", value: "4" },
    { label: "Πάρα Πολύ", value: "5" },
  ];

  const trueFalse = [
    { label: "Σωστό", value: "true" },
    { label: "Λάθος", value: "false" },
  ];

  // Methods

  async function submitAnswers(values) {
    //alert(JSON.stringify(values, null, 2));

    // Convert values object to an array[] of [QuestionType-QuestionId, AnswerValue] pairs
    // Only at multiple choice questions the pairs are of the form [QuestionType-QuestionId, QuestionId-AnswerValue]
    // because radio fields can only work with strings
    // e.g. ["MultipleChoice-12":"12-3"] or ["TrueFalse-23":"true"]
    var formAnswersObject = Object.keys(values).map((key) => [
      key,
      values[key],
    ]);

    if (formAnswersObject.length != questions.length) {
      alert("Πρέπει να απαντήσετε σε όλες τις ερωτήσεις!");
      return;
    }

    // Create the answers object based on the array of [] pairs created before
    let reqAnswersObject = formAnswersObject.map(function (answer) {
      // Split the QuestionType-QuestionId to an array where the index 0 is the question type and the index 1 is the question id
      let splittedAnswerName = answer[0].split("-");

      let questionType = splittedAnswerName[0];
      let questionId = splittedAnswerName[1];
      let answerValue = answer[1];

      // Check the question type
      if (questionType == "MultipleChoice") {
        // Only here, split the QuestionId-AnswerId to an array where the index 0 is the question id and the index 1 is the answer value
        let splittedAnswerValue = answerValue.split("-");
        let answerId = splittedAnswerValue[1];
        return {
          questionId: parseInt(questionId),
          multipleChoiceAnswerId: parseInt(answerId),
        };
      } else if (questionType == "TrueFalse") {
        // Convert string to boolean
        var isTrueAnswer = answerValue === "true";
        return {
          questionId: parseInt(questionId),
          trueOrFalseAnswer: isTrueAnswer,
        };
      } else {
        return {
          questionId: parseInt(questionId),
          likertScaleAnswer: parseInt(answerValue),
        };
      }
    });

    let reqObject = {};
    if (role == "Αμύητος") {
      reqObject = {
        userId: session.user.userId,
        generalTestId: generalTestId,
        answers: reqAnswersObject,
      };
    } else {
      reqObject = {
        userId: session.user.userId,
        universityTestId: universityTestId,
        answers: reqAnswersObject,
      };
    }

    console.log(reqObject);
    try {
      let reqInstance = axios.create({
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });

      let url = "";
      if (role == "Αμύητος") {
        url = `${process.env.NEXT_PUBLIC_API_HOST}/api/ProspectiveStudentTests`;
      } else {
        url = `${process.env.NEXT_PUBLIC_API_HOST}/api/StudentTests`;
      }

      const config = { "content-type": "application/json" };

      const res = await reqInstance.post(url, reqObject, config);
      if (res) {
        alert("Συγχαρητήρια το τεστ σας καταχωρήθηκε επιτυγχώς!");
        router.push("/tests");
      }
    } catch (err) {
      alert(err.response?.data.title);
      router.push("/tests");
    }
  }

  // Render

  if (status === "unauthenticated") {
    return <h2 style={{ textAlign: "center" }}>Log in to view this page!</h2>;
  }

  return (
    <>
      <Container fluid className={styles["header"]}>
        <div className={styles["header-content"]}>
          <h1>Τεστ</h1>
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
              submitAnswers(values);
            }}
          >
            {({ values }) => (
              <Form>
                {questions.map((question) => {
                  return (
                    <>
                      <li>
                        <div
                          role="group"
                          aria-labelledby="question-group"
                          className="mt-3 mb-3"
                        >
                          <div className={styles["question-header"]}>
                            {question.text}
                          </div>
                          <div className={styles["answers-box"]}>
                            {question.type == "MultipleChoice" ? (
                              <>
                                {question.answers.map((answer) => {
                                  return (
                                    <>
                                      <label>
                                        <Field
                                          type="radio"
                                          name={`MultipleChoice-${question.questionId}`}
                                          value={`${question.questionId}-${answer.multipleChoiceAnswerId}`}
                                          className="me-2"
                                        />
                                        {answer.value}
                                      </label>
                                      <br />
                                    </>
                                  );
                                })}
                              </>
                            ) : null}
                            {question.type == "TrueFalse" ? (
                              <>
                                {trueFalse.map((answer) => {
                                  return (
                                    <>
                                      <label>
                                        <Field
                                          type="radio"
                                          name={`TrueFalse-${question.questionId}`}
                                          value={answer.value}
                                          className="me-2"
                                        />
                                        {answer.label}
                                      </label>
                                      <br />
                                    </>
                                  );
                                })}
                              </>
                            ) : null}
                            {question.type == "LikertScale" &&
                            role != "Αμύητος" ? (
                              <>
                                {preferenceAnswers.map((answer) => {
                                  return (
                                    <>
                                      <label>
                                        <Field
                                          type="radio"
                                          name={`LikertScale-${question.questionId}`}
                                          value={answer.value}
                                          className="me-2"
                                        />
                                        {answer.label}
                                      </label>
                                      <br />
                                    </>
                                  );
                                })}
                              </>
                            ) : (
                              <>
                                {question.answer1 != null ? (
                                  <>
                                    <label>
                                      <Field
                                        type="radio"
                                        name={`LikertScale-${question.questionId}`}
                                        value={"1"}
                                        className="me-2"
                                      />
                                      {question.answer1}
                                    </label>
                                    <br />
                                  </>
                                ) : null}

                                {question.answer2 != null ? (
                                  <>
                                    <label>
                                      <Field
                                        type="radio"
                                        name={`LikertScale-${question.questionId}`}
                                        value={"2"}
                                        className="me-2"
                                      />
                                      {question.answer2}
                                    </label>
                                    <br />
                                  </>
                                ) : null}

                                {question.answer3 != null &&
                                question.answer3 != "" ? (
                                  <>
                                    <label>
                                      <Field
                                        type="radio"
                                        name={`LikertScale-${question.questionId}`}
                                        value={"3"}
                                        className="me-2"
                                      />
                                      {question.answer3}
                                    </label>
                                    <br />
                                  </>
                                ) : null}

                                {question.answer4 != null &&
                                question.answer4 != "" ? (
                                  <>
                                    <label>
                                      <Field
                                        type="radio"
                                        name={`LikertScale-${question.questionId}`}
                                        value={"4"}
                                        className="me-2"
                                      />
                                      {question.answer4}
                                    </label>
                                    <br />
                                  </>
                                ) : null}

                                {question.answer5 != null &&
                                question.answer5 != "" ? (
                                  <>
                                    <label>
                                      <Field
                                        type="radio"
                                        name={`LikertScale-${question.questionId}`}
                                        value={"5"}
                                        className="me-2"
                                      />
                                      {question.answer5}
                                    </label>
                                    <br />
                                  </>
                                ) : null}
                              </>
                            )}
                          </div>
                        </div>
                      </li>
                    </>
                  );
                })}

                <button
                  type="submit"
                  className="admin-btn mt-3"
                  style={{ backgroundColor: "#fcb426" }}
                >
                  Submit
                </button>
                {successMsg != "" ? (
                  <div
                    className="mt-2 mb-4"
                    style={{ fontSize: "1.2em", color: "green" }}
                  >
                    {successMsg}
                  </div>
                ) : null}
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
  const generalTestId = ctx.query.generalTestId;

  let testData = "";
  try {
    let reqInstance = axios.create({
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    let url = "";
    if (generalTestId == null || generalTestId == "") {
      url = `${process.env.NEXT_PUBLIC_API_HOST}/api/StudentTests?Track=${track}&Semester=${semester}&RevisionYear=${revisionYear}`;
    } else {
      url = `${process.env.NEXT_PUBLIC_API_HOST}/api/ProspectiveStudentTests/generalTestId?generalTestId=${generalTestId}`;
    }

    const res = await reqInstance.get(url);
    testData = res.data;
  } catch (err) {
    return { err };
  } finally {
    return { props: { testData } };
  }
}
