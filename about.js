// configuration des bases
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particlesArray = [];

// Function qui redimensionne la taille
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles(); // Réinitialise les particules à remplir dans la canvas
}

// Initialise la taille du canvas et attend pour redimensionner
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Initialise les particules en fonction de la taille du canvas
function initParticles() {
    particlesArray = [];
    const numParticles = Math.floor((canvas.width * canvas.height) / 8000); // Adjust density
    for (let i = 0; i < numParticles; i++) {
        particlesArray.push(new Particle());
    }
}

// taille des particules
function Particle() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.speedX = (Math.random() - 0.5) * 2;
    this.speedY = (Math.random() - 0.5) * 2;
}

// update les positions des particules
Particle.prototype.update = function() {
    this.x += this.speedX;
    this.y += this.speedY;

    // faire bondir les particules
    if (this.x < 0) this.x = canvas.width;
    if (this.x > canvas.width) this.x = 0;
    if (this.y < 0) this.y = canvas.height;
    if (this.y > canvas.height) this.y = 0;
};

// dessine un particule
Particle.prototype.draw = function() {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
};

// Anime les particules frame par frame en redessiner chaque particule
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas for redrawing
    particlesArray.forEach(particle => {
        particle.update();
        particle.draw();
    });
    requestAnimationFrame(animateParticles);
}

// Initialisation de l'animation
initParticles();
animateParticles();
