import packageJson from '../../package.json';

/** "v1.0": major.minor from package.json, shared by the hero, footer and share image */
export const version = `v${packageJson.version.split('.').slice(0, 2).join('.')}`;
