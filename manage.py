#-*-coding:utf-8-*-
"""
app程序的路口文件
"""
import os
import smtplib
from email.mime.text import MIMEText
from email.header import Header
from apscheduler.schedulers.background import BackgroundScheduler
from flask_migrate import Migrate
# from app.emails import send_mail
from app import db, create_app
from sql_sendmail import get_to_list, get_books_list, MAIL

# 1. 创建app实例
app = create_app(os.getenv('FLASK_CONFIG') or 'default')
# 2. 创建数据库迁移对象
migrate = Migrate(app, db)


# --- 发送催还邮件 --- #
def send_email(to_addr, msg):
    """
    封装smtplib库邮件发送邮件相关代码
    """
    server = smtplib.SMTP()
    server.connect(MAIL['host'])
    server.login(MAIL['user'], MAIL['passwd'])
    server.sendmail(MAIL['user'], to_addr, msg.as_string())
    server.close()

def send_lend_mail(sub="[系统邮件,勿回]物品归还提醒"):
    """
    执行邮件发送动作
    """
    to_list = get_to_list()
    book_to_list = get_books_list()
    if to_list != []:
        # 清除邮箱列表可能存在
        # if None in to_list:
        #     for i in to_list:
        #         if i is None:
        #             to_list.remove(i)
        for i in to_list:
            content1 = "%s,您借用的%s已到归还时间，请及时归还给实验室管理员。" % (
                i['username'], i['product_name'])
                
            print('88', type(content1))
            msg = MIMEText(content1, _subtype='plain', _charset='utf-8')
            msg['Subject'] = Header(sub, "utf-8")
            msg['From'] = MAIL['user']
            msg['To'] = i['usermail']
            # print('msg=',msg)
            send_email(to_addr=i['usermail'], msg=msg)
    # time.sleep(20)
    if book_to_list != []:
        for i in book_to_list:
            content = "%s,您借用的%s已到归还时间，请及时归还给实验室管理员。" % (
                i['username'], i['bookname'])
            msg = MIMEText(
                content, _subtype='plain', _charset='utf-8')
            msg['Subject'] = Header(sub, "utf-8")
            msg['From'] = MAIL['user']
            msg['To'] = i['usermail']
            send_email(to_addr=i['usermail'], msg=msg)

# --- 程序入口 --- #
if __name__ == '__main__':
    # 定时任务
    scheduler = BackgroundScheduler()
    scheduler.add_job(send_lend_mail, 'cron', day_of_week='mon-fri', hour=11, minute=22)
    print('Press Ctrl+{0} to exit'.format('Break' if os.name == 'nt' else 'C'))
    if not app.debug or os.environ.get('WERKZEUG_RUN_MAIN') == 'true':
        scheduler.start()
        print('**Scheduler started!**')
    # send_lend_mail(sub='测试')
    try:
        # app.run替代manager.run()，直接运行app实例，避免了使用Flask-Script时可能出现的多线程问题
        app.run(host='0.0.0.0', port=4000, debug=True)
    except (KeyboardInterrupt, SystemExit):
        if scheduler.running:
            scheduler.shutdown()
        print('Exit The Job!')
