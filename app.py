from flask import Flask, render_template
from flask_bootstrap import Bootstrap
from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired
import os
import json

app = Flask(__name__)
Bootstrap(app)

class change_message(FlaskForm):
    name = StringField('Nachricht', validators=[DataRequired()])

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
    return render_template('index_old.html', **templateData)


@app.route("/admin", methods=['GET', 'POST'])
def admin():
    form = change_message()
    with open('nachricht.json') as json_file:
        message = json.load(json_file)

    # if form.validate_on_submit():
        # todo
        # return

    return render_template('admin.html', form=form)

if __name__ == "__main__":
    app.run(debug=True, host='127.0.0.1', port=8080, passthrough_errors=True)