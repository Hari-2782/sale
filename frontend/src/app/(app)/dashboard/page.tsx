// src/app/(app)/dashboard/page.tsx
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, Users, AlertTriangle, BarChartHorizontalBig, LineChart as LineChartIcon, TableIcon } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart";
import { CartesianGrid, XAxis, YAxis, Line, LineChart, ResponsiveContainer } from "recharts";
import { useState, useEffect } from 'react';

const chartConfig = {
  sales: {
    label: "Sales",
    color: "hsl(var(--primary))",
  },
} satisfies import("@/components/ui/chart").ChartConfig;

interface KeyMetricsData {
  totalRevenue: { value: number; changeDescription: string };
  activeUsers: { value: number; changeDescription: string };
  salesGrowth: { value: string; changeDescription: string };
}

interface SalesHistoryEntry {
  month: string;
  sales: number;
}

interface ForecastEntry {
  date: string;
  product: string;
  forecast: number;
  lowerBound: number;
  upperBound: number;
}

const API_BASE_URL = "http://localhost:8000/api/dashboard";

export default function DashboardPage() {
  const [keyMetrics, setKeyMetrics] = useState<KeyMetricsData | null>(null);
  const [salesHistory, setSalesHistory] = useState<SalesHistoryEntry[]>([]);
  const [forecastData, setForecastData] = useState<ForecastEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [metricsRes, historyRes, forecastRes] = await Promise.all([
          fetch(`${API_BASE_URL}/key-metrics`).catch(e => { console.error("Key Metrics fetch error:", e); return null; }),
          fetch(`${API_BASE_URL}/sales-history`).catch(e => { console.error("Sales History fetch error:", e); return null; }),
          fetch(`${API_BASE_URL}/sales-forecast`).catch(e => { console.error("Sales Forecast fetch error:", e); return null; })
        ]);

        if (metricsRes && metricsRes.ok) {
          const metricsData = await metricsRes.json();
          setKeyMetrics(metricsData);
        } else if (metricsRes) {
          console.error("Failed to fetch key metrics:", metricsRes.status, await metricsRes.text().catch(() => ""));
          setKeyMetrics({ // Default structure if API fails but we need to render cards
            totalRevenue: { value: 0, changeDescription: "Data unavailable" },
            activeUsers: { value: 0, changeDescription: "Data unavailable" },
            salesGrowth: { value: "N/A", changeDescription: "Data unavailable" }
          });
        } else {
           setKeyMetrics({ 
            totalRevenue: { value: 0, changeDescription: "Error fetching data" },
            activeUsers: { value: 0, changeDescription: "Error fetching data" },
            salesGrowth: { value: "N/A", changeDescription: "Error fetching data" }
          });
        }


        if (historyRes && historyRes.ok) {
          const historyData = await historyRes.json();
          setSalesHistory(Array.isArray(historyData) ? historyData : []);
        } else if (historyRes) {
          console.error("Failed to fetch sales history:", historyRes.status, await historyRes.text().catch(() => ""));
          setSalesHistory([]);
        } else {
          setSalesHistory([]);
        }

        if (forecastRes && forecastRes.ok) {
          const forecastDataJson = await forecastRes.json();
          setForecastData(Array.isArray(forecastDataJson) ? forecastDataJson : []);
        } else if (forecastRes) {
          console.error("Failed to fetch forecast data:", forecastRes.status, await forecastRes.text().catch(() => ""));
          setForecastData([]);
        } else {
          setForecastData([]);
        }

      } catch (e) {
        console.error("Error fetching dashboard data:", e);
        setError("Failed to load dashboard data. Please ensure the backend server is running and CORS is configured.");
        // Set default structures on general error too
        setKeyMetrics({
            totalRevenue: { value: 0, changeDescription: "Error" },
            activeUsers: { value: 0, changeDescription: "Error" },
            salesGrowth: { value: "N/A", changeDescription: "Error" }
        });
        setSalesHistory([]);
        setForecastData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8 text-foreground font-headline">Sales Dashboard</h1>
      
      {loading && <p className="text-center text-muted-foreground">Loading dashboard data...</p>}
      {error && <Card className="mb-8 bg-destructive/10 border-destructive"><CardHeader><CardTitle className="text-destructive flex items-center"><AlertTriangle className="mr-2 h-5 w-5" />Error</CardTitle></CardHeader><CardContent><p className="text-destructive-foreground">{error}</p></CardContent></Card>}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {keyMetrics ? (
              <>
                <div className="text-2xl font-bold">${keyMetrics.totalRevenue.value.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">{keyMetrics.totalRevenue.changeDescription}</p>
              </>
            ) : (
              <div className="text-2xl font-bold">N/A</div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {keyMetrics ? (
                <>
                  <div className="text-2xl font-bold">{keyMetrics.activeUsers.value.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">{keyMetrics.activeUsers.changeDescription}</p>
                </>
              ) : (
                <div className="text-2xl font-bold">N/A</div>
              )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales Growth</CardTitle>
            <TrendingUp className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
             {keyMetrics ? (
                <>
                  <div className="text-2xl font-bold">{keyMetrics.salesGrowth.value}</div>
                  <p className="text-xs text-muted-foreground">{keyMetrics.salesGrowth.changeDescription}</p>
                </>
              ) : (
                <div className="text-2xl font-bold">N/A</div>
              )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 md:grid-cols-2 mb-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline flex items-center"><LineChartIcon className="mr-2 h-6 w-6 text-primary" />Past Sales Trends</CardTitle>
            <CardDescription>Monthly sales data overview from backend.</CardDescription>
          </CardHeader>
          <CardContent>
            {salesHistory.length > 0 ? (
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesHistory} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--foreground))" />
                    <YAxis stroke="hsl(var(--foreground))" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Line type="monotone" dataKey="sales" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4, fill: "hsl(var(--primary))" }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            ) : (
              <div className="h-[300px] flex flex-col items-center justify-center text-muted-foreground">
                <BarChartHorizontalBig className="h-12 w-12 mb-2" />
                <p>No sales history data available from the backend.</p>
                <p className="text-xs">(Endpoint: /api/dashboard/sales-history)</p>
              </div>
            )}
            <p className="mt-4 text-sm text-muted-foreground text-center">
              Visualization of sales performance over the past few months.
            </p>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline flex items-center"><TableIcon className="mr-2 h-6 w-6 text-primary"/>Forecasted Sales Figures</CardTitle>
            <CardDescription>Projected sales for the upcoming period from backend.</CardDescription>
          </CardHeader>
          <CardContent>
          {forecastData.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-border">
                <thead className="bg-muted/50">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Product</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Forecast</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Range (Low - High)</th>
                  </tr>
                </thead>
                <tbody className="bg-card divide-y divide-border">
                  {forecastData.map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? undefined : "bg-muted/30"}>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-foreground">{item.date}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-foreground">{item.product}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-foreground">${item.forecast.toLocaleString()}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-muted-foreground">${item.lowerBound.toLocaleString()} - ${item.upperBound.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            ) : (
              <div className="h-[200px] flex flex-col items-center justify-center text-muted-foreground">
                <TableIcon className="h-12 w-12 mb-2" />
                <p>No forecast data available from the backend.</p>
                <p className="text-xs">(Endpoint: /api/dashboard/sales-forecast)</p>
              </div>
            )}
             <p className="mt-4 text-sm text-muted-foreground text-center">
              Tabular view of forecasted sales, including confidence intervals.
            </p>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
