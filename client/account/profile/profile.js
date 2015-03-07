Template.profile.helpers({
	/*posts: function(){
		var x= Posts.find({}, {sort: {submitted: -1}}).fetch();
		$.each(x,function(indx,obj)
    {
			var userInfo=Meteor.users.findOne({_id:obj.userId});
           if(userInfo)
           {
               obj.name=userInfo.username;
               if(obj.comments)
                obj.cmntsLength=obj.comments.length;
            	if(obj.like)
            		obj.likelength=obj.like.length;
            	if(obj.likelength>0)
            		obj.length=true;
            	if(obj.cmntsLength>0)
            		obj.commentLength=true;
              
           }
        

        
           	 //obj.cmntsLength=obj.comments.length; yestari gareni hucha hai
			obj.duration= $.timeago(new Date(obj.submitted));

	});
		
		var values=[x];
    console.log(values);
    return x;
	},*/
	ownPost: function() {
		return this.userId === Meteor.userId();
	},
	editing:function(){
			if(Session.get('isEditing').postId==this._id)
			{
				return Session.get('isEditing');
			}
			
			else{
				return null;
			}
		}
		
  
});

Template.postComment.helpers({
  iPosted:function  (cus) {
    // body...
    console.log(cus);
    return cus==Meteor.userId();
  },
  'Editing':function(){
    if(Session.get('isEditing').postMessage==this.message)
      {
        return Session.get('isEditing');
      }
      
      else{
        return null;
      }
  }
});

Template.postComment.events({
  'click #delete':function(e,t){
    /*comment=this.comments;
    console.log(this);*/
    var comment={
      
      by:this.by,
      cusid:this.cusid,
      date:this.date,
      id:this.id,
      message:this.message
      
    };
    
    console.log(comment);
    Meteor.call('deleteComment',this.id,comment,function(err,res){
        if(!err){
        
        }
    });
  },
  'click #edits':function(e,t){
  	alert(1);
    e.preventDefault();
    
     Session.set('isEditing',{postMessage:this.message,status:true});

  }
  });

Template.profile.events({
	'submit #commentForm':function(e,t){
		e.preventDefault();
		var x=this.comments;


       var cmnt={
           id:this._id,
           cusid:Meteor.userId(),
           by:Meteor.user().username,
           message: t.find('#comment').value,
           date:$.timeago(new Date())
       };
       console.log(x);
       x.push(cmnt);
       Meteor.call('insertComments',this._id,x,function(err,res){
       		if(!err){
       			$('#commentForm')[0].reset();
       		}
       });
	}
});

Template.profile.events({
	'click #Delete': function(e) {
		
		
			var currentPostId = this._id;
			console.log(currentPostId);
			Meteor.call('deletePost',currentPostId,function(err,res){
				if(!err){
					$('media-body').remove();
				}
			});
			
			//Router.go('postsList');
		
	},
	'click #editPost':function(e,t){
		e.preventDefault();
		Session.set('isEditing',{postId:this._id,status:true});

	},
	'click #EditPost' :function(e,t){
		e.preventDefault();
		var currentPostId = this._id;

		var postProperties = {
			statusText: $('#editPosts').val(),currentPostId:currentPostId
		};
		console.log(postProperties);

		Meteor.call('editPost',postProperties, function(error,res) {
			if (!error) {
				// display the error to the user
				//$('#editform').hide();
				//delete Session.keys['isEditing'];
				Session.set('isEditing',null);
			} 
		});
		
	},
	'click #like':function(e,t){
		
		e.preventDefault();
		x=this.like;

		var currentPostId=this._id;
		var likes={
			id:this._id,
			from:Meteor.user().username,

		};
		x.push(likes);
		Meteor.call('insertLike',this._id,x,function(error,res){
			$('#unlike').show();
			$('#like').hide();
		});
	},
	'click #unlike':function(e,t){
		 //users.splice(users.indexOf(this.toString()),1);
		//e.preventDefault();
		like=this.like;
		//console.log(like.toString());
		/*like.splice(like.indexOf(like.toString()),1);
		console.log(like.length);
		var a=like.length;*/
		id=this._id;
		Meteor.call('decreaseLike',id,like,function(err,res){
		if(!err){
			
			$('#like').show();
			$('#unlike').hide();
		}
	
		});
	}
});

