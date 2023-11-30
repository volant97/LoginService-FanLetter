import { toast } from "react-toastify";

// type
// info, success, warning, error, default

const notify = (message, type) => {
  const inner = {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  };

  if (type === "info") {
    toast.info(message, inner);
  }
  if (type === "success") {
    toast.success(message, inner);
  }
  if (type === "warning") {
    toast.warning(message, inner);
  }
  if (type === "error") {
    toast.error(message, inner);
  } else {
    toast(message, inner);
  }
};

export default notify;
