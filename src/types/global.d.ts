export {};

declare global {
  type ValueOf<T> = T[keyof T];

  interface Window {
    showModalDialog?: (
      url: string,
      args?: unknown,
      features?: string
    ) => Promise<unknown>;
    closeModalDialog?: <T = unknown>(returnValue: T) => void;
    returnValue?: unknown;
    closeModernModal?: <T = unknown>(value: T) => void;
    cancelModernModal?: () => void;
    __MODAL_COMMS__?: {
      sendResult: (value?: unknown) => void;
      sendMessage: (data: unknown) => void;
      sendError: (error: unknown) => void;
    };
  }

  interface ExtendedPromise<T> extends Promise<T> {
    cancel?: () => void;
  }
}
