import pandas as pd
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

app = FastAPI()

# Allow CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

electricity_df = pd.read_csv("data.csv")
i = 10

@app.get("/")
def get_data():
    global i
    i = 10
    data = electricity_df.head(10).to_dict(orient='records')
    return JSONResponse(content=data)


@app.get("/get_next")
def get_next():
    global i
    data = electricity_df.iloc[i].to_dict()
    i += 1
    return JSONResponse(content=data)