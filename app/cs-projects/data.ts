export type ProjectLink = {
    label: string;
    type: 'github' | 'demo' | 'devpost' | 'youtube';
    url: string;
};

export type CSProject = {
    id: number;
    slug: string;
    title: string;
    category: string;
    description: string;
    image: string;
    links: ProjectLink[];
    // Extended details for the individual page
    longDescription?: string;
    technologies?: string[];
    gallery?: string[];
    // Rich Storytelling Fields
    inspiration?: string;
    whatItDoes?: string;
    howWeBuiltIt?: string;
    challenges?: string;
    accomplishments?: string;
    learned?: string;
    whatsNext?: string;
    status?: 'In Progress' | 'Completed';
};

export const PROJECTS: CSProject[] = [
    {
        id: 1,
        slug: 'jman-portfolio',
        title: 'JMAN Portfolio Website',
        category: 'Web Dev',
        status: 'In Progress',
        description: 'A modern, interactive portfolio built with Next.js, featuring scroll-driven animations and a custom design system.',
        longDescription: 'This portfolio is a comprehensive showcase of my skills in full-stack development and UI/UX design. Built with Next.js 14, it leverages advanced CSS animations, a custom masonry grid layout for graphics, and a fully responsive design. The goal was to create an immersive user experience that reflects my personal brand identity—clean, modern, and professional.',
        inspiration: 'My portfolio is a digital representation of my identity. I wanted to break away from standard templates and build a space where code and creativity coexist.\n\nA key element of this identity is the **Interactive Profile Sidebar** (shown right). This component doesn\'t just navigate; it lives. With complex entrance animations and smooth transitions, it guides users to the About page while maintaining context, serving as a constant, grounding visual anchor throughout the site.',
        whatItDoes: 'This website serves as a central hub for my professional work. The **CS Projects** section (shown below) utilizes a clean, card-based layout to present technical case studies, allowing users to filter by category and view live status updates.\n\nSimultaneously, the **Graphics Portfolio** (featured in the banner) uses a custom masonry grid to showcase artistic works, proving that technical structure can support fluid, creative expression.',
        howWeBuiltIt: '• 3D Swiveling Buttons: One of the standout UI features is the custom 3D button system (shown below). These interactive elements swivel dynamically on hover, creating a tactile, playful feel that adds depth to the flat design.\n• Next.js App Router: Leveraged for server-side rendering and optimized routing.\n• Animation Engine: Integrated ScrollReveal and Framer Motion to orchestrate complex entrance animations.\n• Responsive Design: Engineered flexible layouts that adapt perfectly to any device.',
        challenges: 'The most significant challenge was balancing high-end aesthetics with optimal performance. Implementing heavy animations often leads to layout shifts or jank.\n\nI solved this by using IntersectionObserver for efficient scroll detection and optimizing image loading strategies with next/image. Another challenge was creating a unified design language that worked for both technical case studies and visual art galleries.',
        accomplishments: '• High Performance: Delivering a site that scores 100% on Lighthouse performance metrics while maintaining a rich visual experience.\n• Unified Identity: Effectively bridging the gap between my technical engineering skills and my artistic design capabilities in one cohesive platform.',
        learned: 'Building this portfolio reinforced the importance of component reusability and disciplined state management in React. I learned deeply about the Next.js App Router paradigm and how to structure a large-scale application for long-term maintainability.',
        whatsNext: 'I plan to expand this platform by adding a technical blog to share my learning journey and a "playground" section for experimental creative coding sketches.',
        technologies: ['Next.js', 'React', 'TypeScript', 'CSS Modules', 'Framer Motion'],
        image: '/cs-projects-images/jman_portfolio_image.jpg',
        gallery: [
            '', // Removed Graphics Portfolio Image (Title Graphic)
            '/jman_portfolio_showcase_images/profile_sidebar_image.jpg',
            '/jman_portfolio_showcase_images/cs_projects_image.jpg',
            '/jman_portfolio_showcase_images/buttons_image.jpg'
        ],
        links: [
            { label: 'GitHub', type: 'github', url: 'https://github.com/j-a-man/jaylinman.git' },
            { label: 'Try it out', type: 'demo', url: 'https://jaylinman.vercel.app' }
        ]
    },
    {
        id: 2,
        slug: 'faceable',
        title: 'Faceable',
        category: 'Apps',
        description: 'An accessibility-focused art web-app that lets users draw using their face (utilizes Mediapipe Face Landmarker)',
        longDescription: 'Faceable is a groundbreaking, browser-based creative suite that transforms the user\'s subtle head movements and gaze path into direct, fluid lines on a digital canvas.',
        inspiration: 'The story begins with a question: **If creativity is purely mental, why is it gated by manual dexterity?**\n\nFor millions with ALS, arthritis, or spinal cord injuries, the artistic world is suppressed by physical barriers. We built Faceable on a core belief: the human face—our most primal expressive surface—can be a **zero-contact, high-resolution artistic controller**, making expression truly universal.',
        whatItDoes: 'Faceable transforms your head movements and gaze into a digital brush, enabling you to paint without touching a mouse or keyboard. It acts as an **Ocular Stylus**, offering a silent, non-manual form of creation that provides instant feedback. This allows artists to bypass physical constraints and immediately realize their vision in a dynamic digital space.',
        howWeBuiltIt: 'We built Faceable as a single, high-performance React application running entirely in the browser.\n\n• **Computer Vision Pipeline**: Utilized MediaPipe Face Landmarker to analyze live webcam streams.\n• **Input Normalization**: Calculated normalized coordinates from the central facial point to drive the brush.\n• **Adaptive Filtering**: Implemented signal stabilization to distinguish intentional gaze from noise.\n• **Canvas API**: Rendered smooth, continuous lines based on filtered coordinate data.',
        challenges: 'The biggest hurdle was **Signal Noise**. \n\nInitial attempts resulted in erratic lines due to unconscious micro-movements (breathing, lighting changes). We solved this by implementing:\n\n• **Dwell Time Filter**: Drawing only initiates when the cursor stabilizes.\n• **Coordinate Smoothing**: A custom algorithm to average out jitter and create fluid strokes.',
        accomplishments: 'We are immensely proud of achieving **high-fidelity, low-latency drawing** using only commodity hardware. We proved that head movement alone can serve as a precise artistic command language (The Ocular Signature) while maintaining 60fps performance despite heavy computer vision processing.',
        learned: 'We learned that **Reliability > Complexity**. \n\nWe initially tried granular eye-tracking but pivoted to head-tracking/central-point tracking for a significantly more stable and forgiving user experience. This reinforced that technical excellence must always be in service of human usability.',
        whatsNext: '• **AI Augmentation**: Integrating an AI layer to transform rough line sketches into texture-rich, photorealistic masterpieces.\n• **Refined Controls**: Adding voice commands to switch tools (brush size, color) for a completely hands-free experience.',
        technologies: ['JavaScript', 'MediaPipe API', 'HTML5 Canvas', 'CSS3', 'React'],
        image: '/cs-projects-images/faceable_image.jpg',
        gallery: [
            '/faceable_page_images/2.svg',
            '/faceable_page_images/3.svg',
            '/faceable_page_images/4.svg',
            '/faceable_page_images/5.svg'
        ],
        links: [
            { label: 'Devpost', type: 'devpost', url: 'https://devpost.com/software/faceable-gd3fs6?ref_content=my-projects-tab&ref_feature=my_projects' },
            { label: 'YouTube', type: 'youtube', url: 'https://www.youtube.com/watch?v=SA81N5V-f_I&embeds_referring_euri=https%3A%2F%2Fdevpost.com%2F&source_ve_path=MjM4NTE' },
            { label: 'GitHub', type: 'github', url: 'https://github.com/kpatel2913/Faceable.git' },
            { label: 'Try it out', type: 'demo', url: 'https://faceable.vercel.app' }
        ]
    },
    {
        id: 3,
        slug: 'health-guard-pharmacy',
        title: 'Health Guard Pharmacy Website',
        category: 'Web Dev',
        description: 'A pharmacy website built with Next.js, featuring scroll-driven animations and a custom design system.',
        longDescription: 'A professional business website for Health Guard Pharmacy, designed to provide information about services, location, and health resources. The site features a clean, trustworthy design with smooth scroll animations to engage visitors.',
        technologies: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion'],
        image: '/cs-projects-images/healthguardpharmacy_image.jpg',
        links: [
            { label: 'GitHub', type: 'github', url: 'https://github.com/j-a-man/healthguardpharmacy' },
            { label: 'Try it out', type: 'demo', url: 'https://healthguardpharmacy.vercel.app' }
        ]
    },
    {
        id: 4,
        slug: 'spyderstack',
        title: 'Spyderstack Website',
        category: 'Web Dev',
        description: 'A multi-page website built with Next.js, featuring custom animations and a calendar booking system for appointments.',
        longDescription: 'Spyderstack is a web development agency website I built to showcase services and facilitate client onboarding. It includes a custom-built booking system, detailed service pages, and a blog section, all wrapped in a high-performance Next.js application.',
        technologies: ['Next.js', 'React', 'PostgreSQL', 'Prisma', 'Stripe Integration'],
        image: '/cs-projects-images/spyderstack_image.jpg',
        links: [
            { label: 'GitHub', type: 'github', url: 'https://github.com/j-a-man/spyderstack.git' },
            { label: 'Try it out', type: 'demo', url: 'https://spyderstack.com' }
        ]
    },
    {
        id: 5,
        slug: 'hourglass',
        title: 'Hourglass',
        category: 'Apps',
        status: 'In Progress',
        description: 'A comprehensive payroll application allowing employers to track clock-in/out times and automatically process bi-weekly payroll reports with precision.',
        longDescription: 'Hourglass simplifies payroll management for small businesses. It features an intuitive clock-in/out interface for employees and a powerful dashboard for employers to generate accurate bi-weekly reports, track hours, and manage overtime.',
        technologies: ['React Native', 'Firebase', 'Node.js', 'Express'],
        image: '/cs-projects-images/hourglass_image.jpg',
        links: [
            { label: 'GitHub', type: 'github', url: 'https://github.com/j-a-man/hourglass.git' }
        ]
    },
    {
        id: 6,
        slug: 'stackhacks-phishing',
        title: 'Stackhacks Email Phishing Detector',
        category: 'Cyber',
        status: 'In Progress',
        description: 'A Chrome Extension designed for students that scans email content to calculate a phishing probability score, providing a detailed safety breakdown.',
        longDescription: 'Built during the StackHacks hackathon, this Chrome Extension helps users identify potential phishing attempts in real-time. It analyzes email headers and content patterns to assign a safety score, educating users about cybersecurity threats.',
        technologies: ['JavaScript', 'Chrome Extension Manifest V3', 'Python (Backend)', 'Flask'],
        image: '/cs-projects-images/stackhacksphishingdetector.jpg',
        links: [
            { label: 'GitHub', type: 'github', url: 'https://github.com/ThePayneBringer/PhishingDetector-StackHacks.git' }
        ]
    },
    {
        id: 7,
        slug: 'crossworks-carpentry',
        title: 'Crossworks Carpentry Website',
        category: 'Web Dev',
        description: 'A premium carpentry business website featuring high-quality project galleries, service breakdowns, and an integrated client intake system.',
        longDescription: 'A high-end portfolio site for a custom carpentry business. The site highlights craftsmanship with a focus on visual storytelling through large imagery and elegant typography. It includes a custom form for client intake and quote requests.',
        technologies: ['Next.js', 'React', 'SendGrid API', 'SCSS'],
        image: '/cs-projects-images/crossworkscarpentrymodern_image.jpg',
        links: [
            { label: 'GitHub', type: 'github', url: 'https://github.com/j-a-man/contractor-template2.git' },
            { label: 'Try it out', type: 'demo', url: 'https://crossworkscarpentrymodern.vercel.app' }
        ]
    }
];
