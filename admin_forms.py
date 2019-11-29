from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import DataRequired
import time

class LoginForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])
    submit = SubmitField('Sign In')


class Change_message(FlaskForm):
    message = StringField('Running message', validators=[DataRequired()])
    submit = SubmitField('Change message')

class Admin_user():
    def __init__(self):
        self.logged_in = False
        self.time = 0

    def login(self, u, pw):
        if u == "juergen" and pw == "password":
            self.logged_in = True
            self.time = time.time()
            return True
        else:
            self.logged_in = False
            return False

    def is_auth(self):
        if self.logged_in:
            if time.time() - self.time < 300:
                return True
            else:
                self.logged_in = False
                self.time = 0
                return False


