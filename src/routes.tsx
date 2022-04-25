import { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

export default function AppRoutes() {
  interface IRoutes {
    path: string;
    element: ReactElement;
  }

  const routes: IRoutes[] = [
    {
      path: '/',
      element: <Home />,
    },
  ];
  return (
    <Routes>
      {routes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
}
