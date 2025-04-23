# Next Terminal

This project is a dashboard application that visualizes economic data and stock market information. It allows users to create customized dashboards by displaying data from various sources in widget format.

## Key Features

- 📊 FRED (Federal Reserve Economic Data) economic indicator widgets
- 📈 AlphaVantage stock market data widgets
- 🔍 Search functionality for stock symbols and economic indicators
- 🧩 Drag and drop widget placement and resizing
- 📱 Responsive layout
- 💾 Local storage of widget configurations

## Technology Stack

- **Frontend**: Next.js 14, React, TypeScript
- **UI**: TailwindCSS, Radix UI
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Chart Visualization**: Recharts
- **Layout**: React Grid Layout

## APIs Used

- [FRED (Federal Reserve Economic Data) API](https://fred.stlouisfed.org/docs/api/fred/)
- [AlphaVantage API](https://www.alphavantage.co/documentation/)

## Getting Started

### Prerequisites

1. [Node.js](https://nodejs.org/) 18.0.0 or higher
2. FRED API key ([Get it here](https://fred.stlouisfed.org/docs/api/api_key.html))
3. AlphaVantage API key ([Get it here](https://www.alphavantage.co/support/#api-key))

### Installation

```bash
# Clone the repository
git clone [repository-url]
cd economic-dashboard

# Install dependencies
npm install
# or
yarn install

# Set up environment variables
cp .env.example .env.local
# Edit the .env.local file to add your API keys

# Run the development server
npm run dev
# or
yarn dev
```

Once the server is running, you can access the application at [http://localhost:3000](http://localhost:3000).

## License

This project is licensed under the MIT License.

### Third-Party Licenses

This project uses the following third-party libraries and APIs, each with their respective licenses:

- **FRED MCP Library**: [MIT License](https://opensource.org/licenses/MIT)
  - A library for interacting with the Federal Reserve Economic Data API.
- **AlphaVantage API**: [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0)
  - API for real-time and historical stock market data.

We are grateful to the maintainers and contributors of these libraries and APIs.
