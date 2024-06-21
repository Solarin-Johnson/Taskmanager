from database import todos
from model import Todo
from fast

async def new_todo(todo: Todo):
    try:
        todos.put(todo)
        return {'message': "Todo Added!", "data": todo}
    except Exception as e:
        print(e)
        return {'message': "Todo Added!", "data": todo}