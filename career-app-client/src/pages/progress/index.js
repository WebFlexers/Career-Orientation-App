import lessonStyles from "@/styles/lessons.module.css";
import testsStyles from "@/styles/tests.module.css";
import { Container } from "react-bootstrap";
import { useState } from "react";
import { useRouter } from "next/router";
import AdminLayout from "@/components/admin.layout";
import Link from "next/link";

export default function Progress({ semestersData }) {
  return (
    <main>
      <h2>HELLO FROM PROGRESS</h2>
    </main>
  );
}

Progress.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
