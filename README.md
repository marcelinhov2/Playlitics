#Playlitics
AngularJS application using Angular-Kickoff
(http://playlitics.herokuapp.com)

##Features
* Allows users to search - with auto-completion - for songs using Spotify’s Web API;
* Having found matching songs, add them to an organized playlist displaying their duration and popularity (when available);
* Display the Total Duration of the playlist (sum of the duration of each individual song in the playlist);
* Calculate and display the Coolness Factor of that playlist;
* Persist playlists to Local Storage.

##Installation

Clone repo using git
```sh
git clone git@github.com:marcelinhov2/Playlitics.git
cd Playlitics
```

Install dependencies
```sh
make setup
```

###Running the App during Development
This command automatically compiles coffee, jade and stylus, injects bower components, generates source maps, starts livereload server and opens your app in the browser.
```sh
make server
```

###Compiling app for development
This command compiles project and generates source maps. Output goes to ```sh app/``` folder
```
make compile
```

###Building the App for Production
This command compiles project and optimizes it for production. Output goes to ```sh dist/``` folder
```
make build
```