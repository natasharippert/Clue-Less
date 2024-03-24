/*const makeSuggestion = require("../Driver");
const assert = require("assert");
describe("Make Suggestion", function(){
    describe ("suggestion" , function() {
        it("weapon", function() {
            const weapon = new makeSuggestion();
            assert.equal(weapon, makeSuggestion.describe);
        })
        })
    });
    */

    const {makeSuggestion} = require("../driver");
    const assert = require("assert");
    describe("Make Suggestion", function() {
        describe("suggestion" , function() {
            it("should create a valid suggestion object" , function() {
                const player = {room: "Kitchen"};
                const suspect = "Jim";
                const weapon = "Coffee Mug";
                const accusation = false;
                
                const expectedSuggestion = {
                    suspect: "Jim", 
                    weapon: "Coffee Mug", 
                    room: "Kitchen", 
                };

                const suggestion = makeSuggestion(player, suspect, weapon, room, accusation);
                assert.deepStrictEqual(suggestion, expectedSuggestion);
            });
        });
    });
    //
