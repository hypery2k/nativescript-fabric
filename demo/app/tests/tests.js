var Fabric = require("nativescript-fabric").Fabric;
var fabric = new Fabric();

describe("Fabric init", function() {
    it("exists", function() {
        expect(fabric.init).toBeDefined();
    });
});