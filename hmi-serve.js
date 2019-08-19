const express = require('express');
const app = express();
const csp = require('helmet-csp')

app.use(express.static(`${__dirname}/src/build`));

app.use(csp({
    // Specify directives as normal.
    directives: {
      defaultSrc: ["'self'", 'localhost'],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ['localhost'],
      fontSrc: ["'self'", 'localhost'],
      imgSrc: ['localhost', 'data:'],
      sandbox: ['allow-forms', 'allow-scripts'],
      reportUri: '/report-violation',
      objectSrc: ["'none'"],
      upgradeInsecureRequests: true,
      workerSrc: false  // This is not set.
    },
  
    // This module will detect common mistakes in your directives and throw errors
    // if it finds any. To disable this, enable "loose mode".
    loose: false,
  
    // Set to true if you only want browsers to report errors, not block them.
    // You may also set this to a function(req, res) in order to decide dynamically
    // whether to use reportOnly mode, e.g., to allow for a dynamic kill switch.
    reportOnly: false,
  
    // Set to true if you want to blindly set all headers: Content-Security-Policy,
    // X-WebKit-CSP, and X-Content-Security-Policy.
    setAllHeaders: false,
  
    // Set to true if you want to disable CSP on Android where it can be buggy.
    disableAndroid: false,
  
    // Set to false if you want to completely disable any user-agent sniffing.
    // This may make the headers less compatible but it will be much faster.
    // This defaults to `true`.
    browserSniff: true
  }))

app.listen(4000, () => {
    console.log('running');
});