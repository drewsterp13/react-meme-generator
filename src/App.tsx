import { HashRouter, Routes, Route } from "react-router-dom";
import AuthChecker from "./auth/AuthChecker"
import routes from "./config/routes"
import Navbar from "./components/Navbar"
import { Provider } from "react-redux"
import store from "./redux/store"

function App() {
  return (
    <HashRouter>
      <Navbar />
      <Provider store={store}>
        <Routes>
          {
            routes.map((route: any, index: any) => (
              <Route
                key={index}
                path={route.path}
                element={
                  route.protected ? (
                    <AuthChecker>
                        <route.component />
                    </AuthChecker>
                  ) : (
                    <route.component />
                  )
                } />
            ))
          }
        </Routes>
      </Provider>
    </HashRouter>
  )
}

export default App
