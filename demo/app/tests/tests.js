var Fabric = require("nativescript-fabric").Fabric;

describe("Fabric", function() {
    it("exists", function() {
        expect(Fabric).toBeDefined();
    });
    it("init", function() {
        Fabric.init();
    });
});
