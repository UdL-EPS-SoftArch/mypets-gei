import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HateoasResourceOperation, ResourceCollection } from '@lagoshny/ngx-hateoas-client';
import { User } from '../login-basic/user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class UserService extends HateoasResourceOperation<User> {

  constructor(private readonly http: HttpClient) {
    super(User);
  }

  public findByIdContaining(query: string): Observable<ResourceCollection<User>> {
    return this.searchCollection('findByIdContaining', { params: { text: query } });
  }


  disable(userId: string): Observable<User> {
    return this.http.post<User>(`${environment.API}/users/${userId}/lock`, { });
  }

  enable(userId: string): Observable<User> {
    return this.http.post<User>(`${environment.API}/users/${userId}/unlock`, { });
  }
}
