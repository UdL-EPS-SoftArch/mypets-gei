import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ShelterData } from '../shelter-data';
import { ShelterService } from '../shelter.service';
@Component({
  selector: 'app-shelter-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shelter-list.component.html',
  styleUrl: './shelter-list.component.css'
})
export class ShelterListComponent implements OnInit {
  shelters: ShelterData[];

  constructor(private shelterService: ShelterService) { }

  ngOnInit(): void {
    this.getShelters();
  }

  async getShelters() {
    this.shelters = await this.shelterService.getAllShelters();
  }
}
