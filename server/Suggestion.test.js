// const { makeSuggestion } = require("./driver"); // Adjust the path as needed
// const assert = require("assert");

// describe("Make Suggestion", function () {
//   describe("suggestion", function () {
//     it("should create a valid suggestion object", function () {
//       // Mock data to pass to makeSuggestion
//       const player = { room: "Kitchen" }; // Example, adjust as needed
//       const suspect = "Jim";
//       const weapon = "Coffee Mug";
//       const room = "Kitchen";
//       const accusation = false; // This is not an accusation

//       const expectedSuggestion = {
//         suspect: "Jim",
//         weapon: "Coffee Mug",
//         room: "Kitchen",
//       };

//       // Call the function with the mock data
//       const suggestion = makeSuggestion(player, suspect, weapon, room, accusation);

//       // Assert that the returned suggestion matches what we expect
//       assert.deepStrictEqual(suggestion, expectedSuggestion);
//     });
//   });
// });

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

    const {makeSuggestion} = require("./driver");
    const assert = require("assert");
    describe("Make Suggestion", function() {
        describe("suggestion" , function() {
            it("should create a valid suggestion object" , function() {
                const player = {room: "Kitchen"};
                const suspect = "Jim";
                const weapon = "Coffee Mug";
                const room = "Kitchen";
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
