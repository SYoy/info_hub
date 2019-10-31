from flask import Flask, render_template
from flask_bootstrap import Bootstrap
import os
import json

app = Flask(__name__)
Bootstrap(app)

@app.route("/", methods=['GET', 'POST'])
def index():
    pics = os.listdir('./static/slideshow')
    DoSlideShow = True if len(pics) > 1 and len(pics) < 10 else False

    with open('nachricht.json') as json_file:
        message = json.load(json_file)

    templateData = {
        'title': 'Info-Hub Pfiffikus Lernhilfe',
        'slideshow': DoSlideShow,
        'infoMessage': message['inhalt'],
        'pictures': [os.path.join('static','slideshow', pic) for pic in pics]
    }
    return render_template('index.html', **templateData)

if __name__ == "__main__":
    app.run(debug=True, host='127.0.0.1', port=8080, passthrough_errors=True)