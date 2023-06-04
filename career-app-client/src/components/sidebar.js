"use client";
import Nav from "react-bootstrap/Nav";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/sidebar.module.css";
import { useSelectedLayoutSegment } from "next/navigation";

const SideBar = () => {
  const activeSegment = useSelectedLayoutSegment();

  const links = [
    { label: "Κεντρικός Πίνακας", path: "/dashboard", targetSegment: null },
    { label: "Διδασκαλία", path: "/lessons", targetSegment: "lessons" },
    {
      label: "Τεστ Αυτοαξιολόγησης",
      path: "/tests",
      targetSegment: "tests",
    },
    {
      label: "Πρόοδος",
      path: "/tests",
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
            <b>ELEFTHERIOS KONTOURIS</b>
          </div>
          <div id={styles["profile-title-cap"]}>Φοιτητής</div>
        </div>
        <div id={styles["main-menu"]}>
          {" "}
          {links.map((l, i) => {
            return (
              <Link
                key={i}
                href={l.path}
                style={{
                  textDecoration:
                    activeSegment === l.targetSegment ? "underline" : "none",
                }}
              >
                {l.label}
              </Link>
            );
          })}
        </div>
        <div id={styles["last-menu-box"]}>
          <Link key={1} href="/kapou-magika">
            Ρυθμίσεις
          </Link>
          <Link key={1} href="/kapou-magika">
            Έξοδος
          </Link>
        </div>
      </div>
    </>
  );
};

export default SideBar;
