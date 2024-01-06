
https://www.youtube.com/watch?v=XD5FpbVpWzk

Learn Next.js 14 Server Actions With This One Project (UseFormStatus, UseFormState, Error Handling)

Server actions provide a way to write server post end points as normal functions (instead of an endpoint called by a fetch)

benefits:
+ code more concise
+ does not require Javascript enabled in the browser or slow internet connection and Javascript not loaded yet

Idea behind progressive enhancement

* learn to use server actions with a server component, client componnt, hook form, wiythout react hook form
* error handling
* progressive enhancement: certain functions work even if Javascript is disabled or hasn't loaded


* tech stack: Prisma, vercel Postgres, vercel blob, taiulwind css, use prettier, 

# Project Setup
* check node version in terminal
> node -v

* should be > v25

## Starting Code

* Starting code
> git clone https://github.com/codinginflow/nextjs-job-board.git

> npm install

## From scratch
> npx create-next-app@latest
* choose defaults

> npm i prisma @prisma/client @vercel/blob react-draft-wysiwyg markdown-draft-js react-markdown nanoid date-fns @clerk/nextjs

> npm i --save-dev @types/markdown-draft-js @types/react-draft-wysiwyg prettier eslint-config-prettier prettier-plugin-tailwindcss

## Next
* tailwind css intellisense plugin
* File > preferences > settings
* search for files associations
* add item *.css value tailwindcss to get tailwind support inside css files
* search for quick suggestions. turn down on inside strings to get autocomplete for tailwind classes inside these class name strings
* prettier
* In prettier.config.js
```
module.exports = {
  plugins: ["prettier-plugin-tailwindcss"],
};
```
automatically sort classes based on recommended class order
* in .eslintrc.json file comes with nextjs by default
```
{
  "extends": ["next/core-web-vitals", "prettier"]
}
```
make sure eslint and prettier don't interfere
* Prettier code extension
* In settings, search for default formatter, and set Default Formatter to Prettier
* Prisma extension
* ESLint extension
* src/assets and src/app/favicon.ico
* 

# Shadcn UI Setup
* most popular component library for nextjs right now (based on radix-ui that provides base components)
* If not already installed
> npx shadcn-ui@latest init
* from https://ui.shadcn.com/docs/components-json. The components.json file holds configuration for your project. We use it to understand how your project is set up and how to generate components customized for your project.
* installed some packages, tailwind.config.js updated for us, updated global.css
* added utils.ts function responsible for combining tailwid classes functions
* copy button component (already contained in starting code) inside src/components/ui/button.tsx
> npx shadcn-ui@latest add button

> npx shadcn-ui@latest add input
* react hook form allows us to use Shadcn components with react hook form which is a validation library
> npx shadcn-ui@latest add form

# Vercel Postgres, Vercel Blob, Prisma Setup
> npx prisma init
* creates schema.prisma file + .env file
* add .env to .gitignore
* vercel > storage. create postgres database name nextjs-job-board. Import content from .env.local into .env file, and also prisma tabe content into datasource db section
* create Job model
* In prisma generator client enable fullTextSearch preview Feature because we want to use postgres text search feature to be able to search for jobs
* Create table inour database:
> npx prisma db push
* Then generate Prisma client from newer table
> npx prisma generate
* create a file src/lib/prisma.ts which will contain prisma client. For nextjs we have to setup prisma client in a specific way otherwise we get an error message because it creates a new client every time we restart our app and development
```
warn(prisma-client) There are already 10 instances of Prisma Client actively running.
```
* copy paste into prisma.ts from https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices#solution
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/globalThis
* fill the datatabse wityh some dummy data
* to save time copy scripts folder from link in description. Already dfone in the starting code.(one file for job placeholders and the other one to populate database)
* then go into package.json and add this seed script (already done in the starting code)
> npm run seed
* use prisma studio
> npx prisma studio
* then go to localhost:5555
* create a blob storage vercel > blob > create store > nextjs-job-board-files
* copy .env.local into local .env file
* now we are ready to start writing code

# Job list server component
> npm run dev
* page.tsx server compoenent so can be async and we can fetch data
* src/components/jobKistItem.tsx
* article more idiomatic than div for seo purposes
* icons provided by luci react (came with Shadcn)
* we need to format salary into dollars. Do it in utils.ts file
* create components/Badge.tsx
* by default headlines are unstyled by tailwind css
* set min width in root layout to not shrink beyond a certain limit (for instance when using DevTools)

# Job filter server component
* forms can call server actions even inside server components (in server components we don't have javascript we can't execute onClick handler for example)
* In form, use Label imported /ui/label previously from Shadcn, not the unstyled radix one
* server action marked by "use server"
* create ui/select.tsx (the proble of ShadCn one is that we cannot use Javascript in server component)
* React.HTMLProps HTMLSelectElement to have the same props as native element (here Select with native select)
* to hide the caret of select apperance-none
* add a ref to the select component
* trick [...].filter(Boolean) to filter null values
* create lib/validation.ts for type validation
 