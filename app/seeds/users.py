from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo1 = User(
        username='Demo1', email='demo1@aa.io', password='password')
    demo2 = User(
        username='Demo2', email='demo2@aa.io', password='password')
    tom = User(
        username='Tom', email='tom@aa.io', password='password')
    grace = User(
        username='Grace', email='grace@aa.io', password='password')
    toni = User(
        username='Toni', email='toni@aa.io', password='password')
    nick = User(
        username='Nick', email='nick@aa.io', password='password')


    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(tom)
    db.session.add(grace)
    db.session.add(toni)
    db.session.add(nick)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built-in function to do this. With PostgreSQL in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# SQLite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
