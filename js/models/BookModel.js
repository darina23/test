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
    addNumber: function () {
        var self = this
            , fb = new Firebase("https://pirojenka-test.firebaseio.com/");
        fb.set({ name: self.get('name'), number: self.get('number') });
    }
});
