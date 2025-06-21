# Firebase Studio Project

This is a NextJS starter project in Firebase Studio.

To get started, take a look at `src/app/page.tsx` which redirects to `/dashboard`.

## Sales Prophet Dashboard

This application is a Next.js-based dashboard for sales forecasting insights.

### Core Features:

*   **Dashboard Visualization**: Interactive dashboard to visualize sales data, including past trends and (placeholder) key metrics.
*   **AI-Powered Indicator Identification**: Utilizes generative AI to identify relevant economic and financial indicators (e.g., interest rates, inflation rate, consumer confidence index) to incorporate into sales forecasting models for enhanced accuracy. This feature is available on the "Economic Indicators" page.
*   **Time Series Charts**: Visualizes past sales trends on the dashboard.
*   **Forecasted Sales Table**: Shows (placeholder) forecasted sales figures in a tabular format on the dashboard.
*   **GitHub Integration**: The project is set up for version control with Git and can be hosted on GitHub.
*   **Docker Containerization**: As a Next.js application, it can be easily containerized using Docker for consistent deployment environments.

### Tech Stack (Frontend Interpretation):

*   **Next.js**: React framework for server-side rendering and static site generation.
*   **TypeScript**: For type safety and improved developer experience.
*   **Tailwind CSS**: For styling the user interface.
*   **Shadcn/ui**: Re-usable UI components.
*   **Genkit (with Google AI)**: For integrating generative AI capabilities.
*   **Recharts**: For displaying charts.

### User Interface Style:

*   **Primary Color**: Deep purple (`#673AB7`) for trust and innovation.
*   **Background Color**: Light gray (`#F0F0F0`) for a neutral backdrop.
*   **Accent Color**: Blue (`#3F51B5`) to highlight key metrics and calls to action.
*   **Typography**:
    *   Body & Headline Font: 'Inter' (sans-serif) for a modern, objective look.
    *   Code Font: 'Source Code Pro' for displaying code snippets or file paths.
*   **Layout**: Clean and intuitive with clear sections.
*   **Animation**: Subtle transitions for an improved user experience.

### Getting Started:

1.  **Clone the repository** (if you have access to it on GitHub).
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Set up environment variables**:
    *   If using Genkit with Google AI, ensure you have `GOOGLE_API_KEY` set in your environment or a `.env` file.
4.  **Run the development server**:
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:9002` (or the port specified in `package.json`).

5.  **Build for production**:
    ```bash
    npm run build
    ```

6.  **Start the production server**:
    ```bash
    npm run start
    ```

### Notes on Original Proposal vs. This Implementation:

The original project proposal outlined a full-stack sales forecasting system using Python, Apache Spark, Prophet, and Streamlit. This Next.js application serves as a frontend interpretation, focusing on:
*   A user interface for dashboard elements.
*   The "AI-Powered Indicator Identification" feature using Genkit.

The actual data processing (with Spark) and forecasting (with Prophet) as described in the original proposal would typically be handled by a separate backend system. This Next.js app could then integrate with such a backend via APIs to display the processed data and forecasts.
The GitHub integration and Docker containerization aspects apply to this Next.js project as well.
