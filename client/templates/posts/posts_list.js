/*var postsData = [
	{
		statusText: 'First status in Jeevan HOme'
	},
	{
		statusText: 'Second status in Jeevan Home'
	},
	{
		statusText: 'Third status'
	}
];*/

Template.postsList.helpers({
	posts: function(){
		var x= Posts.find({}, {sort: {submitted: -1}}).fetch();
		$.each(x,function(indx,obj)
    {
			var userInfo=Meteor.users.findOne({_id:obj.userId});
           if(userInfo)
           {
               obj.name=userInfo.username;
               if(obj.comments)
                obj.cmntsLength=obj.comments.length;
            	/*if(obj.like)
            		obj.likelength=obj.like.length;*/
            	if(obj.likelength>0)
            		obj.length=true;
            	if(obj.cmntsLength>0)
            		obj.commentLength=true;
              
           }
        

        
           	 //obj.cmntsLength=obj.comments.length; yestari gareni hucha hai
			obj.duration= $.timeago(new Date(obj.submitted));

	});
		
		var values=[x];
    //console.log(values);
    return x;
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
      message:this.message,

      
    };
    
    console.log(comment);
    Meteor.call('deleteComment',this.id,comment,function(err,res){
        if(!err){
        
        }
    });
  },
  'click #edit':function(e,t){
    console.log(Meteor.users().profile.avatar);
    e.preventDefault();
    
     Session.set('isEditing',{postMessage:this.message,status:true});

  }/*,
  'click #Editcomment':function(e,t)
  {
    e.preventDefault();
    
    var currentPostId = this.id;

    var postProperties = {

      by:this.by,
      cusid:this.cusid,
      date:this.date,
      id:this.id,
      message:$('#editPosts').val()
      
    };
    console.log(postProperties);

    Meteor.call('editcomment',this.currentPostId,postProperties, function(error,res) {
      if (!error) {
        alert(1);
        Session.set('isEditing',null);
      } 
    });

 }
*/
});
Template.postsList.events({
	'submit #commentForm':function(e,t){
		e.preventDefault();
		var x=this.comments;


       var cmnt={
           id:this._id,
           cusid:Meteor.userId(),
           by:Meteor.user().profile.username,
           message: t.find('#comment').value,
           date:$.timeago(new Date()),
            avatar:Meteor.user().profile.avatar
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