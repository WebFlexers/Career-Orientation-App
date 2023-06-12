import HomeLayout from "@/components/home.layout";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import { useSession } from "next-auth/react";

export default function About() {
  const { data: session } = useSession();
  console.log(session);
  return (
    <>
      <h1 className="mt-3" style={{ textAlign: "center" }}>
        ABOUT US
      </h1>
    </>
  );
}

About.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>;
};
