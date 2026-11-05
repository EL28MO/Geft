// =========================
// ELEMENTS
// =========================

const envelopeWrapper = document.getElementById("envelope");
const envelope = document.querySelector(".envelope");
const giftSection = document.getElementById("giftSection");
const surpriseSection = document.getElementById("surpriseSection");
const finalSection = document.getElementById("finalSection");

const music = document.getElementById("backgroundMusic");

const acceptBtn = document.getElementById("acceptBtn");
const rejectBtn = document.getElementById("rejectBtn");

const backgroundHearts = document.getElementById("backgroundHearts");
const video = document.querySelector(".video-container video");
const myVideo = document.getElementById("myVideo");

if (myVideo) {

    myVideo.addEventListener("play", () => {
        myVideo.muted = false;
    });

    myVideo.addEventListener("click", () => {
        myVideo.muted = false;
        if (myVideo.paused) {
            myVideo.play();
        }
    });
}

// =========================
// OPEN THE GIFT
// =========================

let giftOpened = false;

function openEnvelope() {
    if (giftOpened) return;

    giftOpened = true;

    // Open envelope animation
    if (envelope) envelope.classList.add("opened");

    // Start background music
    if (music) {
        music.volume = 0.06;
        music.play().catch(error => {
            console.log("Music play blocked by browser:", error);
        });
    }

    // Show surprise after animation
    setTimeout(() => {
        if (giftSection) giftSection.style.display = "none";
        if (surpriseSection) surpriseSection.style.display = "block";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, 1700);
}

if (envelopeWrapper) {
    envelopeWrapper.addEventListener("click", openEnvelope);
}
if (envelope) {
    envelope.addEventListener("click", openEnvelope);
}


// =========================
// RUNAWAY NO BUTTON
// =========================

function moveRejectButton() {
    if (!rejectBtn) return;

    const buttonWidth = rejectBtn.offsetWidth || 100;
    const buttonHeight = rejectBtn.offsetHeight || 40;

    const maxX = Math.max(0, window.innerWidth - buttonWidth - 30);
    const maxY = Math.max(0, window.innerHeight - buttonHeight - 30);

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    rejectBtn.style.position = "fixed";
    rejectBtn.style.left = randomX + "px";
    rejectBtn.style.top = randomY + "px";
    rejectBtn.style.zIndex = "999";
}

if (rejectBtn) {
    rejectBtn.addEventListener("mouseenter", moveRejectButton);
    rejectBtn.addEventListener("touchstart", (event) => {
        event.preventDefault();
        moveRejectButton();
    });
    rejectBtn.addEventListener("click", (event) => {
        event.preventDefault();
        moveRejectButton();
    });
}


// =========================
// ACCEPT THE FLOWER
// =========================

if (acceptBtn) {
    acceptBtn.addEventListener("click", () => {

        if (video) {
            video.pause();
        }

        // Hide surprise
        if (surpriseSection) surpriseSection.style.display = "none";

        // Show final message
        if (finalSection) finalSection.style.display = "block";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        // Increase music volume
        if (music) {
            music.volume = 0.65;
        }

        // Start celebration
        startCelebration();
    });
}

// =========================
// FLOATING HEARTS
// =========================

function createHeart() {
    if (!backgroundHearts) return;

    const heart = document.createElement("span");
    const decorations = ["❤️", "💗", "💕", "🌸", "🌹", "💖"];

    heart.classList.add("floating-heart");
    heart.innerHTML = decorations[Math.floor(Math.random() * decorations.length)];
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = (15 + Math.random() * 25) + "px";
    heart.style.animationDuration = (4 + Math.random() * 4) + "s";

    backgroundHearts.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 8000);
}

setInterval(createHeart, 900);


// =========================
// FINAL CELEBRATION
// =========================

function startCelebration() {
    for (let i = 0; i < 45; i++) {
        setTimeout(() => {
            createHeart();
        }, i * 100);
    }
}