import Login from "Pages/Login/Login";
import Signup from "Pages/Signup/Signup";
import TodoApp from "Pages/TodoApp/TodoApp";

/*======= public routes =======*/
export const publicRoutes = [
  { path: "/", element: Login },
  { path: "/signup", element: Signup },
];

/*======= protected routes =======*/
export const protectedRoutes = [{ path: "/todoapp", element: TodoApp }];
