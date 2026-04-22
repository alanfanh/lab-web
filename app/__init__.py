#-*-coding:utf-8-*-
import sys
from flask import Flask
from flask_bootstrap import Bootstrap
from flask_mail import Mail
from flask_moment import Moment
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_dropzone import Dropzone
from flask_migrate import Migrate
from config import config

sys.path.append("..")
bootstrap = Bootstrap()
mail = Mail()
moment = Moment()
db = SQLAlchemy()
# 替代manager.py中的MigrateCommand，直接在app/__init__.py中创建Migrate对象并初始化
migrate = Migrate()
dropzone = Dropzone()
login_manager = LoginManager()
login_manager.session_protection = 'strong'
login_manager.login_view = 'auth.login'
login_manager.login_message = '请先登录'

def create_app(config_name='default'):
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    config[config_name].init_app(app)
    from flask_admin import Admin
    from flask_admin.contrib.sqla import ModelView
    admin = Admin(app, name='实验室管理系统')
    # 初始化插件
    bootstrap.init_app(app)
    mail.init_app(app)
    moment.init_app(app)
    db.init_app(app)
    login_manager.init_app(app)
    dropzone.init_app(app)
    migrate.init_app(app, db)
    # 自动注册shell上下文
    @app.shell_context_processor
    def make_shell_context():
        # 执行flask shell命令时会自动导入这些模型，方便调试和测试
        from app.models import User, Role, T1, T2, T3, Book, Depot, Template
        return dict(db=db, User=User, Role=Role, T1=T1, T2=T2, T3=T3, Book=Book, Depot=Depot, Template=Template)
    # 注册Flask-Admin视图
    from app.models import User, Role, T1, T2, T3, Book, Depot, Template
    admin.add_view(ModelView(User, db.session, name='用户管理', endpoint='admin_user_views'))
    admin.add_view(ModelView(Role, db.session, name='角色管理', endpoint='admin_role'))
    admin.add_view(ModelView(T1, db.session, name='竞品仓管理', endpoint='admin_t1'))
    admin.add_view(ModelView(T2, db.session, name='固定资产仓管理', endpoint='admin_t2'))
    admin.add_view(ModelView(T3, db.session, name='耗材仓管理', endpoint='admin_t3'))
    admin.add_view(ModelView(Book, db.session, name='图书管理', endpoint='admin_book'))
    admin.add_view(ModelView(Depot, db.session, name='仓库管理', endpoint='admin_depot'))
    admin.add_view(ModelView(Template, db.session, name='模板管理', endpoint='admin_template'))
    # 注册蓝图
    from app.views.auth import auth_bp
    from app.views.book import book_bp
    from app.views.depot import depot_bp
    from app.views.user import user_bp
    from app.views.main import main_bp
    from app.views.record import record_bp
    app.register_blueprint(auth_bp)
    app.register_blueprint(main_bp)
    app.register_blueprint(user_bp)
    app.register_blueprint(depot_bp)
    app.register_blueprint(book_bp)
    app.register_blueprint(record_bp)
    return app
