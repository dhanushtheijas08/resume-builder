import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

type SearchParamValue = string | number | boolean;

export const useCustomSearchParams = <
  T extends Record<string, SearchParamValue>,
>() => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  return new CustomSearchParams<T>(searchParams, pathname, router);
};

class CustomSearchParams<T extends Record<string, SearchParamValue>> {
  private readonly searchParams: URLSearchParams;
  private readonly pathname: string;
  private readonly router: AppRouterInstance;

  constructor(
    searchParams: URLSearchParams,
    pathname: string,
    router: AppRouterInstance,
  ) {
    this.searchParams = searchParams;
    this.pathname = pathname;
    this.router = router;
  }

  private isEmptyObject(obj: object) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }

  private getQueryString() {
    return this.searchParams.toString();
  }

  private hasSameParamValue(key: keyof T, value: T[keyof T]): boolean | null {
    const existingValue = this.searchParams.get(String(key));
    if (existingValue === null) return false;
    if (existingValue == String(value)) return null;
    return true;
  }

  private buildQueryString(key: keyof T, value: T[keyof T]) {
    const params = new URLSearchParams(this.searchParams);
    params.set(String(key), String(value));
    return params.toString();
  }

  get<K extends keyof T>(key: K): string | null {
    return decodeURIComponent(this.searchParams.get(String(key)) ?? "") ?? null;
  }

  getAll(): Partial<T> | null {
    const params: Partial<T> = {};

    this.searchParams.forEach((value, key) => {
      params[key as keyof T] = decodeURIComponent(value) as T[keyof T];
    });

    return this.isEmptyObject(params) ? null : params;
  }

  set(key: keyof T, value: T[keyof T]) {
    const existingParams = this.getAll();

    if (!existingParams) {
      this.router.push(
        `${this.pathname}?${String(key)}=${encodeURIComponent(String(value))}`,
      );
      return;
    }

    const status = this.hasSameParamValue(key, value);

    if (status === null) return;
    if (status === false) {
      this.router.push(
        `${this.pathname}?${this.getQueryString()}&${String(key)}=${encodeURIComponent(
          String(value),
        )}`,
      );
      return;
    }

    const newQueryString = this.buildQueryString(key, value);
    this.router.push(`${this.pathname}?${newQueryString}`);
  }

  setMany(paramsArray: { key: keyof T; value: T[keyof T] }[]) {
    const params = new URLSearchParams(this.searchParams);
    paramsArray.forEach((param) => {
      params.set(String(param.key), String(param.value));
    });
    this.router.push(`${this.pathname}?${params.toString()}`);
  }
  remove(key: keyof T) {
    const isKeyExist = this.get(key);

    if (!isKeyExist) return;

    const params = new URLSearchParams(this.searchParams);
    params.delete(String(key));

    const newQueryString = params.toString();
    this.router.push(
      newQueryString ? `${this.pathname}?${newQueryString}` : this.pathname,
    );
  }
  removeAll() {
    this.router.push(this.pathname);
  }
}
