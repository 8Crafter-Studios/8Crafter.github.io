interface Console {
    everything: ConsoleEverythingEntry[];
}

type LogType = "log" | "info" | "error" | "warn" | "debug";

type ConsoleEverythingEntry =
    | { type: "log" | "info" | "error" | "warn" | "debug"; timeStamp: string; value: any[]; stack?: string | undefined }
    | {
          type: "exception";
          timeStamp: string;
          value: ErrorEvent;
          stack?: string | undefined;
      }
    | { type: "promiseRejection"; timeStamp: string; value: PromiseRejectionEvent; stack?: string | undefined };

type ConsoleLogCallback = (data: ConsoleEverythingEntry) => void;

interface ContextMenuCreationOptions {
    x: number;
    y: number;
    width?: number | undefined;
    height?: number | undefined;
    items: ContextMenuItemCreationOptions[];
}

type ContextMenuItemCreationOptions = {
    type?: "action" | undefined;
    title?: string | undefined;
    label: string;
    action(): void;
    disabled?: boolean | undefined;
} | {
    type: "separator";
} | {
    type: "submenu";
    label: string;
    title?: string | undefined;
    submenu: ContextMenuItemCreationOptions[];
    disabled?: boolean | undefined;
};

interface Window {
    /**
     * @todo Add an actual option for this.
     * @idea Make these displayed using the `Readonly_icon.png` icon instead of an italic 75% opacity `read-only` before the property name. The icon would be to the left of the expansion arrow (or where it would be when there isn't one).
     */
    showReadonlyPropertiesLabelInConsoleEnabled?: boolean | undefined;
    [key: `temp${bigint}`]: any;
}

/**
 * Only present when using the {@link copyTextToClipboard_old} and the `core.router` facet is not available.
 *
 * @deprecated
 */
declare var __DEBUG_copyTextToClipboard_old_GLOBALS_copyError__: unknown;
