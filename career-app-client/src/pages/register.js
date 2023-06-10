import styles from "@/styles/login.module.css";
import { useRouter } from "next/router";
import { Field, useFormik, FormikProvider } from "formik";
import Link from "next/link";
import Image from "next/image";

const onFinish = (values) => {
  console.log("Success:");
};

const validate = (values) => {
  const errors = {};
  if (!values.username) {
    errors.username = "Υποχρεωτικό πεδίο";
  } else if (values.username.length > 15) {
    errors.username = "Must be 15 characters or less";
  }

  if (!values.password) {
    errors.password = "Υποχρεωτικό πεδίο";
  } else if (values.password.length > 15) {
    errors.password = "Πρέπει να αποτελείτε το πολύ από 15 σύμβολα";
  }

  if (!values.passwordRepeat) {
    errors.passwordRepeat = "Υποχρεωτικό πεδίο";
  } else if (values.passwordRepeat != values.password) {
    errors.passwordRepeat = "Οι κωδικοί δεν είναι ίδιοι";
  }

  if (!values.email) {
    errors.email = "Υποχρεωτικό πεδίο";
  } else if (values.email.length > 200) {
    errors.email = "Πρέπει να αποτελείτε το πολύ από 200 σύμβολα";
  }

  if (values.role == "") {
    errors.role = "Επιλέξτε ιδιότητα";
  }

  if (values.semester < 1) {
    errors.semester = "Επιλέξτε εξάμηνο";
  }

  if (values.direction == "") {
    errors.direction = "Επιλέξτε κατεύθυνση";
  }

  return errors;
};
export default function Register() {
  const router = useRouter();
  const semesters = [1, 2, 3, 4, 5, 6, 7, 8];

  // Form's main function
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      passwordRepeat: "",
      email: "",
      role: "",
      semester: 0,
      direction: "",
    },
    validateOnChange: false,
    validateOnBlur: false,
    validate,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

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
              <option value="gradute">Απόφοιτος</option>
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

            {formik.values.semester > 4 && formik.values.role == "student" ? (
              <>
                <Field
                  as="select"
                  name="direction"
                  className={styles["input"]}
                  style={{ backgroundColor: "transparent" }}
                >
                  <option value="">Επιλέξτε Κατεύθυνση:</option>
                  <option value="TSIS">
                    Τεχνολογία Λογισμικού και Ευφυή Συστήματα (ΤΛΕΣ)
                  </option>
                  <option value="NCS">
                    Διαδικτυακά και Υπολογιστικά Συστήματα (ΔΥΣ)
                  </option>
                  <option value="IS">
                    Πληροφοριακά Συστήματα και Υπηρεσίες (ΠΣΥ)
                  </option>
                </Field>
                {formik.errors.direction ? (
                  <div className={styles["error-msg"]}>
                    {formik.errors.direction}
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
