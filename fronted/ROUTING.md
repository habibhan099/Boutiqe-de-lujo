Routing follows the CoursePortal pattern: App.jsx exports createBrowserRouter with explicit path/element entries; src/index.js renders RouterProvider. Navigation uses Link and NavLink, with URL-driven form selection and normal browser Back/Forward support.

Run npm install, then npm run dev. For a production host, rewrite non-asset URLs to /index.html so direct links and refresh work.

Home: /. Role navigation: /stakeholders, /admin, /customer, /delivery.
Forms: /admin-login, /admin-dashboard, /products, /categories, /orders, /customers, /deliveries, /customer-login, /registration, /product-search, /order-form, /checkout, /delivery-login, /delivery-registration, /assignment, /delivery-status, /confirmation. /login and /signup are customer aliases. Unknown paths display a recovery link.

Existing forms remain demonstration forms. Routing does not add authentication, submission processing, or product filtering. Informational/social footer labels without supplied destination pages remain text.

Validation: JSX syntax, local imports, route targets, and lockfile consistency checked. Production build could not be completed in this environment: supplied node_modules lacks a compatible Linux native build binding; dependency download is unavailable. Install dependencies locally before running.
