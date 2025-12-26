import React from 'react';

const Hero = () => {
    return (
        <section
            className="hero"
            style={{
                backgroundImage: "url('/img/work/studiomega/hero.jpg')",
                backgroundPosition: '100% 15%'
            }}
        >
            <div
                className="title-container parallax-vertical-mm-bt"
                data-from="-35%"
                data-to="25%"
                data-timing="quadOut"
            >
                <h1 className="title">
                    Studio<br />Mega
                </h1>
            </div>
        </section>
    );
};

export default Hero;
