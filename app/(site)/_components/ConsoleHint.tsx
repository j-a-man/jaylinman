'use client';

import { useEffect } from 'react';

let logged = false;

// For the curious who open devtools
export default function ConsoleHint() {
    useEffect(() => {
        if (logged) return;
        logged = true;
        console.info('every repo has an initial commit.');
    }, []);
    return null;
}
