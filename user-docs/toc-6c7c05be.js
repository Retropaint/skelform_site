// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="introduction.html"><strong aria-hidden="true">1.</strong> Introduction</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="installation.html"><strong aria-hidden="true">2.</strong> Installation</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="starter-guide/main.html"><strong aria-hidden="true">3.</strong> Starter Guide</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="starter-guide/basics.html"><strong aria-hidden="true">3.1.</strong> Basics</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="starter-guide/animating.html"><strong aria-hidden="true">3.2.</strong> Animating</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="starter-guide/finale.html"><strong aria-hidden="true">3.3.</strong> Finale</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="starter-guide/inagame.html"><strong aria-hidden="true">3.4.</strong> Bonus: Using In a Game</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="psd.html"><strong aria-hidden="true">4.</strong> PSD Rigging</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="runtime-api.html"><strong aria-hidden="true">5.</strong> Runtime API</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="styles.html"><strong aria-hidden="true">6.</strong> Styles</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="inverse-kinematics.html"><strong aria-hidden="true">7.</strong> Inverse Kinematics</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="mesh-deformation.html"><strong aria-hidden="true">8.</strong> Mesh Deformation</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="importing-swf.html"><strong aria-hidden="true">9.</strong> Importing SWF</a></span></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split('#')[0].split('?')[0];
        if (current_page.endsWith('/')) {
            current_page += 'index.html';
        }
        const links = Array.prototype.slice.call(this.querySelectorAll('a'));
        const l = links.length;
        for (let i = 0; i < l; ++i) {
            const link = links[i];
            const href = link.getAttribute('href');
            if (href && !href.startsWith('#') && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The 'index' page is supposed to alias the first chapter in the book.
            if (link.href === current_page
                || i === 0
                && path_to_root === ''
                && current_page.endsWith('/index.html')) {
                link.classList.add('active');
                let parent = link.parentElement;
                while (parent) {
                    if (parent.tagName === 'LI' && parent.classList.contains('chapter-item')) {
                        parent.classList.add('expanded');
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', e => {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        const sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via
            // 'next/previous chapter' buttons
            const activeSection = document.querySelector('#mdbook-sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        const sidebarAnchorToggles = document.querySelectorAll('.chapter-fold-toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(el => {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define('mdbook-sidebar-scrollbox', MDBookSidebarScrollbox);

