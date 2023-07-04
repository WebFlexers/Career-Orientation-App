import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/sidebar.module.css";
import useSessionStorage from "@/hooks/useSessionStorage";
import { signOut } from "next-auth/react";

export default function SideBar(props) {
  const username = useSessionStorage("username");
  const role = useSessionStorage("role");
  const semester = useSessionStorage("semester");
  const track = useSessionStorage("track");

  const links = [
    { label: "Κεντρικός Πίνακας", path: "/dashboard", targetSegment: null },
    { label: "Διδασκαλία", path: "/lessons", targetSegment: "lessons" },
    {
      label: "Τεστ Αυτοαξιολόγησης",
      path: "/tests",
      targetSegment: "tests",
    },
    {
      label: "Συστάσεις",
      path: "/referals",
      targetSegment: "referals",
    },
    {
      label: "Πρόοδος",
      path: "/progress",
      targetSegment: "tests",
    },
  ];

  return (
    <>
      <div className={styles["sidebar"]}>
        <div id={styles["profile-box"]}>
          <Image
            src="/images/profile-icon.png"
            alt="Icon0"
            width={100}
            height={100}
          />
          <div id={styles["profile-name-cap"]}>
            <b>Welcome, {username}</b>
          </div>
          <div id={styles["profile-title-cap"]}>{role}</div>
          {semester > 0 ? (
            <div id={styles["profile-title-cap"]}>Εξάμηνο: {semester}</div>
          ) : null}
          {semester > 4 ? (
            <div id={styles["profile-title-cap"]}>Κατεύθυνση: {track}</div>
          ) : null}
        </div>
        <div id={styles["main-menu"]}>
          {" "}
          {links.map((l, i) => {
            return (
              <Link key={i} href={l.path}>
                {l.label}
              </Link>
            );
          })}
        </div>
        <div id={styles["last-menu-box"]}>
          <Link key={26} href="/kapou-magika">
            Ρυθμίσεις
          </Link>
          <Link key={25} href="/kapou-magika">
            Αποσύνδεση
          </Link>
        </div>
      </div>
    </>
  );
}
