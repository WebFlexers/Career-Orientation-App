import styles from "@/styles/dashboard.module.css";

export const metadata = {
  title: "Dashboard",
};

export default function Dashboard() {
  return (
    <main>
      <h1 className={styles["header"]}>HELLO WORLD FROM DASHBOARD!</h1>
    </main>
  );
}
