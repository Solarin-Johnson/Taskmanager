from fastapi import FastAPI
from model import Todo, UpdateTodo
from controller import new_todo, find_todo, get_todos, delete_todo, update_todo

app = FastAPI(title="Todos Sample")



@app.get('/todos', tags=['Todos'])
async def get_todo_route():
    return await get_todos()

@app.post('/todo', tags=['Add Todo'])
async def add_todo(data: Todo):
    data = dict(data)
    return await new_todo(data)

@app.get('/todo/{id}', tags=['Find Todo'])
async def find_todo_route(id: str):
    return await find_todo(id)

@app.put('/todo/{id}', tags=['Update Todo'])
async def update_todo_route(id: str, data: UpdateTodo):
    data = dict(data)
    return await update_todo(id, data)

@app.delete('/todo/{id}', tags=['Delete Todo'])
async def delete_todo_route(id: str):
    return await delete_todo(id)