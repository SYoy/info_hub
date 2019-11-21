// Your Client ID can be retrieved from your project in the Google
// Developer Console, https://console.developers.google.com
var CLIENT_ID = config.CLIENT_ID;
var API_KEY = config.API_KEY;
var CAL_ID = config.CAL_ID;
var SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];
var current_time;


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

    current_time = new Date(); /** Datumsobjekt - Zeit jetzt */
    event_start_time = new Date(date)

    if (event_start_time.getUTCFullYear() == current_time.getUTCFullYear() && event_start_time.getUTCMonth() == current_time.getUTCMonth() &&
        event_start_time.getUTCDate() == current_time.getUTCDate()) {

        if (event_start_time.getUTCHours() > current_time.getUTCHours()) {
            return 1;
        } else if (event_start_time.getUTCHours() == current_time.getUTCHours()) { /* same hour */
            if (event_start_time.getUTCMinutes() >= current_time.getUTCMinutes() - 15) { /* 15 min delay till event vanishes */
                return 1;
            } else {
                return 0;
            }
        } else if (event_start_time.getUTCHours() == current_time.getUTCHours() - 1 && current_time.getUTCMinutes() < 14) { /* hour before but in 15 min range */
            if (event_start_time.getUTCMinutes() >= 60 + current_time.getUTCMinutes() - 15) {
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
    'maxResults': 15,
    'orderBy': 'startTime'
  });

  request.execute(function(resp) {
    var events = resp.items;
    appendPre('aktuelle Kurszeiten');

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
            if (rowCount <= 7) {
                var row = table.insertRow(rowCount);

                row.insertCell(0).innerHTML= event.summary.slice(0,35); /* pad string ? https://stackoverflow.com/questions/2686855/is-there-a-javascript-function-that-can-pad-a-string-to-get-to-a-determined-leng */
                row.insertCell(1).innerHTML= from.slice(11,16) + ' - ' + till.slice(11,16);
                rowCount += 1;
            }
        }
      }
    } else {
        var row = table.insertRow(rowCount);

        row.insertCell(0).innerHTML= 'keine Kurse in Kalender eingetragen';
        row.insertCell(1).innerHTML= '/';
        rowCount += 1;

      appendPre('heute keine Kurse mehr');
    }

  });
}