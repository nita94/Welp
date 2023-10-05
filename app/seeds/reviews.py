from app.models import db, Review

def seed_reviews():
    r1 = Review(
        user_id=1,
        business_id=2,
        content="Great sandwiches and the soup of the day was delicious!",
        rating=5
    )
    r2 = Review(
        user_id=2,
        business_id=3,
        content="Love the variety in taco fillings here!",
        rating=4
    )
    r3 = Review(
        user_id=3,
        business_id=4,
        content="The sourdough bread is a must-try!",
        rating=5
    )
    r4 = Review(
        user_id=4,
        business_id=5,
        content="A lovely selection of teas and the ambiance is great for a quiet read.",
        rating=5
    )
    r5 = Review(
        user_id=5,
        business_id=6,
        content="The ramen is just perfect for a chilly day!",
        rating=5
    )
    r6 = Review(
        user_id=6,
        business_id=1,
        content="A classic diner with generous portions!",
        rating=4
    )

    db.session.add(r1)
    db.session.add(r2)
    db.session.add(r3)
    db.session.add(r4)
    db.session.add(r5)
    db.session.add(r6)
    db.session.commit()

def undo_reviews():
    db.session.execute('TRUNCATE reviews;')
    db.session.commit()
# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built-in function to do this. With PostgreSQL in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# SQLite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
