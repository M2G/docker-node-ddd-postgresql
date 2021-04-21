declare const _exports: {
    get: ({ postRepository }: {
        postRepository: any;
    }) => {
        all: () => Promise<any>;
    };
    post: ({ postRepository }: {
        postRepository: any;
    }) => {
        create: ({ body }: {
            body: any;
        }) => Promise<any>;
    };
    put: ({ postRepository }: {
        postRepository: any;
    }) => {
        update: ({ id, body }: {
            id: any;
            body: any;
        }) => Promise<any>;
    };
    remove: ({ postRepository }: {
        postRepository: any;
    }) => {
        remove: ({ id }: {
            id: any;
        }) => Promise<any>;
    };
};
export = _exports;
