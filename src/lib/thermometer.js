/**
 * thermometer
 */

/* Node modules */
const fs = require('fs');
const path = require('path');
const util = require('util');

/* Third-party modules */

/* Files */
const config = require('../config');

const filePath = {
  folder: '/sys/bus/w1/devices/',
  suffix: '/w1_slave',
};

/**
 * Get Temp Sensor
 *
 * Gets the
 * @returns {Promise<number | never | bigint | T | T>}
 */
async function getTempSensor() {
  const devices = await util.promisify(fs.readdir)(filePath.folder);

  const device = devices.find(item => item.startsWith('28-'));

  if (!device) {
    throw new Error('No temperature sensor found');
  }

  return path.join(filePath.folder, device, filePath.suffix);
}

module.exports = async function getTemperature() {
  /* Get the location of the sensor data */
  const sensor = await getTempSensor();

  const sensorData = await util.promisify(fs.readFile)(sensor, 'utf8');

  const data = sensorData.split('\n');

  /* Response should have at least 2 lines and first line end "YES" */
  if (data.length < 2 || /YES$/.test(data[0]) === false) {
    throw new Error('Temperature sensor not ready');
  }

  /* Get the raw temperature number */
  const temp = data[1].match(/t=(-?\d+)$/);

  if (!temp) {
    throw new Error('Temperature invalid');
  }

  /* Do all the calculation as integers to avoid floating point errors */
  let tempOutput = Math.round(temp[1] / 100);
  tempOutput += (config.metrics.tempOffset * 10);
  tempOutput /= 10;

  return tempOutput;
};
