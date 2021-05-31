# Grumble
## Members
Luo Siyi, Xiong Jingya

## Level of achievement
Apollo 11

## Project scope/Overview
We aim to make an app that makes picking a place to eat easier in group settings by letting people swipe on restaurants.

## Purpose of the project
Many of us have been crippled by choice when having to choose a place to eat, and this decision is all the more difficult in group settings. Our need to be accommodating to others often results in a collective unwillingness to admit what we really want and the process of collecting everyone’s preferences gets increasingly inconvenient as group sizes grow. 

Our application intends to make picking a place to eat fun and easy for all through utilizing the [popular swipe interaction](https://www.researchgate.net/publication/292387126_Power_of_the_Swipe_Why_Mobile_Websites_Should_Add_Horizontal_Swiping_to_Tapping_Clicking_and_Scrolling_Interaction_Techniques), thus providing a solution that is a lot less stressful and time-consuming.

## User stories
As users who face difficulties choosing a place to eat at, 

1. Join an individual session or group session using a randomly generated group code (in group social settings).

2. Enter the designated location they are at/they will be meeting others at, or using the track their location function.

3. Based on the location, our system would suggest around 10 restaurants in the form of flashcards (swipe right for “Want to eat” and swipe left for “Pass”)

4. At the end, our system would evaluate the preferences of all and generate a chart for the results.

As users who have chosen a place to eat at after using the application,

1. Able to view the past restaurants they have visited

2. To choose their favourites for reference

3. Customise and choose their dietary restrictions

## Core features/Scope of the project
1. Group session

- Users can create sessions that others can join

- In these sessions, they can swipe together on the same few restaurants and discuss within the session’s chatroom. (Creating a session will automatically create a chatroom with everyone in it)

2. Location-based suggestions

- Allow users to narrow down a list of restaurants based on distance radius and address/location of their choosing.

3. Choose from reviews

4. Filtering your choices

- Users can filter the suggestions they get based on dietary restrictions, takeout/delivery options, pricing range, cuisine

#### Features to be implemented in the 2nd phase
1. Creating group sessions

2. Get set of suggestions based on location (eg. using Google Maps)

3. On the Swipe screen: 

- Swiping to the left: Registers as the user saying ‘yes’ to the option

- Swiping to the right: Registers as the user saying ‘no’ to the option

4. Result generation & depiction after all users in a group session finish swiping the deck

5. Individual/group Chat Room screens

#### Features to be implemented in the 3rd phase
1. User favourites, dietary specification choices in each user’s profile

2. Providing more information about restaurants (Reviews and pictures)

3. Enhancing the user interface

4. Website equivalent that does not require users to create a profile for use

## Design
<img
  width="250"
  alt="Login"
  src="https://github.com/xiongjya/Grumble/blob/main/images/login.PNG">
 <img
  width="250"
  alt="Swipe"
  src="https://github.com/xiongjya/Grumble/blob/main/images/swipescreen.PNG">
 <img
  width="250"
  alt="Swiping in action"
  src="https://github.com/xiongjya/Grumble/blob/main/images/swipe-in-action.PNG">
 <img
  width="250"
  alt="Chats"
  src="https://github.com/xiongjya/Grumble/blob/main/images/chatrooms.PNG">
 <img
  width="250"
  alt="Profile"
  src="https://github.com/xiongjya/Grumble/blob/main/images/profile.PNG">
  
## How are we different from similar platforms?
Compared to similar apps on the App Store (such as Munch: Decide Where to Eat, Tine - Dine Together and many more), we offer:

- Filtering based on dietary restrictions/cravings

- To favourite restaurants after visiting (for future references)

- To delete events when they are no longer necessary (providing a cleaner user interface)

Furthermore, we allow users to create chat rooms based on the groups that they are in (with each session that they join), making it more convenient than to switch between our app and another messaging app for discussions. 

## Program flow
<img
  width="500"
  alt="Program flow"
  src="https://github.com/xiongjya/Grumble/blob/main/images/program-flow.png">

## Setting up
Clone this repository
```bash
git clone https://github.com/xiongjya/Grumble
```
Change-directory into the project root
```bash
cd Grumble
```
Install all dependencies with your package manager
```bash
npm install
```
or if you are have yarn
```bash
yarn install
```
Run the project on expo
```bash
expo start
```
