import joblib
import pandas as pd
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


logreg_model = joblib.load('logreg_churn_model.joblib')

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)


class CustomerData(BaseModel):
    dependents: str
    device_protection: str
    gender: str
    monthly_contract: str
    multiple_lines: str
    online_backup: str
    online_security: str
    paperless_billing: str
    partner: str
    senior_citizen: str
    streaming_movies: str
    streaming_tv: str
    tech_support: str
    internet_service: str
    num_services: str
    payment_method: str
    start_month: str
    start_year: str
    type: str
    monthly_charges: float
    tenure_days: int


@app.post("/predict-churn/")
def predict_churn(customer_data: CustomerData):
    df = pd.DataFrame([customer_data.model_dump()])

    proba = logreg_model.predict_proba(df)[0][1]

    threshold = 0.488
    prediction = int(proba >= threshold)

    return {
        "churn_prediction": prediction,
        "churn_probability": proba
    }
