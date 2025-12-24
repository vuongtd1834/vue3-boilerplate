import { apiWithAuth } from "@/utils/http";

export abstract class BaseService<
  T,
  TRequest = object,
  K extends keyof T = keyof T,
  TBody = T,
  O extends keyof (T | TBody) = never,
> {
  protected baseUrl: string;

  private primaryKey: K;

  constructor(baseUrl: string, primaryKey: K) {
    this.baseUrl = baseUrl;
    this.primaryKey = primaryKey;
  }

  fetchAll(params?: TRequest, signal?: AbortSignal) {
    return apiWithAuth.get<TBaseResponse<T>>(`${this.baseUrl}`, { params, signal });
  }

  getById(id: string, signal?: AbortSignal) {
    return apiWithAuth.get<T>(`${this.baseUrl}/${id}`, { signal });
  }

  create<OmitKeys extends keyof (T | TBody) = O>(payload: Omit<TBody extends object ? TBody : T, OmitKeys>) {
    return apiWithAuth.post<TBody extends object ? TBody : T, Omit<TBody extends object ? TBody : T, OmitKeys>>(
      this.baseUrl,
      payload
    );
  }

  update<OmitKeys extends keyof (T | TBody) = O>(payload: Omit<TBody extends object ? TBody : T, OmitKeys>) {
    const id = payload[this.primaryKey as unknown as keyof Omit<TBody extends object ? TBody : T, OmitKeys>];
    const newPayload = { ...payload };
    delete newPayload[this.primaryKey as unknown as keyof Omit<TBody extends object ? TBody : T, OmitKeys>];
    return apiWithAuth.patch<TBody extends object ? TBody : T, Omit<TBody extends object ? TBody : T, OmitKeys>>(
      `${this.baseUrl}/${id}`,
      newPayload
    );
  }

  updatePut<OmitKeys extends keyof (T | TBody) = O>(
    payload: Omit<TBody extends object ? TBody : T, OmitKeys>,
    ignoreRemovePrimaryKey = false
  ) {
    const id = payload[this.primaryKey as unknown as keyof Omit<TBody extends object ? TBody : T, OmitKeys>];
    const newPayload = { ...payload };
    if (!ignoreRemovePrimaryKey) {
      delete newPayload[this.primaryKey as unknown as keyof Omit<TBody extends object ? TBody : T, OmitKeys>];
    }
    return apiWithAuth.put<TBody extends object ? TBody : T, Omit<TBody extends object ? TBody : T, OmitKeys>>(
      `${this.baseUrl}/${id}`,
      newPayload
    );
  }

  delete(id: string) {
    return apiWithAuth.delete(`${this.baseUrl}/${id}`);
  }

  upload(formData: FormData) {
    return apiWithAuth.post(this.baseUrl, formData);
  }
}
