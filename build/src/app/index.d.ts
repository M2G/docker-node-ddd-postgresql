declare function _exports({ server, database }: {
    server: any;
    database: any;
}): {
    start: () => Promise<void>;
};
export = _exports;
