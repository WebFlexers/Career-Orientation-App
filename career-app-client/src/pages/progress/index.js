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

    let tempArray = [];
    semestersData.map(function (semester) {
      tempArray.push(parseInt(semester.accessCount));
    });
    let accessCounts = tempArray;

    let chartStatus = Chart.getChart("myChart");
    if (chartStatus != undefined) {
      chartStatus.destroy();
    }

    const chart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Έτος 1", "Έτος 2", "Έτος 3", "Έτος 4"],
        datasets: [
          {
            label: "Dataset 1",
            data: accessCounts,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
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
  } catch (err) {
    console.log(err);
  } finally {
    return { props: { semestersData } };
  }
}
