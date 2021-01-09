# Team 190's new website (WIP)

![CI](https://github.com/Team-190/Website/workflows/CI/badge.svg)

This is Team 190's new website, by Grant Perkins and Kevin O'Brien. Frontend in React.js, backend in Python 3.8. Runs on AWS Lambda and frontend hosted by WPI servers. Database with DynamoDB.

## Development

### Frontend

#### Installation

The following dependencies are required:
 - Node.JS 14
 - Yarn (a Node package manager)
 
In 2021, I wrote this using the Jetbrains Webstorm IDE. A text editor works fine.

To install node dependencies, `cd` into the `frontend` directory, and run `yarn install`.

##### Bash

```bash
git clone https://github.com/Team-190/Website.git
cd Website/frontend
yarn install
```

#### Testing

You can run the website on localhost by running the following command

```bash
yarn start
```

#### Deploying

TBD.

### Backend

#### Installation


The following dependencies are required:
 - Python3.x
 - virtualenv

##### Bash

```bash
pip install virtualenv
```

#### Testing

No good way at the moment. There are a lot of dependencies. You could install the Node.js package `serverless`, as well as the backend. For now, we test in production.

#### Deploying

Push to the `master` branch on GitHub. GitHub actions does the rest.


