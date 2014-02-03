var BookModel = Backbone.Model.extend({
    attributes: {
        id: false,
        name: false,
        number: false
    },
    constructor: function () {

    },
    showNumber: function (errorContainer) {


    },
    addNumber: function (name, number) {
        var fb = new Firebase("https://pirojenka-test.firebaseio.com/");
        fb.set({ name: name, number: number });
    }
});
