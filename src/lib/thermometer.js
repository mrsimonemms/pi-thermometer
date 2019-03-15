/**
 * thermometer
 */

/* Node modules */
const fs = require('fs');
const path = require('path');
const util = require('util');

/* Third-party modules */

/* Files */


const config = {
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
  const devices = await util.promisify(fs.readdir)(config.folder);

  const device = devices.find(item => item.startsWith('28-'));

  if (!device) {
    throw new Error('No temperature sensor found');
  }

  return path.join(config.folder, device, config.suffix);
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

  /* Return the number, rounded to 1dp */
  return Math.round(temp[1] / 100) / 10;
};
