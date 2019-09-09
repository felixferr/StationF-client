module.exports = {
  presets: ["@vue/app"],

  devServer: {
    proxy: `http://localhost:3000/`
  }
};
