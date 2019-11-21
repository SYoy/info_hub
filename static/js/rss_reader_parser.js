const swr_bw = 'https://www.swr.de/~rss/swraktuell/swraktuell-bw-100.xml'
const swr_school = 'http://www.planet-schule.de/rss.xml'

$(document).ready(function() {
    loadRSS(swr_school, '#RSS-feed');
});

function loadRSS(link, htmlContainer) {
    var url = link;
    var container = $(htmlContainer);

    feednami.load(url, function(result){
        if (result.error) {
            console.log(result.error);
        } else {
            var entries = result.feed.entries;
            for(var i = 0; i < 1; i++){
                var entry = entries[i];
                container.append("<li class=\"RSScard\"><p><h2>"
                    + "<a " +
                    // "href=\"" + entry.link + "\" target=\"_blank\"
                    ">" + entry.title + "</a>"
                    // + "<a>" + entry.content + "</a>"
                    + "</li>");
                container.innerHTML=entry.content;
            }
        }
    });
}