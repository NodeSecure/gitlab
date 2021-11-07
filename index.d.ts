export interface DownloadOptions {
  /**
   * The destination (location) to extract the tar.gz
   *
   * @default process.cwd()
   */
  dest?: string;
  /**
   * The default gitlab branch name (master, main ...).
   * By default it fetch the "default" gitlab branch.
   *
   * @default null
   */
  branch?: string | null;
  /**
   * Authentication token for private repositories
   *
   * @default process.env.GITLAB_TOKEN
   */
  token?: string;
}

export type ExtractOptions = DownloadOptions & {
  /**
   * Remove the tar.gz archive after a succesfull extraction
   *
   * @default true
   */
  removeArchive?: boolean;
}

export interface DownloadResult {
  /** Archive or repository location on disk */
  location: string;
  /** Gitlab repository name */
  repository: string;
  /** Gitlab organization name */
  organization: string;
  /** Gitlab branch name */
  branch: string;
}

export function download(repo: string, options?: DownloadOptions): Promise<DownloadResult>;
export function downloadAndExtract(repo: string, options?: ExtractOptions): Promise<DownloadResult>;
export function setToken(gitlabToken: string): void;
export function setUrl(gitlabUrl: string | URL): void;
