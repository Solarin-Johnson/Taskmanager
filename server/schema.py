
def todo_serializer(todo: dict):
    return {
        'id': todo.get('key'),
        'title': todo.get('title'),
        'description': todo.get('description'),
        'favourite': todo.get('favourite'),
    }

def todos_serializer(todos: dict):
    return [todo_serializer(todo) for todo in todos]