# React + Vite

## MAMP API setup

This project is a React frontend. It does not connect to MySQL directly. Instead, it sends
requests to a backend API, and that backend should use your MAMP MySQL connection.

1. Create `.env` in the project root.
2. Copy the value from `.env.example`.
3. Point `VITE_API_BASE_URL` to your MAMP PHP API folder.

Example:

```env
VITE_API_BASE_URL=http://localhost:8888/eco-ride-share-api
```

Expected MAMP defaults for the backend:

```txt
DB_HOST=localhost
DB_PORT=8889
DB_DATABASE=your_database_name
DB_USERNAME=root
DB_PASSWORD=root
```

If your PHP backend is inside MAMP `htdocs`, your login and register endpoints should exist under:

```txt
http://localhost:8888/eco-ride-share-api/ymhs/autenticate/login
http://localhost:8888/eco-ride-share-api/ymhs/autenticate/register
```

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
