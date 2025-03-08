# Defining the base image required to create the image of the respective project.
FROM node:20

# Defining the working directory, It crates the directory in the container in order to save the entire thing write overthere and all the subsequent command will also execute and save the things in the working directory directory

WORKDIR /myapp

# Copy package.json and package-lock.json first for better caching
COPY package*.json ./

# Install all the dependecies form the package.json file to node_modules folder
RUN npm install

# Copying the entire dependecies and the project in the current working directory
COPY . .

# It tells the Docker that the hos-port of the container is the below
EXPOSE 3000

# RUN command is used to execute the command at the time of building the docker image whereas CMD command is used to execute the command when container starts 
CMD [ "npm","run","dev" ]





