# Reserve Room Application

This project is built using **React**, **Vite**, and integrates with **n8n** for automation workflows as well as the **Google Sheets API** for data manipulation.

## Features

- **React**: A robust JavaScript library for building user interfaces.
- **Vite**: Lightning-fast development and build tool for modern web applications.
- **n8n Integration**: Automate workflows and connect to various services.
- **Google Sheets API**: Fetch, update, and manage data directly from Google Sheets.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js**: v16 or higher
- **npm** or **yarn**: Package manager
- **n8n**: Set up and running
- **Google Cloud Account**: To enable the Sheets API

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/PhoompatrNG/reserve-room.git
cd reserve-room
```

### Install Dependencies

```bash
npm install
```

Or, if you prefer **yarn**:

```bash
yarn install
```

### Set Up Environment Variables

Create a `.env` file in the root of the project and add the following:

```env
VITE_GOOGLE_API_KEY=<Your Google API Key>
VITE_GOOGLE_SHEET_ID=<Your Google Sheet ID>
N8N_WORKFLOW_URL=<Your n8n Workflow URL>
```

### Run the Development Server

```bash
npm run dev
```

Or, if using **yarn**:

```bash
yarn dev
```

### Build the Application

```bash
npm run build
```

Or, if using **yarn**:

```bash
yarn build
```

## Integrating with n8n

n8n is used to automate workflows such as sending notifications, managing reservations, or syncing data with external APIs.

1. **Set up n8n**: Follow the [n8n setup guide](https://docs.n8n.io/) to configure your instance.
2. **Create Workflows**: Use n8n's visual interface to create workflows that connect to Google Sheets, email, or other services.
3. **Link Workflows**: Use the `N8N_WORKFLOW_URL` in your `.env` file to connect the application to your n8n workflows.

## Using Google Sheets API

This project uses the Google Sheets API for managing data such as reservations, availability, or user information.

1. **Enable the API**: Go to the [Google Cloud Console](https://console.cloud.google.com/) and enable the Sheets API.
2. **Generate API Key**: Create an API key and add it to your `.env` file.
3. **Specify Sheet ID**: Obtain the sheet ID from your Google Sheet's URL and add it to your `.env` file.

## Project Structure

```
reserve-room/
├── public/              # Static assets
├── src/                 # Source code
│   ├── components/      # React components
│   ├── pages/           # React pages
│   ├── services/        # API services (e.g., Google Sheets API, n8n integration)
│   ├── styles/          # CSS files
│   └── utils/           # Utility functions
├── .env                 # Environment variables
├── package.json         # Project metadata
├── vite.config.ts       # Vite configuration
└── README.md            # Project documentation
```

## Contributing

We welcome contributions to improve this project. Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or fix.
3. Submit a pull request detailing your changes.

## License

This project is licensed under the MIT License.

## Contact

For any questions or support, please contact [PhoompatrNG](https://github.com/PhoompatrNG).
