import styles from "@/styles/login.module.css";
import { useRouter } from "next/router";
import { Field, useFormik, FormikProvider } from "formik";
import Link from "next/link";
import Image from "next/image";
import { useSession, signIn } from "next-auth/react";
import axios from "axios";

const onFinish = (values) => {
  console.log("Success:");
};

const validate = (values) => {
  const errors = {};
  if (!values.username) {
    errors.username = "Υποχρεωτικό πεδίο";
  } else if (values.username.length > 30) {
    errors.username = "Υπέρβαση ορίου χαρακτήρων. Μέγιστο: 30 χαρακτήρες";
  } else if (values.username.length < 6) {
    errors.username =
      "Ελάχιστοι απαιτούμενοι χαρακτήρες: 6. Παρακαλώ προσθέστε περισσότερους";
  }

  if (!values.password) {
    errors.password = "Υποχρεωτικό πεδίο";
  } else if (values.password.length < 6) {
    errors.password =
      "Ελάχιστοι απαιτούμενοι χαρακτήρες: 6. Παρακαλώ προσθέστε περισσότερους";
  } else if (!/[A-Z]/.test(values.password)) {
    errors.password = "Πρέπει να έχει τουλάχιστον ένα κεφαλαίο γράμμα";
  } else if (!/[a-z]/.test(values.password)) {
    errors.password = "Πρέπει να έχει τουλάχιστον ένα μικρό γράμμα";
  } else if (!/[0-9]/.test(values.password)) {
    errors.password = "Πρέπει να έχει τουλάχιστον έναν αριθμό";
  }

  if (!values.passwordRepeat) {
    errors.passwordRepeat = "Υποχρεωτικό πεδίο";
  } else if (values.passwordRepeat != values.password) {
    errors.passwordRepeat =
      "Ο κωδικός και η επαλήθευση κωδικού πρέπει να ταυτίζονται";
  }

  if (!values.email) {
    errors.email = "Υποχρεωτικό πεδίο";
  } else if (values.email.length > 255) {
    errors.email = "Υπέρβαση ορίου χαρακτήρων. Μέγιστο: 255 χαρακτήρες";
  }

  if (values.role == "") {
    errors.role = "Επιλέξτε ιδιότητα";
  }

  if (values.semester < 1 && values.role == "student") {
    errors.semester = "Επιλέξτε εξάμηνο";
  }

  if (
    values.track == "" &&
    values.semester > 4 &&
    (values.role == "student" || values.role == "graduate")
  ) {
    errors.track = "Επιλέξτε κατεύθυνση";
  }

  return errors;
};
export default function Register() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const semesters = [1, 2, 3, 4, 5, 6, 7, 8];

  if (status === "authenticated") {
    return <h2 style={{ textAlign: "center" }}>Already logged in!</h2>;
  }

  // Form's main function
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      passwordRepeat: "",
      email: "",
      role: "",
      semester: 0,
      track: "",
    },
    validateOnChange: false,
    validateOnBlur: false,
    validate,
    onSubmit: (values) => {
      registerUser(values);
    },
  });

  async function registerUser(values) {
    try {
      const url = "https://localhost:7155/api/Users/Register";

      let data = {};
      const semesterInt = parseInt(values.semester);
      if (values.role == "interested") {
        data = {
          username: values.username,
          password: values.password,
          confirmPassword: values.passwordRepeat,
          email: values.email,
          isProspectiveStudent: true,
          isGraduate: false,
          semester: null,
          track: null,
        };
      } else if (values.role == "graduate") {
        data = {
          username: values.username,
          password: values.password,
          confirmPassword: values.passwordRepeat,
          email: values.email,
          isProspectiveStudent: false,
          isGraduate: true,
          semester: null,
          track: values.track,
        };
      } else if (values.role == "student") {
        if (semesterInt > 4) {
          data = {
            username: values.username,
            password: values.password,
            confirmPassword: values.passwordRepeat,
            email: values.email,
            isProspectiveStudent: false,
            isGraduate: false,
            semester: semesterInt,
            track: values.track,
          };
        } else {
          console.log("Yes I am here");
          data = {
            username: values.username,
            password: values.password,
            confirmPassword: values.passwordRepeat,
            email: values.email,
            isProspectiveStudent: false,
            isGraduate: false,
            semester: semesterInt,
            track: null,
          };
        }
      }

      console.log(data);

      const config = { "content-type": "application/json" };

      const res = await axios.post(url, data, config);

      if (res.status == 201) {
        alert("Συγχαρητήρια, ο λογαριασμός σας δημιουργήθηκε επιτυχώς!");
        router.push("/login");
      }
    } catch (err) {
      alert("An error occured");
      console.log(err.response);
    }
  }

  return (
    <>
      <FormikProvider value={formik}>
        <Image
          src="/images/SSG-Banner-ECG_what.png"
          width={400}
          height={400}
          className={styles["login-img-background"]}
        />
        <div id={styles["form-box"]} style={{ height: "85%" }}>
          <h4 className="mt-3" style={{ textAlign: "center" }}>
            Εγγραφή
          </h4>
          <div className="pt-3 pb-3">
            Έχεις ήδη λογαριασμό?{" "}
            <Link
              href="/login"
              style={{ textDecoration: "none", color: "#c78500" }}
            >
              Σύνδεση.
            </Link>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Όνομα χρήστη"
              className={styles["input"]}
              onChange={formik.handleChange}
              value={formik.values.username}
            />
            {formik.errors.username ? (
              <div className={styles["error-msg"]}>
                {formik.errors.username}
              </div>
            ) : null}
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Κωδικός"
              className={styles["input"]}
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.errors.password ? (
              <div className={styles["error-msg"]}>
                {formik.errors.password}
              </div>
            ) : null}
            <input
              id="passwordRepeat"
              name="passwordRepeat"
              type="password"
              placeholder="Επανάληψη Κωδικού"
              className={styles["input"]}
              onChange={formik.handleChange}
              value={formik.values.passwordRepeat}
            />
            {formik.errors.passwordRepeat ? (
              <div className={styles["error-msg"]}>
                {formik.errors.passwordRepeat}
              </div>
            ) : null}
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              className={styles["input"]}
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.errors.email ? (
              <div className={styles["error-msg"]}>{formik.errors.email}</div>
            ) : null}
            <Field
              as="select"
              name="role"
              className={styles["input"]}
              style={{ backgroundColor: "transparent" }}
            >
              <option value="">Επιλέξτε Ιδιότητα:</option>
              <option value="interested">Αμύητος</option>
              <option value="student">Φοιτητής</option>
              <option value="graduate">Απόφοιτος</option>
            </Field>

            {formik.errors.role ? (
              <div className={styles["error-msg"]}>{formik.errors.role}</div>
            ) : null}
            {formik.values.role == "student" ? (
              <>
                <Field
                  as="select"
                  name="semester"
                  className={styles["input"]}
                  style={{ backgroundColor: "transparent" }}
                >
                  <option value="">Επιλέξτε Εξάμηνο:</option>
                  {semesters.map((semester) => {
                    return <option value={semester}>{semester}</option>;
                  })}
                </Field>
                {formik.errors.semester ? (
                  <div className={styles["error-msg"]}>
                    {formik.errors.semester}
                  </div>
                ) : null}
              </>
            ) : null}

            {(formik.values.semester > 4 && formik.values.role == "student") ||
            formik.values.role == "graduate" ? (
              <>
                <Field
                  as="select"
                  name="track"
                  className={styles["input"]}
                  style={{ backgroundColor: "transparent" }}
                >
                  <option value="">Επιλέξτε Κατεύθυνση:</option>
                  <option value="ΤΛΕΣ">
                    Τεχνολογία Λογισμικού και Ευφυή Συστήματα (ΤΛΕΣ)
                  </option>
                  <option value="ΔΥΣ">
                    Διαδικτυακά και Υπολογιστικά Συστήματα (ΔΥΣ)
                  </option>
                  <option value="ΠΣΥ">
                    Πληροφοριακά Συστήματα και Υπηρεσίες (ΠΣΥ)
                  </option>
                </Field>
                {formik.errors.track ? (
                  <div className={styles["error-msg"]}>
                    {formik.errors.track}
                  </div>
                ) : null}
              </>
            ) : null}
            <button
              className="mt-2 mb-2"
              id={styles["login-btn"]}
              type="submit"
            >
              ΕΓΓΡΑΦΗ
            </button>
          </form>
          <br />
        </div>
      </FormikProvider>
    </>
  );
}
