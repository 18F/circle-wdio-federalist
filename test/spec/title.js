/* jshint node: true, mocha: true, esnext: true */
/* global browser */

var assert = require('assert');

describe('page title', function() {

  it('should be "Hello, world!"', function*() {

    yield browser.url('/');
    var title = yield browser.getTitle();
    assert.equal(title, 'Hello, world!');

  });

});
