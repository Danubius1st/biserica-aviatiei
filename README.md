# To do

`d: && cd D:\Adi\projects`
`npx create-next-app@latest biserica-aviatiei && cd .\biserica-aviatiei`

Need to install the following packages:
create-next-app@16.0.4
Ok to proceed? (y) y

copy styles
copy next.config.mjs
copy manifest.webmanifest
`mv .\app\globals.css .\styles\globals.txt`
`npm i next-pwa`
`npm i -D @next/bundle-analyzer`
`npx shadcn@latest init`
(base color: zinc)

comment PrismaPlugin in next.config.mjs

`npm run dev`
copy and edit `app/layout.tsx`
copy `app/not-found.tsx`
copy `config`
copy `tailwind.config.mts`
`npm i tailwindcss-animate`
copy and edit `app/page.tsx`
copy `tsconfig.json`
`npx shadcn@latest add button label`

## authentication

copy `.env`
`npm i better-auth`
create `lib/auth/auth.ts`
`npm i -D prisma@6`
`npx prisma init` ->
 • prisma.config.ts
 • prisma/schema.prisma

Next steps:

1. Install `dotenv`, and add `import "dotenv/config";` to your `prisma.config.ts` file to load environment variables from `.env`.
2. Run prisma dev to start a local Prisma Postgres server.
3. Define models in the schema.prisma file.
4. Run prisma migrate dev to migrate your local Prisma Postgres database.
5. Tip: Explore how you can extend the ORM with scalable connection pooling, global caching, and a managed serverless Postgres database. Read: https://pris.ly/cli/beyond-orm

`npm i dotenv`
`mkdir .\prisma\db-app`
`mkdir .\prisma\db-auth`
delete or rename `prisma/schema.prisma` -> prisma search in prisma folder for schemas
delete or rename `prisma.config.ts`
add `schema.prisma` for `prisma/db-app` and `prisma/db-auth`
add `type` and `scripts` properties to package.json
`npm i @pothos/core @pothos/plugin-prisma @pothos/plugin-relay`
`npm i -D rimraf`
`npm run dev.local`
`npx prisma db push`
add `generated` to `.gitignore`
create single Prisma Client in `lib/prisma/db-app.ts` and `lib/prisma/db-auth.ts`
setup prisma adapter with better-auth
generate auth tables `npx @better-auth/cli@latest generate --output=prisma/db-auth/auth.schema.prisma`
make tweaks to `prisma/db-auth/schema.prisma`
`npx prisma db push`
adjust `eslint.config.mjs` to ignore `/generated/**/*`
or
copy `eslint.config.mjs`
create Mount Handler in `app/api/auth/[...all]/route.ts`
create Client instance in `lib/auth/auth-client.ts`
or
copy `lib/auth/auth-client.ts`

Create or copy:
`components/auth/register-form.tsx`
`app\auth\register\page.tsx`
`npm i zod react-hook-form @hookform/resolvers react-toastify react-icons react-spinners`
`schemas/*`
`components/form-error.tsx`, `components/form-success.tsx`
`components/ui/card`, `components/ui/card-wrapper.tsx`, , `components/ui/header.tsx`, `components/ui/spinner.tsx`, `components/ui/button-link-back.tsx`, `components/ui/button-link-back.tsx`
`middleware/routes.ts`
`actions/sign-up-email.action.ts`
`components/auth/login-form.tsx`, `app\auth\login\page.tsx`, `actions/sign-in-email.action.ts`

add custom variants to `components\ui\button.tsx`
`lib\auth\auth-client.ts`: add or uncomment `signUp`
`lib\auth\auth.ts`: enable minPasswordLength

Create or copy:
`app\profile\page.tsx`
`components/ui/return-button.tsx`
`components/auth/sign-out-button.tsx`
`components/svg/*

`lib\auth\auth-client.ts`: add or uncomment `signOut`
`app\layout.tsx`: uncomment Toast
`styles\globals.css`: uncomment Toast css
`lib\auth\auth.ts`: uncomment `emailAndPassword.autoSignIn`, `advanced`
`prisma\db-auth\schema.prisma`: add  @default(cuid()) to all `id`

`npm i bcryptjs`
`npm i -D @types/bcryptjs`
Create or copy:
`lib\auth\bcrypt.ts`

`lib\auth\auth.ts`: uncomment `plugins.nextCookies()`

Get Session on Client
`lib\auth\auth-client.ts`: uncomment `useSession`
`lib\auth\bcrypt.ts`: uncomment `session.expiresIn`

Copy:
`components\navbar.tsx`, `components\not-found.tsx`, `components\offline-detect.tsx`
`components\ui\switch.tsx`
`app\layout.tsx`: uncomment `Navbar`
`npm i next-themes react-detect-offline`
`providers\*`
`components\a2hs.tsx`, `components\mobile-detector.tsx`, `components\footer.tsx`, `components\host-location.tsx`, `components\hit-counter.tsx`
`hooks\use-A2HS.ts`
`app\api\location\*`, `app\api\proxy\[url]\route.ts`
`npm i ioredis`

`npx shadcn@latest add badge button card input label`
Edit:
`components\ui\badge.tsx`
`components\ui\button.tsx`
`components\ui\card.tsx`

`npm i -D resend`

## Project rewrite

`git rm -r .`
`git clean -fd`
`git add .`
`git commit -m "Complete project rewrite"`
`git push origin main --force`
error: src refspec main does not match any
error: failed to push some refs to 'origin'

`git branch -a`
`git remote show origin`
fatal: 'origin' does not appear to be a git repository
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.

`git remote add origin https://github.com/Danubius1st/biserica-aviatiei.git`
`git branch -m main`
`git push -u origin main --force`
`git status`
On branch main
Your branch is up to date with 'origin/main'.
