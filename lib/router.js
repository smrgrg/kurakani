Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',
	waitOn: function(){return Meteor.subscribe('posts');}
});



Router.route('/', function(){
	if(Meteor.userId()){
		this.render('dashboard');
	}else
		this.render('home');
});



Router.route('/signup', function(){
	this.render('signup');
});

Router.route('/login', function(){
	this.render('login');
});


Router.route('/profile/:createdBy',{
	name:'profile',
	data:function(){
		console.log(this.params.createdBy);
		Meteor.subscribe('getPost',this.params.createdBy);
		var x =Posts.find({createdBy:this.params.createdBy},{sort: {submitted: -1}}).fetch()
		//return Posts.find({_id:this.params._id});
			//var x= Posts.find({}, {sort: {submitted: -1}}).fetch();
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
    return {posts:x};
}
});








Router.route('/webRTc',function(){this.render('webRtc');});

Router.route('/demosameer/:peerid',{
	name:'demosameer',
	data:function(){
		Meteor.subscribe('getCalleeId',this.params.peerid);
		var a=Videochat.find({peerid:this.params.peerid}).fetch();
		$.each(a,function(indx,obj){
			//console.log(obj);
			Session.set('clicked',obj.callee);
		});
		return {value:a};
	}
		
	});
	//console.log(this.params._id);
	Router.route('/privateMessage/:priRoomId',{
	name:'privateMessage',
	data:function(){
		console.log(this.params.priRoomId);
		Meteor.subscribe('getmessages',this.params.priRoomId);
		var a=Privatemessages.find({priRoomId:this.params.priRoomId}).fetch();
		$.each(a,function(indx,obj){
			console.log(obj);
			Session.set('getmessage',obj.receiver);
			Session.set('getRoomId',obj.priRoomId);
		});
		return {value:a};
	}
		
	});

	Router.route('/science', function(){
		this.render('science');
		});

	Router.route('/politics', function(){
		this.render('politics');
		});

	Router.route('/love', function(){
		this.render('love');
		});

/*Router.route('/profile',function(){this.render('profile');});*/


var requireLogin = function() {
	if (! Meteor.user()) {
		if (Meteor.loggingIn()) {
		this.render(this.loadingTemplate);
		} else {
			this.render('accessDenied');
		}
	} else {
	this.next();
	}
}

Router.onBeforeAction('dataNotFound', {only: 'postPage'});
Router.onBeforeAction(requireLogin, {only: 'profile'});
Router.onBeforeAction(requireLogin, {only: 'science'});
Router.onBeforeAction(requireLogin, {only: 'politics'});
Router.onBeforeAction(requireLogin, {only: 'love'});
Router.onBeforeAction(requireLogin, {only: 'privateMessage'});
//Router.onBeforeAction(requireLogin, {only: 'demosameer'});
Router.onBeforeAction(requireLogin, {only: 'webRTc'});


