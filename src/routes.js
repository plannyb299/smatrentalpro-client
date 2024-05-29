import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './components/Pages/Home/Home';
import Rent from './components/Pages/Rent/Rent';
import Search from './components/Pages/Search/Search';
import Property from './components/Pages/Property/Property';
import ProfilePage from './components/Pages/profilePage/profilePage';
import ProfileUpdatePage from './components/Pages/profileUpdatePage/profileUpdatePage';
import Login from './components/Pages/login/login';
import Register from './components/Pages/register/register';
import NewPostPage from "./components/Pages/newPostPage/newPostPage";
import { listPageLoader, profilePageLoader, singlePageLoader } from "./utils/loaders";
import { RequireAuth } from './components/Pages/layout/layout';
import { Layout } from './components/Pages/layout/layout';
import ConfirmEmail from './components/confirmation/Confirm';
import BookingForm from './components/bookingForm/BookingForm';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: 'rent', element: <Rent /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'search', element: <Search /> },
      { path: 'confirm-email', element: <ConfirmEmail /> },
      {
        path: 'property/:propertyId',
        element: <Property />,
      },
      {
        path: 'about',
        element: (
          <main>
            <h1 style={{ marginTop: '3rem', color: 'rgb(26, 55, 58)' }}>ABOUT</h1>
          </main>
        ),
      },
      {
        path: '*',
        element: (
          <main>
            <h1 style={{ marginTop: '3rem', color: 'rgb(26, 55, 58)' }}>404 NOT FOUND</h1>
          </main>
        ),
      },
    ],
  },
  {
    path: "/",
    element: <RequireAuth />,
    children: [
      {
        path: 'profile',
        element: <ProfilePage />,
        loader: profilePageLoader,
      },
      {
        path: 'profile/update',
        element: <ProfileUpdatePage />,
      },      {
        path: 'profile/newpost',
        element: <NewPostPage />,
      },
      {
        path: 'booking/:propertyId',
        element: <BookingForm />,
      },

    ],
  },
]);

export default router;
