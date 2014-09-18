var wd = require('wd');
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
var matrix = require('./matrix');

chai.use(chaiAsPromised);
chai.should();
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

// http configuration, not needed for simple runs
wd.configureHttp( {
    timeout: 60000,
    retryDelay: 15000,
    retries: 5
});

desired = matrix.mobile[0];

desired.name = 'homework planner';
var pr_tag = process.env.TRAVIS_PULL_REQUEST || 'na';
var pr_branch = process.env.TRAVIS_BRANCH || 'local branch';
desired.tags = [pr_tag, pr_branch];
desired.build = process.env.TRAVIS_BUILD_NUMBER || 'local build';

describe(desired.browserName, function() {
    var browser;
    var allPassed = true;

    before(function(done) {
        browser = wd.promiseChainRemote("localhost", 4445, process.env.SAUCE_USERNAME, process.env.SAUCE_ACCESS_KEY);
        browser.on('status', function(info) {
            console.log(info);
        });
        browser.on('command', function(meth, path, data) {
            console.log(' > ' + meth, path, data || '');
        });
        browser
            .init(desired)
            .nodeify(done);
    });

    afterEach(function(done) {
        allPassed = allPassed && (this.currentTest.state === 'passed');  
        done();
    });

    after(function(done) {
        browser
            .quit()
            .sauceJobStatus(allPassed)
            .nodeify(done);
    });
it("should get home page title", function(done) {
    browser
        .get("localhost:5672")
        .title()
        .should.become("Homework Planner | Hello World")
        .nodeify(done);
});

it("should get username box", function(done) {
    browser
        .get("localhost:5672")
        .elementById("username")
        .nodeify(done);
});

it("should get password box", function(done) {
    browser
        .get("localhost:5672")
        .elementById("password")
        .nodeify(done);
});
});