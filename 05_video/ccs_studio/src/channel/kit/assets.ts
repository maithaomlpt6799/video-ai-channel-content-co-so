import {staticFile} from 'remotion';

type Generated = {found: Record<string, {file: string; durationInSeconds?: number}>; missingRequired: string[]};

/** Bọc file generated/assets.json của một tập thành các hàm tra cứu. */
export const makeAssets = (data: Generated) => ({
  src: (key: string) => (data.found[key] ? staticFile(data.found[key].file) : null),
  duration: (key: string) => data.found[key]?.durationInSeconds ?? null,
  missingRequired: data.missingRequired,
});
