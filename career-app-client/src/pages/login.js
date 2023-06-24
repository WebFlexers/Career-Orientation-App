import styles from "@/styles/login.module.css";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import Link from "next/link";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const onFinish = (values) => {
  console.log("Success:");
};

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Υποχρεωτικό πεδίο";
  } else if (values.email.length > 255) {
    errors.email = "Υπέρβαση ορίου χαρακτήρων. Μέγιστο: 255 χαρακτήρες";
  }

  if (!values.password) {
    errors.password = "Υποχρεωτικό πεδίο";
  }

  return errors;
};
export default function Login() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validateOnChange: false,
    validateOnBlur: false,
    validate,
    onSubmit: async (values) => {
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
        callbackUrl: "/",
      }).then(({ ok, error }) => {
        if (ok) {
          router.push("/");
        } else {
          alert("Λανθασμένο όνομα χρήστη ή κωδικός πρόσβασης");
        }
      });
    },
  });

  if (status === "authenticated") {
    return <h2 style={{ textAlign: "center" }}>Already logged in!</h2>;
  }

  return (
    <>
      <Image
        src="/images/SSG-Banner-ECG_what.png"
        width={400}
        height={400}
        className={styles["login-img-background"]}
      />
      <div id={styles["form-box"]} style={{ height: "62%" }}>
        <h4 className="mt-3" style={{ textAlign: "center" }}>
          Σύνδεση
        </h4>
        <div className="pt-3 pb-3">
          Πρώτη φορά στο FlexCareer?{" "}
          <Link
            href="/register"
            style={{ textDecoration: "none", color: "#c78500" }}
          >
            Κάνε Εγγραφη!
          </Link>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <input
            id="email"
            name="email"
            type="text"
            placeholder="Email"
            className={styles["input"]}
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.errors.email ? (
            <div className={styles["error-msg"]}>{formik.errors.email}</div>
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
          <div className="mt-1 mb-3" id={styles["forgot-pass-link"]}>
            <Link
              href="/forgot"
              style={{ textDecoration: "none", color: "#c78500" }}
            >
              Ξέχασες τον κωδικό σου?
            </Link>
          </div>
          <button className="mt-2 mb-2" id={styles["login-btn"]} type="submit">
            ΣΥΝΔΕΣΗ
          </button>
        </form>
        <br />
      </div>
    </>
  );
}
