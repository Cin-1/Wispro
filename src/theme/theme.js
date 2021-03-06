import { createMuiTheme } from "@material-ui/core/styles"
import purple from "@material-ui/core/colors/purple"
import green from "@material-ui/core/colors/green"

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "rgb(81, 118, 199)",
    },
    secondary: {
      main: green[500],
    },
  },
})
