import { Container } from "react-bootstrap";
import { useState } from "react";
import AdminLayout from "@/components/admin.layout";
import { useEffect } from "react";
import { getSession, useSession } from "next-auth/react";
import axios from "axios";
import useSessionStorage from "@/hooks/useSessionStorage";
import Image from "next/image";

export default function Referals(props) {
  const role = useSessionStorage("role");
  const [recommendation, setRecommendation] = useState([]);

  useEffect(() => {
    getRecommendation();
  }, []);

  async function getRecommendation() {
    let tempRecommendation = "";
    try {
      let reqInstance = axios.create({
        headers: {
          Authorization: `Bearer ${props.sessionToken}`,
        },
      });

      let url = "";
      if (role == "Αμύητος") {
        url = `https://localhost:7155/api/Recommendations/ProspectiveStudent`;
      } else {
        url = ``;
      }

      const res = await reqInstance.get(url);
      tempRecommendation = res.data;
      console.log(tempRecommendation);
    } catch (err) {
    } finally {
      setRecommendation(tempRecommendation[0]);
    }
  }

  function getColor(score) {
    if (score <= 25) return "red";
    else if (score <= 40) return "#FF7F50";
    else if (score <= 60) return "#DE970B";
    else if (score <= 80) return "#0096FF";
    else if (score <= 100) return "#50C878";
  }

  return (
    <main>
      <Container>
        <h3 className="mt-4">Συστάσεις</h3>
      </Container>
      <Container className="mt-3 mb-3">
        {role == "Αμύητος" && (
          <>
            <div
              className="mt-3"
              style={{ fontSize: "1.2em", display: "inline" }}
            >
              <b>Score (%): </b>
              <div
                style={{
                  fontSize: "1.2em",
                  display: "inline",
                  color: getColor(recommendation.percentageScore),
                }}
              >
                {recommendation.percentageScore}
              </div>
            </div>
            <div
              className="mt-3"
              style={{ fontSize: "1.2em", textAlign: "justify" }}
            >
              {recommendation.recommendationMessage}
            </div>
          </>
        )}
      </Container>
      <Container className="mt-4" style={{ textAlign: "center" }}>
        {recommendation.percentageScore < 60 ? (
          <Image
            src="/images/thumbs-down.png"
            alt="Thumbs Up Image"
            width={350}
            height={350}
          />
        ) : (
          <Image
            src="/images/thumbs-up.png"
            alt="Thumbs Up Image"
            width={350}
            height={350}
          />
        )}
      </Container>
    </main>
  );
}

Referals.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);

  if (!session) return null;

  const sessionToken = session.accessToken;

  return { props: { sessionToken } };
}
