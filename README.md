# ComeMurderMe
## Project submitted for the 2015 HackNC

The developers at University of Antarctica have delivered on perhaps their
most unique endeavor to date, comemurderme. Comenmurderme is a one of a kind 
app as well as a many of a kind app. 

1. It is unique in that it is the first app ever made for vampires by humans for (consuming) humans. 
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

#### How to use the application
As this is the earliest possible release, once you get the phonegap
server running you have to navigate the application in a particular manner.
The first page loads your GPS coordinates, let them load, and then click "Next".
The second page is the facebook login, click "Login with Facebook" and enter
in your facebook user id and password, don't worry, we could barely get those
loaded and this is actually phonegap using an in-app browser (all we get back
is an OAuth token temporarily). When you are done logging in you will be redirected
back to the second page, YOU MUST CLICK "Get My Info", hey, the worlds not perfect,
sometimes JS won't just DO things. Then click "Next". On the third page enter
in an optional comment and then click "Next". Finally click the button
"Capture Photo With Image Data", snap a photo and then click "Save" or "Use Photo".
At this point your "murdlet" has been submitted. Clicking "Next" brings you back
to the first page. Now go to comemurder.me:8289/carousel on your phone or computer to see it 
displayed.

### Challenges
1. This application required that the mobile application and the server side code
have a data point to center around. Since we needed authentication of some sort,
we both had to figure out how to get users to authenticate with facebook. This meant
that we had to register our application as a facebook application, get a developer
site set up, and then interface with facebook to get the unique (application
specific) user id. This was a pretty big challenge because it was a pretty big grey area
for both of us.

2. We have never written a mobile application before, while phongap made it easier...
there were still lots of details that had to be ironed out. Most notably, phonegap
is built on cordova so we had to read a lot of the cordova documentation to figure
out how we could utilize the camera and how we could send the picture/user 
data to the server.

3. While we have both developed on the web before with JavaScript/HTML/CSS, neither
of us had experience with a NoSQL database like redis. While it's simplicity as a key-
value store is appreciated greatly, it's always a challenge to work with a new technology,
especially one that is the backbone of your application. We were able to write our
whole stack in JavaScript, but getting everything to click node, express, nginx, redis,
configuration on linux, is no easy feat.

4. Being tired. It's really hard to work from 8pm to 2am. It's much harder to work all
night and then write a README at 10.

### Accomplishments we're proud of
1. While there is a lot of work to be done with logic, UI, and security, we were able
to reach our minimum viable project in almost no time starting from absolute bare metal.
While we appreciate automation Paas, IaaS, and other crazy JaaZZ, it's important to understand
how all of the pieces fit together. We believe that learning how the bare metal works
makes you better equipped to consume services that do things for you. In that respect,
we are both immensely proud of the fact that we started this project with two linux,
laptops, and a server and finished with a mobile application as well as a server
instance.

### What I Learned
1. Read the Docs.
2. Read the Docs.
3. Type some stuff.
4. Read the Docs agains.
5. Go slowly, don't type too much before you test, you're just giving yourself
a longer ASCII string with which to hang yourself.
6. Having a group mate is really important. Being able to talk out problems
is critical.

### What is next
1. Lots of UI improvements.
2. Better logic so the user can behave in any way with the application,
rather than a very specific way.
