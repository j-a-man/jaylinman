const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

export function monthLabel(isoMonth: string, withYear = true) {
    const [year, month] = isoMonth.split('-');
    const name = MONTHS[Number(month) - 1];
    return withYear ? `${name} ${year}` : name;
}

/** "sep 2026 - now", "jun - aug 2026", "mar 2025 - now" */
export function rangeParts(start: string, end: string | 'present') {
    if (end === 'present') {
        return { from: monthLabel(start), to: 'now' };
    }
    const sameYear = start.slice(0, 4) === end.slice(0, 4);
    return { from: monthLabel(start, !sameYear), to: monthLabel(end) };
}
