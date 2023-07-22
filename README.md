## Tech Stack Used

- **Backend Frameworks**: Node.js, Express.js
- **Database**: PostgreSQL
- **ORM for Database**: Sequelize
- **Tokenization**: JWT

## Running Locally

1. Clone the repository
2. Install PostgreSQL
3. Install Node.js and npm
4. Add .env file inside the server folder with following environment variables:
   ```
   PORT=<desired_port>
   SECRET_STRING=<desired_secret_string_for_jwt>
   PGHOST=localhost
   PGPORT=<port>
   PGDATABASE=<your_desired_dbname>
   PGUSER=<your_username>
   PGPASSWORD=<your_password>
   ```
5. traverse to the server folder and run the command
   `npm install
npm start`
6. The server will be running the port you provided

**for example:** if the post provided is 4000 then the server's root address wil be http://localhost:4000/

**_Note: The documentation for the API endpoints is provided in DOCS.md file_**
