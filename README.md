# pi-thermometer

Digital thermometer for a Raspberry Pi

# Installation

> This assumes you want to run this on startup.

- Install Node
- Install library dependencies - `npm i`
- Deploy - `npm run deploy`
- Restart on boot - `npm run startup`

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
