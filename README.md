# Sales Dashboard Project

![Project Logo](https://via.placeholder.com/150?text=Sales+Dashboard) <!-- Replace with your project logo -->

A powerful sales analytics platform with a **FastAPI backend** for data processing and forecasting, and a **Next.js frontend** for visualizing key metrics, sales history, and forecasts. This project leverages Apache Spark for big data processing and Prophet for time-series forecasting to provide actionable insights.

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)
- [Prerequisites](#prerequisites)
- [Installation and Setup](#installation-and-setup)
  - [Backend (FastAPI)](#backend-fastapi)
  - [Frontend (Next.js)](#frontend-nextjs)
- [API Endpoints](#api-endpoints)
- [Datasets](#datasets)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## 🌟 Overview
This project is a full-stack sales dashboard application designed to analyze and visualize retail sales data. The backend, built with FastAPI, processes large datasets using Apache Spark and generates forecasts using Prophet. The frontend, built with Next.js and React, provides an interactive UI to display key metrics, historical sales, and predictive insights. The application is designed for scalability and ease of use, making it ideal for business analysts and data-driven decision-makers.

## ✨ Features
- **Key Metrics**: Displays total revenue, active users, and sales growth with dynamic change descriptions.
- **Sales History**: Visualizes monthly sales trends.
- **Sales Forecast**: Predicts future sales with confidence intervals using Prophet.
- **Big Data Processing**: Handles large datasets efficiently with Apache Spark.
- **Responsive UI**: Modern, user-friendly interface built with Next.js and Tailwind CSS (assumed for styling).
- **CORS Support**: Configured for seamless frontend-backend communication.
- **Scalable Architecture**: Modular design for easy extension and maintenance.

## 📂 Project Structure
```bash
sales-dashboard/
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI application entry point
│   │   ├── routers/
│   │   │   └── dashboard.py     # API routes for dashboard endpoints
│   │   ├── services/
│   │   │   ├── data_processor.py # Spark-based data processing
│   │   │   └── forecaster.py    # Prophet-based forecasting
│   ├── data/
│   │   ├── store_dataset.csv    # Store metadata
│   │   ├── features_dataset.csv # External features (e.g., CPI, temperature)
│   │   ├── sales_dataset.csv    # Sales data
│   ├── requirements.txt         # Backend dependencies
│   └── .gitignore              # Git ignore file
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx     # Dashboard page component
│   ├── public/                  # Static assets
│   ├── tsconfig.json           # TypeScript configuration
│   ├── package.json            # Frontend dependencies
│   └── .env.local              # Environment variables
└── README.md                   # Project documentation
```

## 📸 Screenshots
![image](https://github.com/user-attachments/assets/8a2a81b1-c6ac-41cc-aa14-fb02139ff1b7)

**Instructions to Add Screenshots**:
1. Capture screenshots of your running application (e.g., dashboard UI, API responses in Postman, or backend logs).
2. Save them in a `screenshots/` folder (e.g., `screenshots/dashboard.png`).
3. Update the paths in the Markdown above (e.g., `![Dashboard](screenshots/dashboard.png)`).
4. Commit and push the images to your repository.

## 🛠 Prerequisites
- **Python 3.8+**: For the FastAPI backend.
- **Node.js 18+**: For the Next.js frontend.
- **Git**: For version control.
- **Java 8+**: Required for Apache Spark.
- **pip**: Python package manager.
- **npm**: Node package manager.

## 🚀 Installation and Setup

### Backend (FastAPI)
1. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```
2. **Create and activate a virtual environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```
4. **Ensure datasets are in place**:
   Place `store_dataset.csv`, `features_dataset.csv`, and `sales_dataset.csv` in the `backend/data/` directory.
5. **Run the FastAPI server**:
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```
   The API will be available at `http://localhost:8000/api/dashboard`.

### Frontend (Next.js)
1. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Configure environment variables**:
   Create a `.env.local` file in the frontend root:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```
4. **Run the development server**:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:9002` (or `http://192.168.80.197:9002` on your network).

**Note**: Ensure the backend is running before starting the frontend to avoid API errors. If accessing the frontend from a different device, update the `NEXT_PUBLIC_API_URL` to the backend's network IP (e.g., `http://192.168.80.197:8000`).

## 🌐 API Endpoints
The backend provides the following endpoints:
- **GET `/api/dashboard/key-metrics`**:
  - Response: `{ totalRevenue: { value, changeDescription }, activeUsers: { value, changeDescription }, salesGrowth: { value, changeDescription } }`
  - Example: `{ "totalRevenue": { "value": 45231.89, "changeDescription": "+20.1% from last month" }, ... }`
- **GET `/api/dashboard/sales-history`**:
  - Response: Array of `{ month, sales }`
  - Example: `[ { "month": "Jan", "sales": 3450 }, ... ]`
- **GET `/api/dashboard/sales-forecast`**:
  - Response: Array of `{ date, product, forecast, lowerBound, upperBound }`
  - Example: `[ { "date": "2024-07-01", "product": "Product A", "forecast": 5200, "lowerBound": 4800, "upperBound": 5600 }, ... ]`

Test endpoints using a tool like Postman or `curl` (e.g., `curl http://localhost:8000/api/dashboard/key-metrics`).

## 📊 Datasets
The backend processes three CSV files located in `backend/data/`:
- **store_dataset.csv**: Store metadata (Store ID, Type, Size).
- **features_dataset.csv**: External features (e.g., Temperature, Fuel Price, CPI, Unemployment).
- **sales_dataset.csv**: Sales data (Store, Dept, Date, Weekly_Sales, IsHoliday).

**Note**: Ensure these files are properly formatted and contain valid data to avoid processing errors. The datasets are excluded from Git via `.gitignore` to prevent sensitive data exposure.

## 🛠 Technologies Used
- **Backend**:
  - **FastAPI**: High-performance Python web framework.
  - **Apache Spark**: Big data processing for large-scale analytics.
  - **Prophet**: Time-series forecasting library by Meta AI.
  - **Python**: Core programming language.
  - **Uvicorn**: ASGI server for FastAPI.
- **Frontend**:
  - **Next.js 15.3.3**: React framework with Turbopack support.
  - **React**: UI library for building interactive components.
  - **TypeScript**: Type-safe JavaScript for robust development.
  - **Tailwind CSS** (assumed): For responsive and modern styling.
- **Other**:
  - **Git**: Version control.
  - **Node.js**: Frontend runtime environment.

## 🤝 Contributing
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit changes (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

Please ensure code follows PEP 8 for Python and ESLint rules for TypeScript/JavaScript.

## 📜 License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

**Happy Analyzing!** 🚀  
For issues or questions, contact [Harisanth/hmsanth@gmail.com] or open an issue on GitHub.
