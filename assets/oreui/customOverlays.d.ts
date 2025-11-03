interface Console {
    everything: ConsoleEverythingEntry[];
}

type LogType = "log" | "info" | "error" | "warn" | "debug";

type ConsoleEverythingEntry =
    | { type: "log" | "info" | "error" | "warn" | "debug"; timeStamp: string; value: any[] }
    | {
          type: "exception";
          timeStamp: string;
          value: ErrorEvent;
      }
    | { type: "promiseRejection"; timeStamp: string; value: PromiseRejectionEvent };

type ConsoleLogCallback = (data: ConsoleEverythingEntry) => void;

/**
 * Only present when using the {@link copyTextToClipboard_old} and the `core.router` facet is not available.
 *
 * @deprecated
 */
declare var __DEBUG_copyTextToClipboard_old_GLOBALS_copyError__: unknown;
