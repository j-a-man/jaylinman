// Shared descriptions for links inside headings. Referenced with aria-describedby,
// so heading navigation reads just the name ("docpipe"), not the link hint.
export const NEW_TAB_HINT = 'hint-new-tab';
export const REPO_HINT = 'hint-repo';

export default function LinkHints() {
    return (
        <>
            <span id={NEW_TAB_HINT} hidden>
                opens in new tab
            </span>
            <span id={REPO_HINT} hidden>
                GitHub repository, opens in new tab
            </span>
        </>
    );
}
