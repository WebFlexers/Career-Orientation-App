import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/dashboard.module.css";
import AdminLayout from "@/components/admin.layout";
import { useSession, getSession } from "next-auth/react";
import axios from "axios";
import { useEffect } from "react";

export default function Dashboard(props) {
  // Store username and students role in sessionStorage
  useEffect(() => {
    if (window) {
      let role = "";
      let semester = 0;
      if (props.data.isProspectiveStudent == true) {
        role = "Αμύητος";
      } else if (props.data.isGraduate == true) {
        role = "Απόφοιτος";
      } else {
        role = "Φοιτητής";
        semester = props.data.semester;
      }

      sessionStorage.setItem("username", props.data.username);
      sessionStorage.setItem("role", role);
      sessionStorage.setItem("semester", semester);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <h1 className={styles["header"]}>HELLO WORLD FROM DASHBOARD!</h1>
      </main>
    </>
  );
}

Dashboard.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);

  if (!session) return null;

  let data = "";
  try {
    let reqInstance = axios.create({
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    const url = `https://localhost:7155/api/Users/${session.user.userId}`;

    const res = await reqInstance.get(url);
    data = res.data;
  } catch (err) {
    return { err };
  } finally {
    return { props: { data } };
  }
}
