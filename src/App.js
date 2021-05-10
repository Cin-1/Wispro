import "./App.css"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { ThemeProvider } from "@material-ui/core/styles"
import { theme } from "./theme/theme"
import SignInSide from "./Components/Login"
import Orders from "./Components/UsersTable"

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={SignInSide} exact />
          <Route path="/users" component={Orders} exact />
          <Route path="/post/:id" />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
