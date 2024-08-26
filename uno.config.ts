import { defineConfig, presetIcons, presetMini } from "unocss";

export default defineConfig({
  // ...UnoCSS options
  theme: {
    colors: {
      danger: "#EB5757",
      black: "#4F4F4F",
      blue: "#2F80ED",
    },
    fontSize: {
      // md: "14px",
      // lg: "16px",
    },
  },
  presets: [
    presetMini(),
    presetIcons({
      collections: {
        mdi: () =>
          import("@iconify-json/mdi/icons.json").then((i) => i.default),
      },
    }),
  ],
});
