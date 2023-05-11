# roblox-ugc-notifier
Roblox UGC item notifier.  Tracks when new UGC items are released, if they're limited, notable, etc.


In the config.json file you will want to fill out all of the appropriate fields.  
You will need a ROBLOX cookie, a few Discord webhooks (Could also use the same one), and a MongoDB connection string. (I recommend just using their free tier.)

From there, you can just edit the main and call whichever scanners you want to use.  I would recommend not using the Tracker, as it rate limits fairly quickly.
