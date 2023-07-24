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
        <div className="mt-3">
          Στον κεντρικό πίνακα, εφόσον είστε είτε απόφοιτος είτε φοιτητής,
          μπορείτε να δείτε την αναλυτική βαθμολογία σας.
        </div>
        <h4 className="mt-4">Διδασκαλία</h4>
        <div className="mt-3">
          Στην ενότητα Διδασκαλία μπορείτε να δείτε τα εξάμηνα και να διαβάσετε
          πληροφορίες τα αντίστοιχα μαθήματα.
        </div>
        <h4 className="mt-4">Τεστ Αυτοαξιολόγησης</h4>
        <div className="mt-3">
          Ανάλογα την ιδιότητα σας, Αμύητος, Φοιτητής ή Απόφοιτος αλλά και το
          εξάμηνο που βρίσκεστε, μπορείτε να κάνετε για τα αντίστοιχα τεστς.
        </div>
        <h4 className="mt-4">Συστάσεις</h4>
        <div className="mt-3">
          Αφού ολοκληρώσετε τα όλα τα διαθέσιμα για εσας τεστς, το σύστημα θα
          σας δώσει προτάσεις για επάγγελμα, κατεύθυνση και μεταπτυχιακά.
        </div>
        <h4 className="mt-4">Πρόοδος</h4>
        <div className="mt-3">
          Στην ενότητα της Προόδου μπορείτε να δείτε τα εξάμηνα και πόσο έχετε
          επισκεφτεί το καθένα και την κατάσταση των τεστς.
        </div>
      </Container>
    </>
  );
}

Help.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
