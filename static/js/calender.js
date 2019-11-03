// Your Client ID can be retrieved from your project in the Google
// Developer Console, https://console.developers.google.com
var CLIENT_ID = config.CLIENT_ID;
var API_KEY = config.API_KEY;
var CAL_ID = config.CAL_ID;
var SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];
var d;


/**
 * Load Google Calendar client library. List upcoming events
 * once client library is loaded.
 */
function loadCalendarApi() {
  gapi.client.setApiKey(API_KEY);
  gapi.client.load('calendar', 'v3', listUpcomingEvents);
}

/**
 * Append a pre element to the body containing the given message
 * as its text node.
 *
 * @param {string} message Text to be placed in pre element.
 */

function appendPre(message) {
  var pre = document.getElementById('output');
  var textContent = document.createTextNode(message + '\n');
  pre.appendChild(textContent);
}

function eventInFutureToday(date) {

    d = new Date(); /** Datumsobjekt - Zeit jetzt */
    ref = new Date(date)

    if (ref.getUTCFullYear() == d.getUTCFullYear() && ref.getUTCMonth() == d.getUTCMonth() &&
        ref.getUTCDate() == d.getUTCDate()) {

        if (ref.getUTCHours() > d.getUTCHours()) {
            return 1;
        } else if (ref.getUTCHours() == d.getUTCHours()) {
            if (ref.getUTCMinutes() >= d.getUTCMinutes() - 10) { /* 10 min delay till event vanishes */
                return 1;
            } else {
                return 0;
            }
        } else {
            return 0;
        }
    } else {
        return 0;
    }
}

function listUpcomingEvents() {
  var request = gapi.client.calendar.events.list({
    'calendarId': CAL_ID,
    'timeMin': (new Date()).toISOString(),
    'showDeleted': false,
    'singleEvents': true,
    'maxResults': 8,
    'orderBy': 'startTime'
  });

  request.execute(function(resp) {
    var events = resp.items;
    appendPre('Anstehende Kurse:');

    var table = document.getElementById("dynamictable");
    var rowCount = table.rows.length;

    if (events.length > 0) {
      for (i = 0; i < events.length; i++) {
        var event = events[i];
        var from = event.start.dateTime;
        /* if (!from) {
          from = event.start.date;
        }
        */
        var till = event.end.dateTime;
        if (eventInFutureToday(from)) {
            appendPre(event.summary + ' (' + from.slice(11,16) + ' - ' + till.slice(11,16) + ')')

            var row = table.insertRow(rowCount);

            row.insertCell(0).innerHTML= event.summary;
            row.insertCell(1).innerHTML= from.slice(11,16) + ' - ' + till.slice(11,16);
            rowCount += 1;
        }
      }
    } else {
        var row = table.insertRow(rowCount);

        row.insertCell(0).innerHTML= 'keine';
        row.insertCell(1).innerHTML= ':)';
        rowCount += 1;

      appendPre('heute keine Kurse mehr');
    }

  });
}