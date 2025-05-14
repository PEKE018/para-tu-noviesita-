const button = document.getElementById('revealBtn');
const hiddenMessage = document.getElementById('hiddenMessage');

button.addEventListener('click', () => {
  if (hiddenMessage.style.display === 'block') {
    hiddenMessage.style.display = 'none';
    button.setAttribute('aria-expanded', 'false');
  } else {
    hiddenMessage.style.display = 'block';
    button.setAttribute('aria-expanded', 'true');
  }
});

const heartsContainer = document.querySelector('.hearts');

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function createHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  const size = random(15, 25);
  heart.style.width = size + 'px';
  heart.style.height = size + 'px';
  heart.style.left = random(0, window.innerWidth - size) + 'px';
  heart.style.animationDuration = random(3, 5) + 's';
  heartsContainer.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 5000);
}

// Create hearts at interval
setInterval(createHeart, 400);