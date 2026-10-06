import Beyond from './_components/Beyond';
import ConsoleHint from './_components/ConsoleHint';
import Contact from './_components/Contact';
import Experience from './_components/Experience';
import Footer from './_components/Footer';
import Header from './_components/Header';
import Hero from './_components/Hero';
import LinkHints from './_components/LinkHints';
import Projects from './_components/Projects';

export default function Home() {
    return (
        <>
            <a href="#content" className="skip-link">
                Skip to content
            </a>
            <Header />
            <main id="content">
                <Hero />
                <Experience />
                <Projects />
                <Beyond />
                <Contact />
            </main>
            <Footer />
            <LinkHints />
            <ConsoleHint />
        </>
    );
}
