var Controller = Backbone.Router.extend({
    routes: {
        "": "start",
        "book": "showBook",
        "book/create": "addContact",
        "!/error": "error"
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
            Firebase.on('value', function(message) {
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
    error: function () {

    }
});
Views = {
    login: new LoginPageView(),
    book: new PhoneBookMainView(),
    bookList: new PhoneBookListView(),
    contactCreate: new PhoneBookCreateView()
};
Firebase = new Firebase('https://pirojenka-test.firebaseio.com/');
Contacts = {};
$(document).ready(function () {
    document.controller = new Controller();
    Backbone.history.start();
});
