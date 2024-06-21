from fastapi import FastAPI

app = FastAPI(title="Todos Sample")



@app.get('/')
async def get_todo():
    return []

