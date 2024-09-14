# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Install global dependencies
RUN npm install -g sequelize-cli

# Copy the rest of the application code
COPY . .

# Copy the wait-for-it script and make it executable
COPY wait-for-it.sh /usr/src/app/wait-for-it.sh
RUN chmod +x /usr/src/app/wait-for-it.sh

# Copy the start script and make it executable
COPY start.sh /usr/src/app/start.sh
RUN chmod +x /usr/src/app/start.sh

# Expose port 3000
EXPOSE 3000

# Run the start script to wait for MySQL and start the app
CMD ["./start.sh"]
