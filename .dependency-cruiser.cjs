const { readdirSync } = require("node:fs");

const domainRoot = "src/modules";
const domains = readdirSync(domainRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);

module.exports = {
  forbidden: [
    { name: "no-cycles", severity: "error", from: {}, to: { circular: true } },
    { name: "no-unresolved", severity: "error", from: {}, to: { couldNotResolve: true } },
    {
      name: "modules-do-not-import-app-shell",
      severity: "error",
      from: { path: "^src/modules/" },
      to: { path: "^src/app/|^index\\.ts$" },
    },
    {
      name: "shared-and-platform-do-not-import-domains-or-shell",
      severity: "error",
      from: { path: "^src/(shared|platform)/" },
      to: { path: "^src/(modules|app)/|^index\\.ts$" },
    },
    {
      name: "no-sibling-repo-source",
      severity: "error",
      from: {},
      to: { path: "^\\.\\./" },
    },
    {
      name: "no-web-framework-imports",
      severity: "error",
      from: { path: "^src/" },
      to: { path: "(^|/)(next|react-dom|react-native-web)(/|$)" },
    },
    ...domains.flatMap((domain) => [
      {
        name: domain + "-does-not-import-other-domains",
        severity: "error",
        from: { path: "^" + domainRoot + "/" + domain + "/" },
        to: { path: "^" + domainRoot + "/", pathNot: "^" + domainRoot + "/" + domain + "/" },
      },
      {
        name: domain + "-public-entrypoint-only",
        severity: "error",
        from: { pathNot: "^" + domainRoot + "/" + domain + "/" },
        to: { path: "^" + domainRoot + "/" + domain + "/", pathNot: "^" + domainRoot + "/" + domain + "/index\\.ts$" },
      },
    ]),
  ],
  options: {
    doNotFollow: { path: "node_modules" },
    tsPreCompilationDeps: true,
    tsConfig: { fileName: "tsconfig.json" },
    enhancedResolveOptions: { exportsFields: ["exports"], conditionNames: ["types", "react-native", "import", "default"] },
  },
};
