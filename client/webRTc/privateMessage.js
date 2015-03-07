Template.privateMessage.rendered=function(){
//alert(location.href);
//$('.navbar').hide();

var link = location.href;
		var receiverId = Session.get('getmessage');//alert('getmessage');
		var senderName=Meteor.user().profile.username; //alert(senderName);
		var privteData={
			url:link,
			sender:Meteor.userId(),
			receiver:receiverId,
			sendername:senderName,

				 flag:0,
    			status:false
		}


		Meteor.call('insertPrivateData',privteData,function(err,res){

		});

}


Template.onlineUsers.events({
	'click #personal-user #Chat': function(){	
		
		var messageid = Math.random().toString(36).substring(7);
		var priChat = {sender:Meteor.userId(),senderName:Meteor.user().profile.username,receiver:this._id,receiverName:this.profile.username,priRoomId:messageid};

		Meteor.call('insertPrivateChats',priChat,function(err,res){
			if(!err)
				window.open('/privateMessage/'+messageid);
		});

	}
});

Template.pri_chat_text.events({
	'keydown #textArea':function(e,tem){
		//e.preventDefault();
		//alert(1);
		//console.log(e.which);
		if(e.which===13)
		{
		var name = Meteor.user().profile.username;
		var msg = $('#textArea').val();
		var trim_msg = $.trim(msg);
		var chat = {message:trim_msg,name:name,date:$.timeago(new Date()),privateRoom:Session.get('getRoomId')};
		console.log(trim_msg);
		if(chat.message != "")
		{
		Meteor.call('insertChats',chat,function(err,res){
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

Template.privateMessage.helpers({
	'myHelper': function(){
		var priroom= Session.get('getRoomId');
		Meteor.subscribe('getChats',priroom);
		return Chat.find();
	},
});

