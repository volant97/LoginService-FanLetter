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
    return toast.info(message, inner);
  }
  if (type === "success") {
    return toast.success(message, inner);
  }
  if (type === "warning") {
    return toast.warning(message, inner);
  }
  if (type === "error") {
    return toast.error(message, inner);
  } else {
    return toast(message, inner);
  }
};

export default notify;
