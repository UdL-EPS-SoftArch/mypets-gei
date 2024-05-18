import { Component } from '@angular/core';
import { CertificateService } from '../certificate/certificate.service';
import { Observable, of } from 'rxjs';
import { Certificate } from '../certificate/certificate';
import { ResourceCollection } from '@lagoshny/ngx-hateoas-client';
import { AsyncPipe, DatePipe, DecimalPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-certificate-validate',
  standalone: true,
  imports: [AsyncPipe, DatePipe, NgIf],
  templateUrl: './certificate-validate.component.html',
  styleUrl: './certificate-validate.component.scss'
})
export class CertificateValidateComponent {

  protected certificates: Observable<Certificate[]>;

  constructor(
    private readonly certificateService: CertificateService,
  ) { }

  ngOnInit() {
    this.loadCertificates();
  }

  private loadCertificates(): void {
    this.certificates = this.certificateService.getCertificates();
  }

  validateCertificate(certificateUri: string): void {
    const certificateId = certificateUri.split('/').pop();
    this.certificateService.validateCertificate(certificateId).subscribe({
      next: (certificate: Certificate) => {
        alert('Certificate validated');
        window.location.reload();
      },
      error: (error) => {
        alert('Error validating certificate');
      }
    });
  }

  invalidateCertificate(certificateUri: string): void {
    const certificateId = certificateUri.split('/').pop();
    this.certificateService.invalidateCertificate(certificateId).subscribe({
      next: (certificate: Certificate) => {
        alert('Certificate invalidated');
        window.location.reload();
      },
      error: (error) => {
        alert('Error invalidating certificate');
      }
    });
  }


}
