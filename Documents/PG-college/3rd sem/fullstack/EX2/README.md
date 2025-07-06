# My Project Description:Start the Server: The developer runs node app.js, which starts the Express server and makes it listen for requests on a specific port (e.g., 3000).
Load the Form: A user navigates to http://localhost:3000/. The GET route for / in app.js is triggered, which renders the home.hbs template and sends the HTML form to the user's browser.
Submit Data: The user fills out the form and clicks Submit. This action sends a POST request to the /submit route, with the form data included in the request body.
Process and Store Data: The POST route for /submit in app.js is triggered.
It reads the existing content from data.json.
It parses the JSON string into a JavaScript array.
It adds the new submission data (from req.body) to this array.
It writes the updated array back to the data.json file.
Redirect: After successfully saving the data, the server responds with a redirect instruction, telling the browser to make a new request to the /data page.
Display the Data: The browser makes a GET request to /data.
The GET route for /data in app.js is triggered.
It reads the data.json file again, which now includes the new submission.
It passes the array of all submissions to the display.hbs template.
Handlebars renders the page, looping through the data to create a list of all entries.
The final HTML is sent to the browser, and the user sees the page with their newly added data.
