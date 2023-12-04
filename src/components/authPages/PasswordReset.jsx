import { useState } from "react";
import { resetPassword } from "../../helpers/sendPasswordResetEmail";

export default function PasswordReset() {
  // State variable for email
  const [email, setEmail] = useState("");
  // Function for handling password reset
  async function handleResetPassword() {
    // Call the resetPassword function from the sendPasswordResetEmail.js file
    resetPassword(email);
  }

  return (
    <div>
      <h1>Reset Password</h1>
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button onClick={handleResetPassword}>Reset Password</button>
    </div>
  );
}
