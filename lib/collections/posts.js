Posts = new Mongo.Collection('posts');
Chat = new Mongo.Collection('Chat');
Science = new Mongo.Collection('Science');
Politics = new Mongo.Collection('Politics');
Love = new Mongo.Collection('Love');

Meteor.methods({                       //chat message insert garNALAI method banako   
	'insertChats':function(chat_msg){
			Chat.insert(chat_msg);
	}
});

Meteor.methods({                       //chat message insert garNALAI method banako   
	'insertScienceChats':function(chat_msg){
			Science.insert(chat_msg);
	}
});

Meteor.methods({                       //chat message insert garNALAI method banako   
	'insertPoliticsChats':function(chat_msg){
			Politics.insert(chat_msg);
	}
});

Meteor.methods({                       //chat message insert garNALAI method banako   
	'insertLoveChats':function(chat_msg){
			Love.insert(chat_msg);
	}
});

Meteor.methods({
	postInsert: function(postAttributes){
		check(Meteor.userId(), String);
		check(postAttributes,{
			statusText: String
		});

		var user = Meteor.user();
		var post = _.extend(postAttributes, {
			userId: user._id,
			createdBy:Meteor.userId(),
			author: user.profile.username,
			submitted: new Date(),
			modifiedDate:new Date(),
			avatar:user.profile.avatar,
			comments:[],
			commentedAt:null,
			
			like:0

		});

		var postId = Posts.insert(post);

		
	}
});

Posts.allow({
	insert: function(userId, doc){
		// only allow posting if you are logged in
		return !! userId;
	}
});

Meteor.methods({
	'editPost': function(value){
		Posts.update({_id:value.currentPostId},{$set:{statusText:value.statusText}});
	},

	'insertPeerId':function(a){
		Videochat.insert(a);
	},
	'insertalert':function(b){
		Alertmechanism.insert(b);
	},
	'decreasecount':function(id){
		 Alertmechanism.update({caller:id},{$set:{flag:1}});
	},
	'decreasemessagecount':function(id){
		 Messagealert.update({sender:id},{$set:{flag:1}});
	},
	'decreasenotificaton':function(id){
		Alertmechanism.update({caller:id},{$set:{status:true}});
	},
	'decreasemessagenotificaton':function(id){
		//Messagealert.update({sender:id},{$set:{status:true}});
		Messagealert.remove({sender:id});
	},
	'deletenotification':function(id){
		Alertmechanism.remove({caller:id});
	},
	'deletemessagenotification':function(id){
		Messagealert.remove({sender:id});
	}
	
});

Meteor.methods({
	'deletePost':function(id){
		Posts.remove({_id:id});
	},
    'insertComments':function(id,comments){
       
      Posts.update({_id:id},{$set:{comments:comments,modifiedDate:new Date()}});
    },
    'insertLike':function(id){
    	 Posts.update({_id:id},{$inc:{like:1}});

    },
    'decreaseLike':function(id,a){
    	 Posts.update({_id:id},{$inc:{like:-1}});
    },
    'deleteComment':function(id,comment){
    	 Posts.update({_id:id},{$pull:{comments:comment}});
    	 
    	//return Posts.update({_id:id),{$pop:{comments:comment}});
    },
    'updateImage':function(dataUrl){
     Meteor.users.update({_id:this.userId}, {$set:{'profile.avatar':dataUrl}});

 }

  
    /*,
    'editcomment':function(id,value){
    	Posts.update({_id:id},{$set:{comments:value}});
    }*/
});

Likes = new Mongo.Collection('likes');

Videochat = new Mongo.Collection('Videochat');
Alertmechanism =new Mongo.Collection('Alertmechanism');
Privatemessages = new Mongo.Collection('Privatemessages');
Messagealert = new Mongo.Collection('Messagealert');

Meteor.methods({
	'insertPrivateChats': function(chat_data){
		Privatemessages.insert(chat_data);
	},
	'insertPrivateData':function(data){
		
			Messagealert.insert(data);
		
		
	}
});