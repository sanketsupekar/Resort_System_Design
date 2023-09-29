import { toast } from "react-toastify";

// Otp Invalid
// Email Verified
const config = {
  position: "bottom-right",
  autoClose: 1000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
}

export function displayError(message) {
  toast.error(message, config);
}
export function displaySuccess(message) {
  toast.success(message,config);
}