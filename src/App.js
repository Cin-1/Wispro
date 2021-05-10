import "./App.css"
import { ThemeProvider } from "@material-ui/core/styles"
import { theme } from "./theme/theme"
import SignInSide from "./Components/Login"

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <p>Proyecto</p>
        <SignInSide />
      </div>
    </ThemeProvider>
  )
}

export default App
