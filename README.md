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

## License

This project is licensed under the MIT License.

### Third-Party Licenses

This project uses the following third-party libraries and APIs, each with their respective licenses:

- **FRED MCP**: [MIT License](https://opensource.org/licenses/MIT) - [GitHub Repository](https://github.com/hungson175/WM_MCP)

- **AlphaVantage MCP**: [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0) - [GitHub Repository](https://github.com/calvernaz/alphavantage)

  - **Modifications**: We've modified the original library by removing non-stock related tools and focusing exclusively on stock market data functionality to better suit this project's specific needs.
