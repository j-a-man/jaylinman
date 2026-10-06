declare module 'basicscroll' {
    type BasicScrollProp = {
        from: string | number;
        to: string | number;
        timing?: string;
    };

    type BasicScrollOptions = {
        elem?: Element;
        from: string | number;
        to: string | number;
        direct?: boolean | HTMLElement;
        track?: boolean;
        inside?: (instance: unknown, percentage: number, props: Record<string, string>) => void;
        outside?: (instance: unknown, percentage: number, props: Record<string, string>) => void;
        props?: Record<string, BasicScrollProp>;
    };

    const basicScroll: {
        create(opts: BasicScrollOptions): {
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
