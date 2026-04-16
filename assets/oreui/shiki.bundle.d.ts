import type { DynamicImportLanguageRegistration, DynamicImportThemeRegistration } from "@shikijs/types";
import type { createBundledHighlighter, ShorthandsBundle } from "@shikijs/core";
import type { createJavaScriptRegexEngine } from "@shikijs/engine-javascript";

declare global {
    namespace globalThis {
        type ShikiBundledLanguage = "typescript" | "ts" | "cts" | "mts" | "javascript" | "js" | "cjs" | "mjs" | "vue";
        type ShikiBundledTheme = "light-plus" | "dark-plus";
        var shiki: {
            bundledLanguages: Record<ShikiBundledLanguage, DynamicImportLanguageRegistration>;
            bundledThemes: Record<ShikiBundledTheme, DynamicImportThemeRegistration>;
            codeToHast: ShorthandsBundle<ShikiBundledLanguage, ShikiBundledTheme>["codeToHast"];
            codeToHtml: ShorthandsBundle<ShikiBundledLanguage, ShikiBundledTheme>["codeToHtml"];
            codeToTokens: ShorthandsBundle<ShikiBundledLanguage, ShikiBundledTheme>["codeToTokens"];
            codeToTokensBase: ShorthandsBundle<ShikiBundledLanguage, ShikiBundledTheme>["codeToTokensBase"];
            codeToTokensWithThemes: ShorthandsBundle<ShikiBundledLanguage, ShikiBundledTheme>["codeToTokensWithThemes"];
            createHighlighter: ReturnType<typeof createBundledHighlighter<ShikiBundledLanguage, ShikiBundledTheme>>;
            getLastGrammarState: ShorthandsBundle<ShikiBundledLanguage, ShikiBundledTheme>["getLastGrammarState"];
            getSingletonHighlighter: ShorthandsBundle<ShikiBundledLanguage, ShikiBundledTheme>["getSingletonHighlighter"];
            createJavaScriptRegexEngine: typeof createJavaScriptRegexEngine;
        };
    }
}
