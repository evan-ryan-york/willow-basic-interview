import { createTheme } from "@mui/material/styles";
import { Color } from "./types/enums";

declare module "@mui/material/Chip" {
  export interface ChipPropsColorOverrides {
    gray: true;
    notMetProficiency: true;
    approachesProficiency: true;
    metProficiency: true;
    masteredProficiency: true;
    white: true;
  }
}

declare module "@mui/material/Button" {
  export interface ButtonPropsColorOverrides {
    gray: true;
    notMetProficiency: true;
    approachesProficiency: true;
    metProficiency: true;
    masteredProficiency: true;
    white: true;
  }
}

declare module "@mui/material/styles" {
  interface TypographyVariants {
    cardTitle: React.CSSProperties;
    subHeading: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    cardTitle?: React.CSSProperties;
    subHeading?: React.CSSProperties;
  }
}

declare module "@mui/material/styles" {
  interface PaletteOptions {
    gray: {
      main: string;
      contrastText: string;
    };
    white: {
      main: string;
      contrastText: string;
    };
    notMetProficiency: {
      main: string;
      contrastText: string;
    };
    approachesProficiency: {
      main: string;
      contrastText: string;
    };
    metProficiency: {
      main: string;
      contrastText: string;
    };
    masteredProficiency: {
      main: string;
      contrastText: string;
    };
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    cardTitle: true;
    leadCardTitle: true;
    leadCardDate: true;
    leadCardInfo: true;
    subHeading: true;
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(0, 54, 46)",
      contrastText: "#fff",
    },
    secondary: {
      main: "#1DBC9D",
      contrastText: "#fff",
    },
    white: {
      main: "#fff",
      contrastText: "#000",
    },
    gray: {
      main: "#ccc",
      contrastText: "#000",
    },
    notMetProficiency: {
      main: "#E54A4A",
      contrastText: "#fff",
    },
    approachesProficiency: {
      main: "#E6C960",
      contrastText: "#000",
    },
    metProficiency: {
      main: "#32E665",
      contrastText: "#000",
    },
    masteredProficiency: {
      main: "#3E4DE6",
      contrastText: "#fff",
    },
  },
  typography: {
    cardTitle: {
      fontSize: 24,

      fontWeight: 100,
    },
    h1: {
      fontSize: 80,
      fontFamily: "'Raleway', sans-serif",
      fontWeight: 300,
    },
    h2: {
      fontFamily: "Raleway, sans-serif",
      fontSize: 30,
      fontWeight: 900,
      color: Color.Chalkboard,
    },
    h3: {
      fontSize: 25,
      fontFamily: "'Raleway', sans-serif",
      fontWeight: 600,
      color: Color.Charcoal,
    },
    h4: {
      fontSize: 30,
      fontFamily: "'Lato', sans-serif",
      fontWeight: 700,
      color: "rgb(3, 55, 47)",
    },
    h5: {
      fontSize: 24,
      fontFamily: "'Raleway', sans-serif",
      fontWeight: 700,
      color: "rgb(3, 55, 47)",
    },
    h6: {
      fontSize: 20,
      fontFamily: "'Raleway', sans-serif",
      fontWeight: 300,
      color: "rgb(244, 240, 220)",
    },
    subHeading: {
      fontSize: 16,
      fontFamily: "'Lato', sans-serif",
      fontWeight: 600,
      color: "#1DBC9D",
    },
    body1: {
      fontSize: 14,
      fontFamily: "'Raleway', sans-serif",
      fontWeight: 400,
    },
    body2: {
      fontSize: 16,
      fontFamily: "'Raleway', sans-serif",
      fontWeight: 400,
      color: "rgb(3, 55, 47)",
    },
  },
});
