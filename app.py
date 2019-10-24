from flask import Flask, render_template
from flask_bootstrap import Bootstrap
import datetime

app = Flask(__name__)
Bootstrap(app)

@app.route("/", methods=['GET', 'POST'])
def index():

    templateData = {
        'title': 'Info-Hub Pfiffikus Lernhilfe'#,
        #'time': datetime.datetime.now().strftime(%H:%M:%S)
    }
    return render_template('index.html', **templateData)

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=8080, passthrough_errors=True)