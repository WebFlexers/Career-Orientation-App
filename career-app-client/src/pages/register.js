import styles from "@/styles/login.module.css";
import { useRouter } from "next/router";
import { useFormik } from "formik";
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
  } else if (values.email.length > 15) {
    errors.email = "Πρέπει να αποτελείτε το πολύ από 15 σύμβολα";
  }

  return errors;
};
export default function Register() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      passwordRepeat: "",
      email: "",
      semester: "",
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
      <Image
        src="/images/SSG-Banner-ECG_what.png"
        width={400}
        height={400}
        className={styles["login-img-background"]}
      />
      <div id={styles["form-box"]}>
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
            <div className={styles["error-msg"]}>{formik.errors.username}</div>
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
            <div className={styles["error-msg"]}>{formik.errors.password}</div>
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
          <select
            className={styles["input"]}
            style={{ backgroundColor: "transparent" }}
          >
            <option value="0">Επέλεξε Ιδιότητα</option>
            <option value="1">Αμύητος</option>
            <option value="2">Φοιτητής</option>
            <option value="3">Απόφοιτος</option>
          </select>
          <button className="mt-2 mb-2" id={styles["login-btn"]} type="submit">
            ΕΓΓΡΑΦΗ
          </button>
        </form>
        <br />
      </div>
    </>
  );
}
