# SeyrenLight

A monitoring tool (buildwall) that allows you to quickly display failing checks for Seyren.

**Disclaimer:** This project is a modified clone of [JenkinsLight](https://github.com/M6Web/JenkinsLight).

## Installation

#### Clone the project

```
$ git clone https://github.com/M6Web/SeryenSeyren.git
$ cd SeyrenLight
```

#### Install dependencies

```
$ npm install -g bower grunt-cli
$ npm install
$ bower install
```

## Configuration

Please configure a new `app/scripts/config.js` file from [`app/scripts/config.js.dist`](app/scripts/config.js.dist).

Seyren options :

* **CI.Seyren.URL** : Seyren server url
* **CI.SERYEN.CHECKS_TO_BE_DISPLAYED** : array of all check states that can be displayed :
  * *ERROR* : failing check,
  * *WARN* : warning check,
  * *OK* : succeeding check.

Display options :

* **MAX_CHECKS_PER_LINE** : maximum number of checks displayed per line
* **REFRESH_TIME** : refresh time (ms)
* **BACKGROUND_BLANK_SCREEN_URL** : background image url use if no job are dislayed

Then you have to build the server code.

```shell
$ grunt build
```

Your server root url must target the `dist` folder.

## Use

Use `filter` query parameter to apply a regexp to results.

```
http://seyren-light-url/index.html#?filter=production
```

## Installation for dev

#### Install dependencies

```
$ sudo npm install --no-bin-links
$ bower install
```

[Configure your application](#configuration) via `app/scripts/config.js`.

#### Run the server

```
$ grunt server
```

You can now access the application at `http://localhost:8888`.

## Credits

Developed by the [Cytron Team](http://cytron.fr/) of [M6 Web](http://tech.m6web.fr/).

## License

[SeryenLight](https://github.com/M6Web/SeryenLight) is licensed under the [MIT license](LICENSE).
