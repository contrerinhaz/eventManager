# Author

- Full Name: Contreras Coronado Juan David
- Clan: Caiman
- Email: juan2005dakat@gmail.com
- Number Identification: 1092526878


# Event Manager

This is a web-based Event Management System built with HTML, JavaScript, and CSS. It allows users to view, create, register, and manage events through a single-page application (SPA).

## Project Structure

```
eventManager/
├── index.html              # Main HTML entry point
├── package.json            # Project dependencies and metadata
├── package-lock.json       # Dependency lock file
├── /views                  # Contains views for each section of the SPA
├── /controllers            # Functions that control logic between views and models
├── /models                 # Data models (users, events, roles)
├── /services               # API communication functions
├── /router                 # SPA route management
├── /assets                 # Static files like images and CSS
└── README.md               # Project documentation
```

## Features

- View available events
- Register as a user
- Log in and log out
- Create new events
- Edit or delete events (admin access)
- Single-page navigation

## Installation

1. Clone the repository or download the zip:
   ```bash
   git clone <repository-url>
   cd eventManager
   ```

2. Install dependencies (if using Node.js server):
   ```bash
   npm install
   ```

3. Open `index.html` directly in the browser, or serve via a local server:
   ```bash
   npm install -g serve
   serve .
   ```

## How to run

1. npm run dev (start the frontend)

2. npm run backend (start json-server)

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES Modules)
- JSON Server (for fake API)
- Git for version control

