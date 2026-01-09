const wrapper = document.querySelector(".wrapper"),
musicImg = wrapper.querySelector(".img-area img"),
musicName = wrapper.querySelector(".song-details .name"),
musicArtist = wrapper.querySelector(".song-details .artist-name"),
mainAudio = wrapper.querySelector("#main-audio"),
playPauseBtn = wrapper.querySelector(".play-pause");

let musicIndex = 3;

window.addEventListener("load", () => {
  loadMusic(musicIndex);//calling load music function once window loaded
})

//load music function
function loadMusic(indexNumb) {
  musicName.innerText = allMusic[indexNumb - 1].name;
  musicArtist.innerText = allMusic[indexNumb - 1].artist;
  musicImg.src = `images/${allMusic[indexNumb - 1].img}.jpg`
  mainAudio.src = `songs/${allMusic[indexNumb - 1].src}.mp3`
}

//play music function 
function playMusic() {
  wrapper.classList.add("paused");
  playPauseBtn.querySelector("i").innerText = "pause"
  mainAudio.play();
}

//pause music function 
function pauseMusic() {
  wrapper.classList.remove("paused");
  playPauseBtn.querySelector("i").innerText = "play_arrow"
  mainAudio.pause();
}

//play and pause the music with event button
playPauseBtn.addEventListener("click", () => {
  const isMusicPause = wrapper.classList.contains("paused");
  //if isMusicPaused is true then call pauseMusic else call playMusic
  isMusicPause ? pauseMusic() : playMusic();
})