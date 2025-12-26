'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Hero from '../components/Hero';
import Intro from '../components/Intro';
import Gallery from '../components/Gallery';
import CopyModule from '../components/CopyModule';
import QuoteModule from '../components/QuoteModule';
import ImageModule from '../components/ImageModule';
import NextProject from '../components/NextProject';

export default function ProjectPage() {
    useEffect(() => {
        document.body.classList.add('work-page');
        return () => {
            document.body.classList.remove('work-page');
        };
    }, []);

    return (
        <div id="barba-wrapper">
            <div className="barba-container" data-namespace="work-page">
                <div className="barba-transition-container">
                    <section className="case-study basicScroll">
                        <Link className="btn-page-back" href="/">
                            <span className="btn-box">
                                <span className="icon-back"></span>
                            </span>
                        </Link>
                        <div className="container">
                            <div className="content">
                                <Hero />

                                <Intro />

                                <Gallery
                                    images={[
                                        '/img/work/studiomega/carousel_01-slide_01.jpg',
                                        '/img/work/studiomega/carousel_01-slide_02.jpg',
                                        '/img/work/studiomega/carousel_01-slide_03.jpg',
                                        '/img/work/studiomega/carousel_01-slide_04.jpg',
                                    ]}
                                    title={
                                        <>
                                            Start with an idea<br />and make it&nbsp;<i>better</i>
                                        </>
                                    }
                                    description={
                                        <p>
                                            &mdash; Home<br />
                                            &mdash; Work<br />
                                            &mdash; Studio<br />
                                            &mdash; Journal
                                        </p>
                                    }
                                />

                                <CopyModule
                                    reduceTopPadding
                                    col1={
                                        <p>
                                            The home page features a randomly selected video, masked in a circle, with animated text describing Studio Mega's high-level&nbsp;process.
                                        </p>
                                    }
                                    col2={
                                        <p>
                                            We developed multiple content column layouts, carousels, and media assets that provide an ease to the flow of&nbsp;pages.
                                        </p>
                                    }
                                />

                                <QuoteModule attribution="— Josh Beyer, Partner & Business Director, Studio Mega">
                                    <p>
                                        Finding someone that can not only bring expertise and technical ability but also creativity to enhance the experience is hard to find. But Eric does just&nbsp;that.
                                    </p>
                                    <p>
                                        When we work with him, we’re not just handing off a direction and waiting for him to implement it. We collaborate throughout the process and the end result is always better than what we initially thought was&nbsp;possible.
                                    </p>
                                    <p>
                                        On top of that, he’s an awesome dude, good communicator and fun to be&nbsp;around.
                                    </p>
                                </QuoteModule>

                                <Gallery
                                    images={[
                                        '/img/work/studiomega/carousel_02-slide_01.jpg',
                                        '/img/work/studiomega/carousel_02-slide_02.jpg',
                                        '/img/work/studiomega/carousel_02-slide_03.jpg',
                                        '/img/work/studiomega/carousel_02-slide_04.jpg',
                                        '/img/work/studiomega/carousel_02-slide_05.jpg',
                                        '/img/work/studiomega/carousel_02-slide_06.jpg',
                                    ]}
                                    title="Case Studies"
                                    description={
                                        <p>
                                            A primary focus of the website is to showcase the brand design work that Studio Mega has delivered to their&nbsp;clients.
                                        </p>
                                    }
                                />

                                <CopyModule
                                    reduceTopPadding
                                    col1={
                                        <p>
                                            From print to digital, and events to in-store brand work we wanted the work to stand on its own. The copy and assets can be laid out in multiple configurations that suit the content. Videos can also be used in place of photos wherever&nbsp;needed.
                                        </p>
                                    }
                                    col2={
                                        <p>
                                            Project description, categories, inline client brand color, and easy access to the next case study all make for an informative and content rich&nbsp;experience.
                                        </p>
                                    }
                                />

                                <ImageModule
                                    src="/img/work/studiomega/people.jpg"
                                    alt="The people of Studio Mega"
                                    title="Studio Mega's own branding set them apart from other agencies."
                                >
                                    <p>
                                        Vibrant colors, unique blending modes, and hover overlays can be seen here and in hoverable content throughout the&nbsp;website.
                                    </p>
                                </ImageModule>

                                <ImageModule
                                    src="/img/work/studiomega/mobile-home-nav.jpg"
                                    alt="Mobile home and navigation"
                                    title="A fully featured mobile experience."
                                >
                                    <p>
                                        Inline autoplaying videos and animations can be seen on the home, work, and case study&nbsp;pages.
                                    </p>
                                    <p>
                                        The animated mobile navigation and content keep the mobile experience feeling fast and&nbsp;fluid.
                                    </p>
                                </ImageModule>

                                <ImageModule
                                    src="/img/work/studiomega/mobile-studio-journal-case_study.jpg"
                                    alt="Mobile studio, journal, and Case study"
                                    title="Touch interactions"
                                >
                                    <p>
                                        Touch is used as an alternative information view of some otherwise hoverable&nbsp;content.
                                    </p>
                                    <p>
                                        Simply touching this content as you scroll down the page will toggle this view. Carousels also support touch drag with left and right hot spot areas for the user to progress to new&nbsp;slides.
                                    </p>
                                </ImageModule>

                                <CopyModule
                                    reduceTopPadding
                                    col1={
                                        <p>
                                            <strong>Studio Mega has some of the top creative talent in the Portland&nbsp;area.</strong>
                                        </p>
                                    }
                                    col2={
                                        <>
                                            <p>
                                                If you're ever in PDX, be sure to grab a drink with these fine people. Learn about how they've helped build and brand their little create oasis, <a href="http://studiomega.com/journal/welcome-to-the-new-new" target="_blank" rel="noopener noreferrer">New New Crusher&nbsp;Court</a>.
                                            </p>
                                            <p>
                                                Like this project and want to chat about what we could do for you? <a href="mailto:hello@vanholtz.co">Hit&nbsp;us&nbsp;up!</a>
                                            </p>
                                        </>
                                    }
                                />

                                <NextProject
                                    href="#"
                                    name={<>The<br />Brigade</>}
                                />
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
