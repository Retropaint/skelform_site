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
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="how-to-read-this.html"><strong aria-hidden="true">1.</strong> How To Read This</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="file-specs.html"><strong aria-hidden="true">2.</strong> File Structure</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="generic-runtimes.html"><strong aria-hidden="true">3.</strong> Generic Runtimes</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="generic/animate.html"><strong aria-hidden="true">3.1.</strong> Animate()</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="generic/construct.html"><strong aria-hidden="true">3.2.</strong> Construct()</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="generic/get-bone-texture.html"><strong aria-hidden="true">3.3.</strong> GetBoneTexture()</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="generic/format-frame.html"><strong aria-hidden="true">3.4.</strong> FormatFrame()</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="generic/time-frame.html"><strong aria-hidden="true">3.5.</strong> TimeFrame()</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="generic/check-bone-flip.html"><strong aria-hidden="true">3.6.</strong> CheckBoneFlip()</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="engine-runtimes.html"><strong aria-hidden="true">4.</strong> Engine Runtimes</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="engine/load.html"><strong aria-hidden="true">4.1.</strong> Load()</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="engine/animate.html"><strong aria-hidden="true">4.2.</strong> Animate()</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="engine/construct.html"><strong aria-hidden="true">4.3.</strong> Construct()</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="engine/draw.html"><strong aria-hidden="true">4.4.</strong> Draw()</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="engine/format-frame.html"><strong aria-hidden="true">4.5.</strong> FormatFrame()</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="engine/time-frame.html"><strong aria-hidden="true">4.6.</strong> TimeFrame()</a></span></li></ol></li></ol>';
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
            // Check both with and without the '.html' suffix to be robust against pretty URLs
            if (link.href.replace(/\.html$/, '') === current_page.replace(/\.html$/, '')
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
                const clientRect = e.target.getBoundingClientRect();
                const sidebarRect = this.getBoundingClientRect();
                sessionStorage.setItem('sidebar-scroll-offset', clientRect.top - sidebarRect.top);
            }
        }, { passive: true });
        const sidebarScrollOffset = sessionStorage.getItem('sidebar-scroll-offset');
        sessionStorage.removeItem('sidebar-scroll-offset');
        if (sidebarScrollOffset !== null) {
            // preserve sidebar scroll position when navigating via links within sidebar
            const activeSection = this.querySelector('.active');
            if (activeSection) {
                const clientRect = activeSection.getBoundingClientRect();
                const sidebarRect = this.getBoundingClientRect();
                const currentOffset = clientRect.top - sidebarRect.top;
                this.scrollTop += currentOffset - parseFloat(sidebarScrollOffset);
            }
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

