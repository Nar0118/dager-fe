import Home from "../pages/Home";
import CarPage from "../pages/CarPage";

export const publicRoutes = [
  {
    path: '/',
    Component: Home,
  },
  {
    path: '/find',
    Component: CarPage,
  },
//   {
//     path: REGISTRATION_ROUTE,
//     Component: Auth,
//   },
//   {
//     path: LOGIN_ROUTE,
//     Component: Auth,
//   },
//   {
//     path: `${DEVICE_ROUTE}/:id`,
//     Component: DevicePage,
//   },
//   {
//     path: CONTACT_ROUTE,
//     Component: ContactPage,
//   },
//   {
//     path: ABOUT_ROUTE,
//     Component: About,
//   },
];
