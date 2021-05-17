import "./App.css"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { ThemeProvider } from "@material-ui/core/styles"
import { theme } from "./theme/theme"
import SignInSide from "./Components/Login"
import Register from "./Components/Register"
import EnhancedTable from "./Components/tabla"
import Chart from "./Components//chartCPU"

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={SignInSide} exact />
          <Route path="/users" component={EnhancedTable} />
          <Route path="/register" component={Register} exact />
          <Route path="/grafics" component={Chart} exact />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
