const NAV_LINKS = [
    { href: 'index.html', label: 'HOME' },
    { href: 'about.html', label: 'ABOUT US' },
    { href: 'news.html', label: 'NEWS &amp; EVENTS' },
    { href: 'history.html', label: 'HISTORY' },
    { href: 'firewise.html', label: 'FIREWISE' },
    { href: 'membership.html', label: 'MEMBERSHIP', children: [
        { href: 'get-involved.html', label: 'GET INVOLVED' }
    ]},
    { href: 'resources.html', label: 'RESOURCES', children: [
        { href: 'conservation.html', label: 'CONSERVATION' }
    ]},
    { href: 'contact.html', label: 'CONTACT US' }
];

function currentPage() {
    const path = window.location.pathname.split('/').pop();
    return path || 'index.html';
}

function buildNavMarkup() {
    const here = currentPage();
    const activeAttr = (href) => href === here ? ' class="active"' : '';
    return NAV_LINKS.map(item => {
        const top = `<a href="${item.href}"${activeAttr(item.href)}>${item.label}</a>`;
        if (!item.children) {
            return `<li>${top}</li>`;
        }
        const children = item.children
            .map(c => `<a href="${c.href}"${activeAttr(c.href)}>${c.label}</a>`)
            .join('');
        return `<li class="dropdown">${top}<div class="dropdown-content">${children}</div></li>`;
    }).join('');
}

function renderHeader() {
    const header = document.querySelector('header');
    if (!header) return;

    header.innerHTML = `
        <div class="logo">
            <a href="index.html"><img src="assets/images/logo.png" alt="BRMCA Logo"></a>
        </div>
        <button class="menu-toggle" aria-label="Toggle Navigation" aria-expanded="false" aria-controls="main-nav">
            <span></span>
            <span></span>
            <span></span>
        </button>
        <nav id="main-nav">
            <ul>${buildNavMarkup()}</ul>
        </nav>
    `;

    const toggle = header.querySelector('.menu-toggle');
    const nav = header.querySelector('#main-nav');
    toggle.addEventListener('click', () => {
        const open = nav.classList.toggle('active');
        toggle.setAttribute('aria-expanded', String(open));
    });
}

function renderFooter() {
    const footer = document.querySelector('footer');
    if (!footer) return;
    const year = new Date().getFullYear();
    footer.innerHTML = `
        <div class="footer-content">
            <p>BLUE RIDGE MOUNTAIN CIVIC ASSOCIATION</p>
            <p>Find us on <a href="https://www.facebook.com/groups/2898360027109749" target="_blank" rel="noopener noreferrer">Facebook</a></p>
        </div>
        <div class="footer-bottom">
            <p>&copy; ${year} by Blue Ridge Mountain Civic Association. Proudly created for the community.</p>
        </div>
    `;
}

function initSlider() {
    const slides = document.getElementsByClassName('slide');
    if (slides.length === 0) return;

    let index = 0;
    const show = (i) => {
        if (i >= slides.length) i = 0;
        if (i < 0) i = slides.length - 1;
        index = i;
        for (let s = 0; s < slides.length; s++) {
            slides[s].style.display = 'none';
        }
        slides[index].style.display = 'block';
    };

    show(0);

    const prev = document.querySelector('.slider-container .prev');
    const next = document.querySelector('.slider-container .next');
    if (prev) prev.addEventListener('click', () => show(index - 1));
    if (next) next.addEventListener('click', () => show(index + 1));

    setInterval(() => show(index + 1), 5000);
}

renderHeader();
renderFooter();
initSlider();
