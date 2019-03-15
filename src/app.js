/**
 * app
 */

/* Node modules */

/* Third-party modules */
const express = require('express');
const promclient = require('prom-client');

/* Files */
const config = require('./config');
const thermometer = require('./lib/thermometer');

const register = new promclient.Registry();

const app = express();

console.log('---');
console.log(JSON.stringify(config, null, 2));
console.log('---');

if (config.metrics.showDefault) {
  promclient.collectDefaultMetrics({
    register,
    timeout: 5000,
  });
}

const temperature = new promclient.Gauge(({
  name: config.location.name,
  help: 'Temperature in ° celsius',
  labelNames: [
    'timestamp',
  ],
}));

register.registerMetric(temperature);

app
  .get('/metrics', async (req, res) => {
    try {
      const temp = await thermometer();
      temperature.set({
        timestamp: Math.round(Date.now() / 1000),
      }, temp);

      res.set('content-type', 'text/plain')
        .send(await register.metrics());
    } catch (err) {
      console.log('Error', err.stack);

      res.status(500)
        .send({
          message: err.message,
          stack: err.stack,
        });
    }
  })
  .listen(config.server.port, () => {
    console.log(`Running on port ${config.server.port}`);
  });
