import styles from "@/styles/home.module.css";
import Head from "next/head";
import Image from "next/image";
import HomeLayout from "@/components/home.layout";
import { useState } from "react";
import { Button } from "antd";
import { Container } from "react-bootstrap";

export default function Home() {
  const [size, setSize] = useState("large");
  return (
    <>
      <Head>
        <title>Home Page</title>
        <meta name="home" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <div id={styles["home-header"]}>
          <div className={`${styles["header"]} mt-5`}>
            Επαγγελματικός προσανατολισμός για το τμήμα Πληροφορικής του
            Πανεπιστημίου Πειραιώς
          </div>

          <Button
            className="mt-3"
            id={styles["button"]}
            size={size}
            href="/about"
          >
            Περισσότερα
          </Button>
        </div>

        <Container fluid id={`${styles["home-img-box"]}`}>
          <Image
            src="/images/people-img.png"
            alt="people-homepage"
            width={700}
            height={400}
            id={styles["img"]}
          />
        </Container>

        <Container fluid id={`${styles["quote-bar"]}`}>
          <p id={styles["quote-text"]}>
            “It doesn’t matter how slowly you go as long as you do not stop.”{" "}
          </p>
        </Container>
        <br />
        <div style={{ textAlign: "center" }}>Created by WEBFLEXERS</div>
      </main>
    </>
  );
}

Home.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>;
};
