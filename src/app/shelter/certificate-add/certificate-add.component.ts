import { Component, Input, OnInit, TemplateRef, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShelterService } from '../shelter.service';
import { CertificateService } from '../certificate/certificate.service';
import { Certificate } from '../certificate/certificate';

@Component({
  selector: 'app-certificate-add',
  standalone: true,
  imports: [NgbDatepickerModule, FormsModule],
  templateUrl: './certificate-add.component.html',
  styleUrl: './certificate-add.component.scss'
})
export class CertificateAddComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private readonly shelterService: ShelterService,
    private readonly certificateService: CertificateService
  ) {}

  ngOnInit(): void {
    const shelterObservable = this.shelterService.getResource(this.shelterId);
    shelterObservable.subscribe({
      next: (shelter) => {
        this.shelterName = shelter.name;
      },
      error: () => {
        this.shelterName = 'Shelter not found';
      }
    });
  }

  @Input() protected shelterId: string;
  private modalService = inject(NgbModal);
  protected shelterName: string = 'None';
  protected expirationDateObj: any = undefined
  protected expirationDate: Date = undefined;
	closeResult = '';

  open(content: TemplateRef<any>) {
		this.modalService.open(content, { ariaLabelledBy: 'add-shelter-certificate' })
  }

  addCertificate(modal) {
    const year = this.expirationDateObj.year;
    const month = this.expirationDateObj.month;
    const day = this.expirationDateObj.day;
    this.expirationDate = new Date(year, month, day);
    const certificateDetails = new Certificate({
      shelterId: `/shelter/${this.shelterId}`,
      expirationDate: this.expirationDate,
    });
    if (this.expirationDate === undefined) {
      alert('Please select an expiration date for the certificate');
      return;
    }
    this.certificateService.createResource({body: certificateDetails}).subscribe({
      next: () => {
        alert('Certificate added successfully');
        modal.close();
      },
      error: () => {
        alert('Failed to add certificate');
      }
    });
  }
}
