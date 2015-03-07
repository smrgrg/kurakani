Template.leftColumn.helpers({
	username:function(){
		//Meteor.subscribe('getavatar');
		return Meteor.user().profile.username
	},
	photo:function(){
		return Meteor.user().profile.avatar;
	}
});

Template.leftColumn.events({
	'change #fileInput': function (e,t) {
    var reader = new FileReader();
      //alert('img');
        reader.onload = function(e) {
       var dataURL = reader.result;
       console.log(dataURL);
     // $(imageSelect).attr("src",reader.result );
          Meteor.call('updateImage',dataURL,function(err,res)
          {
            if(!err)
            console.log('sucess');
            else
              console.log(err);
          });
    }

    reader.readAsDataURL(e.target.files[0]);
  }
  
});