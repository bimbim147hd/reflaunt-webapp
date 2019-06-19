import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import * as _ from 'lodash';
import Permission from '../../models/Permission';
import Role from '../../models/Role';
import { Observable } from 'rxjs';
import { BaseService } from '../base.service';

@Injectable()
export class PermissionService extends BaseService {
  public url = '/api/v1/permissions';
  public model = Permission;

  getAllPermissionsGroup(): Observable<any> {
    return this.http.get(this.apiUrl.getApiUrl(this.url) + '/group').pipe(
      map(results => _.map((results as any).data, item => new Role(item))),
      catchError(error => {
        throw error;
      })
    );
  }
}
