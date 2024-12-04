#!/usr/bin/env python3

from models import db, Story, Content, Source, StorySource
from flask_migrate import Migrate
from flask import request, make_response
from flask_restful import Resource
from werkzeug.exceptions import NotFound
from config import app, db, api

migrate = Migrate(app, db)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'

@app.route('/')
def index():
    return '<h1>Storyline Server</h1>'

###CRUD FOR STORIES
class Stories(Resource):
####GET -- Gets all stories or a story with a specific id
    def get(self, id=None):
        try:
            if id:
                story = Story.query.get(id)
                if not story:
                    return make_response({"error": f"story with id {id} not found"}, 404)
                return make_response(story.to_dict(), 200)
            else:
                stories = Story.query
                return make_response([story.to_dict() for story in stories], 200)
        except Exception as e:
            return make_response({"error": str(e)}, 500)
    
####POST -- creates a new story
    def post(self):
        try:
            data = request.get_json()
            new_story = Story(
                title=data["title"],
                topic=data["topic"],
                image=data.get("image")
            )
            db.session.add(new_story)
            db.session.commit()
            return make_response(new_story.to_dict(), 201)
        except Exception as e:
            return make_response({"error": str(e)}, 500)
    
####PATCH -- updates an existing story by id
    def patch(self, id):
        try:
            story = Story.query.get(id)
            if not story:
                return make_response({"error": f"story with id {id} not found"}, 404)
            data = request.get_json()
            
            story.title = data.get("title", story.title)
            story.topic = data.get("topic", story.topic)
            story.image = data.get("image", story.image)
            
            db.session.commit()
            return make_response(story.to_dict(), 200)
        except Exception as e:
            return make_response({"error": str(e)}, 500)

####DELETE -- deletes a story by id
    def delete(self, id):
        try:
            story = Story.query.get(id)
            if not story:
                return make_response({"message": f"story with id {id} not found"}, 404)
            db.session.delete(story)
            db.session.commit()
            return make_response({"message": f"story with id {id} deleted!"}, 200)
        except Exception as e:
            return make_response({"error": str(e)}, 500)

api.add_resource(Stories, "/stories", "/stories/<int:id>")


####CRUD FOR CONTENTS
class Contents(Resource):
####GET -- Gets all contents or the content of a story with a specific id
    def get(self, id=None):
        try: 
            if id:
                content = Content.query.get(id)
                if not content:
                    return make_response({"error": f"content with id {id} not found"}, 404)
                return make_response(content.to_dict(), 200)
            else:
                contents = Content.query
                return make_response([content.to_dict() for content in contents], 200)
        except Exception as e:
            return make_response({"error": str(e)}, 500)

####PATCH -- updates the existing body of content by id
    def patch(self, id):
        try:
            content = Content.query.get(id)
            if not content:
                return make_response({"error": f"content with id {id} not found"}, 404)
            data = request.get_json()
            content.body = data.get("body", content.body)
            db.session.commit()
            return make_response(content.to_dict(), 200)
        except Exception as e:
            return make_response({"error": str(e)}, 500)        

api.add_resource(Contents, "/contents", "/contents/<int:id>")


####CRUD FOR SOURCES
class Sources(Resource):
#### GET -- gets all sources or one source by id   
    def get(self, id=None):
        try:
            if id:
                source = Source.query.get(id)
                if not source:
                    return make_response({"error": f"source with id {id} not found"}, 404)
                return make_response(source.to_dict(), 200)
            else:
                sources = Source.query
                return make_response([source.to_dict() for source in sources], 200)
        except Exception as e:
            return make_response({"error": str(e)}, 500)
        

#### POST -- creates a new source
    def post(self):
        try:
            data = request.get_json()
            new_source = Source(
                name=data["name"],
                title=data["title"],
                phone=data["phone"],
                email=data["email"]
            )
            db.session.add(new_source)
            db.session.commit()
            return make_response(new_source.to_dict(), 201)
        except Exception as e:
            return make_response({"error": str(e)}, 500)

####PATCH -- updates an existing source by id
    def patch(self, id):
        try:
            source = Source.query.get(id)
            if not source:
                return make_response({"error": f"source with id {id} not found"}, 404)
            data = request.get_json()
          
            source.name = data.get("name", source.name)
            source.title = data.get("title", source.title)
            source.phone = data.get("phone", source.phone)
            source.email = data.get("email", source.email)
          
            db.session.commit()
            return make_response(source.to_dict(), 200)
        except Exception as e:
            return make_response({"error": str(e)}, 500)

####DELETE -- deletes a source by id
    def delete(self, id):
        try:
            source = Source.query.get(id)
            if not source:
                return make_response({"message": f"source with id {id} not found"}, 404)
            db.session.delete(source)
            db.session.commit()
            return make_response({"message": f"source with id {id} deleted!"}, 200)
        except Exception as e:
            return make_response({"error": str(e)}, 500)
   
api.add_resource(Sources, "/sources", "/sources/<int:id>")


####CRUD FOR STORYSOURCES
class StorySources(Resource):
    ####GET -- Gets all StorySources
    def get(self):
        try:
            story_sources = StorySource.query
            return make_response([story.to_dict() for story in story_sources], 200)
        except Exception as e:
            return make_response({"error": str(e)}, 500)
        
# ## create route, retrieve top 3 sources w most stories -- explain how you're routing (RESTful), test it in postman

#     def get(self):
#         try:
#          # query database to grab all records
#            most_source = StorySource.query
#          # handle not responses
#             if not most_source:
#                 return make_response("message": f"could not return sources with most stories")
#          # handle responses that do match condition
#             return make_response(source_id.to_dict() for  in most_source)
#          # return response 

#         except Exception as e: 
#             return make_response({"error": "message"})


####POST -- creates a new storysource
    def post(self):
        try:
            data = request.get_json()
            new_story_sources = StorySource(
                story_id=data["story_id"],
                source_id=data["source_id"],
                role=data.get("role")
            )
            db.session.add(new_story_sources)
            db.session.commit()
            return make_response(new_story_sources.to_dict(), 201)
        except Exception as e:
            return make_response({"error": str(e)}, 500)    

api.add_resource(StorySources, "/storysources/", "/moststorysources"  )


if __name__ == '__main__':
    app.run(port=5555, debug=True)