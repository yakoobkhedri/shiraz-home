
// video player
const playerVideo = document.getElementById("player-video");
const playerbutton = document.getElementById("player-button");

playerbutton.addEventListener("click", () => {
  playerVideo.play();
    playerVideo.setAttribute("controls", "");
});

playerVideo.addEventListener("play", () => {
  playerbutton.style.visibility = "hidden";
  playerbutton.style.opacity = "0";
});

playerVideo.addEventListener("pause", () => {
  playerbutton.style.visibility = "visible";
  playerbutton.style.opacity = "1";
});
