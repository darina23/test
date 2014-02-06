var PhoneBookCreateView = Backbone.View.extend({
    tagName: "div",
    events: {
        'click #submitContact': "addContact",
        'click #updateContact': "updateContact"
    },
    render: function (contact) {
        return $(this.el).html(new EJS({url: '/js/templates/bookForm.ejs'}).render({contact : contact}));
    },
    addContact: function () {
        var self = this
            , name = $('#userName').val()
            , number = $('#phone').val()
            , errorContainer = $("#dangerMessage")
            , bookModel = new BookModel();
        if(self.validation(name, number)){
            bookModel.set({name:name, number:number});
            bookModel.addNumber();
        }
    },
    updateContact: function () {
        var self = this
            , name = $('#userName').val()
            , number = $('#phone').val()
            , id = $('#updateContact').data('id')
            , errorContainer = $("#dangerMessage")
            , bookModel = Contacts.get(id);
        if(self.validation(name, number, id)){
            bookModel.set({name:name, number:number});
            bookModel.updateNumber();
        }
    },
    validation: function(name, number, id){
        var regNumber = /^[0-9]{3}-{1}[0-9]{4}-{1}[0-9]{4}$/,
            flag = true;
        if (regNumber.test(number)){
            var d = $.Deferred();
            if (!Contacts.length){
                FirebaseGlobal.once('value', function(message) {
                    console.log('message', message.val())
                    Contacts = new BookCollection();
                    _.each(message.val(), function(value, key){
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
            d.done(function() {
                if (Contacts.length){
                    _.each(Contacts.models, function(value, key){
                        console.log("value.get('name') == name", value.get('name') , name)
                        if (value.get('name') == name && value.get('id') != id){
                            // validation message
                            flag = false;
                        }
                    });
                    return flag;
                }
                return true;
            });
        } else {
            flag = false;

            // validation message
        }
        return flag;
    }
});
