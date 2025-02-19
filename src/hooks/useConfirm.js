import { useContext } from "react";
import { ConfirmDialog } from "@/contexts/ConfirmDialogContext";

export default function useConfirm() {
  return useContext(ConfirmDialog);
}
