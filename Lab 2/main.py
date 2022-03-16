from typing import Optional
from fastapi import FastAPI, Form
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    a: int
    b: int

@app.get("/plus")
def plus(a: Optional[str], b: Optional[str]):
    return {
        "result": int(a)+int(b)
    }

@app.post("/plus-form")
async def plus_form(a = Form(...), b = Form(...)):
    return {
        "result": int(a)+int(b)
    }

@app.post("/plus-json")
async def create_item(item: Item):
    return {
        "result": item.a + item.b
    }
