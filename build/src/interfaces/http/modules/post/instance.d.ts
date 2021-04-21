declare function _exports(): {
    getUseCase: {
        all: () => Promise<any>;
    };
    postUseCase: {
        create: ({ body }: {
            body: any;
        }) => Promise<any>;
    };
    putUseCase: {
        update: ({ id, body }: {
            id: any;
            body: any;
        }) => Promise<any>;
    };
    deleteUseCase: {
        remove: ({ id }: {
            id: any;
        }) => Promise<any>;
    };
};
export = _exports;
