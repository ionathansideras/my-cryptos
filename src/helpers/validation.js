// Desc: Helper function to return user-friendly error messages based on Firebase error codes
export function validation(error) {
  // Switch statement to return user-friendly error messages based on Firebase error codes
  switch (error.code) {
    case "auth/claims-too-large":
      return "Oops! Something went wrong. Please try again.";
    case "auth/invalid-email":
      return "Invalid email address. Please check your email and try again.";
    case "auth/id-token-expired":
      return "Your login session has expired. Please log in again.";
    case "auth/id-token-revoked":
      return "Sorry, your login has been revoked. Please log in again.";
    case "auth/insufficient-permission":
      return "Sorry, you don't have permission for this. Please contact support.";
    case "auth/internal-error":
      return "Oops! Something unexpected happened. Please try again later.";
    case "auth/invalid-argument":
      return "Invalid input. Please check your information and try again.";
    case "auth/invalid-claims":
      return "Oops! Something went wrong. Please try again.";
    case "auth/invalid-continue-uri":
      return "Invalid link. Please use a valid link to continue.";
    case "auth/invalid-credential":
      return "Invalid user credentials. Please try again.";
    case "auth/invalid-disabled-field":
      return "Account status is invalid. Please contact support.";
    case "auth/invalid-display-name":
      return "Invalid display name. Please provide a valid name.";
    case "auth/missing-password":
      return "Please provide a password.";
    case "auth/passwords-don't-match":
      return "Passwords don't match. Please try again.";
    case "auth/weak-password":
      return "Password is too weak. It must be more than 6 characters.";
    case "auth/email-already-in-use":
      return "Email address already in use. Please try again.";
    // Add more cases as needed for other error codes
    default:
      return "Oops! Something went wrong. Please try again.";
  }
}
