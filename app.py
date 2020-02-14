from flask import Flask, render_template, flash, redirect
from flask_bootstrap import Bootstrap
from config import Config
from admin_forms import LoginForm, Change_message, Admin_user
import os
import json

app = Flask(__name__)
app.config.from_object(Config)
Bootstrap(app)
admin_user = Admin_user()

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


@app.route("/admin", methods=['GET', 'POST'])
def admin():
    if not admin_user.is_auth():
        return redirect("/login")

    form = Change_message()
    if form.validate_on_submit():
        with open('nachricht.json', 'r') as json_file:
            message = json.load(json_file)
            message["inhalt"] = form.message.data if len(form.message.data) > 4 else "Willkommen in der Pfiffikus-Lernhilfe Wiesloch!"

        with open('nachricht.json', 'w') as json_file:
            json.dump(message, json_file)

        flash("success!")
        return render_template('admin.html', form=form)

    flash("invalid - rendered standard message")
    return render_template('admin.html', form=form)

@app.route("/login", methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        flash('Login requested for user {}'.format(
            form.username.data))

        ret = admin_user.login(form.username.data, form.password.data)
        if ret:
            flash("Login successful!")
            return redirect('/admin')
        else:
            flash("Login denied!")

    return render_template('login.html', title='Sign In', form=form)

if __name__ == "__main__":
    app.run(debug=False, host='0.0.0.0', port=8080, passthrough_errors=True)
