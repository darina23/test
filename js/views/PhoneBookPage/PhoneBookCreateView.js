var PhoneBookCreateView = Backbone.View.extend({
    tagName: "div",
    className: "row",
    events: {
        'click #submitContact': "addContact",
        'click #updateContact': "updateContact"
    },
    render: function (contact) {
        return $(this.el).html(new EJS({url: '/templates/bookForm.ejs'}).render({contact: contact}));
    },
    addContact: function () {
        var self = this
            , name = $('#userName').val()
            , number = $('#phone').val()
            , bookModel = new BookModel();
        if (self.validation(name, number)) {
            bookModel.set({name: name, number: number});
            bookModel.addNumber();
        }
    },
    updateContact: function () {
        var self = this
            , name = $('#userName').val()
            , number = $('#phone').val()
            , id = $('#updateContact').data('id')
            , bookModel = Contacts.get(id);
        if (self.validation(name, number, id)) {
            bookModel.set({name: name, number: number});
            bookModel.updateNumber();
        }
    },
    validation: function (name, number, id) {
        var regNumber = /^[0-9]{3}-{1}[0-9]{4}-{1}[0-9]{4}$/,
            flag = true,
            validationContainer = $(this.el).find('#validationContact');
        if (name.length) {
            if (regNumber.test(number)) {
                var d = $.Deferred();
                if (!Contacts.length) {
                    FirebaseGlobal.once('value', function (message) {
                        Contacts = new BookCollection();
                        _.each(message.val(), function (value, key) {
                            value.id = key;
                            Contacts.add(value)
                        });
                        d.resolve();
                        d.promise();
                    });
                } else {
                    d.resolve();
                    d.promise();
                }
                d.done(function () {
                    if (Contacts.length) {
                        _.each(Contacts.models, function (value, key) {
                            if (value.get('name') == name && value.get('id') != id) {
                                validationContainer.html(ValidateMessages.invalidName);
                                flag = false;
                            }
                        });
                        return flag;
                    }
                    return true;
                });
            } else {
                validationContainer.html(ValidateMessages.invalidNumber);
                flag = false;
            }
        } else {
            validationContainer.html(ValidateMessages.emptyName);
            flag = false;
        }
        return flag;
    }
});
