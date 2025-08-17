// Preloader
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    preloader.style.opacity = '0';
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500);
});

// Mobile Menu
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('.nav');

mobileMenuBtn.addEventListener('click', function() {
    nav.classList.toggle('active');
    this.querySelector('i').classList.toggle('fa-times');
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (nav.classList.contains('active')) {
            nav.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.remove('fa-times');
        }
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
        });
    });
});

// Header Scroll Effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Animate Project Cards on Scroll
const projectCards = document.querySelectorAll('.project-card');

function animateOnScroll() {
    projectCards.forEach(card => {
        const cardPosition = card.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (cardPosition < screenPosition) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
}

// Set initial state
projectCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = 'all 0.5s ease';
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Crypto Price Ticker Animation (mock)
function updateTickerPrices() {
    const tickerItems = document.querySelectorAll('.ticker-item');
    
    tickerItems.forEach(item => {
        const priceElement = item.querySelector('.price-up, .price-down');
        if (priceElement) {
            const currentPrice = parseFloat(priceElement.textContent.replace('$', '').replace('▲', '').replace('▼', '').trim());
            const changePercent = parseFloat(priceElement.textContent.match(/[0-9.]+%/)[0]);
            
            // Simulate small price change
            const randomChange = (Math.random() - 0.5) * 2;
            const newPrice = currentPrice * (1 + randomChange / 100);
            const newChange = changePercent + randomChange / 2;
            
            // Update display
            const direction = randomChange > 0 ? '▲' : '▼';
            const colorClass = randomChange > 0 ? 'price-up' : 'price-down';
            
            priceElement.textContent = `$${newPrice.toFixed(2)} ${direction} ${Math.abs(newChange).toFixed(1)}%`;
            priceElement.className = colorClass;
        }
    });
}

// Update prices every 5 seconds
setInterval(updateTickerPrices, 5000);