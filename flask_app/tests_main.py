import unittest
from main import app, db, Task  

class APITestCase(unittest.TestCase):
    def setUp(self):
        """Set up a temporary database for testing."""
        app.config["TESTING"] = True
        app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///:memory:"  # Use in-memory database
        app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
        self.app = app.test_client()  # Flask test client
        self.app.testing = True
        with app.app_context():
            db.create_all()  # Create all tables

    def tearDown(self):
        """Drop all the tables after testing."""
        with app.app_context():
            db.session.remove()
            db.drop_all()

    def test_create_task(self):
        """Test creating a new task."""
        new_task = {"title": "Test Task", "description": "This is a test task."}
        response = self.app.post('/todo/tasks', json=new_task)
        self.assertEqual(response.status_code, 201)
        json_data = response.get_json()
        self.assertEqual(json_data["title"], "Test Task")
        self.assertEqual(json_data["description"], "This is a test task.")

    def test_get_all_tasks(self):
        """Test getting all tasks."""
        # Create a task
        new_task = {"title": "Test Task", "description": "This is a test task."}
        self.app.post('/todo/tasks', json=new_task)

        #test if task at the list
        response = self.app.get('/todo/tasks')
        self.assertEqual(response.status_code, 200)
        json_data = response.get_json()
        self.assertEqual(len(json_data), 1)  # one should be added
        self.assertEqual(json_data[0]["title"], "Test Task")

    def test_update_task(self):
        """Test updating a task."""
        new_task = {"title": "Test Task", "description": "This is a test task."}
        response = self.app.post('/todo/tasks', json=new_task)
        task_id = response.get_json()['id']

        update_data = {"title": "Updated Task", "description": "This is updated."}
        response = self.app.put(f'/todo/tasks/{task_id}', json=update_data)
        self.assertEqual(response.status_code, 200)

        response = self.app.get(f'/todo/tasks/{task_id}')
        json_data = response.get_json()
        self.assertEqual(json_data["title"], "Updated Task")
        self.assertEqual(json_data["description"], "This is updated.")

    def test_delete_task(self):
        """Test deleting a task."""
        new_task = {"title": "Test Task", "description": "This is a test task."}
        response = self.app.post('/todo/tasks', json=new_task)
        task_id = response.get_json()['id']

        response = self.app.delete(f'/todo/tasks/{task_id}')
        self.assertEqual(response.status_code, 204)

        response = self.app.get(f'/todo/tasks/{task_id}')
        self.assertEqual(response.status_code, 404)

    def test_get_single_task(self):
        """Test fetching a single task by ID."""
        new_task = {"title": "Test Task", "description": "This is a test task."}
        response = self.app.post('/todo/tasks', json=new_task)
        task_id = response.get_json()['id']

        response = self.app.get(f'/todo/tasks/{task_id}')
        self.assertEqual(response.status_code, 200)
        json_data = response.get_json()
        self.assertEqual(json_data["title"], "Test Task")
        self.assertEqual(json_data["description"], "This is a test task.")

if __name__ == '__main__':
    unittest.main()
