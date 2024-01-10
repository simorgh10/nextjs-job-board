
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
 
# Filter results from URL search params + useFormStatus
* add an error page  src/app/error.tsx
* refactor h1 element
* In PageProps searchParams is a special name in NextJS you have to spell it in camelCase. There it will put whatever is in the query parameters. Params there are string because they are strings in the query. They are converted when page is loaded
* we want to use postgres for full text search because it is a bit more powerful than a RAM query (described in Prisma doc) (see fullTextSearch feature enabled in prisma.schema file)
```
//for text that contains multiple words
search: 'cat' & 'doc'
```
* useFormStatus React hook allows us to have a child component which will be run on the client that receives the form state of the parent. Extract Button into a separate client component FormSubmitButton. we can't use hooks inside server components
* HTMLProps contains more stuff than HTMLAttributes. Stuff like ref etc.
* Progressive enhancement is a design philosophy that provides a baseline of essential content and functionality to as many users as possible, while delivering the best possible experience only to users of the most modern browsers that can run all the required code.

# Navbar + footer + metadata
* asChild prop a feature of Shadcn. %ake the element look as a button but the actual rendered element is another element (eg link instead ofr a button for accessibility reason)
* create a title template
* generateMetadata function to mke metaData dynamic
* the only problem is that template does only work on chiuld pages not front page. so we have to add | Flow Jobs manually in generateMetadata
* Metatitle is also great for SEO because this can shjow in Google as Contract developer jobs in Redmond, Washington, United States if someone is searching for this lind of job
* when clicking on the logo, params are removed from the url but not from the form, because React automatically maintains the state of the component. We know that our filter has changed if uour default values have changed
* 1 Solution: add a key prop to the form component that contains JSON stringified defaultValues because that's the easiest way to compare old state with new state. If the states are different the component will be rendered from scratch

# React Hook Form + Zod Validation
* validation schema for creating a new job
* use zod. The validation schema can be used in the front end and the backend
* app/jobs/new/page.tsx
* new client component NewJobForm
* we separate page and NewJobForm component because we can only export metadata from a server component
* Import Shadcn local form not react hooks one. We use that special Form insted of html native form because now we want to integrate react hook forms:
  + Store the value for us
  + gives us a way to access the different form fields for validation
  + FormFieldComponent use this to render a single form input or a select field or a checkbox or whatever. Control Manages the state and passes it to react hook form. FormItem provides some layout and styling. FormLabel, FormInput field and the description and the error message are aligned properly with the correct spacing. FormControl makes sure that messafe and label and description are connected properly (internally uses context t pass these valuesto the different components and context is only available in cliebt components) eg label htmlFor accessibility atytribute automatically managed for us
* One can use react-hook-forms without Shadcn field wrapper but Shadcn is nicely styled + reusability
* embed a native form inside Form but with noValidate property as to disable native browser validation
* This time use the onSubmit function
* if we define onSubmit we ue it as follows onSubmit={handleSubmit(onSubmit)} handleSubmit is responsible for triggering our formValidation through react hook form and this also extracts the data and passes it into our onSubmit function
* FormMessage will automatically contain the error message from our validation schema if value is not valid
* forms are complicate because we need accessibility, xwe need to manage form states and libraries like react hook forms do that for you
* Change Form Shadcn component to prevent the label text from shifting to red in case of validation error
* Not allowed to set value on input file type for security reasons. see companyLogo input.
* such a file input uses a type called file list which can contain multiple files even if we did select one and then we can extract our file from this file list. Use onChange trick
* new component LocationInput
* type search on input so we get the x to clear the input
* onBlur oppositiuve to onFocus.
```
blur vs focusout =>

The focusout event is sent to an element when it, or any element inside of it, loses focus. This is distinct from the blur event in that it supports detecting the loss of focus on descendant elements (in other words, it supports event bubbling).
```
* on the buttn use onMouseDown rather than onClick, because before the click is received we lose focus an the onClick won't work. onMouse Down is triggered earlier before we lose focus.
* use watch from react hook to display the selected city
* In the following piece of code set shouldValidate to true so that if we delete the location but we have onSite selected then this will trigger the error message that says we need a location for onsite jobs:
```
onClick={() => {
                        setValue("location", "", { shouldValidate: true })
                      }}
```
* rich text editor wysiwyg
* component RichTextEditor
* we have to add the css to the RichTextEditor in order for it to display correctly import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
```
FROM Bing Chat
:focus-visible pseudo-class matches an element that is currently focused, but only if the focus was obtained via keyboard navigation 
. This distinction is important because it allows developers to provide different styles for focus indicators based on the user’s input modality 
For example, if you want to provide a different focus indicator for keyboard users, you can use the :focus-visible pseudo-class to style the element differently than the default :focus style 

:focus matches any element that has focus, while :focus-within matches the parent of the element that has focus. This distinction is important because it allows developers to provide different styles for focus indicators based on the user’s input modality 123.

For example, if you want to provide a different focus indicator for the parent element when one of its children is focused, you can use the :focus-within pseudo-class to style the parent element differently than the default :focus style
```
* Error because it tries to render editor on server side. THus use a dynamic import
```
 ⨯ node_modules\react-draft-wysiwyg\dist\react-draft-wysiwyg.js (1:392) @ window        
 ⨯ ReferenceError: window is not defined
```
* we need to save the draft as markdown in the database. Thus we installed markdown-draft-js
* again the ref is necessary so that our react hook form can automatically focus our input field. See he setFocus call when clicking on the label (Editor has no id prop so the connection is not automatic)
* sublit button. We don't want to use form submit button, we don't handle this via useFormStatus, instead react hook form has its own loading state
* First extract jsx from FormSUbmitButton inside a new component LoadingButton

# File upload - Server action in client component
* we can't declare a server action inside a client component
* jobs/new/actions.ts that's the convention
* In createJobPosting, we still use FormData as Paramater because we have a image and we only can send an image within a form data
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions
* use nanoid in the slug
* Important to note that you can only send files up to 4.5 megabytes into a a server action. it is possible to upload larger files from the frontent. see https://vercel.com/guides/how-to-bypass-vercel-body-size-limit-serverless-functions
* In the onSUbmit we have to first tranform to formData
* Whatever message we put in throw Error in server action, it will not be received by frontend because that way we can accientally leak sensitive data.
* new job-submitted folder
* for now approve to true by default
* configure nextjs config to authorize vercel blob urls in order to b able to display company logos

# Job details page (React markdown, generateStaticParams, generateMetadata, React cache)
* In job/[slug] generateMetadata, you cannot share data directly between this page and generate metadata function. You have to fetch this data in both places.
* That's why getJob calls a cache function, so that we mahe only one call to this page.
* With fetch does deduplication automatically. but for other ways of fetching like using an ORM or usng Axios for example, calls are not automatically deduplicated.
* In component  Markdown pass children prop as a stringt not a ReactNode. Here the prop children type overrides original type
* list-inside/outside https://developer.mozilla.org/en-US/docs/Web/CSS/list-style-position
* not-found page not-found.tsx
* when npm run build the circle means statically cached that is good and fast
* to force statically caching of job details pages (containing slug), you can add generateStaticParams. see [slug]/page.tsx. ndlr We say it is rendered as static html
> npm run build
```
Route (app)                              Size     First Load JS
┌ λ /                                    3.23 kB         103 kB
├ ○ /_not-found                          0 B                0 B
├ ○ /job-submitted                       140 B          82.2 kB
├ ● /jobs/[slug]                         186 B          93.3 kB
└ ○ /jobs/new                            320 kB          409 kB
+ First Load JS shared by all            82.1 kB
  ├ chunks/938-7938199a24d69ce3.js       26.7 kB
  ├ chunks/fd9d1056-32992e129a583953.js  53.3 kB
  ├ chunks/main-app-3d6f1c3b5644e441.js  220 B
  └ chunks/webpack-248a844b623bbe21.js   1.88 kB


○  (Static)   prerendered as static content
●  (SSG)      prerendered as static HTML (uses getStaticProps)
λ  (Dynamic)  server-rendered on demand using Node.js
```
* now with npm start (production run), the slug page opens instantly, because nextJS also prefetches links and together with statically cached page there's virtually zero loading time
* with generateStatic params nextjs renders all the jobs data at compile time and not when we open the page.
* fast rendertimes are very good for SEO
* side effect is that if there is a new page with a new slug that we dind't cache yet which happen after we added a new job via our form and approved it, every new slug will be rendered the first time a user opens it and and then it will be cached for all our successive users
* since server component, makdown also rendered by the server. The benefit of server components because we have smaller Javascript bundle size 

# Clerk Authentication (Admin dashboard) + middleware.ts
* Sign-in then new application
* follow setup guide for nextJS
* wrap the pages that we want to protect in a clock provider
* new folder admin/layout.tsx to create a layout that is active only for admin pages
* middleware.ts to take care that clerk checks for authentication before we open our admin page. DIRECTLY IN THE SRC FOLDER
* localhost:3000/admin redirects to clerk authentication
* customize clerk login page
* personalize login page

# Approve/delete jobs - UseFormState
* admin/actions.tsx
* clerk has a currentUser method
* In user > ... > public metadata edit > 
```
{"role": "admin"}
```
* Revalidation is the process of purging the Data Cache and re-fetching the latest data. https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#revalidating-data
* del function to remove a file from vercel blob
* redirect has to be put outside try catch because internally redirect throws an error. This is hiow NextJs handle redirect
* admin/jobs/[slug]/page.tsx
* no care about caching or SEO on this page because only admins see this page
* now this toime we want to get the error from the server
* useFormState (not useFormStatus as used earlier). Thus AdminSIdebat has to be turned into client component because we cxan't call hooks outside server components
* We could also have used normal useState then execute our server action via onCLick handler that reads returned error and put it into state
* the benefit of useFormState is to allow progressive enhancement
* componenty AdminNavbar