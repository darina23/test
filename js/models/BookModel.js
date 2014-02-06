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
        FirebaseGlobal.push({ name: self.get('name'), number: self.get('number') });
        document.controller.navigate('book', {trigger: true});
    },
    updateNumber: function () {
        var self = this;
        FirebaseGlobal.child(self.get('id')).set({ name: self.get('name'), number: self.get('number')}, function (){
            document.controller.navigate('book', {trigger: true});
        });
    },
    removeContact: function () {
        var self = this;
        FirebaseGlobal.child(self.get('id')).remove(function(){
            Backbone.history.loadUrl();
            return false;
        });
    }
});
