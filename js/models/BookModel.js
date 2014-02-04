var BookModel = Backbone.Model.extend({
    attributes: {
        id: false,
        name: false,
        number: false
    },
    constructor: function () {
        Backbone.Model.apply( this, arguments );
    },
    addNumber: function () {
        var self = this;
        Firebase.push({ name: self.get('name'), number: self.get('number') });
        document.controller.navigate('book', {trigger: true});
    }
});
