/* jshint node: true */

exports.config = {
    // =====================
    // Server Configurations
    // =====================
    // Host address of the running Selenium server. This information is usually
    // obsolete as WebdriverIO automatically connects to localhost. Also if you
    // are using one of the supported cloud services like Sauce Labs,
    // Browserstack or Testing Bot you also don't need to define host and port
    // information because WebdriverIO can figure that our according to your
    // user and key information. However if you are using a private Selenium
    // backend you should define the host address, port, and path here.
    //
    host: '0.0.0.0',
    port: 4444,
    path: '/wd/hub',

    // ==================
    // Specify Test Files
    // ==================
    // Define which test specs should run. The pattern is relative to the
    // directory from which `wdio` was called. Notice that, if you are calling
    // `wdio` from an NPM script (see https://docs.npmjs.com/cli/run-script)
    // then the current working directory is where your package.json resides,
    // so `wdio` will be called from there.
    specs: [
        'test/spec/**'
    ],

    // Patterns to exclude.
    exclude: [
    ],

    // ============
    // Capabilities
    // ============
    // Define your capabilities here. WebdriverIO can run multiple capabilties
    // at the same time. Depending on the number of capabilities WebdriverIO
    // launches several test sessions. Within your capabilities you can
    // overwrite the spec and exclude option in order to group specific specs
    // to a specific capability.
    //
    // If you have trouble getting all important capabilities together check
    // out Sauce Labs platform configurator. A great tool to configure your
    // capabilities:
    //
    // <https://docs.saucelabs.com/reference/platforms-configurator>
    capabilities: [{
      browserName: 'chrome'
    }],

    // Level of logging verbosity.
    logLevel: 'silent',

    // Enables colors for log output
    coloredLogs: true,

    // Saves a screenshot to a given path if a command fails.
    screenshotPath: 'shots',

    // Shorten url command calls by setting a base url. If your url parameter
    // starts with "/" the base url gets prepended.
    baseUrl: 'http://localhost:4000',

    // Default timeout for all waitForXXX commands.
    waitforTimeout: 5000,

    // Initialise the browser instance with a WebdriverIO plugin. The object should have the
    // plugin name as key and the desired plugin options as property. Make sure you have
    // the plugin installed before running any tests. The following plugins are currently
    // available:
    // WebdriverCSS: https://github.com/webdriverio/webdrivercss
    // WebdriverRTC: https://github.com/webdriverio/webdriverrtc
    // Browserevent: https://github.com/webdriverio/browserevent
    plugins: {
    },

    // Framework you want to run your specs with.
    // The following are supported: mocha, jasmine and cucumber
    // see also: http://webdriver.io/guide/testrunner/frameworks.html
    //
    // Make sure you have the node package for the specific framework installed before running
    // any tests. If not please install the following package:
    // Mocha: `$ npm install mocha`
    // Jasmine: `$ npm install jasmine`
    // Cucumber: `$ npm install cucumber`
    framework: 'mocha',

    // Test reporter for stdout.
    // The following are supported: dot (default), spec and xunit
    // see also: http://webdriver.io/guide/testrunner/reporters.html
    reporter: 'dot',

    // Some reporter require additional information which should get defined here
    reporterOptions: {
    },

    // Options to be passed to Mocha.
    // See the full list at http://mochajs.org/
    mochaOpts: {
        ui: 'bdd'
    },

    // =====
    // Hooks
    // =====
    // Run functions before or after the test. If one of them return with a promise, WebdriverIO
    // will wait until that promise got resolved to continue.
    //
    // Gets executed before all workers get launched.
    onPrepare: function() {
    },

    //
    // Gets executed before test execution begins. At this point you will have access to all global
    // variables like `browser`. It is the perfect place to define custom commands.
    before: function() {
    },

    // Gets executed after all tests are done. You still have access to all
    // global variables from the test.
    after: function(failures, pid) {
    },

    // Gets executed after all workers got shut down and the process is about
    // to exit. It is not possible to defer the end of the process using a
    // promise.
    onComplete: function() {
    }
};
