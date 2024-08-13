export const colorTokensDark = {
  grey: {
    0: "#ffffff",
    10: "#f6f6f6",
    50: "#f0f0f0",
    100: "#e0e0e0",
    200: "#c2c2c2",
    300: "#a3a3a3",
    400: "#858585",
    500: "#666666",
    600: "#525252",
    700: "#3d3d3d",
    800: "#292929",
    900: "#141414",
    1000: "#000000",
  },
  primary: {
    //blue
    100: "#d3d4de",
    200: "#a6a9be",
    300: "#7a7f9d",
    400: "#4d547d",
    500: "#21295c",
    600: "#1a214a",
    700: "#141937",
    800: "#0d1025",
    900: "#070812",
  },
  secondary: {
    //yellow
    100: "#fff6e0",
    200: "#ffedc2",
    300: "#ffe3a3",
    400: "#ffda85",
    500: "#ffd166",
    600: "#cca752",
    700: "#997d3d",
    800: "#665429",
    900: "#332a14",
  },
};

function reverseTokens(tokensDark) {
  const reversedTokens = {};
  Object.entries(tokensDark).forEach(([key, value]) => {
    const keys = Object.keys(value);
    const values = Object.values(value);
    const reversedObj = {};

    for (let i = 0; i < keys.length; i++) {
      reversedObj[keys[i]] = values[keys.length - i - 1];
    }

    reversedTokens[key] = reversedObj;
  });

  return reversedTokens;
}

export const colorTokensLight = reverseTokens(colorTokensDark);

//mui theme settings
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            primary: {
              ...colorTokensDark.primary,
              main: colorTokensDark.primary[400],
              light: colorTokensDark.primary[400],
            },

            secondary: {
              ...colorTokensDark.secondary,
              main: colorTokensDark.secondary[300],
            },

            neutral: {
              ...colorTokensDark.grey,
              main: colorTokensDark.grey[500],
            },

            background: {
              default: colorTokensDark.primary[600],
              alt: colorTokensDark.primary[500],
            },
          }
        : {
            primary: {
              ...colorTokensLight.primary,
              main: colorTokensDark.grey[50],
              light: colorTokensDark.grey[100],
            },

            secondary: {
              ...colorTokensLight.secondary,
              main: colorTokensDark.secondary[600],
              light: colorTokensDark.secondary[700],
            },

            neutral: {
              ...colorTokensLight.grey,
              main: colorTokensDark.grey[500],
            },

            background: {
              default: colorTokensDark.grey[0],
              alt: colorTokensDark.grey[10],
            },
          }),
    },

    typography: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};
