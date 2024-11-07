# Use an official Node.js runtime as the base image
FROM alpine:3.9

# Set the working directory in the container
WORKDIR /screen

# Copy package.json and package-lock.json to the container
COPY screen/package*.json ./

# Install project dependencies
RUN npm install

# Copy the entire project to the container
COPY screen .

# Expose the port on which the app will run
EXPOSE 3000

# Run the app
CMD [ "npm", "start" ]
