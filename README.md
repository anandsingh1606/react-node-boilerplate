# React Node(Express) Boilerplate #

![Travis (.com)](https://img.shields.io/travis/com/anandGithub01/react-node-boilerplate?style=flat-square)
![GitHub](https://img.shields.io/github/license/anandGithub01/react-node-boilerplate?style=flat-square)
![GitHub package.json version](https://img.shields.io/github/package-json/v/anandGithub01/react-node-boilerplate?style=flat-square)

A boilerplate with less configuration and more code. The intention of creating this boilerplate is to give a quick start in developing a react-node application with basic required dev utility and setup. 

## Highlights


> React App 

- React hooks :white_check_mark: :heavy_heart_exclamation:
- PWA :white_check_mark: 
- Redux setup with the utility to reducer boilerplate code of actions and reducers
- Socket.Io :white_check_mark:
- Multi-Language :white_check_mark:
- Template Setup :white_check_mark:
- Working auth module with mobile sign-in/signup :white_check_mark:
- Form validation :white_check_mark:

> NodeJs App

- REST APIs :white_check_mark:
- MySql handling with ORM :white_check_mark:
- Socket Implementation :white_check_mark:
- Form validation :white_check_mark:
- Working auth module with mobile sign-in/signup :white_check_mark:
- Sms API :white_check_mark:


> Setup feature

- Feature-based folder structure :white_check_mark:
- Simple and consistent naming convention :white_check_mark:
- No `../../../` :white_check_mark: 


## DEMO 

React APP demo: https://anandgithub01.github.io/


## SETUP 

#### Installation 
1) Install NodeJs (10 or above), npm (5 or above), MySql (8 or above)
2) Clone repo `git clone https://github.com/anandGithub01/react-node-boilerplate.git`
3) Go to project folder `cd react-node-boilerplate`
4) Install dependencies `npm install`


#### Server configuration 
1) Rename you `/server/.env.example` to `/server/.env`
2) Set up SMS API, Get free trial Twilio account(https://www.twilio.com/docs/sms/quickstart/node) and update the key in `.env` file or if you want to skip this, for now, make `SMS_API=false` in `.env` file.
3) Create a new database in MySql, Update your database credentials in `.env` file.
4) Create database tables, `npm run setup-db`

#### Start the App

`npm start`
  
And we are ready, Now your react app will be running on `8001` and NodeJs server will be running on `8000`.

#### Eslint setup (VsCode)
1) Make sure you update `eslint.nodePath` with local eslint installed path, somthing like this  `"eslint.nodePath": "/<path-to-folder>/react-node-boilerplate/node_modules/eslint"`

2) Check in any file, It should work fine. 



#### Development guidelines

I will create a detail document for this, but for now please refer auth module of client and server. Loader, API error handling in the client, App-level error handling in react app, and many other things are already in place. 




### Note: This boilerplate is not production-ready, I have covered some of the required configurations but still we have few thing remaining. The main intention of putting it open source is to give people an option to quick development start. 

### Documentation and some other stuff are still pending... Working on it.

### This repo is currently on development for initial requirements. Open for getting any contribution. Thanks!!

