from database import todos
from model import Todo
from fastapi.responses import JSONResponse
from fastapi import status

async def new_todo(todo: Todo):
    try:
        new = todos.insert(todo)
        return JSONResponse(content={'message': "Todo Added!", "data": new}, status_code=status.HTTP_201_CREATED)
    except Exception as e:
        print(e)
        return JSONResponse(content={'message': "Unable to add todo"}, status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)

async def find_todo(key: str):
    try:
        todo = todos.get(key)
        return JSONResponse(content={'message': "Todo Found!", "data": todo}, status_code=status.HTTP_200_OK) if todo else JSONResponse(status_code=status.HTTP_404_NOT_FOUND, content={'message': 'Invalid Todo key!'})
    except Exception as e:
        print(e)
        return JSONResponse(content={'message': "Unable to find todo"}, status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)