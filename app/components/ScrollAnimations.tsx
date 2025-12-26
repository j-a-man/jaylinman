'use client';

import { useEffect } from 'react';
// basicScroll imported dynamically to avoid build issues

const ScrollAnimations = () => {
    useEffect(() => {
        // Remove loading class on mount
        document.body.classList.remove('loading');

        // Reveal Observer
        const revealElements = document.querySelectorAll('.reveal');
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-show');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach((el) => revealObserver.observe(el));

        // Parallax (basicScroll)
        const activeInstances: any[] = [];
        const scrollElements = document.querySelectorAll('.parallax-vertical-mm-bt, .parallax-vertical-tb-bt');

        if (scrollElements.length > 0) {
            import('basicscroll').then((basicScrollModule) => {
                const basicScroll = basicScrollModule.default || basicScrollModule;

                scrollElements.forEach((el) => {
                    const from = el.getAttribute('data-from') || '0%';
                    const to = el.getAttribute('data-to') || '0%';
                    const timing = el.getAttribute('data-timing') || 'linear';

                    const instance = basicScroll.create({
                        elem: el,
                        from: 'top-bottom',
                        to: 'bottom-top',
                        direct: true,
                        props: {
                            '--transform-y': {
                                from: from,
                                to: to,
                                timing: timing
                            }
                        }
                    });
                    instance.start();
                    activeInstances.push(instance);
                });
            }).catch((e) => console.error('Failed to load basicscroll', e));
        }

        return () => {
            revealObserver.disconnect();
            activeInstances.forEach(i => i.destroy && i.destroy());
        };
    }, []);

    return null;
};

export default ScrollAnimations;
