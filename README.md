# pi-thermometer

Digital thermometer for a Raspberry Pi

# Installation

> This assumes you want to run this on startup.

- Install Node
- Install library dependencies - `npm i --production`
- Set the `LOCATION_NAME` envvar in `app.yaml`
- Deploy - `npm run deploy`
- Restart on boot - `npm run startup`

# Configuration

Set any of the following environment variables:

- `LOCATION_NAME` string (required): Sets the location name for the Prometheus
gauge.
- `METRICS_SHOW_DEFAULT` boolean: If `false` it won't display the default metrics.
Defaults to `true`.
- `METRICS_TEMP_OFFSET` number: Offsets the temperature, useful for correcting if
the result is slightly different to ambient temperature. Defaults to `0`
- `SERVER_PORT` number: The port the server runs on. Defaults to `3000`.

# Troubleshooting

## No temperature sensor found

This is due to your Pi not being configured to read GPIO ports correctly. To
fix this, open `/boot/config.txt` and add:

```
dtoverlay=w1-gpio,gpiopin=4
```

Once this has been saved, you will need to restart your Pi

# Thanks to Tim Fernando

This was taken from a post by [Tim Fernando](https://www.hackster.io/timfernando/a-raspberry-pi-thermometer-you-can-access-anywhere-33061c)
and his associated [Python repo](https://github.com/timfernando/temperature-serve-pi).
I rewrote this because I wanted to use it in Prometheus format.
