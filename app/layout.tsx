import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import ScrollAnimations from './components/ScrollAnimations';
import { Syne, Unbounded, Space_Grotesk, Tenor_Sans, Manrope } from 'next/font/google';
import ThemeSwitcher from './components/ThemeSwitcher';

import PixelBackground from './components/PixelBackground';

import { ScrollProvider } from './context/ScrollContext';

const syne = Syne({ subsets: ['latin'], variable: '--font-syne', display: 'swap' });
const unbounded = Unbounded({ subsets: ['latin'], variable: '--font-unbounded', display: 'swap' });
const space = Space_Grotesk({ subsets: ['latin'], variable: '--font-space', display: 'swap' });
const tenor = Tenor_Sans({ subsets: ['latin'], weight: '400', variable: '--font-tenor', display: 'swap' });
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope', display: 'swap' });

export const metadata: Metadata = {
  title: "Jaylin's Portfolio Website",
  description: 'Studio of Eric Van Holtz. Specializing in refined digital web experiences with a focus on animated, responsive, and interactive content.',
  openGraph: {
    type: 'website',
    url: 'https://vanholtz.co/work/studiomega/',
    title: 'Van Holtz Co – Work – Studio Mega',
    description: 'Studio of Eric Van Holtz. Specializing in refined digital web experiences with a focus on animated, responsive, and interactive content.',
    images: ['https://vanholtz.co/img/social_share.png'],
  },
  twitter: {
    card: 'summary_large_image',
    site: 'Van Holtz Co',
    creator: '@vanholtzco',
    title: 'Van Holtz Co – Work – Studio Mega',
    description: 'Studio of Eric Van Holtz. Specializing in refined digital web experiences with a focus on animated, responsive, and interactive content.',
    images: ['https://vanholtz.co/img/social_share.png'],
  },
};

import DebugScroll from './components/DebugScroll';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/duo3tdm.css" />
      </head>
      <body className={`navTop loading first-load ${syne.variable} ${unbounded.variable} ${space.variable} ${tenor.variable} ${manrope.variable}`}>
        <ScrollProvider>
          <ThemeSwitcher />
          <PixelBackground />
          <ScrollAnimations />
          <header className="ui">
            <a className="logo" href="/">
              <span className="slideUp">
                <span>JMAN.</span>
              </span>
            </a>
            <button className="mobile-nav" type="button" role="button" aria-label="Menu">
              <span className="mobile-nav-box">
                <span className="mobile-nav-inner"></span>
              </span>
            </button>
          </header>

          <div
            className="curtain"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 1,
              backgroundColor: '#f2f2f2',
            }}
          ></div>

          {children}

          {/* About Sidebar (hidden by default) */}
          <section className="about">
            <button className="btn-back" type="button" aria-label="Back">
              <span className="btn-box">
                <span className="icon-close"></span>
              </span>
            </button>
            <div className="container">
              <div className="left">
                <h2 className="heading">Specializing in refined digital web experiences with a focus on animated, responsive, and interactive content.</h2>
                <p>Partnering with agencies and brands that value design and development integrity.</p>
                <p>Delivering highly executed front-end user experiences by paying close attention to the nuances of design, optimization, and performance.</p>
              </div>
              <div className="right">
                <div className="col-1">
                  <div className="info">
                    <h5 className="heading">Availability</h5>
                    <h6 className="title">March 2019 —</h6>
                    <p>Remotely, PDX</p>
                    <h5 className="heading">Services</h5>
                    <h6 className="title">Development —</h6>
                    <ul>
                      <li>Technical Direction</li>
                      <li>Front-end Development</li>
                      <li>Craft CMS Solutions</li>
                      <li>Development Consulting</li>
                    </ul>
                  </div>
                </div>
                <div className="col-2">
                  <h5 className="heading">Awards</h5>
                  <div className="info">
                    <h6 className="title">ADDY —</h6>
                    <ul>
                      <li>Best of, Gold, Silver</li>
                    </ul>
                  </div>
                  <div className="info">
                    <h6 className="title">Awwwards —</h6>
                    <ul>
                      <li>SOTD, Developer, H.M.,<br />Nominations: SOTM,<br />Independent of the Year 2018</li>
                    </ul>
                  </div>
                  <div className="info">
                    <h6 className="title">Communication Arts Web Picks —</h6>
                    <ul>
                      <li>SOTD</li>
                    </ul>
                  </div>
                  <div className="info">
                    <h6 className="title">CSSDA —</h6>
                    <ul>
                      <li>WOTD, UI, UX, Innovation,<br />Nominations: SOTM, SOTY</li>
                    </ul>
                  </div>
                  <div className="info">
                    <h6 className="title">CSS Winner —</h6>
                    <ul>
                      <li>SOTD</li>
                    </ul>
                  </div>
                  <div className="info">
                    <h6 className="title">FWA —</h6>
                    <ul>
                      <li>FOTD, Public Short List</li>
                    </ul>
                  </div>
                  <div className="info">
                    <h6 className="title">W3 —</h6>
                    <ul>
                      <li>Best of Show, Gold, Silver</li>
                    </ul>
                  </div>
                  <div className="info">
                    <h6 className="title">The Webby Awards —</h6>
                    <ul>
                      <li>Honoree</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </ScrollProvider>

        <Script src="https://www.googletagmanager.com/gtag/js?id=UA-120921934-1" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'UA-120921934-1');
          `}
        </Script>
      </body >
    </html >
  );
}
