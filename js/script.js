const wrapper = document.querySelector(".wrapper"),
musicImg = wrapper.querySelector(".img-area img"),
musicName = wrapper.querySelector(".song-details .name"),
musicArtist = wrapper.querySelector(".song-details .artist-name"),
mainAudio = wrapper.querySelector("#main-audio"),
playPauseBtn = wrapper.querySelector(".play-pause"),
prevBtn = wrapper.querySelector("#prev"),
nextBtn = wrapper.querySelector("#next"),
progressBar = wrapper.querySelector(".progress-bar");

let musicIndex = 1;

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

//next music function
function nextMusic(){
  //incresing the index by 1 to change the music details 
  musicIndex++;
  //if music is greater than the length of array then reset to 1
  musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
  loadMusic(musicIndex);
  playMusic();
}

//prev music function
function prevMusic(){
  //decreasing the index by 1 to change the music details 
  musicIndex--;
  //if music is less than the length of array then the 6th music will be played and so on array--
  musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
  loadMusic(musicIndex);
  playMusic();
}

//play and pause the music with event button
playPauseBtn.addEventListener("click", () => {
  const isMusicPause = wrapper.classList.contains("paused");
  //if isMusicPaused is true then call pauseMusic else call playMusic
  isMusicPause ? pauseMusic() : playMusic();
});

nextBtn.addEventListener("click", () => {
  nextMusic(); //calling next music Function
});

prevBtn.addEventListener("click", () => {
  prevMusic(); //calling prev music function
});

//updating progress bar width according to the music current time
mainAudio.addEventListener("timeupdate", (e) => {
  const currentTime = e.target.currentTime; //getting current time of song
  const duration = e.target.duration; //getting total duration of song
  let progressWidth = (currentTime / duration) * 100;
  progressBar.style.width = `${progressWidth}%`
  
  let musicCurrentTime = wrapper.querySelector(".current"),
  musicDuration = wrapper.querySelector(".duration");

  mainAudio.addEventListener("loadeddata", () => {
    //updating song total duration
    let audioDuration = mainAudio.duration;
    let totalMin = Math.floor(audioDuration / 60);
    let totalSec = Math.floor(audioDuration % 60);
    if(totalSec < 10) { //adding 0 id the second is less than 10
      totalSec = `0${totalSec}`
    }
    musicDuration.innerText = `${totalMin}:${totalSec}`;
  });

  //updating playing song current duration
  let currentMin = Math.floor(currentTime / 60);
  let currentSec = Math.floor(currentTime % 60);
  if(currentSec < 10) { //adding 0 id the second is less than 10
    currentSec = `0${currentSec}`
  }
  musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
})
