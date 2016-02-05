# Automated cross-browser testing with Circle CI, WebDriverIO, Sauce Labs, and Federalist

This is a standalone, working example that integrates [Circle CI],
[WebDriverIO], [Sauce Labs], and [Federalist] into a (mostly) sane cross-
browser automated testing setup.


## How It Works
Here are the moving parts:

* [Federalist] is a web publishing platform that listens for commit hooks from
  GitHub and can either directly publish static files or build Jekyll sites and
  publish the resulting sites to S3. It also has a nifty branch preview feature
  that publishes unique, predictable URLs for each git branch, and can be
  configured to make these URLs public.

* [Circle CI], like many other popular [continuous integration] services, also
  listens for commit hooks from GitHub and can be configured via a `circle.yml`
  file to automatically run tests of any kind on each git branch.

* [WebDriverIO] is one of many browser testing frameworks that uses [Selenium]
  under the hood to script interactions with real and virtual web browsers.
  This allows us to write tests that can load web pages, click buttons and
  links, or detect whether certain elements are visible or hidden.

* [Sauce Labs] is a web service that lets you run Selenium tests on
  [hundreds][sauce labs platforms] of different web browsers on different
  platforms (Windows, OS X, Linux, iOS, Android), collect information about
  which tests succeed or fail, and even watch the scripted interactions after
  the fact.

The core piece of infrastructure here is a single shell script,
[test/ci.sh](test/ci.sh), which infers the Federalist URL from Circle CI's
[environment variables][circle env] and fetches a `commit.txt` file until its
contents match the git commit ID (SHA1) in Circle's `$CIRCLE_SHA`. You can see
this at work by viewing this repo's [published commit.txt](http://federalist.18f.gov.s3-website-us-east-1.amazonaws.com/site/shawnbot/circle-wdio-federalist/commit.txt)
and the [passing build on Circle CI](https://circleci.com/gh/shawnbot/circle-wdio-federalist/2).

## Setup
To start, you can either fork this repo or manually copy the relevant files
into your own. You'll need:

* [Jekyll], which Federalist uses to generate your static site.
* `circle.yml`, which tells [Circle CI] to use Node.js 4.x and run our
  custom test script.
* `commit.txt`, which will contain the latest git commit ID when Federalist
  builds your site.
* `package.json` to manage Node.js dependencies
* `test/ci.sh`, which is our Circle CI-specific test runner that ensures
  tests are being run against the same git commit on Circle and Federalist.
* `test/wdio.*.js` configuration files for [WebDriverIO].
* one or more browser tests in the `test/spec/` directory.

### Dependencies
1. Run `npm install` to install the Node.js dependencies.
2. Install Selenium Server. There are lots of different ways to do this, but
   the best that I've found is:

   ```sh
   # install webdriver-manager globally
   npm install -g webdriver-manager
   # install the Chrome driver
   webdriver-manager --chrome
   ```

### Federalist Setup
Next, add your repository to [Federalist], and configure its settings to make preview URLs public.

### Test Setup
1. Write some [WebDriverIO] tests in the `test/spec/` directory.
1. Configure your local environment variables:
  * Copy the [.env template](.env.template) and rename it to `.env`.
  * Modify your `.env` file to include your GitHub username,
    repo identifier, and [Sauce Labs] credentials.
  * You can then either `source .env` manually or use [autoenv] to
    have the `.env` file sourced automatically whenever you enter
    your project directory.
1. Run your tests locally:
  * Run Selenium Server in a new shell:
    
    ```sh
    webdriver-manager start
    ```
    
  * Start up your Jekyll server, also in a new shell, with:

    ```sh
    jekyll serve
    ```
    
  * Run the WebDriverIO tests locally with Chrome (the default):

    ```sh
    npm test
    ```

### Circle CI Setup
Add your repository to [Circle CI], and configure it with your
[Sauce Labs] username and access key in the `SAUCE_USERNAME` and
`SAUCE_ACCESS_KEY` [environment variables][circle env].

## Publishing
To run the tests, just push a commit to GitHub, and watch your build
status on [Circle CI].

Happy browser testing!

[Circle CI]: https://circleci.com/
[WebDriverIO]: http://webdriver.io/
[Federalist]: https://federalist.18f.gov/
[Sauce Labs]: https://saucelabs.com/
[complicated]: https://github.com/18F/college-choice/blob/f0e6233c4849493c905bfee0fc37bfa57aa8dde6/test/ci.sh#L30-L46
[request this file]: test/ci.sh#L18
[autoenv]: https://github.com/kennethreitz/autoenv
[College Scorecard]: https://github.com/18F/college-choice/
[Selenium]: http://www.seleniumhq.org/
[Jekyll]: http://jekyllrb.com/
[circle env]: https://circleci.com/docs/environment-variables
[sauce labs platforms]: https://wiki.saucelabs.com/display/DOCS/Platform+Configurator#/
[continuous integration]: https://en.wikipedia.org/wiki/Continuous_integration
