declare namespace Gitlab {
    interface options {
        dest?: string;
        branch?: string;
        extract?: boolean;
        unlink?: boolean;
        auth?: string;
    }

}

declare function Gitlab(repo: string, options?: Gitlab.options): Promise<string>;

export as namespace Gitlab;
export = Gitlab;
