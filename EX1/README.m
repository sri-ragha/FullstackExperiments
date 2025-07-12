# EX1

The server.js script is run, starting an HTTP server that listens on localhost:3000.
When a user visits this URL, their browser sends a request for the root path (/).
The server's logic identifies this path and serves the index.html file.
The browser receives the HTML, parses it, and discovers links to style.css and script.js.
The browser then makes separate requests for these two files.
The server receives these new requests and serves the corresponding files with the correct content types.
The browser applies the CSS styles and executes the JavaScript, rendering the complete, styled, and interactive page for the user.

