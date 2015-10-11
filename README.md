# ComeMurderMe

The developers at University of Antarctica have delivered on perhaps their
most unique endeavor to date, comemurderme. Comenmurderme is a one of a kind 
app as well as a many of a kind app. 

1. It is unique in that it is the first app ever made for vampires by humans for humans. 
2. It is both an iOS/Android app as well as a web site utilizing phonegap, HTML, CSS, JavaScript, Node, Redis, Nginx, and Express.js

## The Intent

Being a vampire is really hard... because you have to kill people. But what if some 
people wanted to be bitten by a vampire? That's where we come in!
This mobile application gives you the power to upload a photo, your GPS coordinates,
and a comment to the website http://comemurder.me. This gives vampires the ability
to view the site and find victims, and their exact locationk at
a time in the past. While we acknowledge that there are probably a lot of other
fun use cases for such an application, e.g. you could use this site to take action
shots of yourself in public and have them automatically update on your personal site,
they are all merely externalities.

## The Mobile Side

To rapidly prototype this application in 24 hours we used phonegap. A development
platform that utilizes HTML/CSS/Javascript to write mobile applications that can
work on iOS and Android devices. 

## The Server Side

We have an Ubuntu Linux machine hosted by Digital Ocean mapped to the URL 
comemurder.me. The server runs Nginx and express to handle requests/responses
and we use redis to keep user data.


### Getting Mobile set up

Make sure you have node and npm installed.

```
git clone https://github.com/university-of-antarctica/comemurderme.git
cd comemurderme/mobile/
npm install -g phonegap
phonegap serve 
```

Phonegap will then act as a server to your phone, note the ip:port that it prints out. 
Since we can't get an application on the Apple App Store or on Google Play in 24 hours,
we are using the PhoneGap Developer Application (available on both storefronts) 
to serve the page. Simply download the PhoneGap Developer application to your phone,
start it up, and in the prompt for server enter in the ip:port combo from the 
"phonegap serve" output and hit "Connect". You should be up and running.

### Getting your own comemurder.me server running on localhost

