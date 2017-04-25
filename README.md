# Circle CI + WebDriverIO + Sauce Labs + Federalist

[![CircleCI](https://circleci.com/gh/18F/circle-wdio-federalist.svg?style=svg)](https://circleci.com/gh/18F/circle-wdio-federalist)

This is a standalone example of how to integrate [Circle CI], [WebDriverIO],
[Sauce Labs], and [Federalist] for automated cross-browser testing. Here are
the highlights:

* If you configure it to do so, Federalist will publish public "preview" URLs
  for each branch that you push to github. We can point WebDriverIO at these
  public URLs rather than building and running the Jekyll server on the CI
  container (which gets [complicated] quickly).

* Federalist includes git commit info in the Jekyll, which we can use to output
  a [commit.txt](commit.txt) file, then [request this file] and compare its
  contents to Circle's `$CIRCLE_SHA1` environment variable, ensuring that we're
  testing the correct build. This is a safeguard against cases in which
  Federalist takes longer to build the site than the CI service takes to
  prepare the test environment.

To run the tests locally:

```sh
npm install
npm test
```

To run the CI test script, you'll need to set up your environment accordingly.
Modify the [.env template file](.env.template) and rename it to `.env`, then
`source .env` or use [autoenv] to source it automatically. You'll need to do
the following once in the project directory to work around [a bug in
WebDriverIO's xunit reporter](https://github.com/webdriverio/webdriverio/issues/926):

```sh
ln -s /tmp
```

Once your environment is set up, you should be able to run:

```sh
./test/ci.sh
```

Happy browser testing!

[Circle CI]: https://circleci.com/
[WebDriverIO]: http://webdriver.io/
[Federalist]: https://federalist.18f.gov/
[Sauce Labs]: https://saucelabs.com/
[complicated]: https://github.com/18F/college-choice/blob/f0e6233c4849493c905bfee0fc37bfa57aa8dde6/test/ci.sh#L30-L46
[request this file]: test/ci.sh#L18
[autoenv]: https://github.com/kennethreitz/autoenv
