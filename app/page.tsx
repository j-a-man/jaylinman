'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import EmailSidebar from './components/EmailSidebar';

export default function HomePage() {
  useEffect(() => {
    document.body.classList.add('home-page');
    // Also remove work-page if it stuck around (though cleanup should handle it)
    document.body.classList.remove('work-page');
    return () => {
      document.body.classList.remove('home-page');
    };
  }, []);

  return (
    <div id="barba-wrapper" aria-live="polite">
      <EmailSidebar />
      <div className="barba-container" data-namespace="home-page" style={{ visibility: 'visible' }}>
        <div className="barba-transition-container">
          <div className="stagePerspective parallaxPerspective perspective-origin-tt-bb">
            <div className="stageContainer" style={{ opacity: 1, minHeight: '100vh' }}>
              <main className="stage" style={{ transform: 'translate3d(0px, 0px, 0px)' }}>
                <ul className="projects">
                  <li className="projectsLi" data-barba="HomeTransition">
                    <div className="projectContainer">
                      <Link href="/about" data-barba="HomeTransition">
                        <span className="slideUp">
                          <span>ABOUT</span>
                        </span>
                      </Link>
                    </div>
                  </li>
                  <li className="projectsLi" data-barba="HomeTransition">
                    <div className="projectContainer">
                      <Link href="/cs-projects" data-barba="HomeTransition">
                        <span className="slideUp">
                          <span>CS <br /> PROJECTS</span>
                        </span>
                      </Link>
                    </div>
                  </li>
                  <li className="projectsLi" data-barba="HomeTransition">
                    <div className="projectContainer">
                      <Link href="/resume" data-barba="HomeTransition">
                        <span className="slideUp">
                          <span>RESUME/ <br /> CV</span>
                        </span>
                      </Link>
                    </div>
                  </li>
                  <li className="projectsLi" data-barba="HomeTransition">
                    <div className="projectContainer">
                      <Link href="/graphics" data-barba="HomeTransition">
                        <span className="slideUp">
                          <span>GRAPHICS <br /> PORTFOLIO</span>
                        </span>
                      </Link>
                    </div>
                  </li>

                  <li className="projectsLi" data-barba="HomeTransition">
                    <div className="projectContainer">
                      <Link href="/contact" data-barba="HomeTransition">
                        <span className="slideUp">
                          <span>CONTACT</span>
                        </span>
                      </Link>
                    </div>
                  </li>

                </ul>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
