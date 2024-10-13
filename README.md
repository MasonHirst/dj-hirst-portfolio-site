## `Getting started`

In terminal, navigate into 'client' folder, then run 'npm install'. This may take a few minutes.
Then, navigate back out and into the 'server' folder, then run 'npm install'. This shouldn't take too long.

In the project directory, you can run:

### `npm run host`

Use this command in the 'client' folder to start the client code.
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
If you find the IP address of your computer, you can access the app from any other device on the same wifi
by going to http://[your IP address]:3000 (ex. http://10.0.0.200:3000)

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run server`

Use this command in the 'server' folder to start the local server.
This will allow you to use the server functions within the app, such as requesting a song, or viewing other requests.

You will need to create a file called '.env' within the server folder. You then need to obtain the .env variable secrets for the server to start properly.

## `Deployment`

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
The script will automatically create the build folder in the server layer

This app is hosted at [https://hirst-entertainment-server.fly.dev/], and [https://hirstdj.com/]
This app uses [Fly.io] for hosting

You may need to run 'brew install flyctl' to install the fly cli.

To deploy new versions, navigate into the 'client' folder, then run 'npm run build'.
Once previous step is complete, navigate into the 'server' folder, then run 'fly deploy'. 