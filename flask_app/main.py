from flask import Flask, jsonify, request
from flask_restful import Api, Resource, reqparse
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
db = SQLAlchemy()
api = Api(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///sqlite.db"  
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

class Task(db.Model):
    __tablename__ = "tasks"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=True)  
    done = db.Column(db.Boolean, default=False)

    def __repr__(self):
        return f"Task {self.title} - {self.done}"
    
with app.app_context():
    db.create_all()

class ListAPI(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument(
            "title",
            type=str,
            required=True,
            location="json",
        )
        self.reqparse.add_argument(
            "description",
            type=str,
            default="",
            location="json",
        )
        super(ListAPI, self).__init__()

    def get(self):
        tasks = Task.query.all()
        return [
            {
                "id": task.id,
                "title": task.title,
                "description": task.description,
                "done": task.done
            } for task in tasks
        ]

    def post(self):
        args = self.reqparse.parse_args()
        new_task = Task(
            title=args["title"],
            description=args["description"]
        )
        db.session.add(new_task)
        db.session.commit()
        return {
            "id": new_task.id,
            "title": new_task.title,
            "description": new_task.description,
            "done": new_task.done,
        }, 201  


class TodoDetailAPI(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument(
            "title",
            type=str,
            location="json",
        )
        self.reqparse.add_argument(
            "description",
            type=str,
            location="json",
        )
        self.reqparse.add_argument(
            "done",
            type=bool,
            location="json",
        )
        super(TodoDetailAPI, self).__init__()

    def get(self, id):
        task = Task.query.get_or_404(id)
        return {
            "id": task.id,
            "title": task.title,
            "description": task.description,
            "done": task.done,
        }

    def put(self, id):
        args = self.reqparse.parse_args()
        task = Task.query.get_or_404(id)
        task.title = args.get("title", task.title)
        task.description = args.get("description", task.description)
        task.done = args.get("done", task.done)
        db.session.commit()
        return {
            "id": task.id,
            "title": task.title,
            "description": task.description,
            "done": task.done,
        }

    def delete(self, id):
        task = Task.query.get_or_404(id)
        db.session.delete(task)
        db.session.commit()
        return '', 204  


api.add_resource(ListAPI, "/todo/tasks", endpoint="tasks")
api.add_resource(TodoDetailAPI, "/todo/tasks/<int:id>", endpoint="task")
    

if __name__ == '__main__':
    app.run(debug=True)
