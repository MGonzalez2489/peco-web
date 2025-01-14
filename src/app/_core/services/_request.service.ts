import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  ResultModel,
  ResultListModel,
  PaginationMetaModel,
  PagMetaReqModel,
} from './../models/responses/';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(private httpClient: HttpClient) {}

  private getUrl(url: string): string {
    return environment.baseUrl + url;
  }

  private objectToQueryParameter(obj: any): HttpParams {
    let params: HttpParams = new HttpParams();
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const element = obj[key];
        if (element !== undefined) params = params.set(key, element);
      }
    }
    return params;
  }

  public get<T>(url: string, params?: any): Observable<ResultModel<T>> {
    return this.httpClient
      .get<ResultModel<T>>(this.getUrl(url), {
        params: this.objectToQueryParameter(params),
      })
      .pipe(map((res) => res));
  }

  public getList<T>(url: string) {
    return this.httpClient.get<T[]>(this.getUrl(url)).pipe(map((res) => res));
  }

  public getPaginatedList<T>(
    url: string,
    pagination?: PaginationMetaModel,
    params?: any,
  ): Observable<ResultListModel<T>> {
    const pagParams = new PagMetaReqModel(pagination);
    const reqParams = this.objectToQueryParameter({ ...pagParams, ...params });
    return this.httpClient
      .get<ResultListModel<T>>(this.getUrl(url), {
        params: reqParams,
      })
      .pipe(map((res) => res));
  }

  public post<T>(
    url: string,
    model: Object,
    headers?: HttpHeaders,
  ): Observable<ResultModel<T>> {
    return this.httpClient
      .post<ResultModel<T>>(this.getUrl(url), model, { headers })
      .pipe(map((res) => res));
  }

  public put<T>(
    url: string,
    model: Object,
    headers?: HttpHeaders,
  ): Observable<ResultModel<T>> {
    return this.httpClient
      .put<ResultModel<T>>(this.getUrl(url), model, { headers })
      .pipe(map((res) => res));
  }
  public delete<T>(
    url: string,
    headers?: HttpHeaders,
  ): Observable<ResultModel<T>> {
    return this.httpClient
      .delete<ResultModel<T>>(this.getUrl(url), { headers })
      .pipe(map((res) => res));
  }
}
