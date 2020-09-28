# Small Talk

Small Talk is designed for businesses so employees will be able to communicate with each other internally through a virtual format to save past messages and communicate among multiple channels to increase productivity.

## Run for development

Django, node, expo-cli must be installed globally

### Run the App
1. Open a console and navigate to the project folder.
2. go to the `src` directory.
3. type `npm install` and `npm start`.
4. Run your phone emulator.
5. A web browser should be open with the project console.
6. Click `Run on Android` or `Run on iOS` depending on the operating system of your emulator.

### Run the Server
1. Open a console and navigate to the project folder.
2. type `pip3 install -r requirements.txt` to get the dependencies
3. type `python manage.py runserver`
4. navigate to your web browser and go to [localhost:8000](http://localhost:8000/)

## Installing dependencies

1. Install [Node.js](https://nodejs.org/en/download/)
2. npm install expo-cli --global
3. Depending on your Operating System, run an [Android Emulator](https://docs.expo.io/workflow/android-studio-emulator/) or an [IOS Simulator](https://docs.expo.io/workflow/ios-simulator/) to be able to view the React Native app.

## Server Routes

`AUTH` requires an URL header of "Authorization: Token <user token>"

| Function | Route |
| ------ | ------  |
| `POST` login | /login |
| `POST` register | /register |
| `AUTH` `GET` groups | /messanger/groups |
| `AUTH` `GET` chats | /messanger/chats/<int: group_id> |
| `AUTH` `GET` messanges | /messanger/messages/<int: chat_id> |
