import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Home } from './pages/Home';
import { Tools } from './pages/Tools';
import { Tips } from './pages/Tips';
import { Contribute } from './pages/Contribute';
import { ToolDetail } from './pages/ToolDetail';
import { TipDetail } from './pages/TipDetail';
import { NotFound } from './pages/NotFound';
import App from './App';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/tools',
        element: <Tools />,
      },
      {
        path: '/tools/:id',
        element: <ToolDetail />,
      },
      {
        path: '/tips',
        element: <Tips />,
      },
      {
        path: '/tips/:id',
        element: <TipDetail />,
      },
      {
        path: '/contribute',
        element: <Contribute />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);