(() => {
    const sharedHeader = `
<nav data-shared-layout="1">
    <input type="checkbox" id="check">
    <ul>
        <div class="logo-hamburger">
            <img src="Assets/logo.png" height="40" alt="Microtwi logo">
            <label for="check" class="hamburger-toggle" aria-label="Toggle navigation">
                <span class="hamburger-lines">
                    <span></span>
                    <span></span>
                    <span></span>
                </span>
            </label>
        </div>
        <a href="main_page.html" class="menuLink">Home</a>
        <a href="about.html" class="menuLink">About</a>
        <a href="eqt.html" class="menuLink">Equinox Tales</a>
        <a href="music.html" class="menuLink">Music</a>
    </ul>
</nav>
<ul id="context-menu">
    <li>
        <button class="menuLinkLongAlt" id="button-reload"><img src="Assets/UI Icons/reload.png" height="15"> Reload</button>
    </li>
    <hr id="history-actions-context-menu-section" class="line">
    <li>
        <button class="menuLinkLongAlt" id="button-back"><img src="Assets/UI Icons/back.png" height="15"> Back</button>
    </li>
    <li>
        <button class="menuLinkLongAlt" id="button-forward"><img src="Assets/UI Icons/forward.png" height="15"> Forward</button>
    </li>
    <hr id="quick-actions-context-menu-section" class="line">
    <li>
        <button class="menuLinkLongAlt" id="button-copy"><img src="Assets/UI Icons/copy.png" height="15"> Copy</button>
    </li>
    <li>
        <button class="menuLinkLongAlt" id="button-open-new-tab"><img src="Assets/UI Icons/open-tab.png" height="15"> Open In New Tab</button>
    </li>
    <li>
        <button class="menuLinkLongAlt" id="button-zoom"><img src="Assets/UI Icons/magnify.png" height="15"> Zoom In The Image</button>
    </li>
    <hr id="advance-actions-context-menu-section" class="line">
    <li>
        <button class="menuLinkLongAlt" id="button-print"><img src="Assets/UI Icons/print.png" height="15"> Print / Save</button>
    </li>
    <li>
        <button class="menuLinkLongAlt" id="button-share"><img src="Assets/UI Icons/share.png" height="15"> Share</button>
    </li>
</ul>
<div class="fullscreenImageBG"></div>
`;
    const sharedFooter = `
<footer data-shared-layout="1">
    <div class="footerBG">
        <div class="footerContent">
            <a href="privacy_policy.html" class="menuLink">© 2026 Microtwi. All rights reserved.</a>
            <a href="mailto:official@microtwi.com" class="menuLink">Contact: official@microtwi.com</a>
        </div>
    </div>
</footer>
`;

    function highlightCurrentNav() {
        const nav = document.querySelector('nav[data-shared-layout="1"]');
        if (!nav) return;

        const currentFile = (window.location.pathname.split('/').pop() || 'main_page.html').split('?')[0].toLowerCase();
        nav.querySelectorAll('a').forEach(link => {
            const href = link.getAttribute('href');
            if (!href) return;
            const normalizedHref = href.split('/').pop().toLowerCase();
            const isHome = ['index.html', ''].includes(currentFile) && normalizedHref === 'main_page.html';
            const matches = normalizedHref === currentFile || isHome;
            link.classList.toggle('active', matches);
        });
    }

    function appendLayout() {
        if (!document.body || document.querySelector('nav[data-shared-layout="1"]')) {
            return;
        }

        const firstElement = document.body.firstElementChild;
        if (firstElement) {
            firstElement.insertAdjacentHTML('afterend', sharedHeader);
        } else {
            document.body.insertAdjacentHTML('afterbegin', sharedHeader);
        }
        document.body.insertAdjacentHTML('beforeend', sharedFooter);
        highlightCurrentNav();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', appendLayout);
    } else {
        appendLayout();
    }
})();
