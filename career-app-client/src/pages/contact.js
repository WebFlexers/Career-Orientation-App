import HomeLayout from "@/components/home.layout";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import { useSession } from "next-auth/react";

export default function Contact() {
  return (
    <>
      <h1 className="mt-3" style={{ textAlign: "center" }}>
        CONTACT
      </h1>
    </>
  );
}

Contact.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>;
};
