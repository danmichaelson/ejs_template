// Load required modules (and then we refer to them by these variables)
var http = require('http');
var fs = require('fs');
var ejs = require('ejs');

// Read the template from disk (and then we refer to it by this variable)
var view = fs.readFileSync(__dirname + '/view.ejs', 'utf8');

// Start our HTTP server (and then this function is called for every request)
http.createServer(function (req, res) {
    
    // req is the request
    // res will be the response
    
    // Send the HTTP header to the browser
    res.writeHead(200, {'Content-Type': 'text/html'});
    
    // Get three durations (in milliseconds) from the request URL
    // Example request URL: /1500/200/3000
    var urlParts = req.url.split('/'); // "/1500/2000/3000" becomes ["", "1500", "2000", "3000"]
    
    // Assign the durations to variables for convenience
    var d1 = urlParts[1];
    var d2 = urlParts[2];
    var d3 = urlParts[3];
    
    // Do some math to show off conditionals
    // If the second square's duration is between the first and the third, 
    // make the third square real slow and slow down the first a bit
    if ((d2 > d1) && (d2 < d3)) {
        d3 = 60000;
        d1 *= 1.25; // This is the same as d1 = d1 * 1.25 . Multiply d1 by 1.25 and store the result back in d1.
    }
    // Otherwise divide d3 by 2 (speed it up 2x)
    else {
        d3 /= 2; // This is the same as d1 = d1 / 2 . Divide d1 by 2 and store the result back in d1.
    }
    
    // Conditional/comparison operators:
    // && ... and
    // || ... or
    // ! .... not
    // == ... is equal to (REMEMBER: single = means assignment, double == means comparison)
    // != ... is not equal to
    // < .... is less than
    // > .... is greater than
    // <= ... is less than or equal to
    // >= ... is greater than or equal to
    
    // Render the template, passing d1, d2, and d3 in as template variables duration1, duration2, and duration3
    // and stream the result to the browser as the HTTP payload
    res.write(ejs.render(view, {locals: {
        duration1: d1 / 1000, 
        duration2: d2 / 1000, 
        duration3: d3 / 1000,
    }}));
    
    // Close the HTTP connection (hang up the phone on the browser)
    res.end();
  
}).listen(process.env.PORT);
