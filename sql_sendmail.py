#-*-coding:utf-8-*-
"""
邮件催还功能模块
"""
from apscheduler.schedulers.background import BackgroundScheduler
import smtplib
import time
from email.mime.text import MIMEText
from email.header import Header
import datetime
import pymysql
# from app.models import Role,User,T1,T2,T3,Depot,Template,Book


# 连接数据库配置，dict格式
CONFIG = {
    'host': '127.0.0.1',
    'port': 3306,
    'user': 'root',
    'passwd': '',
    'db': 'test',
    'charset': 'utf8',
    'cursorclass': pymysql.cursors.DictCursor
}
# CONNECT = pymysql.Connect(**CONFIG)
# CURSOR = CONNECT.cursor()
# # print('cursor=', cursor)
# def execute(sql):
#     connect = pymysql.Connect(**CONFIG)
#     cursor = connect.cursor()
#     cursor.execute(sql)
#     return cursor


def get_admin_mail():
    """
    获取users表中管理员账户的e-mail,并返回
    """
    sql = "SELECT email FROM users WHERE username = '%s'"
    username = 'admin'
    CONNECT = pymysql.Connect(**CONFIG)
    CURSOR = CONNECT.cursor()
    CURSOR.execute(sql % username)
    email = CURSOR.fetchall()
    # print(email[0]['email'])
    return email

def get_t1s_info():
    """
    获取t1s表中所有条目的produc_name,username,usermail,backtime
    通过status进行过滤,status=2,即为借出状态
    """
    sql = "SELECT product_name,username,usermail,back_time FROM t1s WHERE status=2 "
    connect = pymysql.Connect(**CONFIG)
    cursor = connect.cursor()
    cursor.execute(sql)
    info = [i for i in cursor.fetchall()]
    connect.commit()
    cursor.close()
    connect.commit()
    connect.close()
    # print('T1_info=',info)
    return info


def get_t2s_info():
    """
    获取t2s表中所有条目status=2的product_name,username,usermail,backtime
    """
    sql = "SELECT product_name,username,usermail,back_time FROM t2s WHERE status=2"
    connect = pymysql.Connect(**CONFIG)
    cursor = connect.cursor()
    cursor.execute(sql)
    info = [i for i in cursor.fetchall()]
    connect.commit()
    cursor.close()
    connect.commit()
    connect.close()
    # print("T2_info=", info)
    return info

def get_t3s_info():
    """
    获取t3s表中所有条目status=2的product_name,username,usermail,backtime
    """
    sql = "SELECT product_name,username,usermail,back_time FROM t3s WHERE status=2"
    connect = pymysql.Connect(**CONFIG)
    cursor = connect.cursor()
    cursor.execute(sql)
    info = [i for i in cursor.fetchall()]
    connect.commit()
    cursor.close()
    connect.commit()
    connect.close()
    # print('T3_info=', info)
    return info

def get_books_info():
    """
    获取books表中所有条目status=2的bookname,username,usermail,backtime
    """
    sql = "SELECT bookname,username,usermail,backtime FROM books WHERE status=2"
    connect = pymysql.Connect(**CONFIG)
    cursor = connect.cursor()
    cursor.execute(sql)
    info = [i for i in cursor.fetchall()]
    connect.commit()
    cursor.close()
    connect.commit()
    connect.close()
    # print('book_info=', info)
    return info


def get_to_list():
    """
    将获取3个仓库表的函数得到返回值info添加到all_info
    all_info为list数据,list中的元素为dict类型数据。
    对已经获取到数据进行处理，去掉未达到归还时间的记录。返回to_list
    """
    all_info = []
    info1 = get_t1s_info()
    info2 = get_t2s_info()
    info3 = get_t3s_info()
    all_info.extend(info1)
    all_info.extend(info2)
    all_info.extend(info3)
    info = all_info
    # print("all_info=", info)
    to_list = []
    for i in info:
        if i['username'] != None:
            # print(i['username'])
            back_time = i['back_time']
            today = datetime.date.today()
            # print((back_time-today).days)
            if (back_time-today).days <= 2:
                to_list.append(i)
    # 去掉重复
    # to_list = list(set(to_list))
    print("to_list=", to_list)
    return to_list

def get_books_list():
    """
    处理books表借书记录的数据，去掉未达到归还时间的记录
    """
    book_info = get_books_info()
    # print("book_info=", book_info)
    to_list = []
    for i in book_info:
        if i['username'] != "":
            # print(i['username'])
            backtime = i['backtime']
            today = datetime.date.today()
            if (backtime-today).days <= 2:
                to_list.append(i)
    print('book_to_list=', to_list)
    return to_list


# 邮箱配置：
MAIL = {
    'host': 'smtp.tenda.cn',
    'user': 'shiyanshi@tenda.cn',
    'passwd': '',
}

# 定义邮件发送函数
def send_email(to_addr, msg):
    """
    封装smtplib库邮件发送邮件相关代码
    """
    server = smtplib.SMTP()
    server.connect(MAIL['host'])
    server.login(MAIL['user'], MAIL['passwd'])
    server.sendmail(MAIL['user'], to_addr, msg.as_string())
    server.close()

# 发送催还邮件
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
            content1 = "%s,您借用的%s已到归还时间，请及时归还给实验室管理员。" % (i['username'], i['product_name'])
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
            content = "%s,您借用的%s已到归还时间，请及时归还给实验室管理员。" % (i['username'], i['bookname'])
            msg = MIMEText(
                content, _subtype='plain', _charset='utf-8')
            msg['Subject'] = Header(sub, "utf-8")
            msg['From'] = MAIL['user']
            msg['To'] = i['usermail']
            send_email(to_addr=i['usermail'], msg=msg)




scheduler = BackgroundScheduler()
scheduler.add_job(send_lend_mail, 'cron', day_of_week='mon-fri', hour=10, minute=24)

if __name__ == "__main__":
    # get_books_list()
    # MSG1 = MIMEText(
    #     '测试', _subtype='plain', _charset='utf-8')
    # MSG1['Subject'] = 'test'
    # MSG1['From'] = MAIL['user']
    # MSG1['To'] = 'fanhao@tenda.cn'
    # # send_email(to_addr='fanhao@tenda.cn', msg=MSG1)
    # get_books_list()
    # send_lend_mail(sub='测试')
    # 
    scheduler.start()
    try:
        while True:
            time.sleep(120)
            print('Tick! The time is: %s' % datetime.datetime.now())
    except (KeyboardInterrupt, SystemExit):
        scheduler.shutdown()
        print('Exit The Job!')
