const playlist = document.getElementById("playlist");
const durationEl = document.getElementById("duration");
const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const title = document.getElementById("title");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const artist = document.getElementById("artist");

const songs = [
  {
    name: "song1.mp3",
    title: "Sample Song 1",
    artist: "Artist 1"
  },
  {
    name: "song2.mp3",
    title: "Sample Song 2",
    artist: "Artist 2"
  }
];

let songIndex = 0;
let isPlaying = false;

function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.name;
}

loadSong(songs[songIndex]);
// Create playlist
songs.forEach((song, index) => {
  const li = document.createElement("li");
  li.textContent = song.title + " - " + song.artist;
  li.addEventListener("click", () => {
    songIndex = index;
    loadSong(songs[songIndex]);
    audio.play();
    playBtn.textContent = "⏸";
    isPlaying = true;
  });
  playlist.appendChild(li);
});

playBtn.addEventListener("click", () => {
  if (!isPlaying) {
    audio.play();
    playBtn.textContent = "⏸";
    isPlaying = true;
  } else {
    audio.pause();
    playBtn.textContent = "▶";
    isPlaying = false;
  }
});

nextBtn.addEventListener("click", () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  audio.play();
  playBtn.textContent = "⏸";
  isPlaying = true;
});

prevBtn.addEventListener("click", () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  audio.play();
  playBtn.textContent = "⏸";
  isPlaying = true;
});
audio.addEventListener("loadedmetadata", () => {
  const minutes = Math.floor(audio.duration / 60);
  const seconds = Math.floor(audio.duration % 60);
  durationEl.textContent =
    minutes + ":" + (seconds < 10 ? "0" + seconds : seconds);
});
audio.addEventListener("timeupdate", () => {
  if (!isNaN(audio.duration)) {
    progress.value = (audio.currentTime / audio.duration) * 100;
  }
});
progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});
volume.addEventListener("input", () => {
  audio.volume = volume.value;
});
// Autoplay next song when current song ends
audio.addEventListener("ended", () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  audio.play();
  playBtn.textContent = "⏸";
  isPlaying = true;
});
