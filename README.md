# Small Talk

- Our primary customers are business professionals working on teams
- Making online messaging easier for groups working together on team projects

## Run mobile app for development

1. Check that the [dedicated server](http://68.183.119.17/admin) is running.
2. Open a console and navigate to the project folder.
3. Go to the `src` directory.
4. Type `npm install` and `npm start`.
5. Run your phone emulator.
6. A web browser should be open with the project console.
7. Click `Run on Android` or `Run on iOS` depending on the operating system of your emulator.

## Run the Server for development
1. Open a console and navigate to the project folder.
2. On your terminal run the `ipconfig` command to get your IPv4 address under `Wireless LAN adapter Wi-Fi`
3. In the `src/store/index.js` file, look for the SERVER_ADDRESS variable at the top of the file and replace with your IPv4 address and set port to 8080.

Prepare database

(must install postrgesql onto your computer)

4. Type `pip3 install -r requirements.txt` to get the dependencies
5. Type `python3 manage.py migrate` to create the sqlite3 database and add all the tables
6. Type `python3 manage.py loaddata data.json` to populate the tables
    1. Admin User is; email: andrewraftovich@gmail.com, password: Password1
    2. Test User is; email: testUser1@email.com, password: longPassword1

Prepare server

7. Type `python3 manage.py runserver 0.0.0.0:8080`
8. Navigate to your web browser and go to {IPv4 address}:8080/admin for the admin console.

## Run the Server on Docker

1. Go to project folder.
2. Run: `docker-compose up -d --build` to build and run the docker containers.
4. Run: `docker-compose exec web python manage.py migrate` to load the database tables.
5. Run: `docker-compose exec web python manage.py loaddata data.json` to load the data.
6. Run: `docker-compose exec web python manage.py collectstatic` to create the static files for the nginx.
7. To stop the server, run: `docker-compose down`.
8. To remove local storage from the database and static files, run: `docker-compose down -v`.

## Installing dependencies

1. Install [Node.js](https://nodejs.org/en/download/)
2. npm install expo-cli --global
3. Depending on your Operating System, run an [Android Emulator](https://docs.expo.io/workflow/android-studio-emulator/) or an [IOS Simulator](https://docs.expo.io/workflow/ios-simulator/) to be able to view the React Native app.
