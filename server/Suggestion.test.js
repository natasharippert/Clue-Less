const makeSuggestion = require("../Driver");
const assert = require("assert");
describe("Make Suggestion", function(){
    describe ("suggestion" , function() {
        it("weapon", function() {
            const weapon = new makeSuggestion();
            assert.equal(weapon, makeSuggestion.describe);
        })
        })
    });