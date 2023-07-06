import AdminLayout from "@/components/admin.layout";
import { Container } from "react-bootstrap";

export default function Help(props) {
  return (
    <>
      <Container>
        <h3 className="mt-4">On-line Help</h3>
      </Container>
      <Container>
        <h4 className="mt-4">Κεντρικός Πίνακας</h4>
        <div className="mt-3">Για να δεί</div>
      </Container>
    </>
  );
}

Help.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
