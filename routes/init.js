//var express = require('express');
var Account = require('../mongo').Account;

// add init account
module.exports.init_add_account = function() {
	// check admin account exists
    Account.findOne({'username': 'admin'}, function(err, account){
        if (err) {
            console.log('find admin account error: ' + err);
        }

        if (account){
	    	console.log('account(%j) already exist.', account)
		}else {
            console.log('add admin account start.');
			Account.register(new Account({ username: 'admin'}), 'admin',
				             function(err, account) {
				if (err) {
        	    	console.log('add admin account error: ' + err);
        	    } else {
        	    	console.log('add admin account success.');
            	}
        	});
	    }
    });
};
