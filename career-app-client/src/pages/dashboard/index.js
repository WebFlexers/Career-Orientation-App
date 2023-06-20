import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/dashboard.module.css";
import AdminLayout from "@/components/admin.layout";
import { useSession, getSession } from "next-auth/react";

export default function Dashboard(props) {
  const { data: session, status } = useSession();

  if (status === "unauthenticated") {
    return null;
  }

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
