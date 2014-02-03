var Controller = Backbone.Router.extend({
    routes: {
        "": "start",
        "book": "showBook",
        "!/error": "error"
    },

    start: function () {
        if (Views.login.$el.length) {
            $('#headerTitle').html('(Please, sign-in)');
            $('#main').html(Views.login.render());
        }
    },
    showBook: function () {
        console.log('book!!!');
        if (Views.login.$el.length) {
            $('#headerTitle').html('(Phone book)');
            $('#main').html(Views.book.render());
        }
    },
    error: function () {

    }
});
Views = {
    login: new LoginPageView(),
    book: new PhoneBookMainView(),
    bookList: new PhoneBookListView(),
    bookRow: new PhoneBookRowView()
};

$(document).ready(function () {
    document.controller = new Controller();
    Backbone.history.start();
});
