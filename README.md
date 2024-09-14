Copy example.env to .env and fill environment values required

# Make Sure Docker Is Running On You Sytem
# Run command 
- docker-compose up --build

# For Postmans Collection Use
-Exam.postman_collection.json file in root folder and make sure to change baseUrl and Add Authrization header to all answers routes

# IF Migration Does not run Automatically Due to System Configuration 
- run them using new Command Prompt and command : 
docker exec online-exam-backend-app npx sequelize-cli db:migrate 

