import { createTheme } from '@material-ui/core/styles'

const theme = createTheme({
  typography: {
    fontFamily: ['Fredoka','sans-serif'].join(',')
  },
  palette: {
    primary: {
        main: '#00CAB1',
    },
    secondary: {
        main: '#FFC0CB'
    }
  }
})

export default theme