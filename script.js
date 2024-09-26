// Select the play/pause button, progress bar, current time, and total time
const playPauseBtn = document.getElementById('play-pause-btn');
const progressBar = document.getElementById('progress-bar');
const currentTimeElement = document.getElementById('current-time');
const totalTimeElement = document.querySelector('.tot-time');

// Create an audio element
const audio = new Audio('Otnicka.mp3');  // Replace with the actual audio file path

// Flag to check if music is playing
let isPlaying = false;

// When the audio metadata is loaded, update the total duration
audio.addEventListener('loadedmetadata', () => {
    const minutes = Math.floor(audio.duration / 60);
    const seconds = Math.floor(audio.duration % 60).toString().padStart(2, '0');
    totalTimeElement.textContent = `${minutes}:${seconds}`;  // Update total time with actual duration
    progressBar.value = 0; // Set progress bar to 0 when page loads
});

// Toggle play/pause
playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        // Pause the music
        audio.pause();
        playPauseBtn.src = './player_icon3.png';  // Switch back to the play icon
    } else {
        // Play the music
        audio.play();
        playPauseBtn.src = './player_icon89.png';  // Switch to the pause icon
    }
    isPlaying = !isPlaying;  // Toggle the play state
});

// Update progress bar as the audio plays
audio.addEventListener('timeupdate', () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;  // Update the range input

    // Format the current time in mm:ss format
    const minutes = Math.floor(audio.currentTime / 60);
    const seconds = Math.floor(audio.currentTime % 60).toString().padStart(2, '0');
    currentTimeElement.textContent = `${minutes}:${seconds}`;
});

// Seek audio when progress bar is changed
progressBar.addEventListener('input', () => {
    const seekTime = (progressBar.value / 100) * audio.duration;
    audio.currentTime = seekTime;  // Seek to the new time
});
