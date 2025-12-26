declare module 'basicscroll' {
    const basicScroll: {
        create(opts: any): {
            start: () => void;
            stop: () => void;
            destroy: () => void;
            update: () => void;
            calculate: () => void;
            isActive: () => boolean;
        };
    };
    export default basicScroll;
}
