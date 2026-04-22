#-*-coding:utf-8-*-
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, String, Integer, Text, ForeignKey
from sqlalchemy.orm import relationship, sessionmaker

# 1.创建基类
Base = declarative_base()

# 定义模型
# nullable表示列不为空，index=True表示在该列创建索引
class User(Base):
    __tablename__ = 'users'
    id = Column(Integer,primary_key=True)
    name = Column(String(64),nullable=False,index=True)
    pwd = Column(String(64),nullable=False)
    email = Column(String(64),nullable=False,index=True)
    articals = relationship('Artical')
    def __repr__(self):
        return "%s(%r)" %(self.__class__.__name__,self.name)

class Artical(Base):
    #一对多,用户可以写多篇文章
    __tablename__ = "articals"
    id = Column(Integer,primary_key=True)
    title = Column(String(255),nullable=False,index=True)
    content = Column(Text)
    user_id = Column(Integer,ForeignKey('users.id'))
    auther = relationship('User')
    def __repr__(self):
       return "%s(%r)" %(self.__class__.__name__,self.title)

# 2.创建数据库连接
URL = 'mysql+mysqldb://root:test1234@localhost:3306/blog'
engine = create_engine(URL)

def get_db_session():
    Session = sessionmaker(bind=engine)
    return Session()

if __name__ == "__main__":
    # 物理建表
    Base.metadata.create_all(engine)
    session = get_db_session()
    try:
        user = User(name='zhangsan',pwd='zhangsan',email='zhangsan@163.com')
        session.add(user)
        session.commit()
    except Exception as e:
        print(f"Error occurred: {e}")
        session.rollback()
    finally:
        session.close()