Template.chat_text.events({
	'keydown #textArea':function(e,tem){
		//e.preventDefault();
		//alert(1);
		//console.log(e.which);
		if(e.which===13)
		{
		var name = Meteor.user().profile.username;
		var msg = $('#textArea').val();
		var trim_msg = $.trim(msg);
		var chat = {message:trim_msg,name:name,date:$.timeago(new Date())};
		console.log(trim_msg);
		if(chat.message != "")
		{
		Meteor.call('insertScienceChats',chat,function(err,res){
			if(!err){				
				$(".chat_window").scrollTo(1000000);		
				tem.find("#textArea").value = "";
			}
		});
		}
		return false;
		}
	}	
});

Template.science.helpers({
	'myScienceHelper': function(){
		Meteor.subscribe('getScienceChats',Meteor.userId());
		return Science.find();
	},
});