from pydantic import BaseModel, model_validator
from typing import Optional

class Todo(BaseModel):
    title: str
    favourite: bool
    description: str

class UpdateTodo(BaseModel):
    title: str = None
    favourite: bool = None
    description: str = None
    
    @model_validator(mode='after')
    def check_non_empty(cls, values):
        if not values.get('description') and not values.get('title') and not values.get('favourite'):
            raise ValueError('At least one of "title", "description" or "favourite" must be provided and cannot be None.')
        return values