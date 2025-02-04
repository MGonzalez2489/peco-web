import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ResultDto, ResultListDto } from '@core/models/dtos';
import { SearchDto } from '@core/models/dtos/search';
import { environment } from '@envs/environment';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RequestService {
  httpClient = inject(HttpClient);

  public post<T>(
    url: string,
    model: Object,
    headers?: HttpHeaders,
  ): Observable<ResultDto<T>> {
    return this.httpClient
      .post<ResultDto<T>>(this.getUrl(url), model, { headers })
      .pipe(map((res) => res));
  }

  public get<T>(url: string, params?: any): Observable<ResultDto<T>> {
    return this.httpClient
      .get<ResultDto<T>>(this.getUrl(url), {
        params: this.objectToQueryParameter(params),
      })
      .pipe(map((res) => res));
  }

  public getList<T>(url: string, pagination?: SearchDto, params?: any) {
    let reqParams = {};

    if (!pagination) {
      pagination = new SearchDto();
    }

    reqParams = { ...reqParams, ...pagination };
    if (params) {
      reqParams = { ...reqParams, ...params };
    }

    reqParams = this.objectToQueryParameter(reqParams);

    return this.httpClient
      .get<ResultListDto<T>>(this.getUrl(url), { params: reqParams })
      .pipe(map((res) => res));
  }

  public put<T>(
    url: string,
    model: Object,
    headers?: HttpHeaders,
  ): Observable<ResultDto<T>> {
    return this.httpClient
      .put<ResultDto<T>>(this.getUrl(url), model, { headers })
      .pipe(map((res) => res));
  }
  public delete<T>(
    url: string,
    headers?: HttpHeaders,
  ): Observable<ResultDto<T>> {
    return this.httpClient
      .delete<ResultDto<T>>(this.getUrl(url), { headers })
      .pipe(map((res) => res));
  }

  //Private methods
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
}
