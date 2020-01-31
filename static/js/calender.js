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
  console.log("[Calender] loaded Calender API");
  gapi.client.load('calendar', 'v3', listUpcomingEvents);

  window.setInterval(function(){
        gapi.client.load('calendar', 'v3', listUpcomingEvents);
    }, 60000); // 10 s -> 2-3min
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

/**
 * check if date object is in future with delay of 15 min
 */

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

function clearTable(table) {
  var rows = table.rows;
  var i = rows.length;
  while (--i) {
    rows[i].parentNode.removeChild(rows[i]);
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
    // reset table
    clearTable(table);

    var rowCount = table.rows.length;

    if (events.length > 0) {
      for (i = 0; i < events.length; i++) {
        var event = events[i];
        var from = event.start.dateTime;
        var till = event.end.dateTime;

        if (eventInFutureToday(from)) {
            appendPre(event.summary + ' (' + from.slice(11,16) + ' - ' + till.slice(11,16) + ')') // hard coded date slicing
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

      appendPre('keine Kurse eingetragen');
    }

  });
  console.log("[Calender] listed upcoming event");
}