var UsersModel = Backbone.Model.extend({
    attributes: {
        useremail: false,
        userpwd: false,
        rememberme: false
    },
    constructor: function () {

    },
    signIn: function (errorContainer) {
        var self = this
            , auth = new FirebaseSimpleLogin(FirebaseGlobal, function (error, user) {
                if (!error) {
                    if(user){
                        document.controller.navigate('book', {trigger: true});
                    }
                }else{
                    errorContainer.removeClass('hide');
                }
            });
        auth.login('password', {
            email: self.get('useremail'),
            password: self.get('userpwd'),
            rememberMe: self.get('rememberme')
        });

    }


});
