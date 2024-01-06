
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

