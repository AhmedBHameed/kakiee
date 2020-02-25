module.exports = {
  stories: ["../src/**/*.stories.(js|tsx)"],
  addons: [
    "@storybook/preset-create-react-app",
    "@storybook/addon-actions",
    "@storybook/addon-knobs",
    "@storybook/addon-storysource",
    "@storybook/addon-links",
    "@storybook/addon-jest/register"
    // {
    //   name: "@storybook/addon-docs",
    //   options: {
    //     configureJSX: true
    //   }
    // }
  ],
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve("babel-loader"),
      options: {
        presets: [["react-app", { flow: false, typescript: true }]]
      }
    });
    config.resolve.extensions.push(".ts", ".tsx");
    return config;
  }
};
