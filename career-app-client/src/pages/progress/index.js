import { Container } from "react-bootstrap";
import { useState } from "react";
import { useRouter } from "next/router";
import AdminLayout from "@/components/admin.layout";
import styles from "@/styles/progress.module.css";
import Chart from "chart.js/auto";
import { useRef, useEffect } from "react";
import { getSession } from "next-auth/react";
import axios from "axios";

export default function Progress({ semestersData }) {
  const canvas = useRef();

  useEffect(() => {
    let ctx = canvas.current;

    let tempAccessCountArray = [];
    let tempSemestersArray = [];
    let tempStr = "";
    semestersData.map(function (semester) {
      tempAccessCountArray.push(parseInt(semester.accessCount));
      tempStr = "Εξάμηνο " + semester.semester;
      tempSemestersArray.push(tempStr);
    });
    let accessCount = tempAccessCountArray;
    let semesterLabels = tempSemestersArray.sort();

    let chartStatus = Chart.getChart("myChart");
    if (chartStatus != undefined) {
      chartStatus.destroy();
    }

    const chart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: semesterLabels,
        datasets: [
          {
            data: accessCount,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(53, 184, 255, 0.2)",
              "rgba(255, 186, 53, 0.2)",
              "rgba(119, 255, 53, 0.2)",
              "rgba(255, 53, 219, 0.2)",
              "rgba(53, 255, 199, 0.2)",
              "rgba(206, 53, 255, 0.2)",
              "rgba(102, 255, 53, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(53, 184, 255, 1)",
              "rgba(255, 186, 53, 1)",
              "rgba(119, 255, 53, 1)",
              "rgba(255, 53, 219, 1)",
              "rgba(53, 255, 199, 1)",
              "rgba(206, 53, 255, 1)",
              "rgba(102, 255, 53, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Κατανομή επισκέψεων φοιτητή σε εξάμηνα",
          },
        },
      },
    });
  }, []);

  return (
    <main>
      <Container>
        <h3 className="mt-4">Επισκεψημότητα</h3>
      </Container>
      <Container className="mt-3 mb-3">
        <div id={styles["pie-box"]}>
          <canvas ref={canvas}></canvas>
        </div>
      </Container>
    </main>
  );
}

Progress.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);

  if (!session) return null;

  let semestersData = "";
  try {
    let reqInstance = axios.create({
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    const url = `https://localhost:7155/api/Statistics/TeachingAccessStatistics`;

    const res = await reqInstance.get(url);
    semestersData = res.data;
    console.log(semestersData);
  } catch (err) {
    console.log(err);
  } finally {
    return { props: { semestersData } };
  }
}
