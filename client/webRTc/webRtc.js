Template.webRtc.rendered=function(){




	/*pc=new webkitRTCPeerConnection(null);
	//pc = new RTCPeerConnection();

    // send any ice candidates to the other peer
    pc.onicecandidate = function (evt) {
        console.log(evt);
    };

    // once remote stream arrives, show it in the remote video element
    pc.onaddstream = function (evt) {
        $('#hisStream').attr('src', URL.createObjectURL(evt.stream));

    };
    console.log(navigator.getUserMedia());*/

    // get the local stream, show it in the local video element and send it
    navigator.getUserMedia({"video": true }, function (stream) {
       $('#myStream').attr('src', URL.createObjectURL(stream));
       console.log(stream);
       //gotDescriptionLocal(stream);
          
  		//pc.createOffer(gotDescriptionLocal);

       
    },function(err){console.log(err)});

  pc=new webkitRTCPeerConnection(null);
  //pc = new RTCPeerConnection();

    // send any ice candidates to the other peer
    pc.onicecandidate = function (evt) {
        console.log(evt);
    };



    // once remote stream arrives, show it in the remote video element
    pc.onaddstream = function (evt) {
        $('#hisStream').attr('src', URL.createObjectURL(evt.stream));
        pc.createOffer(function(data){
            console.log(data);
        });

    };
    //console.log(navigator.getUserMedia());

}

Template.webRtc.events({
	'click #answer':function(e,t){
		e.preventDefault();
		var remoteDesv=t.find('sessionDescription').value;
		pc.createAnswer(remoteDesv, function(desc){
			console.log(desc);
		});
	}
});
function gotDescriptionLocal(desc){
  pc.setLocalDescription(desc);
  pc.createOffer(gotDescription);
  console.log("Offer from pc \n" + desc.sdp);
  
}