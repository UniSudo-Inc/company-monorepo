/** @type {import("@babel/core").ConfigFunction} */
module.exports = function config(api) {
  api.cache.forever();

  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@': './src',
          },
        },
      ],
    ],
  };
};
