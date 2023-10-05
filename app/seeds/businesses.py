from app.models import db, Business

def seed_businesses():
    demo1_business = Business(
        owner_user_id=1, 
        name="Demo1's Diner", 
        description="A classic diner with a variety of options.",
        address="101 Main St, Cityville"
    )
    demo2_business = Business(
        owner_user_id=2, 
        name="Demo2's Deli", 
        description="Fresh sandwiches and soups made daily.",
        address="202 Elm St, Cityville"
    )
    tom_business = Business(
        owner_user_id=3, 
        name="Tom's Tacos", 
        description="A spot for taco lovers.",
        address="303 Pine St, Cityville"
    )
    grace_business = Business(
        owner_user_id=4, 
        name="Grace's Grains", 
        description="A bakery with a variety of bread and pastries.",
        address="404 Oak St, Cityville"
    )
    toni_business = Business(
        owner_user_id=5, 
        name="Toni's Tea House", 
        description="A peaceful place for tea enthusiasts.",
        address="505 Maple St, Cityville"
    )
    nick_business = Business(
        owner_user_id=6, 
        name="Nick's Noodles", 
        description="Delicious noodle dishes from various cuisines.",
        address="606 Birch St, Cityville"
    )


    db.session.add(demo1_business)
    db.session.add(demo2_business)
    db.session.add(tom_business)
    db.session.add(grace_business)
    db.session.add(toni_business)
    db.session.add(nick_business)
    db.session.commit()

def undo_businesses():
    db.session.execute('TRUNCATE businesses;')
    db.session.commit()
# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built-in function to do this. With PostgreSQL in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# SQLite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.businesses RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM businesses"))

    db.session.commit()
