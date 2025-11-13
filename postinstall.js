import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import json5 from "json5";

mkdirSync("./assets/oreui/@ore-ui-types", { recursive: true });
writeFileSync(
    "./assets/oreui/@ore-ui-types/enums",
    `// Copied from @ore-ui-types/enums v${json5.parse(readFileSync("./node_modules/@ore-ui-types/enums/package.json", "utf8")).version}
${readFileSync("./node_modules/@ore-ui-types/enums/index.js")}`
);
