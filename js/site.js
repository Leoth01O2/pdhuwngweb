let currentAudio = null;

document.addEventListener("DOMContentLoaded",function(){

document.addEventListener("contextmenu",function(e){
e.preventDefault();
});

document.addEventListener("keydown",function(e){

if(e.ctrlKey && e.key==="c"){
e.preventDefault();
}

if(e.ctrlKey && e.key==="u"){
e.preventDefault();
}
});

document.addEventListener("selectstart",function(e){
e.preventDefault();
});

});

/* cập nhật progress */

setInterval(() => {

    if (currentAudio) {

        let container = currentAudio.parentElement;

        let bar = container.querySelector(".progress");

        let percent = 0;

        if (currentAudio.duration) {
            percent = (currentAudio.currentTime / currentAudio.duration) * 100;
        }

        bar.style.width = percent + "%";

    }

}, 500);

function toggleMusic(id, btn) {

    let audio = document.getElementById(id);
    let wave = btn.parentElement.querySelector(".music-wave");

    /* nếu đang phát bài khác */

    if (currentAudio && currentAudio !== audio) {

        currentAudio.pause();
        currentAudio.currentTime = 0;

        let oldBtn = document.querySelector(".play-btn.playing");
        if (oldBtn) {
            oldBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
            oldBtn.classList.remove("playing");
        }

        let oldWave = document.querySelector(".music-wave.active");
        if (oldWave) {
            oldWave.style.display = "none";
            oldWave.classList.remove("active");
        }

    }

    /* toggle */

    if (audio.paused) {

        audio.play();

        audio.onended = function () {

    let currentItem = btn.closest(".music-item");
    let nextItem = currentItem.nextElementSibling;

    /* nếu còn bài phía dưới */
    if (nextItem) {

        let nextBtn = nextItem.querySelector(".play-btn");
        let nextId = nextBtn.getAttribute("onclick").match(/'(.*?)'/)[1];

        toggleMusic(nextId, nextBtn);

    } else {

        /* nếu là bài cuối → quay về bài đầu */

        let firstItem = document.querySelector(".music-item");
        let firstBtn = firstItem.querySelector(".play-btn");
        let firstId = firstBtn.getAttribute("onclick").match(/'(.*?)'/)[1];

        toggleMusic(firstId, firstBtn);

    }
}

        btn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        btn.classList.add("playing");

        wave.style.display = "inline";
        wave.classList.add("active");

        currentAudio = audio;

        /* highlight bài đang phát */

        document.querySelectorAll(".music-item.playing")
            .forEach(i => i.classList.remove("playing"));

        btn.closest(".music-item")
            .classList.add("playing");

        let title = btn.getAttribute("data-title");
        document.getElementById("nowPlayingTitle").innerText = title;

        if ('mediaSession' in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
        title: title,
        artist: "Leoth Playlist",
        album: "Music Corner",
        artwork: [
            { src: "images/musicCover.jpg", sizes: "96x96", type: "image/jpeg" },
            { src: "images/musicCover.jpg", sizes: "192x192", type: "image/jpeg" },
            { src: "images/musicCover.jpg", sizes: "512x512", type: "image/jpeg" }
        ]
    });
        navigator.mediaSession.setActionHandler('play', () => {
        currentAudio.play();
    });

    navigator.mediaSession.setActionHandler('pause', () => {
        currentAudio.pause();
    });
}

    } else {

        audio.pause();

        btn.innerHTML = '<i class="fa-solid fa-play"></i>';
        btn.classList.remove("playing");

        wave.style.display = "none";
        wave.classList.remove("active");

        currentAudio = null;

        btn.closest(".music-item")
            .classList.remove("playing");

        document.getElementById("nowPlayingTitle").innerText = "Nothing";

    }
}

                                 /* GALLERY */
function openImage(img) {

    let viewer = document.getElementById("imageViewer");
    let viewerImg = document.getElementById("viewerImg");

    viewer.style.display = "flex";
    viewerImg.src = img.src;

}

function closeImage() {

    document.getElementById("imageViewer").style.display = "none";

}

                                /* GUESTFORM */
function checkGuestForm(){

    let name = document.querySelector("input[name='entry.523809736']");
    let msg = document.querySelector("textarea[name='entry.513064915']");

    let nameVal = name.value.trim();
    let msgVal = msg.value.trim();

    if(nameVal && !msgVal){

        msg.placeholder = "Chỉ có tên thì tôi không hiểu được u!!";
        msg.focus();

        return false;
    }

    if(!nameVal && msgVal){

        name.placeholder = "Không có tên thì tôi không biết gọi u là gì!";
        name.focus();

        return false;
    }

    if(!nameVal && !msgVal){

        alert("Ơ kìa, viết gì đó đi chứ!!");
        return false;
    }

    showToast("Đã nhận được rồi nheé :3");
    setTimeout(()=>{
    document.getElementById("guestForm").reset();
},300);

return true;

}


                                /* TOAST */
function showToast(text){

    let toast = document.getElementById("toast");

    toast.innerText = text;

    toast.classList.add("show");

    setTimeout(()=>{
        toast.classList.remove("show");
    },3000);

}

                    /*cursor blur glass*/
const ring=document.querySelector(".cursor-ring");
if (window.innerWidth > 768){
document.addEventListener("mousemove",e=>{
ring.style.left=e.clientX+"px";
ring.style.top=e.clientY+"px";
});
}
document.querySelectorAll(
"a, button, img, input, textarea, select, form, .music-item"
)
.forEach(el=>{
el.addEventListener("mouseenter",()=>{
ring.classList.add("hover");
});

el.addEventListener("mouseleave",()=>{
ring.classList.remove("hover");
});

});