import { ThemeProvider } from "@mui/material";
import { RecoilRoot } from "recoil";
import { theme } from "./Theme";
import { BrowserRouter as Router } from "react-router-dom";
import { routes } from "./Routes";

function App() {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <Router>
          <main className="root">{routes}</main>
        </Router>
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;
