import { Injectable } from '@angular/core';
import { ConnectionBackend, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Http, Headers } from "@angular/http";
import { appConfig } from '../../app.config';

import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class MyHttp extends Http {
  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
    super(backend, defaultOptions);
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    //todo: separate project into modules that require custom http versus default
    if (url.includes('api.magicthegathering.io')) {
      return super.get(url);
    } else {
      return super.get(appConfig.apiUrl + url, this.addJwt(options)).catch(this.handleError);
    }
  }

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return super.post(appConfig.apiUrl + url, body, this.addJwt(options)).catch(this.handleError);
  }

  put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return super.put(appConfig.apiUrl + url, body, this.addJwt(options)).catch(this.handleError);
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return super.delete(appConfig.apiUrl + url, this.addJwt(options)).catch(this.handleError);
  }

  /*
  helper methods
   */

  private addJwt(options?: RequestOptionsArgs): RequestOptionsArgs {
    // ensure request options and headers are not null
    options = options || new RequestOptions();
    options.headers = options.headers || new Headers();

    // add auth header with jwt token
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      options.headers.append('Authorization', 'Bearer ' + currentUser.token);
    }

    return options;
  }

  private handleError(error: any) {
    if (error.status === 401) {
      window.location.href = '/login';
    }
    return Observable.throw(error._body);
  }
}

export function myHttpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions): Http {
  return new MyHttp(xhrBackend, requestOptions);
}

export let myHttpProvider = {
  provide: Http,
  useFactory: myHttpFactory,
  deps: [XHRBackend, RequestOptions]
};
