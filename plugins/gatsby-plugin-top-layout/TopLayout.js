import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider, makeStyles } from "@material-ui/core/styles";
import theme from "../../src/theme";

const useStyles = makeStyles({
  "@global": {
    "html, body, #root": {
      minHeight: "100vh",
      height: "100%",
    },
    a: {
      textDecoration: "none",
    },
  },
});

export default function TopLayout(props) {
  useStyles();

  return (
    <React.Fragment>
      <Helmet>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Baloo+Thambi+2:300,400,500,700&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {props.children}
      </ThemeProvider>
    </React.Fragment>
  );
}

TopLayout.propTypes = {
  children: PropTypes.node,
};
