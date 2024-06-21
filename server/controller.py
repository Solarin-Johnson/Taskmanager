from database import todos
from model import Todo
from fastapi.responses import JSONResponse
from fastapi import status
from schema import todo_serializer, todos_serializer

async def get_todos():
    try:
        all = todos.fetch()._items
        return JSONResponse(content={'message': "Todos", "data": todos_serializer(all)}, status_code=status.HTTP_200_OK) if todos else JSONResponse(status_code=status.HTTP_404_NOT_FOUND, content={'message': 'Todos Empty!'})
    except Exception as e:
        print(e)
        return JSONResponse(content={'message': "Unable to get todo"}, status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)

async def new_todo(todo: Todo):
    try:
        new = todos.insert(todo)
        return JSONResponse(content={'message': "Todo Added!", "data": new}, status_code=status.HTTP_201_CREATED)
    except Exception as e:
        print(e)
        return JSONResponse(content={'message': "Unable to add todo"}, status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)

async def find_todo(id: str):
    try:
        todo = todos.get(id)
        return JSONResponse(content={'message': "Todo Found!", "data": todo_serializer(todo)}, status_code=status.HTTP_200_OK) if todo else JSONResponse(status_code=status.HTTP_404_NOT_FOUND, content={'message': 'Invalid Todo key!'})
    except Exception as e:
        print(e)
        return JSONResponse(content={'message': "Unable to find todo"}, status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)