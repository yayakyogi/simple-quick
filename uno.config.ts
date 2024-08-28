import { defineConfig, presetIcons, presetMini } from "unocss";

export default defineConfig({
  theme: {
    colors: {
      danger: "#EB5757",
      black: "#4F4F4F",
      blue: "#2F80ED",
      gray: "#F2F2F2",
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
