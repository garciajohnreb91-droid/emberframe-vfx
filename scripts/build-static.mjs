import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";

// The same Next.js app can be deployed to static hosting without a Node server.
const require = createRequire(import.meta.url);
execFileSync(
  process.execPath,
  [require.resolve("next/dist/bin/next"), "build"],
  {
    stdio: "inherit",
    env: { ...process.env, EMBERFRAME_STATIC_EXPORT: "1" },
  },
);
