import { UserForm } from "../../components/UseForms";
import "./styles.css";

export default function RegisterUsers() {
  const onSubmit = (values) => console.log(values);

  return (
    <div className="register-admin-container">
      <div className="register-admin-content">
        <UserForm onSubmit={onSubmit} isAdmin />
      </div>
    </div>
  );
}
  