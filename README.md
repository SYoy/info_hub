# info_hub

## Usage - Google Calender:
- create `config.js` file in `static/js/` and add following content:

```
var config = {
    CLIENT_ID : 'enter google client ID from https://console.developers.google.com',
    API_KEY : 'enter google api key from https://console.developers.google.com',
    CAL_ID : 'CALENDERID@group.calendar.google.com',
};
```

- make the google calend public available and events to it

## Usage - Slideshow:

- add pictures with resolution format 16:9 to `static/slideshow/`-folder and restart the app.py

## Usage - News:

- change the message in `nachricht.json` as follows:

```
{
  "inhalt": "write a new message write here!"
}
```

- do not change `"inhalt"`