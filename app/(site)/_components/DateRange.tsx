import { rangeParts } from './dates';

export default function DateRange({ start, end }: { start: string; end: string | 'present' }) {
    const { from, to } = rangeParts(start, end);
    return (
        <>
            <time dateTime={start}>{from}</time>
            {' - '}
            {end === 'present' ? to : <time dateTime={end}>{to}</time>}
        </>
    );
}
