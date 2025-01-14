import {FormGroup, Validators} from '@angular/forms';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {FormBuilder} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-contact',
  imports: [HeaderComponent, FooterComponent, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})

export class ContactComponent {

  profilForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', Validators.required)
  })

  // formBuilder = inject(FormBuilder);
  
  // profilForm = this.formBuilder.group({
  //   name: ['', Validators.required, Validators.minLength(5)],
  //   email: ['', Validators.required, Validators.email],
  //   message: ['']
  // })

  onSubmit(){
    
    if(this.profilForm.valid){
      
    }
  }
}
