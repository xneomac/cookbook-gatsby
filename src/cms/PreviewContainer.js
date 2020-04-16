import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/styles";
import { create } from "jss";
import { jssPreset, StylesProvider } from "@material-ui/styles";
import theme from "../theme";

export default class PreviewContainer extends React.Component {
  state = {
    ready: false,
  };

  handleRef = (ref) => {
    const ownerDocument = ref ? ref.ownerDocument : null;
    this.setState({
      ready: true,
      jss: create({
        ...jssPreset(),
        insertionPoint: ownerDocument
          ? ownerDocument.querySelector("#demo-frame-jss")
          : null,
      }),
      sheetsManager: new Map(),
    });
  };

  render() {
    const { children } = this.props;

    return (
      <React.Fragment>
        <div id="demo-frame-jss" ref={this.handleRef} />
        <link
          href="https://fonts.googleapis.com/css?family=Baloo+Thambi+2:300,400,500,700&display=swap"
          rel="stylesheet"
        />
        {this.state.ready ? (
          <StylesProvider
            jss={this.state.jss}
            sheetsManager={this.state.sheetsManager}
          >
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {children}
            </ThemeProvider>
          </StylesProvider>
        ) : null}
      </React.Fragment>
    );
  }
}
