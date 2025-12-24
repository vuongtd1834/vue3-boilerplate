import type { VNode } from "vue";

import { defineStore } from "pinia";

import type { Props as AlertProps } from "@/components/atoms/alert/Alert.vue";

export type AlertVariant = AlertProps["variant"];

export interface AlertInfo {
  width?: number;
  title: string | VNode;
  variant?: AlertVariant;
  description?: string | VNode;
  onOk?: () => void;
  onCancel?: () => void;
  onClose?: () => void;
  relateForm?: {
    id: string;
  };
  customFooter?: VNode;
}

interface AlertState {
  showAlert: boolean;
  info: AlertInfo;
}

/**
 * TODO: need add logic prioritize for alert dialog, because we can have multiple alert dialog at the same time
 * for example, if we have a success dialog and a error dialog at the same time, the error dialog should be on top of the success dialog
 */
export const useAlertStore = defineStore("alert", {
  state: (): AlertState => ({
    showAlert: false,
    info: {
      title: "",
      variant: "info",
      description: "",
    },
  }),

  actions: {
    handleShowAlert(state: boolean) {
      this.showAlert = state;
    },

    handleUpdateInfo(info: AlertInfo) {
      this.info = info;
    },
  },
});
