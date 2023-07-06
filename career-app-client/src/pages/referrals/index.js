import { Container } from "react-bootstrap";
import { useState } from "react";
import AdminLayout from "@/components/admin.layout";
import { useEffect } from "react";
import { getSession, useSession } from "next-auth/react";
import axios from "axios";
import useSessionStorage from "@/hooks/useSessionStorage";
import Image from "next/image";

export default function Referrals(props) {
  const role = useSessionStorage("role");

  console.log(props.recommendations);

  function getColor(recommendationLevel) {
    if (recommendationLevel === "VeryPoorFit") return "red";
    else if (recommendationLevel === "PoorFit") return "#FF7F50";
    else if (recommendationLevel === "ModerateFit") return "#DE970B";
    else if (recommendationLevel === "GoodFit") return "#0096FF";
    else if (recommendationLevel === "ExcellentFit") return "#027148";
  }

  if (props.recommendations.length < 1) {
    return (
      <>
        <Container>
          <h3 className="mt-4">Συστάσεις</h3>
        </Container>
        <Container className="mt-3 mb-3">
          <div className="mt-4">
            Πρέπει πρώτα να έχετε ολοκληρώσει κάποια τεστς για να σας παρέχουμε
            συστάσεις!
          </div>
          <div className="mt-4" style={{ textAlign: "center" }}>
            <Image
              src="/images/thumbs-up.png"
              alt="Thumbs Up Image"
              width={350}
              height={350}
            />
          </div>
        </Container>
      </>
    );
  }

  return (
    <main>
      <Container>
        <h3 className="mt-4">Συστάσεις</h3>
      </Container>

      <Container className="mt-3 mb-3">
        {role == "Αμύητος" && (
          <>
            {props.recommendations.map((rec) => {
              return (
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
                        color: getColor(rec.recommendationLevel),
                      }}
                    >
                      {rec.percentageScore}
                    </div>
                  </div>
                  <div
                    className="mt-3"
                    style={{ fontSize: "1.2em", textAlign: "justify" }}
                  >
                    {rec.recommendationMessage}
                  </div>
                </>
              );
            })}
          </>
        )}
        {(role == "Φοιτητής" || role == "Απόφοιτος") && (
          <>
            {props.recommendations.Track && (
              <>
                <Container>
                  <h4 className="mt-4">Κατευθύνσεις</h4>
                </Container>
                <Container className="ms-3">
                  {props.recommendations.Track.map((track) => {
                    return (
                      <>
                        <div>
                          {track.name}:&nbsp;(
                          <div
                            style={{
                              display: "inline",
                              color: getColor(track.recommendationLevel),
                            }}
                          >
                            {track.percentageScore}%
                          </div>
                          )
                        </div>
                      </>
                    );
                  })}
                </Container>
              </>
            )}
            {props.recommendations.Profession && (
              <>
                <Container>
                  <h4 className="mt-4">Ειδικότητες</h4>
                </Container>
                <Container className="ms-3">
                  {props.recommendations.Profession.map((profession) => {
                    return (
                      <>
                        <div>
                          {profession.name}:&nbsp;(
                          <div
                            style={{
                              display: "inline",
                              color: getColor(profession.recommendationLevel),
                            }}
                          >
                            {profession.percentageScore}%
                          </div>
                          )
                        </div>
                      </>
                    );
                  })}
                </Container>
              </>
            )}
            {props.recommendations.MastersDegree && (
              <>
                <Container>
                  <h4 className="mt-4">Μεταπτυχιακά</h4>
                </Container>
                <Container className="ms-3">
                  {props.recommendations.MastersDegree.map((degree) => {
                    return (
                      <>
                        <div>
                          {degree.name}:&nbsp;(
                          <div
                            style={{
                              display: "inline",
                              color: getColor(degree.recommendationLevel),
                            }}
                          >
                            {degree.percentageScore}%
                          </div>
                          )
                        </div>
                      </>
                    );
                  })}
                </Container>
              </>
            )}
          </>
        )}
      </Container>
      <Container className="mt-4" style={{ textAlign: "center" }}>
        <Image
          src="/images/thumbs-up.png"
          alt="Thumbs Up Image"
          width={350}
          height={350}
        />
      </Container>
    </main>
  );
}

Referrals.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);

  if (!session) return null;

  let recommendations = [];
  let reqInstance = {};
  try {
    reqInstance = axios.create({
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    const url = `${process.env.NEXT_PUBLIC_API_HOST}/api/Recommendations/Student`;
    const res = await reqInstance.get(url);
    if (res) {
      recommendations = res.data.recommendations;
    }
  } catch (err) {
    console.log("FROM ONE");
    console.log(err);
  }

  if (recommendations.length === 0) {
    try {
      const url2 = `${process.env.NEXT_PUBLIC_API_HOST}/api/Recommendations/ProspectiveStudent`;
      const res2 = await reqInstance.get(url2);
      if (res2) {
        recommendations = res2.data;
      }
    } catch (err) {
      console.log("FROM TWO");
      console.log(err);
    }
  }

  return { props: { recommendations } };
}
