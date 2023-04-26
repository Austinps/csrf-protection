# csf-protection

This is a simple project to practice implementing CSRF protection on user forms. It uses the following dependencies:

- `cookie-parser` - to parse cookies in incoming requests
- `csrf-csrf` - to provide double-submit CSRF protection
- `dotenv` - to load environment variables from a `.env` file
- `ejs` - as the view engine to render HTML pages
- `express` - as the web framework to handle HTTP requests

## How to run the server

To start the server, run the following command:

npm run dev

This will start the server in development mode using nodemon, which will automatically reload the server when you make changes to the code.

The server listens on port 3000 by default in development mode, but you can set the `PORT` environment variable to a different value to override it.

## Endpoints

The following endpoints are available:

- `GET /`: renders the home page
- `GET /csrf-token`: generates a CSRF token and returns it as a JSON object
- `POST /protected_endpoint`: a protected endpoint that requires a valid CSRF token to be included in the request. If the token is invalid or missing, a 403 Forbidden error is returned. Otherwise, the request is processed by the `postToProtected` controller.
- `POST /unprotected_endpoint`: an unprotected endpoint that is not protected from CSRF attacks. It can be used to test CSRF attacks.

## Configuration

The server reads its configuration from a `config.js` file in the root directory, which exports an object with the following properties:

- `paths`: an object that defines the paths to the views and public directories
- `viewEngine`: the name of the view engine to use (defaults to "ejs")
- `csrfConfig`: an object that defines the configuration for the CSRF protection middleware
- `cookiesSecret`: the secret to use for signed cookies

The values for these properties can be overridden using environment variables. See the `.env.example` file for an example of how to set these variables.

## License

This project is licensed under the ISC License.
