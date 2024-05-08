import Home from "../pages/Home"
import Info from "../pages/Info"
import Dashboard from "../pages/Dashboard"

interface RouteType {
    path: string,
    component: () => JSX.Element,
    name: string,
    protected: boolean,
}

const routes: RouteType[] = [
    {
        path: "/",
        component: Home,
        name: "Home",
        protected: false,
    },
    {
        path: "/info",
        component: Info,
        name: "Info",
        protected: false,
    },
    {
        path: "/dashboard",
        component: Dashboard,
        name: "Dashbaord",
        protected: true,
    }
]

export default routes