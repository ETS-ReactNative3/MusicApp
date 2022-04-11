# MusicApp

A mobile phone application that allows you to search music files from apple itunes API and play them.It also allows you to add your favourite songs to your playslist and play them whenever you want.
## Prerequisites

- [Node.js > 12](https://nodejs.org)
- [Watchman](https://facebook.github.io/watchman)
- [Xcode 12](https://developer.apple.com/xcode)
- [Cocoapods 1.10.1](https://cocoapods.org)
- [JDK > 8](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)
- [Android Studio and Android SDK](https://developer.android.com/studio)

## Base dependencies

- [react-native-async-storage/async-storage](https://github.com/react-native-async-storage/async-storage) library.
- [react-navigation](https://reactnavigation.org/) navigation library.
- [react-native-splash-screen](https://github.com/crazycodeboy/react-native-splash-screen) library.
- [react-native-track-player](http://react-native-track-player.js.org/) navigation library.
- [react-navigation](https://reactnavigation.org/) navigation library.
- [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons) library.
- [redux](https://redux.js.org/) for state management.
- [redux-logger](https://github.com/LogRocket/redux-logger).
- [react-redux](https://react-redux.js.org/).
- [redux-persist](https://github.com/rt2zz/redux-persist) as persistance layer.
- [redux-thunk](https://github.com/gaearon/redux-thunk) to dispatch asynchronous actions

## Usage

- Go to your project's root folder and run `npm install`.
- Run `npm run android` to start your application!

### Option 2: Copy the structure to your project

If you want to roll on your own and don't want to use this as a template, you can create your project and then copy the `/src` folder and 'assets' folder (which has all the code of your application) and update your `index.js`.

Keep in mind that if you do this, you'll have to **install and link** all dependencies (as well as adding all the necessary native code for each library that requires it).

## Folder structure

This template follows a very simple project structure:

- assets :This folder has images and fonts for your application
- `src`: This folder is the main container of all the code inside your application.
  - `actions`: This folder contains all actions that can be dispatched to redux.
  - `components`: Folder to store any common component that you use through your app
  - `common`: Folder to store any kind of constant that you have.
  - `router`: Folder to store the navigators.
  - `reducers`: This folder should have all your reducers.
  - `screens`: Folder that contains all your application screens/features.
  - `config`: Folder that contains the service you are using and all the endpoints.
  - `store`: Folder to put all redux middlewares and the store.
  - `App.js`: Main component that starts your whole app.
  - `index.js`: Entry point of your application as per React-Native standards.

## Generate production version

These are the steps to generate `.apk`, `.aab` files

### Android

1. Generate an upload key
2. Setting up gradle variables
3. Go to the android folder
4. Execute `./gradlew assemble[Env][BuildType]`

Note: You have three options to execute the project
`assemble:` Generates an apk that you can share with others.
`install:` When you want to test a release build on a connected device.
`bundle:` When you are uploading the app to the Play Store.

For more info please go to https://reactnative.dev/docs/signed-apk-android

