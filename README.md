# **Katha**

A vault system to keep me from **completely losing my mind**. This is a simple and neat inventory management system where I can store everything that matters, *so I can stay present and not spiral into insanity*. "Katha" means **"created by the mind"**, which means it's up to me to turn thoughts into reality… or at least attempt to.

### Tech Stack:

- Next.js
- Supabase
- Drizzle
- Postgres
- React
- Typescript
- Tailwind & Sass
- Motion & Lenis scroll & React three fiber
- Shadcn
- Mailjet


#### To-:

- NEXTJS

  - [x] Installation
  - [x] Clean junks
  - [x] Project structure
  - [ ] Dependencies
    - [x] @supabase/supabase-js @supabase/ssr
    - [x] node-mailjet
    - [x] zod
    - [x] react-hook-form
    - [x] @hookform/resolvers
    - [x] @tanstack/react-query
    - [x] @tanstack/react-query-devtools
    - [x] Shadcn
  - [ ] 

- BACKEND

  - [ ] Supabase auth
    - [x] Package @supabase/supabase-js @supabase/ssr
    - [x] Environment variables
    - [x] Utiliy functions for client
    - [x] Middleware to refresh autht tokens and store them
    - [x] Sign in page (call supabase signupfunctions)
    - [x] Auth confirmation if email confirmation is turned on (default)
    - [x] Access user info from server component
    - [x] Sign out
    - [x] Route protection logic
      - [x] !user & in protectedPaths => sign-in 
      - [x] user & in authPaths => user

    - OTP verification using Custom SMTP (mailjet integration)
      - [x] Grab email_otp via createClient with supabase.auth.admin.generateLinfor elavated priviliges (administrative context)
      - [x] Sign up procedure:
        - [x] Update params on sign up
        - [x] Update form to OTP verification
      - [x] Env variables (public & secret)
      - [x] Link mailjet to send OTP
      - [x] Get email on params if possible
      - [x] Clean the mess you made 
      - [x] Zod validation
        - [x] auth-form
        - [x] otp-form
      - [x] Unexport OtpSchema & make a solution for passing zod validated otp to verifyOtp with useActionState
      - [x] Implement on signup route
      - [ ] Rate limit

    - [x] Login function with zod validation
    - [x] Clean up
    - [x] Actions/auth folder (to be replaced by route files)

    - [ ] Route files for auth
      - [x] @lib/auth/service.ts
      - [x] @app/api/auth/login/route.ts
      - [x] @lib/auth/api.ts
      - [x] @hooks/useAuth.ts
      - [x] Actually make it work
      - [x] Login
      - [x] Auth provider (create/useContext)
        - [x] @providers/authProvider.tsx
        - [x] Modify useAuth hook to sync with auth provider
        - [x] Link auth form to useAuth hook
      - [x] KISS
        - [x] Move login service to api layer (reduces complexity and applies KISS method)
      - [x] Better solution for api layer
        - [x] Error handling
      - [x] Signup
      - [x] Clean out authForm 
      - [x] @hooks/useAuthAction.ts
      - [x] DRY
        - [x] @providers/authProvider.tsx
        - [x] @auth/api.ts
      - [x] Implement useReducer for api layer
        - [x] Initial state
        - [x] Reducer function (authReducer)
        - [x] Dispatch actions (getAuthActions)
        - [x] Types
          - [x] AuthState
          - [x] AuthAction
          - [x] AuthDispatchActions
      - [x] Rename (api function & AuthApi from authProvider)
      - [x] Apply DRY rule ft.types
        - [x] AuthProvider
        - [x] useAuth
        - [x] authReducer
        - [x] Auth types
      - [x] API_URL env (needs to prefix the env variable to NEXT_PUBLIC_ to make it accesible in the browser (env vars run on nodejs environment by default))
      - [x] Replace router if no signup error (solving this is a hastle)
      - [x] Otp verification
      - [x] Sign out
      - [x] Proper getUser 
        - React query `useQuery()`
        - With pending state from useQuery()
      - [x] Seperate signup and login

      - Signup & login logic
        - route -> api -> useAuthReducer -> authProvider
        - useAuthAction -> authProvider -> useAuth -> auth-form

      - Misc
        - [ ] Proper api route file/s for auth (DRY)
        - [ ] @tanstack/react-query-devtools inside QueryProvider
        - [ ] Conver api layers to controllers?

    - Types

      - [x] Auth
        - [x] Global authState
        - [x] useAuthAction
        - [x] useAuthReducer
      - [x] Otp
        - [x] useVerifyOtp
      - [x] Typesafety

    - Better error handling
      - [x] Otp
      - [x] Sign-up
      - [x] Login

    - [ ] Google auth
    - [ ] Facebook auth
    - [ ] Forgot password

  - [ ] Routing
    - [x] Dynamic routing
    - [x] Default route as home + middleware checks
    - [x] notFound() page handler (not-found.tsx)
    - [x] Route config
    - [x] Auth route/layout pages (login & signup)
    - [x] Page parsing
    - [x] Protected routes (dashboard)
    - [ ] Error page (error.tsx)
    - [ ] Refine middleware logic
    - [ ] Metadata for each pages (MatterProvider)

  - Misc
    - [x] Make use of useReducer
      - Just like useActionState but use when managing multiple switch cases
    - [ ] Single responsibility concept SRC
    - [ ] useQuery()

  - Node.js website inspiration
    - [ ] Structure
      - [x] Multi-Purpose React Hooks are defined on `apps/site/hooks`
        - If the Hook as a wider usability or can be used by other components, it should be placed in the root `hooks` folder.
      - [ ] Utility functions
        - Small utility functions that is then used by hooks
      - [x] Multi-Purpose TypeScript definitions are defined on `apps/site/types`
      - [x] React Context Providers are defined on `apps/site/providers`
      - NOTE: unsure if this is the way to fetch and get data so research more.
        - [ ] Build-time Data Fetching Scripts are defined on `apps/site/next-data`
          - Used for Node.js Release data fetching
          - Generation of build-time indexes such as blog data
          - Provider of generated data
          ```text
          CRUD
          - Creating, updating & deleting data on api
          - Data fetching on next-data
            - Utilize useQuery()
            - Generation for fetching
            - Seperate provider for passing generated/fethed data
          ```
      - [ ] Storybook Configuration is done within `apps/site/.storybook`
        - We use an almost out-of-the-box Storybook Experience with a few extra customisations

    - [x] Components
      - [x] Creating components
        - Structure template
          ```text
          - ComponentName
            - __tests__/ // component tests (such as unit tests, etc)
              - index.test.mjs // unit tests should be done in ESM and not TypeScript
            - NOTE: Don't follow this structure when:
              - The component is simple
              - A wrapper of other component with context usage 
              - It's only gonna be used in one place
              - Not reusable
            - index.tsx // the component itself
            - index.module.css // all styles of the component are placed there
            - index.stories.tsx // component Storybook stories
            - SubComponentName
              - same philosophy
          ```
        - always export components as default
        - Avoid making a component too big. Deconstruct it into smaller Components/Hooks whenever possible.
      - [x] Styling
        - PostCSS + Tailwind
        - CSS classes should be camelCase
        - Use Tailwind's `@apply` selector to apply Tailwind Tokens
        - Create mixins for reusable animations, effects and more `@styles/mixins`

    - [ ] Storybook for Manual Testing and Visual Regression Tests of React Components

  - From Theo's new tutorial
    - [ ] Trpc
    - [ ] T3 env
    - [ ] Middleware filter (esp for api/trpc routes)
    - [ ] Metadata
    - [ ] Core functions to route handlers for CRUD management

  - Tests
    - [ ] Hooks
    - [ ] Providers
    - [ ] Reducers
    - [ ] Utils
    - [ ] @next-data/generators

  - [ ] Drizzle ORM
    - [ ] Install dependencies
    - [ ] Setup env
    - [ ] Drizzle connection (db/index.ts)
    - [ ] Define Schema
    - [ ] Config file
    - [ ] Seed test
    - [ ] Link with supabase auth
    - [ ] Info addition
      - [ ] Username
  - [ ] 

- STRUCTURE

  - [x] Lib 
    - [x] supabase/
    - [x] auth/
  - [x] App/api
  - [x] Hooks
  - [x] Types
  - [x] Providers
  - [x] Reducers
  - [x] Auth stucture
  - [x] Utils
  - [ ] @next-data (GET) CRUD stuffs
    - [ ] generators (POST)
      - [ ] \_\_tests__
    - [ ] providers (used as import by next-data default)
    - generator -> providers -> next-data

- DOCS
  
  - [ ] 

- FRONT-END UI/UX

  - [x] Icon/logo
  - [ ] Navbar
    - [x] Initial
  - [ ] Landing
    - [x] Initial
    - [ ] 
  - [ ] Auth
    - [ ] Login form
    - [ ] Signup form
    - [x] Password masking
    - [x] Show/hide pass
    - [x] Seperate useValidatePass hook
    - [x] Standalone component for input fields
    - [x] Better Refactor
    - [-] Input array not updating on selection paste/input (unsolvable as no pointer when selection input and so many other edge cases)
    - [x] Types
      - [x] AuthFieldProps
        - [x] Form control
      - [x] UseValidateInput types
        - [x] Form 
        - [x] Form methods props
        - [x] Form method props type
      - [x] maskInput
      - [x] Proper type location
    - [x] Fix field values resetting when getting error after submitting (again hard to solve as many other edge cases but i learn that bug testing in rarly stage is crucial, holy shit it turns out that the bug still persist way wayyy back so its really just a matter of bug testing at the very early stage of development)
      - [x] So it turns out that I there is already a success state when using the auth api so I just have to pass that to the authform via useActionState and authProvider (Solved this in my OJT time from st clare)
    - [ ] Optimization 
    - [ ] Fix input getting masked when showing input bacause of masking delay
    - [ ] Icons from lucide react
    - [ ] Zod validation message warning
    - [ ] Auth Error Handling
  - [ ] DRAG AND DROP

- STYLING

  - [ ] tailwind variables
    - [x] fonts
    - [ ] colorscheme
  - [x] Tailwind merge (utils.ts)
  - [ ]

- TYPE STRUCTURE

  ```
  - Components: 
    - Props within as type
    - Prop type can be exported as type
  - Hooks:
    - React states e.g. useState within as type
    - Inline Params
  - Reducers & providers:
    - Imported via types as interface
    - Union types as type
  ```

- MISCS

  - [x] Neovim/neovide
  - [x] Pnpm (faster npm)
  - [ ] Powershell auto-suggestion

- TO KEEP IN MIND

  - Optimized/maintainable code
  - KISS
  - DRY


### Inspi

- [dipainhouse](https://www.dipainhouse.com/)
- [Shadcn](https://www.google.com/search?client=firefox-b-d&q=shadcn)
- [Midday](https://midday.ai/)
- [T3.Chat](https://t3.chat/chat)
- [Opennote](https://opennote.me/)
- [Speechy](https://speechy.tech/)
- [ShadcnBlocks](https://nsui.irung.me/)

T3rt!@ryF@cSCC2024
SCCGUEST!
C0mpL@bSCC2024!
