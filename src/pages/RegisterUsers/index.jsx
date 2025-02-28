import { UserForm } from "../../components/UserForm";
import "./styles.css";

export function RegisterUsers() {
  const onSubmit = (values) => console.log(values);

  return (
    <div className="register-admin-container">
      <div className="register-admin-content">
        <UserForm onSubmit={onSubmit} isAdmin />
      </div>
    </div>
  );
}
  