import { Injectable } from '@angular/core';
import { Certificate } from './certificate';
import { HateoasResourceOperation, ResourceCollection } from '@lagoshny/ngx-hateoas-client';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CertificateService extends HateoasResourceOperation<Certificate> {

  constructor() {
    super(Certificate);
  }

  public getCertificates(): Observable<Certificate[]> {
    return this.getPage().pipe(
      map((resourceCollection: ResourceCollection<Certificate>) => resourceCollection.resources)
    );
  }

  public validateCertificate(certificateId: string): Observable<Certificate> {
    return this.patchResourceById(certificateId, { body: {validated: true} });
  }

  public invalidateCertificate(certificateId: string): Observable<Certificate> {
    return this.patchResourceById(certificateId, { body: {validated: false} });
  }

}
