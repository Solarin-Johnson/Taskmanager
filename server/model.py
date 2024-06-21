from pydantic import BaseModel

class Todo(BaseModel):
    title: str
    favourite: bool
    description: str