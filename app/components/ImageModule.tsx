import React from 'react';

interface ImageModuleProps {
    src: string;
    alt: string;
    title: string;
    children: React.ReactNode;
}

const ImageModule: React.FC<ImageModuleProps> = ({ src, alt, title, children }) => {
    return (
        <section className="module-image reveal">
            <img className="media" src={src} alt={alt} />
            <div className="info">
                <h6 className="title">{title}</h6>
                {children}
            </div>
        </section>
    );
};

export default ImageModule;
