# Small Talk

- Our primary customers are business professionals working on teams
- Making online messaging easier for groups working together on team projects


## Run for development

Django, node, expo-cli must be installed globally

### Configuration

1. On your terminal run the `ipconfig` command to get your IPv4 address under `Wireless LAN adapter Wi-Fi`
2. In the `src/store/index.js`, look for the SERVER_ADDRESS variable at the top of the file and replace with your IPv4 address.
3. In `smallTalk/settings.py`, look for ALLOWED_HOSTS and add your IPv4 to the list

### Setup database

1. Type `python3 manage.py migrate` to create the sqlite3 database and add all the tables
2. Type `python3 manage.py loaddata data.json` to populate the tables
3. Admin User is; email: andrewraftovich@gmail.com, password: Password1
4. Test User is; email: testUser1@email.com, password: longPassword1

### Run the Server
1. Open a console and navigate to the project folder.
2. Type `pip3 install -r requirements.txt` to get the dependencies
3. Type `ipconfig` and find your local IPv4 address (ex: 192.168.0.107)
3. Type `python manage.py runserver {IPv4 address}:8000`
4. Navigate to your web browser and go to {IPv4 address}:8000/admin for the admin console.

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
