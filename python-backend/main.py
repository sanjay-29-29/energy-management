import pandas as pd
import numpy as np
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
predicted_df = pd.read_csv("data_pred.csv")

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


@app.get("/get_total_energy")
def get_predicited_energy():
    data = predicted_df[['Time', 'Total']].to_dict(orient='records')
    return JSONResponse(content=data)

@app.get("/get_predicted_energy")
def get_predicted_total():
    data = predicted_df[['Actual']]
    data = data.replace([np.inf, -np.inf], np.nan)
    data = data.dropna()
    data = data.to_dict(orient='records')
    return data