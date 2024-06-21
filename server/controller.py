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