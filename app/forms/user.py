# -*- coding: utf-8 -*-

from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import Length, EqualTo


#添加普通用户的表单
class AddAccountForm(FlaskForm):
    name = StringField( '名称', 
                               validators=[Length(1, 32)],
                               render_kw = {'maxlength':'30'}
                               
                               )
    username = StringField(
                                    '用户名', 
                                    validators = [Length(5, 32)],
                                    render_kw = {'maxlength':'32'}               
                                   )
    password = PasswordField(
                                        '密码',
                                        validators=[Length(5, 32)],
                                        render_kw = {'maxlength':'32'}           
                                        )
    password2 = PasswordField(
                                         '确认密码',
                                         validators=[EqualTo('password')],
                                         render_kw = {'maxlength':'32'}  
                                         )
    submit = SubmitField('保存')
    # def validate_username(self, field):
        # if field.data != current_user.username and User.query.filter_by(username=field.data).first():
            # raise ValidationError('The username is already in use.')

