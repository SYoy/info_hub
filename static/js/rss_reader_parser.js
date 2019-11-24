const swr_bw = 'https://www.swr.de/~rss/swraktuell/swraktuell-bw-100.xml';
const swr_school = 'http://www.planet-schule.de/rss.xml';

$(document).ready(function() {
    loadRSS(swr_bw, '#RSS-feed');
    console.log("[RSS] initialized RSS-feed");

    window.setInterval(function(){
        loadRSS(swr_bw, '#RSS-feed');
        console.log("[RSS] updated RSS Feed");
    }, 60000);


});

function loadRSS(link, htmlContainer) {
    const url = link;
    // const container = $(htmlContainer);
    var container = document.querySelector(htmlContainer);

    feednami.load(url, function(result){
        if (result.error) {
            console.log(result.error);
        } else {
            var entries = result.feed.entries;
            var used_i = [];

            // reset contain / div content
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }

            // add new content
            for(var i = 0; i < 2; i++){
                while(true) {
                    var rand_i = Math.floor(Math.random() * 20);
                    if (used_i.includes(rand_i) === false) {
                        used_i.push(rand_i);
                        var entry = entries[rand_i];
                        break
                    }
                }

                var li = document.createElement('li');
                var a = document.createElement('h2');
                var div = document.createElement('div');

                a.innerHTML = entry.title;
                div.innerHTML = entry.description;
                li.appendChild(a);
                li.appendChild(div.firstChild);
                container.appendChild(li);
            }
        }
    });
}

//EOF