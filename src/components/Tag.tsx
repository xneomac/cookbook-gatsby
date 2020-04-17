import React from "react";
import {
  Chip,
  ChipProps,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core";
import toMaterialStyle from "material-color-hash";

interface Props extends Omit<ChipProps, "label" | "variant" | "color"> {
  name: string;
  color?: string;
  selected?: boolean;
}

export default function Tag({ name, selected, color, ...props }: Props) {
  const theme = createMuiTheme({
    palette: {
      primary: { main: color || toMaterialStyle(name, 700).backgroundColor },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Chip
        variant={selected ? "default" : "outlined"}
        color="primary"
        label={name}
        {...props}
      />
    </ThemeProvider>
  );
}
