// {/* <script> */}
var pauseCarouselOrNot = false;

// Cloning the post container
for(let i = 0; i < 30; i++){
	let clone = document.querySelector("#reusedContainer0").cloneNode(true);
	// Set newID and differnet interval in 1~5s for each cloned container
	let newID = "reusedContainer" + String(i+1); 
    let newBtnId = "carouselBtn" + String(i+1);
	let newInterval = Math.floor(Math.random() * (5 - 1 + 1) + 1);
	clone.setAttribute("id", newID);
	// clone.setAttribute("data-interval", newInterval);
	document.querySelector("#main").appendChild(clone);
    let c = document.getElementById(newID).childNodes;
    c[7].setAttribute("data-interval", newInterval*1000);
    let c_nth_chidren = c[7].childNodes;
    c_nth_chidren[7].setAttribute("id", newBtnId);
    // console.log(c_nth_chidren);
}
// Cloning the right column
for(let i = 0; i < 30; i++){
	let clone = document.querySelector("#reusedMoodContainer").cloneNode(true);
	// Set newID and differnet interval in 1~5s for each cloned container
	let newID = "reusedMoodContainer" + String(i); 
	clone.setAttribute("id", newID);
	document.querySelector("#rightCol").appendChild(clone);
}


// Pausing the carousel auto slide on button click
function pauseCarousel(clicked_id){
    // console.log(document.getElementById(clicked_id));
    if(!pauseCarouselOrNot){
        let curr_container_index = clicked_id.charAt(clicked_id.length - 1);
        let curr_container_id =  "reusedContainer" + curr_container_index;
        let curr_container_children = document.getElementById(curr_container_id).childNodes;
        // curr_container_children[7].setAttribute("data-interval", 36000000);
        curr_container_children[7].removeAttribute("data-ride");
        // $("#curr_container_id").load(" #curr_container_id > *");    
    
        $('.carousel').carousel({interval: false});
    
        $(document).on('mouseleave', '.carousel', function() {
            $(this).carousel('pause');
        });
        console.log(curr_container_children[7]);
        pauseCarouselOrNot = true;
    }
    else{
        let curr_container_index = clicked_id.charAt(clicked_id.length - 1);
        let curr_container_id =  "reusedContainer" + curr_container_index;
        let curr_container_children = document.getElementById(curr_container_id).childNodes;
        curr_container_children[7].setAttribute("data-interval", 1000);
        curr_container_children[7].setAttribute("data-ride", "carousel");
        // $("#curr_container_id").load(" #curr_container_id > *");    
    
        $('.carousel').carousel({interval: 1000});
    
        $(document).on('mouseleave', '.carousel', function() {
            $(this).carousel('cycle');
        });
        console.log(curr_container_children[7]);
        pauseCarouselOrNot = false;
    }


}



// </script>