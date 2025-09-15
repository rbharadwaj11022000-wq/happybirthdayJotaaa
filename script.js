document.addEventListener('DOMContentLoaded', () => {

    // --- Feature 1: Fade-in animation on scroll ---
    const sections = document.querySelectorAll('.content-section');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        observer.observe(section);
    });

    // --- Feature 2: Birthday Cake Interaction ---
    const blowButton = document.getElementById('blow-candles-btn');
    const flames = document.querySelectorAll('.flame');
    let candlesLit = true;

    blowButton.addEventListener('click', () => {
        if (candlesLit) {
            flames.forEach(flame => { flame.classList.add('blown'); });
            blowButton.textContent = 'Make a Wish!';
            candlesLit = false;
        } else {
            flames.forEach(flame => { flame.classList.remove('blown'); });
            blowButton.textContent = 'Blow out the candles!';
            candlesLit = true;
        }
    });

    // --- Feature 3: Scrapbook Modal ---
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    const modalCaption = document.getElementById('modal-caption');
    const scrapbookItems = document.querySelectorAll('.scrapbook-item img');
    const closeButton = document.querySelector('.close-button');

    scrapbookItems.forEach(item => {
        item.addEventListener('click', () => {
            modal.style.display = 'block';
            modalImg.src = item.src;
            modalCaption.textContent = item.dataset.caption;
        });
    });

    const closeModal = () => { modal.style.display = 'none'; }

    closeButton.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) { closeModal(); }
    });

    // --- Feature 4: Collaborative Wishlist with Local Storage ---
    const wishInput = document.getElementById('wishlist-item-input');
    const addBtn = document.getElementById('add-wish-btn');
    const wishlist = document.getElementById('wishlist');
    const storageKey = 'birthdayWishes';

    function renderWishes() {
        wishlist.innerHTML = '';
        let currentWishes = JSON.parse(localStorage.getItem(storageKey));
        
        if (!currentWishes || currentWishes.length === 0) {
            currentWishes = ['Finally travel to Japan! 🇯🇵', 'Watch a horror movie marathon 👻'];
            localStorage.setItem(storageKey, JSON.stringify(currentWishes));
        }

        currentWishes.forEach((wishText, index) => {
            const li = document.createElement('li');
            li.textContent = wishText;
            
            const removeBtn = document.createElement('button');
            removeBtn.innerHTML = '&times;';
            removeBtn.className = 'remove-btn';
            removeBtn.title = 'Remove wish';
            removeBtn.onclick = () => {
                removeWish(index);
            };

            li.appendChild(removeBtn);
            wishlist.appendChild(li);
        });
    }
    
    function addWish() {
        const wishText = wishInput.value.trim();
        if (wishText) {
            const currentWishes = JSON.parse(localStorage.getItem(storageKey)) || [];
            currentWishes.push(wishText);
            localStorage.setItem(storageKey, JSON.stringify(currentWishes));
            wishInput.value = '';
            renderWishes();
        }
    }

    function removeWish(index) {
        const currentWishes = JSON.parse(localStorage.getItem(storageKey)) || [];
        currentWishes.splice(index, 1);
        localStorage.setItem(storageKey, JSON.stringify(currentWishes));
        renderWishes();
    }
    
    addBtn.addEventListener('click', addWish);
    wishInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addWish();
        }
    });

    renderWishes(); // Initial render of wishes when the page loads

    // --- Feature 5: Interactive Letter ---
    const letterContainer = document.getElementById('letter-container');
    const letterCover = document.getElementById('letter-cover');

    letterCover.addEventListener('click', () => {
        letterContainer.classList.toggle('open');
    });
});