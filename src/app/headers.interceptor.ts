import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let ContentType = 'application/json; charset=utf-8';
        let authorization = `Basic ${btoa('WebApp' + ':' + 'WebApp')}`;
        
        request = request.clone({
            setHeaders: {
                Authorization: authorization,
                "Content-Type": ContentType,
            }
        });
        return next.handle(request);
    }
}