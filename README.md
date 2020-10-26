# Small Talk

- Our primary customers are business professionals working on teams
- Making online messaging easier for groups working together on team projects

## Run the Server for Deployment on Docker

1. Make sure you are logged into docker.
2. Go to the project folder.
3. Run: `docker-compose up -d --build` to build and run the docker containers.

NOTE: the next 3 commands are for inital setup and do not need to be ran each time you run the docker containers.

4. Run: `docker-compose exec web python manage.py migrate` to load the database tables.
5. Run: `docker-compose exec web python manage.py loaddata data.json` to load the data.
6. Run: `docker-compose exec web python manage.py collectstatic` to create the static files for the nginx server.
7. Configure the `src/store/index.js` SERVER_ADDRESS to point to port `8080`.
8. To stop the server, run: `docker-compose down`.

## Run for development

### Configuration

1. On your terminal run the `ipconfig` command to get your IPv4 address under `Wireless LAN adapter Wi-Fi`
2. In the `src/store/index.js` file, look for the SERVER_ADDRESS variable at the top of the file and replace with your IPv4 address.

### Setup database

Note: The database should only have to be setup the first time you ever ran the server, otherwise ignore this section.

1. Type `python3 manage.py migrate` to create the sqlite3 database and add all the tables
2. Type `python3 manage.py loaddata data.json` to populate the tables
3. Admin User is; email: andrewraftovich@gmail.com, password: Password1
4. Test User is; email: testUser1@email.com, password: longPassword1

### Run the Server
1. Open a console and navigate to the project folder.
2. Type `pip3 install -r requirements.txt` to get the dependencies
3. Type `python manage.py runserver 0.0.0.0:8080`
4. Navigate to your web browser and go to {IPv4 address}:8080/admin for the admin console.

### Run the App
1. Make sure the server is already running.
2. Open a console and navigate to the project folder.
3. Go to the `src` directory.
4. Type `npm install` and `npm start`.
5. Run your phone emulator.
6. A web browser should be open with the project console.
7. Click `Run on Android` or `Run on iOS` depending on the operating system of your emulator.

## Installing dependencies

1. Install [Node.js](https://nodejs.org/en/download/)
2. npm install expo-cli --global
3. Depending on your Operating System, run an [Android Emulator](https://docs.expo.io/workflow/android-studio-emulator/) or an [IOS Simulator](https://docs.expo.io/workflow/ios-simulator/) to be able to view the React Native app.

## Server Routes

`AUTH` requires an URL header of "Authorization: Token < token goes here >"

| Function | Route |
| ------ | ------  |
| `POST` login | /login |
| `POST` register | /register |
| `AUTH` `GET` groups | /messenger/groups |
| `AUTH` `GET` chats | /messenger/chats/<int: group_id> |
| `AUTH` `GET` messanges | /messenger/messages/<int: chat_id> |
