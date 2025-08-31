const clickSound = new Audio('hitmarker_2.mp3');
document.addEventListener('click', () => {
    clickSound.play();
});

const sparkles = new Audio('sparkles5.mp3');

let mouseMoveTimeout;

document.addEventListener("mousemove", (event) => {
    const trail = document.createElement("div");
    trail.className = "cursor-trail";
    trail.style.left = `${event.pageX}px`;
    trail.style.top = `${event.pageY}px`;
    document.body.appendChild(trail);
    sparkles.play();

    // Remove the trail after a short delay
    setTimeout(() => {
        trail.remove();
    }, 300);

    // Reset the timeout for detecting mouse stop
    clearTimeout(mouseMoveTimeout);
    mouseMoveTimeout = setTimeout(() => {
        sparkles.pause();
    }, 300); // 1 second of inactivity
});

document.addEventListener("DOMContentLoaded", () => {
    const wanderingImage = document.getElementById("wanderingImage");
    let currentX = 0;
    let currentY = 0;

    function getRandomPosition() {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        const randomX = Math.random() * (screenWidth - wanderingImage.offsetWidth);
        const randomY = Math.random() * (screenHeight - wanderingImage.offsetHeight);

        return { x: randomX, y: randomY };
    }

    function walkToPosition(targetX, targetY) {
        const step = 2; // Pixels to move per frame
        const deltaX = targetX - currentX;
        const deltaY = targetY - currentY;
        const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

        if (distance < step) {
            // If close enough to the target, stop moving
            currentX = targetX;
            currentY = targetY;
            wanderingImage.style.left = `${currentX}px`;
            wanderingImage.style.top = `${currentY}px`;
            return;
        }

        // Calculate the direction to move
        const moveX = (deltaX / distance) * step;
        const moveY = (deltaY / distance) * step;

        // Update the current position
        currentX += moveX;
        currentY += moveY;

        // Apply the new position
        wanderingImage.style.left = `${currentX}px`;
        wanderingImage.style.top = `${currentY}px`;

        // Continue walking
        requestAnimationFrame(() => walkToPosition(targetX, targetY));
    }

    function moveImage() {
        const { x, y } = getRandomPosition();
        walkToPosition(x, y);
    }

    setInterval(moveImage, 4000); // Start a new walk every 4 seconds
});