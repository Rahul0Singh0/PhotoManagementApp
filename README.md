# Photo Management App using React Native Expo
A simple Photo Management App built with React Native Expo, allowing users to upload, view, and delete images using Cloudinary as image storage.

## Features
* Upload images with titles and descriptions.
* Display uploaded photos in a gallery view.
* View image details with a full-size photo view.
* Delete images from both local storage and Cloudinary.
* Responsive UI built with React Native Expo.

## Prerequisites
1. Node.js & npm
2. Expo CLI - Install with:
```
   npm install -g expo-cli
```
3. A Cloudinary Account

## Installation

### 1. Clone the Repository
```
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
```
### 2. Install Project Dependencies
Run the following command to install the required dependencies:
```
npm install
```

## Dependencies
* crypto-js - For generating hashed signatures for Cloudinary requests.
```
npm install crypto-js
```
* @react-navigation/native - React Navigation for routing between pages.
```
npm install @react-navigation/native @react-navigation/stack
```
* @react-native-async-storage/async-storage - For storing uploaded images locally.
```
npm install @react-native-async-storage/async-storage
```
* axios - For making HTTP requests.
```
npm install axios
```

## Configuration
### Set up Cloudinary Credentials
You need a Cloudinary account and API credentials to use this app.
1. Sign up or log in to Cloudinary at Cloudinary Sign-Up.
2. Go to Dashboard → Account Details to find the following credentials:
* Cloud Name
* API Key
* API Secret
3. Replace placeholders like:
* <YOUR_CLOUD_NAME>
* <YOUR_API_KEY>
* <YOUR_API_SECRET> in your code.

## Run the Project
```
npm start
```
This will open the Expo development tool in your browser. Use QR Code to scan and test on your mobile device using the Expo Go App, or run the emulator.