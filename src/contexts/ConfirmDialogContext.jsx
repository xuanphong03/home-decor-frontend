import AlertDialog from "@/components/Dialog/AlertDialog";
import { createContext, useRef, useState } from "react";

export const ConfirmDialog = createContext();

export function ConfirmDialogProvider({ children }) {
  const [state, setState] = useState({ isOpen: false });
  const fn = useRef();

  const confirm = (data) => {
    return new Promise((resolve) => {
      setState({ ...data, isOpen: true });
      fn.current = (choice) => {
        resolve(choice);
        setState({ isOpen: false });
      };
    });
  };

  return (
    <ConfirmDialog.Provider value={confirm}>
      {children}
      <AlertDialog
        {...state}
        onClose={() => fn.current(false)}
        onConfirm={() => fn.current(true)}
      />
    </ConfirmDialog.Provider>
  );
}
