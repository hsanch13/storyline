#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
from faker import Faker
from config import app, db
from models import Story, Content, Source, StorySource
import ipdb

if __name__ == "__main__":
    fake = Faker("en_US")
    with app.app_context():
        Content.query.delete()
        StorySource.query.delete()
        Story.query.delete()
        Source.query.delete()
        print("Starting seed...")

        # Seed code goes here!
        valid_topics = [
            "breaking news",
            "sports",
            "education",
            "justice",
            "politics",
            "economy",
            "health",
            "environment",
            "culture",
            "science",
            "crime",
            "human rights",
            "faith and religion",
            "business",
            "technology",
        ]
        # seed code for stories
        for _ in range(5):
            story = Story(
                title=fake.sentence(), topic=rc(valid_topics), image=fake.image_url()
            )
            db.session.add(story)
        db.session.commit()

        # seed code for source
        for _ in range(5):
            source = Source(
                name=fake.name(),
                title=fake.job(),
                phone=fake.numerify("##########"),
                email=fake.email(),
            )
            db.session.add(source)
        db.session.commit()

        # seed code for content
        stories = Story.query.all()
        for _ in range(5):
            story = rc(stories)
            stories.remove(story)
            content = Content(body=fake.text(), story_id=story.id)
            db.session.add(content)
        db.session.commit()

        # seed code for StorySource
        valid_roles = [
            "expert",
            "educator",
            "witness",
            "analyst",
            "researcher",
            "consultant",
            "spokesperson",
            "community leader",
            "advocate",
            "victim",
            "politician",
            "background",
        ]

        stories = Story.query.all()
        sources = Source.query.all()
        for _ in range(5):
            source = rc(sources)
            story = rc(stories)
            stories.remove(story)
            sources.remove(source)

            story_source = StorySource(
                story_id=(story).id, source_id=(source).id, role=rc(valid_roles)
            )
            db.session.add(story_source)
        db.session.commit()

        print("seeding all set!")
