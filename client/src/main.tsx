import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ThemeProvider } from './provider/theme-provider.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Chat from './components/Chat/Chat.tsx';
import Login from './components/Chat/Login.tsx';
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/chat',
    element: <Chat />,

    children: [
      {
        path: '/chat/login',
        element: <Login />,
        action: async ({ request }) => {
          const data = await request.json();
          return data;
        },
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
);
