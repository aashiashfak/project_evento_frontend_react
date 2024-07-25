// utilities/toastUtils.js
import {toast} from "react-toastify";
import "../../css/custom_toast.css";

export const showToast = (message, type = "success") => {
  const options = {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    theme: "colored",
    style: {
      backgroundColor: type === "success" ? "#47B649" : "#EA4C46",
      color: "white",
    },
  };

  if (type === "success") {
    toast.success(message, options);
  } else {
    toast.error(message, options);
  }
};
