# Author

- Full Name: Contreras Coronado Juan David
- Clan: Caiman
- Email: juan2005dakat@gmail.com
- Number Identification: 1092526878
- repository: https://github.com/contrerinhaz/eventManager.git


# Event Manager

This is a web-based Event Management System built with HTML, JavaScript, and CSS. It allows users to view, create, register, and manage events through a single-page application (SPA).

## Project Structure

```
juancontreras878/
├── public/
│   └── db.json
├── src/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   ├── api.js
│   │   ├── auth.js
│   │   ├── main.js
│   │   └── router.js
│   └── views/
│       ├── createEvent.js
│       ├── dashboard.js
│       ├── editEvent.js
│       ├── landing.js
│       ├── login.js
│       ├── notFound.js
│       └── register.js
├── index.html
├── package.json
├── package-lock.json
├── LICENSE
└── README.md
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

