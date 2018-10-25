# Liri App

## Introduction
LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. 

LIRI is a command line NodeJS Application that takes in typed parameters and gives you back data.

# Usage

liri app has the following 4 command options:
* concert-this
* spotify-this-song
* movie-this
* do-what-it-says

When Concert This command is incomplete the output will Warn that situation.
When Spotify-This command is incomplete the output will be the info from the song "The Sign" of Ace of Base.
When Movie-This command is incomplete the output will be the info from the Movie "Mr. Nobody".

# Requirements

* Node JS Installed in the Server or Personal Computer
* Download the Project Directory and Install the Dependencies with npm -i
* Request the API Keys of (Spotify, OMBD and BandsInTown)
* Create the file `.env` and fill it with your Personal API Keys.

# Configuration

# API Keys Request

## Spotify

Visit [https://developer.spotify.com/dashboard/](https://developer.spotify.com/dashboard/)

![Spotify Developers](img/spotify_dev.png)

Click on Login if you have a Spotify (Premium or Free) Account or Register a new Account
![Spotify Developers Login](img/spotify_dev_login.png)

Read and Accept the Terms of Service.

![Spotify Developers Terms Of Service](img/spotify_dev_terms.png)

Click on a Create a Client ID
![Spotify New Application Client ID](img/spotify_dev_dashboard.png)

**Warning!!** The following Instructions work are for non-comercial use

Provide an App Name and a Description.

![Spotify New Application Client ID 01](img/spotify_dev_client_id_01.png)

Follow the next screenshots for non-coercial Application

![Spotify New Application Client ID 02](img/spotify_dev_client_id_02.png)
![Spotify New Application Client ID 03](img/spotify_dev_client_id_03.png)

Get your `ClientID` and your `Client Secret` in the next Screen

![Spotify New Application Client ID 04](img/spotify_dev_client_id_04.png)

## OMDB API

Visit [OMDB Api http://www.omdbapi.com/](http://www.omdbapi.com/)

Click on API Key

![OMBD API](img/ombd_api_site.png)


Select a Free Key for test purposes and Fill the Key Request Form.

![OMBD API Key Request Form](img/ombd_api_key_request.png)


Once you receive the email click on the provided link to activate the key.

![OMBD email](img/ombd_api_key_email.png)

## Bands in Town API

Visit [The Bands in Town API Site http://www.artists.bandsintown.com/bandsintown-api](http://www.artists.bandsintown.com/bandsintown-api)

Follow the Step by Step guide to request the API key
![Bands In Town API](img/bandsintown.png)

# Configure the .env file with the API Keys

![Env File Location](img/env_file_loc.png)

The `.env` file should be placed aside the `keys.js` and `liri.js` and should contain the following including the API Keys requested before.

```bash
# API keys

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret
OMBD_API_KEY=your-ombd-api-key
BANDSINTOWN_API_KEY=your-bands-in-town-key
```

# How it was build?
* Application file structure initially created.
* Node JS Project initialized with npm init.
* External Modules Installed.
    * [node-spotify-api](https://www.npmjs.com/package/node-spotify-api)
    * [request](https://www.npmjs.com/package/request)
    * [moment](https://www.npmjs.com/package/moment)
    * [dotenv](https://www.npmjs.com/package/dotenv)
* packege.jason verified.
* Command Line Arguments Verification Routines Implemented.
* Break Down with Switch/Case for each Command Option.
* API Keys Request for Spotify, OMBD and Bands In Town.
* Resolve the Isolation of these Confidential data Keys into a single file `.env` and invoke it from within the javascript.
* Encapsulate in Functions each Command Option.
* Importing Requiered Modules and Assigned to Variables inside the Program.
* 