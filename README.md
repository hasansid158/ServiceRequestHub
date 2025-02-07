# Service Request Hub


## Project Setup Instructions

### 1. Clone the Repository
```sh
git clone https://github.com/hasansid158/ServiceRequestHub.git
cd ServiceRequestHub
```

### 2. Install Dependencies
```sh
npm install

```
### 3. Configure AWS Amplify
```sh
npm install -g @aws-amplify/cli
```
### 4 Configure AWS credentials (for first-time setup)
```sh
amplify configure
```
### 5. Pull the AWS configuration
```sh
amplify pull --appId <your-app-id> --envName dev
```
### 6. Run the Project
```sh
npm start
```
