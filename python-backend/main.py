import numpy as np
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn
import ngrok
import pandas as pd
import threading
import ast
from supabase import create_client, Client
from statsmodels.tsa.arima.model import ARIMA
from fastapi.responses import JSONResponse

app = FastAPI()

url = "https://foltrvqbdhiolcriszcb.supabase.co"
key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvbHRydnFiZGhpb2xjcmlzemNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQzNzMwOTMsImV4cCI6MjAyOTk0OTA5M30.TSxl7-7Fgy_TJ_OXAJ_-KXU51S3sNPzb-XOSeeh3lmQ"
supabase: Client = create_client(url, key)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def run_server():
    ngrok.set_auth_token("2dVBJw5G2bExzQ41keUUDtC0U8K_7zn55apnGM8YJ3RNsfznb")
    listener = ngrok.forward("127.0.0.1:8000", authtoken_from_env=True, domain="glowing-polite-porpoise.ngrok-free.app")
    uvicorn.run("api:app", host="127.0.0.1", port=8000)

@app.post("/predict_energy")
def predict():
    response = supabase.table('totalenergycost').select("Date, Total").execute()
    data = response.data
    data = str(data)
    data = data[1:-1]
    data = ast.literal_eval(data)  
    df = pd.DataFrame(data)
    df['Date'] = pd.to_datetime(df['Date'])
    df.set_index('Date', inplace=True)
    model = ARIMA(df['Total'], order=(3,1,3))
    model_fit = model.fit()
    prediction = model_fit.forecast(steps=12)
    prediction = prediction.round()

    result_df = pd.DataFrame({
        'Date': prediction.index.strftime('%Y-%m-%d'),
         "Prediction" : prediction
    })
    result_df.reset_index(drop=True, inplace=True)
    return JSONResponse(content=result_df.to_dict(orient="records"))

@app.post("/predict_solar")
def predict():
    response = supabase.table('totalsolarcost').select("Date, Total").execute()
    data = response.data
    data = str(data)
    data = data[1:-1]
    data = ast.literal_eval(data)  
    df = pd.DataFrame(data)
    df['Date'] = pd.to_datetime(df['Date'])
    df.set_index('Date', inplace=True)
    model = ARIMA(df['Total'], order=(3,1,3))
    model_fit = model.fit()
    prediction = model_fit.forecast(steps=12)
    prediction = prediction.round()

    result_df = pd.DataFrame({
        'Date': prediction.index.strftime('%Y-%m-%d'),
         "Prediction" : prediction
    })
    result_df.reset_index(drop=True, inplace=True)
    return JSONResponse(content=result_df.to_dict(orient="records"))

if __name__ == "__main__":
    threading.Thread(target=run_server).start()