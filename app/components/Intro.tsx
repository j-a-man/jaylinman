import React from 'react';

const Intro = () => {
    return (
        <section className="intro reveal">
            <div className="credits">
                <h5>
                    <a href="http://www.studiomega.com" target="_blank" rel="noopener noreferrer">
                        www.studiomega.com
                    </a>
                </h5>
                <h6>Studio Mega</h6>
                <span className="title">Agency:</span> <span>Van Holtz Co </span>
                <span className="title">Lead Front-end Developer:</span> <span>Eric Van Holtz </span>
                <span className="title">Lead Back-end Developer:</span> <span>Alex Van Holtz</span>
            </div>
            <div className="summary reveal">
                <div className="col-1">
                    <p>
                        <strong>Studio Mega is a brand design agency based in Portland, Oregon.</strong>
                    </p>
                    <p>
                        With simplicity, flexibility, and maintainability in mind we built a website uniquely&nbsp;mega.
                    </p>
                </div>
                <div className="col-2">
                    <p>
                        Powered by a Craft CMS back-end the website is easy to manage and update. There are several customizable content blocks that can be added and rearranged to make case studies be presented in a meaningful&nbsp;way.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Intro;
