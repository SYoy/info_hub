// Your Client ID can be retrieved from your project in the Google
// Developer Console, https://console.developers.google.com
var CLIENT_ID = '618850417922-on3eth3su88u0c13lqs4eaod40hkojhn.apps.googleusercontent.com';
var API_KEY = 'AIzaSyCf9pALBGw6VQBEmH6PwLXb7rO3AnUgP9g';
var CAL_ID = 'nldm89pqes04qoig1kui225ucs@group.calendar.google.com';
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
    return 1;
    /** needs bugfix */

    d = new Date();
    if (date.slice(11,13) >= d.getHours() && parseInt(date.slice(14,16)) + 5 >= d.getMinutes()) {
        return 1;
    } else {
        return 0;
    }
}
/**
 function eventInFutureToday(date) {
    d = new Date();
    x = new Date(date)
    if (x.getHours() >= d.getHours() && parseInt(x.getMinutes()) + 5 >= parseInt(d.getMinutes())) {
        if (x.getUTCDate() == d.getUTCDate()) {
        return 1;
        } else {
            return 0;
        }
    } else {
        return 0;
    }
}
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */
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