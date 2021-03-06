#encoding=utf8
#Auto Deploy for Lab_Management Project

from fabric import Connection,task,Config
# from invoke import task
from datetime import datetime
import os,re,shutil

HOST='192.168.97.61'
USERNAME='tendatest'
PORT='22'
PASSWORD='tendatest'

con=Connection(host=HOST,user=USERNAME,port=PORT,connect_kwargs={'password':PASSWORD})

_TAR_FILE='app.tar.gz'
_REMOTE_BASE_DIR='/srv/Lab_management'

# 将本地项目根路径下app目录源码文件打包成tar.gz,并上传至Ubuntu系统/usr/backup路径下，此目录已更改为普通用户权限
@task
def build(c):
    # 远程主机执行命令
    result=con.run('cat /proc/version')
    shutil.make_archive(base_name='app',format='gztar',root_dir=os.path.join(os.path.abspath('.'), 'app'))
    con.put("app.tar.gz","/srv/app.tar.gz")
    # con.run('tar -zxvf /srv/backup/app.tar.gz -C ')

# 部署任务，Linux系统有权限限制，注意更改目录写权限
@task
def deploy(context):
    newdir='app-%s' % datetime.now().strftime('%y-%m-%d_%H.%M.%S')
    con.run("mkdir /srv/%s" % newdir)
    # 将压缩包解压到指定目录，删除压缩包，删除app
    con.run("tar -zxvf /srv/app.tar.gz -C /srv/%s" % newdir)
    con.run("rm -rf /srv/app.tar.gz")
    con.run("rm -rf /srv/Lab_mangement/app")
    # 创建软连接至app目录
    con.run("ln -s /srv/%s /srv/Lab_mangement/app" % newdir)
    # con.run("/etc/init.d/nginx reload")
    con.run('ps ax | grep nginx')

# 重新拉起uwsgi和nginx服务
@task
def startserver(context):
    con.run('killall -9 uwsgi')
    con.run('uwsgi --ini /srv/Lab_mangement/uwsgi_cnf.ini')
    con.sudo('/etc/init.d/nginx reload',password='tendatest')



