/**
 * config
 */

/* Node modules */

/* Third-party modules */

/* Files */

module.exports = {
  location: {
    name: process.env.LOCATION_NAME,
  },
  metrics: {
    showDefault: process.env.METRICS_SHOW_DEFAULT !== 'false',
    tempOffset: Number(process.env.METRICS_TEMP_OFFSET || 0),
  },
  server: {
    port: Number(process.env.SERVER_PORT || 3000),
  },
};
