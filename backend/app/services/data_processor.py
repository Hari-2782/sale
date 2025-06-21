from pyspark.sql import SparkSession
from pyspark.sql.functions import sum as _sum, count, month, year
from datetime import datetime
import os

class DataProcessor:
    def __init__(self):
        self.spark = SparkSession.builder.appName("DashboardData").getOrCreate()
        # Go up two levels from this file to reach the project root
        base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
        data_dir = os.path.join(base_dir, "data")
        self.stores = self.spark.read.csv(os.path.join(data_dir, "stores_dataset.csv"), header=True, inferSchema=True)
        self.features = self.spark.read.csv(os.path.join(data_dir, "Features_dataset.csv"), header=True, inferSchema=True)
        self.sales = self.spark.read.csv(os.path.join(data_dir, "sales_dataset.csv"), header=True, inferSchema=True)

    def calculate_key_metrics(self):
        # Calculate total revenue
        total_revenue = self.sales.agg(_sum("Weekly_Sales").alias("total")).collect()[0]["total"]
        
        # Calculate active users (assuming unique stores or departments as proxy)
        active_users = self.sales.select("Store").distinct().count()
        
        # Calculate sales growth (last month vs previous)
        current_month = datetime.now().month
        last_month = current_month - 1 if current_month > 1 else 12
        
        current_sales = self.sales.filter(month("Date") == current_month).agg(_sum("Weekly_Sales").alias("total")).collect()[0]["total"] or 0
        previous_sales = self.sales.filter(month("Date") == last_month).agg(_sum("Weekly_Sales").alias("total")).collect()[0]["total"] or 0
        
        sales_growth = ((current_sales - previous_sales) / previous_sales * 100) if previous_sales > 0 else 0

        return {
            "totalRevenue": {
                "value": round(total_revenue, 2),
                "changeDescription": "+20.1% from last month"  # Static for demo, replace with dynamic calculation
            },
            "activeUsers": {
                "value": active_users,
                "changeDescription": "+180.1% from last month"  # Static for demo
            },
            "salesGrowth": {
                "value": round(sales_growth, 2),
                "changeDescription": "Compared to last quarter"
            }
        }

    def get_sales_history(self):
        sales_by_month = self.sales.groupBy(month("Date").alias("month")).agg(_sum("Weekly_Sales").alias("sales")).collect()
        month_names = {1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "May", 6: "Jun", 7: "Jul", 8: "Aug", 9: "Sep", 10: "Oct", 11: "Nov", 12: "Dec"}
        return [
            {"month": month_names[row["month"]], "sales": row["sales"]}
            for row in sales_by_month if row["month"] is not None
        ]