// Every word on the page lives here. Rich text is an array of segments so
// metric chips are data, not hand-written markup.

export type Segment =
    | string
    | { diff: [from: string, to: string] }
    | { stat: string }
    | { mark: string };

export type Rich = Segment[];

export type Role = {
    title: string;
    org: string;
    orgUrl?: string;
    /** ISO year-month, used for <time dateTime> */
    start: string;
    end: string | 'present';
    location: string;
    summary: Rich;
    bullets: Rich[];
    tags: string[];
};

export type Glyph = 'tree' | 'wave' | 'ladder' | 'branch';

export type Project = {
    name: string;
    status: string;
    repoUrl: string;
    /** false while the code is not public, so the card never links to a 404 */
    repoReady: boolean;
    pitch: string;
    pipeline: string[];
    decision: string;
    metric?: { value: Exclude<Segment, string>; note: string };
    tags: string[];
    glyph: Glyph;
};

export type Leadership = {
    title: Rich;
    org: string;
    start?: string;
    end?: string | 'present';
    detail?: Rich;
};

export const person = {
    name: 'Jaylin Man',
    email: 'jaylinman4@gmail.com',
    github: 'https://github.com/j-a-man',
    linkedin: 'https://www.linkedin.com/in/jaylin-man',
    resume: '/Jaylin_Man_Resume.pdf',
    site: 'https://jaylinman.com',
    description:
        'Product-minded engineer who builds AI tools. Binghamton CS 2028, former AI Research Intern at AFRL. Open to Summer 2027 internships in product, technical PM, product engineering, solutions and AI engineering.',
};

export const hero = {
    leadBefore: 'I talk to the people doing the work, then I ',
    leadSerif: 'build the thing',
    leadAfter:
        ' that gives them their time back. Lately, a lot of that is AI tooling: for developers, and for the agents they work with.',
    spec: [
        {
            key: 'now',
            value: ['Technical Product Intern at Stutter Forward, Product Engineer at Asian American Dream, and building Schedulr for a 40-person restaurant'],
        },
        { key: 'before', value: ['AI Research Intern, Air Force Research Laboratory'] },
        { key: 'won', value: [{ mark: '1st place' }, ' at the Cisco AI Case Competition'] },
        { key: 'studying', value: ['Computer Science at Binghamton University, class of 2028'] },
        {
            key: 'open to',
            value: ['Summer 2027 internships in product management, technical PM, product engineering, solutions engineering and AI engineering'],
        },
    ] satisfies { key: string; value: Rich }[],
};

export const roles: Role[] = [
    {
        title: 'Technical Product Intern',
        org: 'Stutter Forward',
        start: '2026-09',
        end: 'present',
        location: 'binghamton, ny',
        summary: [
            'Leading development of an online stuttering-support platform for a clinical program with a ',
            { stat: '72-person waitlist' },
            '.',
        ],
        bullets: [
            ['Designing an automated sign-up flow to replace a 5-step manual enrollment that takes 2 days per cohort.'],
            ['Turning program needs into a phased roadmap with 2 clinicians, targeting a working prototype within 3 months.'],
        ],
        tags: ['product discovery', 'roadmapping', 'healthcare'],
    },
    {
        title: 'Technical Consultant & Developer',
        org: 'Schedulr',
        start: '2026-07',
        end: 'present',
        location: 'binghamton, ny · independent',
        summary: [
            'Cut weekly scheduling for a 40-person restaurant ',
            { diff: ['2 hours', '15 minutes'] },
            ' by replacing WhatsApp threads and spreadsheets.',
        ],
        bullets: [
            ['Shipped shift swaps, surveys and PDF exports across 6 live releases, prioritized from interviews with 5 staff members.'],
            ['Built a greedy constraint-based scheduler that ranks staff by weighted scores and proposes 5 schedule options.'],
            ['Set up a docs harness where coding agents follow repo rules to write release notes and update docs with every change.'],
        ],
        tags: ['client work', 'user interviews', 'scheduling algorithms', 'agentic dev'],
    },
    {
        title: 'AI Research Intern',
        org: 'Air Force Research Laboratory',
        orgUrl: 'https://www.afrl.af.mil/',
        start: '2026-06',
        end: '2026-08',
        location: 'rome, ny',
        summary: [
            'Produced an ontology of ',
            { stat: '1,103 institutions' },
            ' for an institutional-trust study with a Python LLM and embeddings pipeline.',
        ],
        bullets: [
            ['Built a CLI agentic memory system on MCP that gives coding agents architecture maps instead of raw source files.'],
            ['Let analysts score and chart text data without writing code, through a drag-and-drop AI workflow studio with 78 reusable operators.'],
        ],
        tags: ['python', 'llms', 'embeddings', 'mcp', 'agents'],
    },
    {
        title: 'Product Engineer',
        org: 'Asian American Dream',
        orgUrl: 'https://www.asianamericandream.org',
        start: '2026-04',
        end: 'present',
        location: 'new york, ny',
        summary: [
            'Processed ',
            { stat: '400+ RSVPs' },
            ' across 3 events by launching Luma-style event pages with QR check-in and automatic reminders.',
        ],
        bullets: [
            ['Added SMS alerts to the mentorship portal with AWS SNS for events, RSVPs and reminders, alongside its SES email.'],
            ['Redesigned the v2 dashboard, profiles and mobile layout, prioritized from interviews with 10 mentors and mentees.'],
        ],
        tags: ['product engineering', 'user interviews', 'aws sns + ses'],
    },
    {
        title: 'Software Engineer Intern',
        org: 'Health Guard Pharmacy',
        start: '2025-07',
        end: '2025-08',
        location: 'queens, ny',
        summary: [
            'Cut payroll prep ',
            { diff: ['3 hours', '10 minutes'] },
            ' by replacing Excel sheets at a 30-employee pharmacy with a clock-in web app.',
        ],
        bullets: [
            ['Gathered requirements from lead pharmacists to fit real shifts, time-off requests and schedule changes.'],
            ['Designed GPS-verified clock-ins within a 100-meter radius, tied to scheduled shifts, so managers could trust every timesheet.'],
        ],
        tags: ['requirements', 'web app', 'geolocation'],
    },
];

export const skills: { key: string; value: string }[] = [
    { key: 'languages', value: 'Python, TypeScript, JavaScript, Java, C, C++, SQL' },
    { key: 'building', value: 'React, Next.js, Node.js, FastAPI, REST APIs, Postgres, Supabase, Firebase' },
    { key: 'cloud', value: 'GCP (Vertex AI), AWS (SES, SNS), Docker, Vercel, Cloudflare Workers, Git' },
    { key: 'ai', value: 'MCP, Claude Code, Codex, Opencode, ChromaDB, embeddings' },
    { key: 'product', value: 'user interviews, roadmaps, GA4, Jira, Excel, PowerPoint' },
];

export const projects: Project[] = [
    {
        name: 'docpipe',
        status: 'v2.0',
        repoUrl: 'https://github.com/j-a-man/docpipe',
        repoReady: true,
        pitch: 'Gives coding agents a map of a codebase instead of the raw source.',
        pipeline: ['docpipe generate', '.context-tree/ (3 tiers)', 'docpipe mcp', 'your coding agent'],
        decision:
            'Agents read a one-page repo map first and pull only the file contracts they need, through four MCP tools. Unchanged files are hashed and skipped, so re-indexing stays cheap.',
        metric: { value: { diff: ['31.4M', '1.88M tokens'] }, note: 'raw repo vs. whole index, one 1M-line Java repo' },
        tags: ['python', 'mcp', 'llm pipelines', 'cli'],
        glyph: 'tree',
    },
    {
        name: 'afterword',
        status: 'active',
        repoUrl: 'https://github.com/j-a-man/afterword',
        repoReady: false,
        pitch: "Live meeting transcripts that know who's talking.",
        pipeline: ['system audio + mic', 'Gemini, live', 'voiceprints', 'named transcript', 'action items by owner'],
        decision:
            'A wrong name is worse than no name: a name sticks only when several independent answers agree and its quote is really in the transcript. Everyone else stays Speaker A, B, C.',
        metric: { value: { diff: ['67.7%', '92.6%'] }, note: 'speech credited to the right person, one real 37-minute call' },
        tags: ['python', 'gemini', 'speaker recognition', 'pyside6'],
        glyph: 'wave',
    },
    {
        name: 'kira',
        status: 'prototype',
        repoUrl: 'https://github.com/j-a-man/kira',
        repoReady: false,
        pitch: 'A personal AI agent that asks before anything risky.',
        pipeline: ['tool call', 'risk level × autonomy mode', 'allow / ask / block', 'approve on Telegram', 'audit log'],
        decision:
            '73 tools across mail, files, shell and git, each with a declared risk level. The gate runs in plain Python outside the model, so the model never grants its own permissions. Memory lives in pgvector.',
        tags: ['python', 'agents', 'vertex ai', 'postgres + pgvector', 'telegram'],
        glyph: 'ladder',
    },
    {
        name: 'visual-branches',
        status: 'v0.1',
        repoUrl: 'https://github.com/j-a-man/visual-branches',
        repoReady: true,
        pitch: 'Every git branch, PR and conflict in one command, for you and your agents.',
        pipeline: ['vb', 'branch tree + PR and CI state', 'predicted conflicts', 'needs you, with fix commands'],
        decision:
            'One map, two audiences: a tree, TUI or local web view for people, and compact text, JSON or a read-only MCP server for agents.',
        metric: { value: { diff: ['1,524', '417 tokens'] }, note: 'for an agent to read the branches of a demo repo, 11 git calls down to 1' },
        tags: ['go', 'git', 'mcp', 'devtools'],
        glyph: 'branch',
    },
];

export const leadership: Leadership[] = [
    {
        title: [{ mark: '1st place' }],
        org: 'Cisco AI Case Competition',
        start: '2026-02',
        end: '2026-03',
        detail: [
            'Co-built 2 of 3 working prototypes, including a meeting-briefing assistant, then pitched a phased rollout to 4 Cisco executives through live skits set in a real workday.',
        ],
    },
    {
        title: ['VP of Internal Affairs'],
        org: 'StackHacks',
        start: '2025-03',
        end: 'present',
        detail: [
            'Automated weekly feedback loops for ',
            { stat: '50% fewer meetings' },
            ', moved the board and members onto one Discord, and led hackathon marketing for ',
            { stat: '+25% engagement' },
            '.',
        ],
    },
    { title: ['Peer Mentor'], org: 'CodePath', detail: ['Mentored 7 students.'] },
    { title: ['Hacker'], org: 'HackHarvard 2025' },
    { title: ['IT Chair & Historian'], org: 'Hong Kong Exchange Square' },
];

export const education = {
    degree: 'B.S. Computer Science',
    school: 'Binghamton University (SUNY)',
    end: '2028-05',
    detail: "gpa 3.71 · dean's list, fall 2024 - spring 2026",
};

export const offTheClock: string[] = [
    'NYC-born, Long Island-raised, upstate for school.',
    'Will challenge you to pickleball. Also spikeball.',
    'Lifts, boulders and swims on a schedule, not a mood.',
    'Plays piano and watches a lot of film.',
    'Designs graphics for student orgs and makes content on the side.',
];

export const roadmap: { key: string; value: string }[] = [
    {
        key: 'now',
        value: "Building Stutter Forward's first prototype with two clinicians, shipping Schedulr releases, and studying CS at Binghamton.",
    },
    {
        key: 'next',
        value: 'Summer 2027 internships in product management, technical PM, product engineering, solutions engineering or AI engineering.',
    },
];
