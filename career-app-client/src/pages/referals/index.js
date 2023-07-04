import { Container } from "react-bootstrap";
import { useState } from "react";
import { useRouter } from "next/router";
import AdminLayout from "@/components/admin.layout";
import styles from "@/styles/progress.module.css";
import Chart from "chart.js/auto";
import { useRef, useEffect } from "react";
import { getSession } from "next-auth/react";
import axios from "axios";

export default function Referals({ semestersData }) {
  return (
    <main>
      <Container>
        <h3 className="mt-4">Συστάσεις</h3>
      </Container>
      <Container className="mt-3 mb-3"></Container>
    </main>
  );
}

Referals.getLayout = function getLayout(page) {
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
