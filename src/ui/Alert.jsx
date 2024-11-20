import { Transition } from "@headlessui/react";
import { Stack, Alert as MuiAlert } from "@mui/material";

function Alert({ showAlert, text }) {
  return (
    <div>
      <Transition
        show={showAlert}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0 scale-90"
        enterTo="opacity-100 scale-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-90"
      >
        <Stack
          sx={{ width: "100%" }}
          spacing={2}
          className="shadow-lg shadow-teal-400"
        >
          <MuiAlert severity="success"> {text} success </MuiAlert>
          {/* <MuiAlert severity="info">This is an info alert.</MuiAlert>
          <MuiAlert severity="warning">This is a warning alert.</MuiAlert>
          <MuiAlert severity="error">This is an error alert.</MuiAlert> */}
        </Stack>
      </Transition>
    </div>
  );
}

export default Alert;
