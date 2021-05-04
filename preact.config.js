import { DefinePlugin } from 'webpack';

export default {
  webpack(config, env, helpers, options) {
    config.plugins.push(
      new DefinePlugin({
        'process.env.DATOCMS_API_TOKEN': JSON.stringify(process.env.DATOCMS_API_TOKEN),
      })
    );
  },
};
