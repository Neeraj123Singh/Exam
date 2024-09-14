#!/bin/bash

# Wait for MySQL to be ready
./wait-for-it.sh db:3306 -- echo "MySQL is up - executing command..."

# Run database migrations
npx sequelize-cli db:migrate

# Start the application
npm start

# Run database migrations
npx sequelize-cli db:migrate
