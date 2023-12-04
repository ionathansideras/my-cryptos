// Desc: Helper function to return error messages based on Firebase error codes
export function validation(error) {
  // Switch statement to return error messages based on Firebase error codes
  switch (error.code) {
    case "auth/invalid-email":
      return "Invalid email address format.";
    case "auth/missing-password":
      return "Password field is empty.";
    case "auth/weak-password":
      return "Password should be at least 6 characters.";
    case "auth/email-already-in-use":
      return "Email already in use.";
    case "auth/email-not-verified":
      return "Email not verified.";
    case "auth/wrong-password":
      return "Wrong password.";
    case "auth/invalid-login-credentials":
      return "User not found.";
    case "auth/too-many-requests":
      return "Too many requests. Try again later.";
    case "auth/passwords-don't-match":
      return "Passwords don't match.";
    default:
      return "An error occurred.";
  }
}
