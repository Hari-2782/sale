from prophet import Prophet
import pandas as pd
from pyspark.sql import SparkSession

class Forecaster:
    def __init__(self):
        self.spark = SparkSession.builder.appName("Forecasting").getOrCreate()
        self.sales = self.spark.read.csv("data/sales_dataset.csv", header=True, inferSchema=True)
        
    def generate_forecast(self):
        sales_df = self.sales.select("Date", "Weekly_Sales").toPandas()
        sales_df = sales_df.rename(columns={"Date": "ds", "Weekly_Sales": "y"})
        sales_df["ds"] = pd.to_datetime(sales_df["ds"], format="%d/%m/%Y")
        model = Prophet(yearly_seasonality=True, weekly_seasonality=True, daily_seasonality=True)
        model.fit(sales_df)
        
        # Create future dataframe for forecasting
        future = model.make_future_dataframe(periods=30)  # Forecast for 30 days
        forecast = model.predict(future)
        
        # Select relevant columns
        forecast = forecast[["ds", "yhat", "yhat_lower", "yhat_upper"]].tail(30)
        
        # Convert to API response format
        result = [
            {
                "date": row.ds.strftime("%Y-%m-%d"),
                "product": "Product A",
                "forecast": row.yhat,
                "lowerBound": row.yhat_lower,
                "upperBound": row.yhat_upper
            }
            for row in forecast.itertuples()
        ]
        
        return result