from app.models import db, Review

def seed_reviews():
    r1 = Review(
        user_id=1,
        business_id=1,
        content="Great sandwiches and the soup of the day was delicious!",
        rating=5
    )
    r2 = Review(
        user_id=2,
        business_id=1,
        content="A classic diner with generous portions!",
        rating=4
    )

    r3 = Review(
        user_id=3,
        business_id=2,
        content="Love the variety in taco fillings here!",
        rating=4
    )
    r4 = Review(
        user_id=4,
        business_id=2,
        content="Another visit, another great meal!",
        rating=5
    )

    r5 = Review(
        user_id=5,
        business_id=3,
        content="The sourdough bread is a must-try!",
        rating=5
    )
    r6 = Review(
        user_id=6,
        business_id=3,
        content="The tacos here never disappoint!",
        rating=5
    )

    r7 = Review(
        user_id=7,
        business_id=4,
        content="A lovely selection of teas and the ambiance is great for a quiet read.",
        rating=5
    )
    r8 = Review(
        user_id=8,
        business_id=4,
        content="I can't get enough of their pastries!",
        rating=5
    )

    r9 = Review(
        user_id=9,
        business_id=5,
        content="The ramen is just perfect for a chilly day!",
        rating=5
    )
    r10 = Review(
        user_id=10,
        business_id=5,
        content="Noodles are my go-to comfort food!",
        rating=4
    )

    r11 = Review(
        user_id=1,
        business_id=6,
        content="Always a good meal at the diner!",
        rating=4
    )
    r12 = Review(
        user_id=2,
        business_id=6,
        content="The sandwiches here are fantastic!",
        rating=5
    )

    r13 = Review(
        user_id=3,
        business_id=7,
        content="Freshly squeezed juices and smoothies!",
        rating=5
    )
    r14 = Review(
        user_id=4,
        business_id=7,
        content="Great variety of fresh juices!",
        rating=4
    )

    r15 = Review(
        user_id=5,
        business_id=8,
        content="A tire shop offering a wide range of tires and services.",
        rating=3
    )
    r16 = Review(
        user_id=6,
        business_id=8,
        content="Excellent service, quick tire replacement!",
        rating=4
    )

    r17 = Review(
        user_id=7,
        business_id=9,
        content="A cozy coffee shop with a selection of coffee and pastries.",
        rating=4
    )
    r18 = Review(
        user_id=8,
        business_id=9,
        content="The coffee here is amazing!",
        rating=5
    )

    r19 = Review(
        user_id=9,
        business_id=10,
        content="Delicious kebabs from around the world.",
        rating=5
    )
    r20 = Review(
        user_id=10,
        business_id=10,
        content="The kebabs here are a must-try!",
        rating=5
    )

    db.session.add(r1)
    db.session.add(r2)
    db.session.add(r3)
    db.session.add(r4)
    db.session.add(r5)
    db.session.add(r6)
    db.session.add(r7)
    db.session.add(r8)
    db.session.add(r9)
    db.session.add(r10)
    db.session.add(r11)
    db.session.add(r12)
    db.session.add(r13)
    db.session.add(r14)
    db.session.add(r15)
    db.session.add(r16)
    db.session.add(r17)
    db.session.add(r18)
    db.session.add(r19)
    db.session.add(r20)

    db.session.commit()

def undo_reviews():
    db.session.execute('TRUNCATE reviews;')
    db.session.commit()
