it("should get home page title", function(done) {
    browser
        .get("http://localhost:5672")
        .title()
        .should.become("Homework Planner | Hello World")
        .nodeify(done);
});

it("should get username box", function(done) {
    browser
        .get("http://localhost:5672")
        .elementById("username")
        .nodeify(done);
});

it("should get password box", function(done) {
    browser
        .get("http://localhost:5672")
        .elementById("password")
        .nodeify(done);
});