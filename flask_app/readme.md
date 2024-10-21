I created simply REST api for this to do list, 

To do list is mocked inside of main.py file, I was testing function inside test.py instead of postman


So if you want to test anything just go inside test.py file and for 


url = "http://127.0.0.1:5000/"


# Creating new task
new_task = {'title': 'Walk the dog', 'completed': False}
response = requests.post(url + 'tasks/create', json=new_task)
print(response.json())


# Updating task
task_id = input('select task to update (type in: task1, task2, task3):')
data = {'title': 'Buy bread (updated)', 'completed': True}
response = requests.put(url + f'tasks/{task_id}/update', json=data)
response = requests.get(url + 'tasks')
print(response.json())


# Delete task
task_id = input('select task to delete (type in: task1, task2, task3):')
response = requests.delete(url + f'tasks/{task_id}/delete')
response = requests.get(url + 'tasks')
print(response.json())


# Display only one task
task_id = input('select task to display (type in: task1, task2, task3):')
response = requests.get(url + f'tasks/{task_id}')
print(response.json())


# Get all tasks
response = requests.get(url + 'tasks')
print(response.json())

# Get all tasks
response = requests.get(url + 'tasks')
print(response.json())

