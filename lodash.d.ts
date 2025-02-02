// lodash.d.ts
declare module "lodash" {
  export function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait?: number,
    options?: {
      leading?: boolean;
      maxWait?: number;
      trailing?: boolean;
    }
  ): T;
  // Add other lodash function declarations as needed
}
