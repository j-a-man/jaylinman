import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { PROJECTS } from '../data';
import styles from './ProjectDetail.module.css';
import ScrollReveal from '@/app/components/ScrollReveal';
import ScrollProgress from '@/app/components/ScrollProgress';

// Generate static params for all projects
export async function generateStaticParams() {
    return PROJECTS.map((project) => ({
        slug: project.slug,
    }));
}

// Helper: Format text into paragraphs and lists, handling **bold**
// mode: 'all' (default), 'text-only' (no cards), 'cards-only' (only cards)
const formatText = (text: string, mode: 'all' | 'text-only' | 'cards-only' = 'all') => {
    if (!text) return null;

    // Helper to parse bold syntax **text**
    const parseBold = (content: string) => {
        const parts = content.split(/(\*\*.*?\*\*)/g);
        return parts.map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={i}>{part.slice(2, -2)}</strong>;
            }
            return part;
        });
    };

    // Split by double newline to get blocks
    const blocks = text.split('\n\n');

    // Filter blocks based on mode
    const filteredBlocks = blocks.filter(block => {
        const isCardBlock = block.trim().includes('•');
        if (mode === 'text-only') return !isCardBlock;
        if (mode === 'cards-only') return isCardBlock;
        return true;
    });

    // Check if block contains list items (feature cards)
    return filteredBlocks.map((block, index) => {
        if (block.trim().includes('•')) {
            const items = block.split('\n').filter(line => line.trim().startsWith('•'));
            return (
                <div key={index} className={styles.detailCardGrid} style={mode === 'cards-only' ? { gridTemplateColumns: '1fr 1fr' } : {}}>
                    {items.map((item, i) => {
                        const cleanItem = item.replace('•', '').trim();
                        const [title, ...rest] = cleanItem.split(':');
                        const content = rest.join(':').trim();

                        return (
                            <div key={i} className={styles.detailFeatureCard}>
                                {content ? (
                                    <>
                                        <div className={styles.detailFeatureTitle}>{title.trim()}</div>
                                        <div className={styles.detailFeatureText}>{parseBold(content)}</div>
                                    </>
                                ) : (
                                    <div className={styles.detailFeatureText}>{parseBold(title.trim())}</div>
                                )}
                            </div>
                        );
                    })}
                </div>
            );
        }

        // Regular paragraph
        return (
            <p key={index} className={styles.description} style={{ marginBottom: '1rem' }}>
                {parseBold(block)}
            </p>
        );
    });
};

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = PROJECTS.find((p) => p.slug === slug);

    if (!project) {
        notFound();
    }

    // Check if this is the Faceable project to apply specific overrides
    const isFaceable = slug === 'faceable';

    return (
        <div className="barba-wrapper">
            {/* Scroll Progress Ring */}
            <ScrollProgress />

            {/* Back Button */}
            <Link className="btn-page-back" href="/cs-projects" style={{ display: 'block', opacity: 1, pointerEvents: 'auto', transform: 'none', right: '8%', top: '35px', position: 'fixed', zIndex: 20000 }}>
                <span className="btn-box">
                    <span className="icon-back"></span>
                </span>
            </Link>

            <div className={styles.container}>
                {/* Hero Section */}
                <div className={styles.hero}>
                    <div className={styles.heroContent}>
                        <div className={styles.category}>{project.category}</div>
                        <h1 className={styles.title}>{project.title}</h1>

                        <div className={styles.techStack}>
                            {project.technologies?.map((tech) => (
                                <span key={tech} className={styles.techTag}>{tech}</span>
                            ))}
                        </div>

                        <div className={styles.links}>
                            {project.links.map((link, i) => (
                                <a
                                    key={i}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`${styles.linkBtn} ${link.type === 'github' ? styles.linkBtnSecondary : ''}`}
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className={styles.heroImageWrapper}>
                        <Image
                            src={project.image}
                            alt={project.title}
                            width={1200}
                            height={800}
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className={styles.heroImage}
                            priority
                        />
                        {project.status === 'In Progress' && (
                            <div className={styles.statusBadge}>
                                In Progress
                            </div>
                        )}
                    </div>
                </div>

                {/* Title Graphic (Faceable Specific - gallery[0]) */}
                {project.gallery && project.gallery[0] && (
                    <ScrollReveal>
                        <div className={styles.titleGraphicWrapper}>
                            <Image
                                src={project.gallery[0]}
                                alt="Project Overview"
                                width={1200}
                                height={600}
                                className={styles.titleGraphic}
                            />
                        </div>
                    </ScrollReveal>
                )}

                {/* Single Description Heading */}
                <div style={{ marginBottom: '40px', marginTop: '0px' }}>
                    <h3 className={styles.contentLabel}>
                        Description
                    </h3>
                </div>

                {/* Rich Content Sections (Split Layout) */}
                <div className={styles.richContent}>

                    {/* Inspiration & Vision */}
                    {project.inspiration && (
                        <ScrollReveal>
                            <div className={styles.splitSection}>
                                <div className={styles.splitTitleColumn}>
                                    <h2 className={styles.sectionTitle}>Inspiration &<br />Vision</h2>
                                    <p className={styles.sectionSubtitle}>Why we started.</p>
                                </div>
                                <div className={styles.splitContentColumn}>
                                    <div className={styles.sideBySide}>
                                        <div className={styles.textSide}>
                                            {formatText(project.inspiration)}
                                        </div>
                                        {/* Gallery[1] is Sidebar Image - Keep it Right */}
                                        {project.gallery && project.gallery[1] && (
                                            <div className={styles.imageSide}>
                                                <div className={styles.contentImageWrapper}>
                                                    <Image
                                                        src={project.gallery[1]}
                                                        alt="Inspiration"
                                                        width={800}
                                                        height={1000}
                                                        className={styles.contentImage}
                                                        style={{ objectFit: 'contain', maxHeight: '600px', width: 'auto' }} // Inline fix for vertical
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    )}

                    {/* What It Is (Renamed from What it does) */}
                    {project.whatItDoes && (
                        <ScrollReveal>
                            <div className={styles.splitSection}>
                                <div className={styles.splitTitleColumn}>
                                    <h2 className={styles.sectionTitle}>What it is</h2>
                                    <p className={styles.sectionSubtitle}>The solution.</p>
                                </div>
                                <div className={styles.splitContentColumn}>
                                    {/* Alternating Layout: Reversed (Image Left) */}
                                    <div className={`${styles.sideBySide} ${styles.reversed}`}>
                                        <div className={styles.textSide}>
                                            {formatText(project.whatItDoes)}
                                        </div>
                                        {project.gallery && project.gallery[2] && (
                                            <div className={styles.imageSide}>
                                                <div className={styles.contentImageWrapper}>
                                                    <Image src={project.gallery[2]} alt="Overview" width={1000} height={600} className={styles.contentImage} />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    )}

                    {/* How We Built It */}
                    {(project.howWeBuiltIt || project.gallery?.[3]) && (
                        <ScrollReveal>
                            <div className={styles.splitSection}>
                                <div className={styles.splitTitleColumn}>
                                    <h2 className={styles.sectionTitle}>How it works</h2>
                                    <p className={styles.sectionSubtitle}>Under the hood.</p>
                                </div>
                                <div className={styles.splitContentColumn}>
                                    {isFaceable ? (
                                        // Faceable Special: Text/Image above, Cards below (2x2)
                                        <>
                                            <div className={styles.sideBySide}>
                                                <div className={styles.textSide}>
                                                    {project.howWeBuiltIt && formatText(project.howWeBuiltIt, 'text-only')}
                                                </div>
                                                {project.gallery && project.gallery[3] && (
                                                    <div className={styles.imageSide}>
                                                        <div className={styles.contentImageWrapper}>
                                                            <Image src={project.gallery[3]} alt="How it works" width={1000} height={600} className={styles.contentImage} />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            {/* Cards below side-by-side */}
                                            {project.howWeBuiltIt && formatText(project.howWeBuiltIt, 'cards-only')}
                                        </>
                                    ) : (
                                        // Standard Layout
                                        <div className={styles.sideBySide}>
                                            <div className={styles.textSide}>
                                                {project.howWeBuiltIt && formatText(project.howWeBuiltIt)}
                                            </div>
                                            {project.gallery && project.gallery[3] && (
                                                <div className={styles.imageSide}>
                                                    <div className={styles.contentImageWrapper}>
                                                        <Image src={project.gallery[3]} alt="How it works" width={1000} height={600} className={styles.contentImage} />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </ScrollReveal>
                    )}

                    {/* Challenges */}
                    {project.challenges && (
                        <ScrollReveal>
                            <div className={styles.splitSection}>
                                <div className={styles.splitTitleColumn}>
                                    <h2 className={styles.sectionTitle}>Challenges</h2>
                                    <p className={styles.sectionSubtitle}>Roadblocks we faced.</p>
                                </div>
                                <div className={styles.splitContentColumn}>
                                    {formatText(project.challenges)}
                                </div>
                            </div>
                        </ScrollReveal>
                    )}

                    {/* What We Learned */}
                    {project.learned && (
                        <ScrollReveal>
                            <div className={styles.splitSection}>
                                <div className={styles.splitTitleColumn}>
                                    <h2 className={styles.sectionTitle}>Takeaways</h2>
                                    <p className={styles.sectionSubtitle}>Lessons learned.</p>
                                </div>
                                <div className={styles.splitContentColumn}>
                                    {formatText(project.learned)}
                                </div>
                            </div>
                        </ScrollReveal>
                    )}

                    {/* Fallback for basic projects */}
                    {!project.inspiration && (
                        <div className={styles.section}>
                            <h2 className={styles.sectionTitle}>Overview</h2>
                            <p className={styles.description}>
                                {project.longDescription || project.description}
                            </p>
                        </div>
                    )}
                </div>

                {/* Future: Gallery Section if more images are added */}
            </div>
        </div>
    );
}
