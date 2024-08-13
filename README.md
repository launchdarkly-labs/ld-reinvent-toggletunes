# Welcome to ToggleTunes

![ToggleTunes](/public/images/ToggleTunes.png)

This project is part of the LaunchDarkly re:Invent 2023 Booth Experience. Teams will come together in a challenge scenario and release features, seeing who can ship the fastest. 

## Challenge Steps 

The challenge sequence (today) is as follows...

* Release ToggleTunes Playlist Functionality 
* Enhance the navigation of ToggleTunes with "Recently Played" items
* Migrate to the new and improved ToggleDB, enabling album art, and an expanded music library 
* Enable the User Defined Playlist Functionality and Trending Music
* For Platinum users, enable exclusive VIP experiences 

## Setup

This project requires the following .env files to function... 

* Team projects created in LaunchDarkly (do not use environments to separate, use new projects). The format for the name is `toggle-tunes-team-#` up to 4. 
* For each of the 4 teams, a server and client key in the format shown below 
* API key for managing the LaunchDarkly account where all these projects live (enables resetting of account flags and details)
* External Postgres Database for the expanded track list (check with DevExperience for the most recent version of this)
* Supabase configuration details for the realtime scoreboard updates (check with DevExperience for the most recent version of this)

```bash
NEXT_PUBLIC_LD_CLIENT_KEY = '<LD Client Key>'
LD_SDK_KEY = '<LD Server SDK Key>'
NEXT_PUBLIC_LD_CLIENT_KEY_TEAM1 = '<LD Client Key>'
LD_SDK_KEY_TEAM1 = '<LD Server SDK Key>'
NEXT_PUBLIC_LD_CLIENT_KEY_TEAM2 = '<LD Client Key>'
LD_SDK_KEY_TEAM2 = '<LD Server SDK Key>'
NEXT_PUBLIC_LD_CLIENT_KEY_TEAM3 = '<LD Client Key>'
LD_SDK_KEY_TEAM3 = '<LD Server SDK Key>'
NEXT_PUBLIC_LD_CLIENT_KEY_TEAM4 = '<LD Client Key>'
LD_SDK_KEY_TEAM4 = '<sdk-444868cc-cbfb-4ada-965b-66acf28aa48a'

LD_API_KEY='<LD API Key>'

LIVEBLOCKS_KEY = '<Liveblocks Secret Key>'

DATABASE_URL = '<external postgres connection string>'
NEXT_PUBLIC_REDIS_URL = '<external Redis instance (not used)'
NEXT_PUBLIC_DB_URL = '<supabase DB URL>'
NEXT_PUBLIC_DB_ANON_KEY = '<supabase public key>'
```

As well as the necessary flags created to handle the feature changes.

## Design Content

[Figma Design Files](https://www.figma.com/file/TfGsBSAlsHV937ARFN3BCO/AWS-2023?node-id=1052%3A3320&mode=dev)