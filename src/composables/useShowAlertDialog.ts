import { type AlertInfo, useAlertStore } from "@/stores/alert.store";

/**
 * @remarks
 * Server error does not use hook
 */
export default function useShowAlertDialog() {
  const alertStore = useAlertStore();

  // TODO: maybe need fixed title and description, so that why we use object instead variant only
  const dialogMessages = {
    registration: {
      variant: "info" as const,
    },
    save: {
      variant: "info" as const,
    },
    delete: {
      variant: "warning" as const,
    },
    cancel: {
      variant: "warning" as const,
    },
    confirm: {
      variant: "info" as const,
    },
    error: {
      variant: "error" as const,
    },
    success: {
      variant: "success" as const,
    },
  } as const;

  const showDialog = (type: keyof typeof dialogMessages, { ...rest }: Omit<AlertInfo, "variant">) => {
    const { variant } = dialogMessages[type];
    const info: AlertInfo = {
      variant,
      ...rest,
    };
    console.log(info);
    alertStore.handleUpdateInfo(info);
    alertStore.handleShowAlert(true);
  };

  // Add a method to hide the alert dialog
  const hideAlertDialog = () => {
    alertStore.handleShowAlert(false);
  };

  return {
    showErrorDialog: (props: Omit<AlertInfo, "variant">) => showDialog("error", props),
    showSuccessDialog: (props: Omit<AlertInfo, "variant">) => showDialog("success", props),
    showSaveDialog: (props: AlertInfo) => showDialog("save", props),
    showConfirmDialog: (props: Omit<AlertInfo, "variant">) => showDialog("confirm", props),
    showDeleteDialog: (props: Omit<AlertInfo, "variant">) => showDialog("delete", props),
    showCancelDialog: (props: Omit<AlertInfo, "variant">) => showDialog("cancel", props),
    showCustomDialog: (props: AlertInfo) => {
      alertStore.handleUpdateInfo(props);
      alertStore.handleShowAlert(true);
    },
    showRegistrationDialog: (props: Omit<AlertInfo, "variant">) => showDialog("registration", props),
    hideAlertDialog,
  };
}
