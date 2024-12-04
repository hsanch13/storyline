from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from config import db
from better_profanity import profanity
import re

# Models go here!

class Story(db.Model, SerializerMixin):
    __tablename__ = "stories"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    topic = db.Column(db.String, nullable=False)
    image = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    # add relationship -- has many content & many sources THROUGH story_sources
    content = db.relationship("Content", back_populates="story", cascade="all, delete-orphan")
    story_sources = db.relationship("StorySource", back_populates="story", cascade="all, delete-orphan")

    # add serialization rules
    serialize_rules = ('-content', '-story_sources')

    # add validation
    @validates("title")
    def validate_title(self, _, value):
        if not isinstance(value, str):
            raise ValueError("your title must be a string")
        if len(value) not in range(1, 61):
            raise ValueError("your title must be between one and 60 characters")
        if profanity.contains_profanity(value):
            raise ValueError("your title contains inappropriate language")
        return value

    @validates("topic")
    def validate_topic(self, _, value):
        valid_topics = [
            "breaking news", "sports", "education", "justice", 
            "politics", "economy", "health", "environment", 
            "culture", "science", "crime", "human rights", 
            "faith and religion", "business", "technology"
        ]
        if not isinstance(value, str):
            raise ValueError("your topic must be a string")
        if value.lower() not in valid_topics:
            raise ValueError(f"your topic is not one of these valid topics: {valid_topics}")
        return value.lower()
    
    def __repr__(self):
        return f"<Story - Story: {self.title}, Created: {self.created_at}>"
    
class Content(db.Model, SerializerMixin):
    __tablename__ = "contents"

    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String)
    story_id = db.Column(db.Integer, db.ForeignKey("stories.id"), index=True)

    # add relationship -- BELONGS to a Story
    story = db.relationship("Story", back_populates="content")

    # add serialization rules
    serialize_rules = ('-story',)

    # add validation
    @validates("body")
    def validate_body(self, _, value):
        if not isinstance(value, str):
            raise ValueError("your body must be a string")
        if len(value) > 2500:
            raise ValueError("your body must be less than 2500 characters")
        if profanity.contains_profanity(value):
            raise ValueError("your body contains inappropriate language")
        return value

    def __repr__(self):
        return f"<Content - Story ID: {self.story_id}, Body: {self.body[:15]}>"

class Source(db.Model, SerializerMixin):
    __tablename__ = "sources"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, index=True)
    title = db.Column(db.String, index=True)
    phone = db.Column(db.String, index=True)
    email = db.Column(db.String, index=True)

    # add relationship -- BELONGS to many stories THROUGH story_source
    story_sources = db.relationship("StorySource", back_populates="source")

    # add serialization rules
    serialize_rules = ('-story_sources',)

    # add validation
    @validates("name")
    def validate_name(self, _, value):
        if not isinstance(value, str):
            raise ValueError("your name must be a string")
        if len(value) not in range(1, 61):
            raise ValueError("your name must be between one and 60 characters")
        if profanity.contains_profanity(value):
            raise ValueError("your name contains inappropriate language")
        return value

    @validates("title")
    def validate_title(self, _, value):
        if not isinstance(value, str):
            raise ValueError("your title must be a string")
        if len(value) not in range(1, 61):
            raise ValueError("your title must be between one and 60 characters")
        if profanity.contains_profanity(value):
            raise ValueError("your title contains inappropriate language")
        return value.lower()

    @validates("phone")
    def validate_phone(self, _, value):
        if not isinstance(value, str):
            raise ValueError("your phone number must be a string")
        sanitized_value = re.sub(r"[^\d]", "", value)
        if len(sanitized_value) != 10:
            raise ValueError("your phone number must be exactly 10 digits")
        existing_phone = self.query.filter_by(phone = sanitized_value).first()
        if existing_phone:
            raise ValueError("your phone number already exists in the database")
        formatted_phone = f"({sanitized_value[:3]}) {sanitized_value[3:6]}-{sanitized_value[6:]}"
        return formatted_phone
    
    @validates("email")
    def validate_email(self, _, value):
        if not isinstance(value, str):
            raise ValueError("your email must be a string")
        email_regex = r"(^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$)"
        if not re.match(email_regex, value):
            raise ValueError("your email has an invalid format")
        existing_email = self.query.filter_by(email = value).first()
        if existing_email:
            raise ValueError("your email already exists")
        return value.lower()

    def __repr__(self):
        return f"<Source - Source: {self.name}, Title: {self.title}, Email: {self.email}>"

class StorySource(db.Model, SerializerMixin):
    __tablename__ = "story_sources"
    __table_args__ = (
        db.UniqueConstraint("source_id", "story_id", name="unique_source_id_story_id",),)

    story_id = db.Column(db.Integer, db.ForeignKey("stories.id"), primary_key=True)
    source_id = db.Column(db.Integer, db.ForeignKey("sources.id"), primary_key=True)
    role = db.Column(db.String)

    # add relationship -- BELONGS to Story and Source. StorySource associates the two models
    story = db.relationship("Story", back_populates="story_sources")
    source = db.relationship("Source", back_populates="story_sources")

    # add serialization rules
    serialize_rules = ('-story', '-source')

    # add validation ## set or reset an object
    @validates("role")
    def validate_role(self, _, value):
        valid_roles = [
            "expert", "educator", "witness", 
            "analyst", "researcher", "consultant", 
            "spokesperson", "community leader", "advocate",
            "victim", "politician", "background"
        ]
        if value.lower() not in valid_roles:
            raise ValueError(f"your source is not one of these valid roles: {valid_roles}")
        if not isinstance(value, str):
            raise ValueError("your role must be a string")
        return value.lower()

    def __repr__(self):
        return f"<StorySource - Story ID:{self.story_id}, Source ID:{self.source_id}>"