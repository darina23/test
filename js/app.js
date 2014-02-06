var Controller = Backbone.Router.extend({
    routes: {
        "": "start",
        "book": "showBook",
        "book/create": "addContact",
        "book/update/:id": "updateContact"
    },

    start: function () {
        if (Views.login.$el.length) {
            $('#headerTitle').html('(Please, sign-in)');
            $('#main').html(Views.login.render());
        }
    },
    showBook: function () {
        $('#headerTitle').html('(Phone book)');
        if (Views.book.$el.length) {
            FirebaseGlobal.once('value', function(message) {
                Contacts = new BookCollection();
                _.each(message.val(), function(value, key){
                    value.id = key;
                    Contacts.add(value)
                });
                $('#main').html(Views.book.render());
                Views.bookList.delegateEvents();

            });
        }
    },
    addContact: function() {
        if (Views.contactCreate.$el.length) {
            $('#main').html(Views.contactCreate.render());
            Views.contactCreate.delegateEvents();

        }
    },
    updateContact: function (id){
        if (Views.contactCreate.$el.length) {
            var d = $.Deferred();
            if (!Contacts.length || !Contacts.get(id)){
                var firebaseForRow =  new Firebase(FirebaseGlobal.child(id).toString());
                firebaseForRow.once('value', function(message){
                    var contact = message.val();
                    if(contact){
                        contact.id = id;
                        Contacts = new BookCollection();
                        Contacts.add(contact);
                        d.resolve();
                        d.promise();
                    }
                })
            } else {
                d.resolve();
                d.promise();
            }
            d.done(function() {
                var model = Contacts.get(id);
                $('#main').html(Views.contactCreate.render({name: model.get('name'), number: model.get('number'), id: id }));
                Views.contactCreate.delegateEvents();
            });

        }
    }
});
Views = {
    login: new LoginPageView(),
    book: new PhoneBookMainView(),
    bookList: new PhoneBookListView(),
    contactCreate: new PhoneBookCreateView()
};
FirebaseGlobal = new Firebase('https://pirojenka-test.firebaseio.com/');
Contacts = {};
$(document).ready(function () {
    document.controller = new Controller();
    Backbone.history.start();
});
