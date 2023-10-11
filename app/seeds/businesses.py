from app.models import db, Business

# Adds businesses for the users, with alliteration
def seed_businesses():
    demo1_business = Business(
        owner_user_id=1, 
        name="Demo1's Diner", 
        description="A classic diner with a variety of options.",
        address="101 Main St, Cityville",
        image_url="https://images.unsplash.com/photo-1555992336-fb0d29498b13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80"
    )
    demo2_business = Business(
        owner_user_id=2, 
        name="Demo2's Deli", 
        description="Fresh sandwiches and soups made daily.",
        address="202 Elm St, Cityville",
        image_url="https://images.unsplash.com/photo-1601205741712-b261aff33a7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1282&q=80"
    )
    tom_business = Business(
        owner_user_id=3, 
        name="Tom's Tacos", 
        description="A spot for taco lovers.",
        address="303 Pine St, Cityville",
        image_url="https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
    )
    grace_business = Business(
        owner_user_id=4, 
        name="Grace's Grains", 
        description="A bakery with a variety of bread and pastries.",
        address="404 Oak St, Cityville",
        image_url="https://images.unsplash.com/photo-1568254183919-78a4f43a2877?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80"
    )
    toni_business = Business(
        owner_user_id=5, 
        name="Toni's Tea House", 
        description="A peaceful place for tea enthusiasts.",
        address="505 Maple St, Cityville",
        image_url="https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    )
    nick_business = Business(
        owner_user_id=6, 
        name="Nick's Noodles", 
        description="Delicious noodle dishes from various cuisines.",
        address="606 Birch St, Cityville",
        image_url="https://images.unsplash.com/photo-1552611052-33e04de081de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80"
    )
    justin_business = Business(
        owner_user_id=7, 
        name="Justin's Juice Bar", 
        description="Freshly squeezed juices and smoothies.",
        address="707 Cedar St, Cityville",
        image_url="https://images.unsplash.com/photo-1601924287811-e34de5d17476?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80"
    )
    ted_business = Business(
        owner_user_id=8, 
        name="Ted's Tires", 
        description="A tire shop offering a wide range of tires and services.",
        address="808 Redwood St, Cityville",
        image_url="https://images.unsplash.com/photo-1581309572124-824a67339a32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80"
    )
    carlos_business = Business(
        owner_user_id=9, 
        name="Carlos's Coffee Shop", 
        description="A cozy coffee shop with a selection of coffee and pastries.",
        address="909 Pinecone St, Cityville",
        image_url="https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80"
    )
    karl_business = Business(
        owner_user_id=10, 
        name="Karl's Kebabs", 
        description="Delicious kebabs from around the world.",
        address="1010 Willow St, Cityville",
        image_url="https://images.unsplash.com/photo-1603360946369-dc9bb6258143?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1335&q=80"
    )

    db.session.add(demo1_business)
    db.session.add(demo2_business)
    db.session.add(tom_business)
    db.session.add(grace_business)
    db.session.add(toni_business)
    db.session.add(nick_business)
    db.session.add(justin_business)
    db.session.add(ted_business)
    db.session.add(carlos_business)
    db.session.add(karl_business)
    
    db.session.commit()


def undo_businesses():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.businesses RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM businesses"))

    db.session.commit()
