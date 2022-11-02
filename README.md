# CS5610Project2
- Project Name: 
Workout and Diet Tracker

- Project Objective: 
We designed and built a health/fitness tracking web application for users who are looking to get on a diet plan and/or a workout routine. Health/fitness enthusiasts or anyone looking to make lifestyle changes can easily create an account in the web app, view key fitness metrics, create or choose meal plans and workout routines, and keep a record of daily routines on their health/fitness journey.

- Author:
[Ke Chen](https://kechen97.github.io/), 
[Jeremiah Asala](https://jerryasala.github.io/)


## Links
- [Link to Demo Video](https://drive.google.com/file/d/1Uav1RHBQpuVjtSH94wRM4K3EmtSRxMBx/view?usp=share_link) or [This Link](https://northeastern.zoom.us/rec/share/LDfTKRh_xN5STA276TKmkQVcO-ZTZ4HcPL4oIb85qgR7Zck52NoeZByvZFMwxe3W.CO_kVXyDnq7Tag5F) Password:FG+56Du+
- [Link to Slides](https://docs.google.com/presentation/d/19c98coIN9SQa1l-rATm0-9zpmaBuN8h3D7CdhdXbWG8/edit?usp=sharing)
- [CS 5610 Web Development Class Link](https://johnguerra.co/classes/webDevelopment_fall_2022/)


## Screenshots
![Dashboard](https://github.com/KeChen97/CS5610Project2/blob/main/screenshots/dashboard.png)
![main](https://github.com/KeChen97/CS5610Project2/blob/main/screenshots/main.png)
![login](https://github.com/KeChen97/CS5610Project2/blob/main/screenshots/signin.png)
![register](https://github.com/KeChen97/CS5610Project2/blob/main/screenshots/register.png)
![addworkout](https://github.com/KeChen97/CS5610Project2/blob/main/screenshots/addWorkout.png)



## DesignDoc
[DesignDocument.pdf](https://github.com/KeChen97/CS5610Project2/blob/main/ChenAsala-Project2-DesignDoc.pdf)

## Instructions to use
1. Register and login before use. Errors happen when inputting incorrect information, like user existed or wrong password.
2. Click "Start your workout" button to add the exercises you did today, it would appear in the History module after you click setting and come back (because it needs to rerender the data). 
4. Click "What I eat todat" button to add the food you eat and its calories, the dashboard should tell you the calories input progress, and how much calories deficit left.
5. Click "Exercises" to see all the exercises and its equipment and notes.
6. Click "History" to see your workout history ,and do updating and deleting workout operations. You need refresh to the the updated results.
7. Click "Settings" to update your profile, like name and password. You can also delete your account there.

## Instructions to build
- Clone this project from GitHub Repo.
- Run `npm init` to set up a new json package. 
- Check the [package.json](https://github.com/KeChen97/CS5610Project2/blob/main/package.json) and use `npm install` to install all the dependencies.
- Run `mongoimport -d workoutDB -c exercises --jsonArray -- file ./data/exercises.json` to import file locally. (Assumes that you have the mongo command line utils installed)
- Run `node app.js` or `nodemon app.js`to start the server.
- Go to localhost: http://locahost:3000/
 
