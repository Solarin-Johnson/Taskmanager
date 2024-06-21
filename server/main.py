from fastapi import FastAPI
from model import Todo
from controller import new_todo, find_todo

app = FastAPI(title="Todos Sample")



@app.get('/', tags=['Todos'])
async def get_todo_route():
    return []

@app.post('/todo', tags=['Add Todo'])
async def add_todo(data: Todo):
    data = dict(data)
    return await new_todo(data)

@app.get('/todo/{key}', tags=['Find Todo'])
async def find_todo_route(key: str):
    return await find_todo(key)