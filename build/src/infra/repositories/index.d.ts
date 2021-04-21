declare function _exports({ database }: {
    database: any;
}): {
    postRepository: {
        getAll: (...args: any[]) => any;
        create: (...args: any[]) => any;
        update: (...args: any[]) => any;
        destroy: (...args: any[]) => any;
    };
};
export = _exports;
