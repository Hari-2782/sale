from fastapi import APIRouter
from app.services.data_processor import DataProcessor
from app.services.forecaster import Forecaster
from pydantic import BaseModel
from typing import List

router = APIRouter(prefix="/api/dashboard", tags=["dashboard"])

# Pydantic models for API responses
class Metric(BaseModel):
    value: float
    changeDescription: str

class KeyMetrics(BaseModel):
    totalRevenue: Metric
    activeUsers: Metric
    salesGrowth: Metric

class SalesHistory(BaseModel):
    month: str
    sales: float

class SalesForecast(BaseModel):
    date: str
    product: str
    forecast: float
    lowerBound: float
    upperBound: float

# Initialize services
data_processor = DataProcessor()
forecaster = Forecaster()

@router.get("/key-metrics", response_model=KeyMetrics)
async def get_key_metrics():
    metrics = data_processor.calculate_key_metrics()
    return metrics

@router.get("/sales-history", response_model=List[SalesHistory])
async def get_sales_history():
    history = data_processor.get_sales_history()
    return history

@router.get("/sales-forecast", response_model=List[SalesForecast])
async def get_sales_forecast():
    forecast = forecaster.generate_forecast()
    return forecast

@router.get("")
async def dashboard_root():
    return {"message": "Dashboard API root"}