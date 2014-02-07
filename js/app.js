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
    showBook: function (d2) {
        $('#headerTitle').html('(Phone book)');
        if (Views.book.$el.length) {
            FirebaseGlobal.once('value', function(message) {
                Contacts = new BookCollection();
                _.each(message.val(), function(value, key){
                    value.id = key;
                    Contacts.add(value)
                });
                $('#main').html(Views.book.render());
                if (d2){
                    return d2.resolve();
                }
                Views.bookList.delegateEvents();
            });
        }
    },
    addContact: function() {
        var mainContainer = $('#main');
        if (Views.contactCreate.$el.length) {
            if(!mainContainer.find('.contact-create-row').length){
                document.controller.navigate('book', {trigger: true});
                Views.contactCreate.delegateEvents();
            } else {
                $('.contact-update-row').find('div.hide').removeClass('hide');
                mainContainer.find('.contact-create-row').find('div, i').addClass('hide');
                mainContainer.find('.contact-create-row').prepend(Views.contactCreate.render());
                Views.contactCreate.delegateEvents();
            }

        }
    },
    updateContact: function (id){
        var self = this;
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
                var model = Contacts.get(id),
                 d2 = $.Deferred();
                if(!$('#main').find('.contact-update-row[data-id=' + id + ']').length){
                    self.showBook(d2);
                } else {
                     d2.resolve();
                }
                d2.done(function(){
                    var currentRow = $('#main').find('.contact-update-row[data-id=' + id + ']');
                    $('.contact-update-row').find('div.hide').removeClass('hide');
                    $('.contact-create-row').find('div.hide').removeClass('hide');
                    currentRow.find('div, i').addClass('hide');
                    currentRow.prepend(Views.contactCreate.render({name: model.get('name'), number: model.get('number'), id: id}));
                    Views.contactCreate.delegateEvents();
                })
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
Auth = new FirebaseSimpleLogin(FirebaseGlobal, function (error, user) {
    if (!error) {
        if(user){
            var userModel = new UsersModel();
            userModel.set({useremail:user.email, userpwd:user.firebaseAuthToken})
            $('#logOut').click(function(){
                userModel.logOut();
            });
            document.controller.navigate('book', {trigger: true});
        }
    }else{
        $("#validationEmail").html(ValidateMessages.invalidUser);
    }
});
Contacts = {};
$(document).ready(function () {
    document.controller = new Controller();
    Backbone.history.start();


});
