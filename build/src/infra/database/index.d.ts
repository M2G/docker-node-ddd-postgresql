declare function _exports({ logger, config }: {
    logger: any;
    config: any;
}): false | {
    sequelize: any;
    Sequelize: typeof import("sequelize/types");
    models: {};
};
export = _exports;
