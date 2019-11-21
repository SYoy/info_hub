const swr_bw = 'https://www.swr.de/~rss/swraktuell/swraktuell-bw-100.xml'
const swr_school = 'http://www.planet-schule.de/rss.xml'

$(document).ready(function() {
    loadRSS(swr_bw, '#RSS-feed');
});

function loadRSS(link, htmlContainer) {
    var rand_i = Math.floor(Math.random() * 10);
    var url = link;
    var container = $(htmlContainer);

    feednami.load(url, function(result){
        if (result.error) {
            console.log(result.error);
        } else {
            var entries = result.feed.entries;
            //for(var i = 0; i < 1; i++){
            //var entry = entries[i];

            var entry = entries[rand_i];
            container.append("<li>"// <p><h2>"
                + "<h2 " +
                // "href=\"" + entry.link + "\" target=\"_blank\"
                ">" + entry.title + "</h2> \n"
                + "<div>" + entry.description + "</div>"
                + "</li>");
            //}
        }
    });
}

/*
var container = document.querySelector('#RSS-feed');
var num = 1;

feednami.load(swr_school,function(result){
  if(result.error){
    console.log(result.error)
  }
  else{
    var entries = result.feed.entries
    for(var i = 0; i < num; i++){
      var entry = entries[i]
      var li = document.createElement('li');
      var a = document.createElement('h3');
      var div = document.createElement('div'); //,{ style : 'font-size: 10px;' }

      a.innerHTML = entry.title;
      // a.href = entry.link;

      div.innerHTML = entry.description;

      li.appendChild(a);
      li.appendChild(div.firstChild);

      container.appendChild(li);
    }
  }
});
*/
