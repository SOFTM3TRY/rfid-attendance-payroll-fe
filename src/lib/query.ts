export const DEFAULT_STALE_TIME = 1000 * 60 * 5;
export const DEFAULT_GC_TIME = 1000 * 60 * 30;
export const SESSION_STALE_TIME = 1000 * 60 * 15;

export function buildAuthedQueryKey(
  scope: string,
  token: string | null | undefined,
  ...parts: Array<string | number | null | undefined>
) {
  return [scope, token ?? "guest", ...parts];
}
