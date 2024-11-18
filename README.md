# Project Name

A short description of what the project does and its purpose.

## Table of Contents
- [Installation](#installation)
- [API Documentation](#api-documentation)
- [Running the Application](#running-the-application)
- [Docker Setup](#docker-setup)

## Installation

To install the dependencies for this project, follow these steps:

1. Clone the repository:
    ```bash
    git clone <https://github.com/mushtaq-khan/block-chain.git>
    ```

2. Install the required dependencies using npm:
    ```bash
    npm install
    ```

This will install all the necessary packages specified in the `package.json` file.

## API Documentation

Once the server is running, you can access the Swagger API documentation at the following URL:

- [http://localhost:3000/api]

This will provide details on the available endpoints and how to interact with them.

## Running the Application

To run the application locally without Docker, simply use the following command:

```bash
npm run start:dev


### Explanation of Docker Commands:
`docker-compose up --build`**: This command will build the Docker images (if not already built) and start the containers. It's useful when you have made changes to the Docker configuration or your application code that need to be reflected in the container.
  
`docker-compose up`: This command starts the containers based on the already built images. Use this when the images are already built and you just want to start the containers.

docker-compose down*: This command stops the containers and removes them, 
