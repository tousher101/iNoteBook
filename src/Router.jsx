import { createBrowserRouter } from "react-router-dom";
import { AuthRouter } from "./Route/AuthRouter";
import {DashBoardRoute} from "./Route/DashBoardRoute"
import App from "./App";


const mainRoutes = [{
    path: '/',
    element: <App/>,
    children:[
       ...AuthRouter,
       ...DashBoardRoute,
       
    ]
}];
export const rou = createBrowserRouter(mainRoutes)