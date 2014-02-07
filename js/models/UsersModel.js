var UsersModel = Backbone.Model.extend({
    attributes: {
        useremail: false,
        userpwd: false,
        rememberme: false
    },
    constructor: function () {

    },
    signIn: function (errorContainer) {
        var self = this;
        Auth.login('password', {
            email: self.get('useremail'),
            password: self.get('userpwd'),
            rememberMe: self.get('rememberme')
        });

    },
    logOut: function () {
        Auth.logout();
        document.controller.navigate('', {trigger: true});


    }


});
