import { Injectable } from '@angular/core';
import { Certificate } from './certificate';
import { HateoasResourceOperation, ResourceCollection } from '@lagoshny/ngx-hateoas-client';

@Injectable({
  providedIn: 'root'
})
export class CertificateService extends HateoasResourceOperation<Certificate> {

  constructor() {
    super(Certificate);
  }

}
