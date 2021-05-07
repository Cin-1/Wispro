import "./App.css"
import { ThemeProvider } from "@material-ui/core/styles"
import theme from "./theme/theme"

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <p>Proyecto</p>
      </div>
    </ThemeProvider>
  )
}

export default App
