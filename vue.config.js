module.exports = {
  transpileDependencies: [],
  configureWebpack: {
    mode: "production",
    optimization: {
      nodeEnv: "production",
      minimize: true,
      splitChunks: {
        chunks: 'all'
      }
    },
  },
};
