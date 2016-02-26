# CloudBread-Socket-React

[![Build Status](https://travis-ci.org/CloudBreadProject/CloudBread-Socket-React.svg?branch=master)](https://travis-ci.org/CloudBreadProject/CloudBread-Socket-React)
[![Dependency Status](https://david-dm.org/CloudBreadProject/CloudBread-Socket-React.svg?style=flat-square)](https://david-dm.org/CloudBreadProject/CloudBread-Socket-React)
[![devDependency Status](https://david-dm.org/CloudBreadProject/CloudBread-Socket-React/dev-status.svg?style=flat-square)](https://david-dm.org/CloudBreadProject/CloudBread-Socket-React#info=devDependencies)
[![Code Climate](https://codeclimate.com/github/CloudBreadProject/CloudBread-Socket-React/badges/gpa.svg)](https://codeclimate.com/github/CloudBreadProject/CloudBread-Socket-React)
[![Issue Count](https://codeclimate.com/github/CloudBreadProject/CloudBread-Socket-React/badges/issue_count.svg)](https://codeclimate.com/github/CloudBreadProject/CloudBread-Socket-React)

CloudBread game server real-time communication project CloudBread-Socket client example.
This project is designed for CloudBread mobile game & app server engine to implement real-time bidirectional communication.
See [live demo](http://hbh-cloudbread-socket-client.azurewebsites.net/)

## Installation

```sh
git clone https://github.com/CloudBreadProject/CloudBread-Socket-React
cd CloudBread-Socket-React
npm i # alias to install
```

### Requirements

Node.js 4.x or 5.x

## Usage

### Custom Scripts

#### Development

```sh
npm start
npm start -- --port=8080 # if you want to change the port
```

It will open a browser window.
In development environment, [FOUC](https://en.wikipedia.org/wiki/Flash_of_unstyled_content) could be happened.
Don't worry. FOUC is not in production environment.
Never use this command for production directly because this command will be executed via `babel-node` which makes performance slower.
To serve production application, you have to deploy or build it and execute `npm start` in the build folder.

#### Build

```sh
npm run build
```

It will build package for production.

#### Lint

```sh
npm run lint
```

It will eslint this package.

#### CSS Comb

```sh
npm run csscomb
```

Make your css code beautiful.

#### Deployment

You should edit `./tools/tasks/deploy.js` file before use this command.

```sh
npm run deploy
```

Basically this script deploys this package on git repository after build.
GitHub, Heroku, Azure, AWS, AppEngine doesn't matter, perhaps.

### Directory Map

Run `tree -L 2 -I 'node_modules|build|.git|.DS_Store' -A -a` then you will see below:

```sh
.                   # Root
├── .csscomb.json   # css comb configurations
├── .editorconfig   # common editor configurations
├── .eslintrc.json  # eslint configurations
├── .gitignore
├── LICENSE.txt
├── README.md
├── karma.config.js # Karma test configurations
├── package.json    # dependency list
├── src             # application source code
│ ├── api           # api end point
│ ├── assets        # static files
│ ├── client.jsx    # client entry
│ ├── components    # react components such as Header, Loading, etc.
│ ├── config.js     # configuration such as api
│ ├── containers    # containers such as HomePage, ContentPage, etc.
│ ├── layouts       # layout such as commonLayout or ChannelLayout, etc.
│ ├── lib           # common library, utilities such as DOM, fetch, etc.
│ ├── reducers      # Redux reducers, actions and constants
│ ├── public        # static files to serve through http or https
│ ├── redux         # redux store and middlewares
│ ├── routes        # route configurations
│ ├── server.jsx    # server entry
│ └── styles        # css codes
├── tests           # unit tests
│ └── layouts       # layout tests
└── tools           # build and deployment tools
    ├── .eslintrc.json
    ├── config.js   # webpack configurations
    ├── lib
    ├── run.js
    └── tasks       # build, deploy, serve, etc...
```

## License
MIT license
