// 1. First select and store the elements you'll be working with


let searchInput = document.getElementById("search_field");
let submit = document.getElementById('submit_button');
let searchform = document.getElementById("search-form");
let searchResults;

let player = document.getElementById('music-player');



// 2. Create your `onSubmit` event for getting the user's search term

submit.addEventListener('click', goSearch);


function goSearch() {
    let searchQuery = searchInput.value;


    // 3. Create your `fetch` request that is called after a submission

    fetch('https://api.soundcloud.com/tracks?client_id=8538a1744a7fdaa59981232897501e04&q=' + searchQuery)
        .then(
            function (response) {
                //  Checking to make sure server is receiving request
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' + response.status);
                    return;
                } else {
                    //        server receives request and processes could have mapped results also but did it this way to show different example

                    response.json().then(function (data) {
                        for (let i = 0; i < data.length; i++) {
                            console.log("show each title:", data[i].title);
                            let markup = `
                <div class="artist_container">
                  <div class="avatar_container">
                    <img class="${data[i].stream_url}?client_id=8538a1744a7fdaa59981232897501e04" src=${data[i].user.avatar_url}>
                  </div>
                  <div class="title_artist">
                   <ul>
                     <li id="title">${data[i].title}</li>
                     <li id="artist">${data[i].user.username}</li>
                   </ul>
                 </div>
                </div>
               `
                            document.getElementById("results").innerHTML += markup;
                        }
                    });
                }
            })
    //this clears the page for the next search
    document.getElementById("results").innerHTML = ""
}
//function to allow music to play when clicking artist//

document.getElementById("results").addEventListener("click", function (x) {
    if (x.target && x.target.nodeName == "IMG") {
        let url = x.target.className;
        player.removeAttribute("src");
        player.setAttribute("src", url);
        player.play();

    }
})
