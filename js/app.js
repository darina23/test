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
        console.log('show book')

        if (Views.login.$el.length) {
            $('#headerTitle').html('(Phone book)');
            $('#main').html(Views.book.render());
        }
    },
    addContact: function() {
        console.log('add contact')
        if (Views.login.$el.length) {

            $('#main').html(Views.contactCreate.render());
        }
    },
    error: function () {

    }
});
Views = {
    login: new LoginPageView(),
    book: new PhoneBookMainView(),
    bookList: new PhoneBookListView(),
    bookRow: new PhoneBookRowView(),
    contactCreate: new PhoneBookCreateView()
};

$(document).ready(function () {
    document.controller = new Controller();
    Backbone.history.start();
});
