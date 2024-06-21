from fastapi import FastAPI
from model import Todo
from controller import new_todo

app = FastAPI(title="Todos Sample")



@app.get('/', tags=['Todos'])
async def get_todo():
    return []

@app.post('/add', tags=['Add Todo'])
async def add_todo(data: Todo):
    data = dict(data)
    print(data: Todo)
    return await new_todo(data)