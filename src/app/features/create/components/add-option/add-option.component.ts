import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-add-option',
  templateUrl: './add-option.component.html',
  styleUrls: ['./add-option.component.scss']
})
export class AddOptionComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

  addOption(optionInputEl: HTMLInputElement) {
    // dispatch add option
  }
}
