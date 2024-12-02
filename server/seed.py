#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
from faker import Faker
from config import app, db
from models import Story, Content, Source, StorySource

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        
        # Seed code goes here!

        #seed code for stories
        for _ in range(5):
            story = Story(
                title=fake.sentence(),
                topic=fake.word(),
                image=fake.image_url()
            )
            db.session.add(story)
        db.session.commit()

        #seed code for source
        for _ in range(5):
            source = Source(
                name=fake.name(),
                title=fake.job(),
                phone=fake.phone_number(),
                email=fake.email()
            )
            db.session.add(source)
        db.session.commit()

        #seed code for content
        stories = Story.query.all()
        for _ in range(10):
            content = Content(
                body=fake.text(),
                story_id=rc(stories).id
            )
            db.session.add(content)
        db.session.commit()

        #seed code for StorySource
        stories = Story.query.all()
        sources = Source.query.all()
        for _ in range(10):
            story_source = StorySource(
                story_id=rc(stories).id,
                source_id=rc(sources).id,
                role=fake.word()
            )
            db.session.add(story_source)
        db.session.commit()

        print("seeding all set!")
