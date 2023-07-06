import AdminLayout from "@/components/admin.layout";

export default function Help(props) {
  return (
    <>
      <h1>HELLO FROM HELP</h1>
    </>
  );
}

Help.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
