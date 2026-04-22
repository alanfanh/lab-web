# -*- coding: utf-8 -*-

from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, SelectField
from wtforms.validators import DataRequired, Length


#添加仓库的表单
class AddDepotForm(FlaskForm):
    depotname = StringField('仓库名称', validators=[DataRequired(), Length(1, 30)],render_kw = {"maxlength":"30"})
    template = SelectField('模板',validators=[DataRequired()],choices=[(1, '模板1'), (2, '模板2'),(3,'模板3')],
        default = 1,coerce=int)
    submit = SubmitField('保存')

