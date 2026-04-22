#-*-coding:utf-8-*-
from functools import wraps
from flask import abort,redirect,url_for
from flask_login import current_user, logout_user

#判断权限
def permission_required(permission):
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kargs):
            if not current_user.can(permission):
                abort(403)
            return f(*args, **kargs)
        return decorated_function
    return decorator
    
# def admin_required(f):
    # return permission_required(Permission.ADMINISTRATOR)(f)
    
#已经登录且具有管理员权限   
def admin_required(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        if current_user.is_authenticated and current_user.is_administrator():
            return f(*args, **kwargs)
        else:
            logout_user()
            return redirect(url_for('auth.login'))
    return wrapper
    
#未登录状态  
def unlogin_required(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        if not current_user.is_authenticated:
            return f(*args, **kwargs)
        else:
            return redirect(url_for('main.index'))
    return wrapper