# Publish Emberframe on Vercel

GitHub holds the code. Codex edits the repository. Vercel builds it and provides the link you can share.

1. Sign in at [Vercel](https://vercel.com/login) with the GitHub account that owns `garciajohnreb91-droid/emberframe-vfx`.
2. Choose **Add New → Project**, connect GitHub, and grant access to this repository.
3. Import **emberframe-vfx**. Use the repository root (`./`) and the **Next.js** preset.
4. Keep the output directory at its framework default. `vercel.json` already pins the install and build commands to the repository's pnpm version. The prototype needs no API keys or environment variables.
5. Deploy. When the deployment is **Ready**, open its production URL and share that URL.

Use `main` for production after the prototype pull request has been merged. Pull requests and other branches receive their own preview deployments once the GitHub integration is connected. If visitors encounter a Vercel login screen, review the project's Deployment Protection settings for the URL you are sharing.

Do not set `EMBERFRAME_STATIC_EXPORT` on Vercel: it is only used to package the separate Sites preview. Leave the Node version within the range declared in `package.json` (22 or 24).

Future changes: ask Codex to edit the project, review the changes, and merge the pull request into `main`. Vercel will deploy from the connected repository. The existing ChatGPT Sites preview is a separate publication and retains its own access settings.

This remains a front-end prototype. AI processing, accounts, cloud storage, and production video export are not connected.

References: [GitHub deployments](https://vercel.com/docs/git/vercel-for-github), [build settings](https://vercel.com/docs/builds/configure-a-build).
