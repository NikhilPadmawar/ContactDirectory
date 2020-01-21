import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Validators } from "@angular/forms";
import { AppService } from "src/app/app.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-contact-form",
  templateUrl: "./contact-form.component.html",
  styleUrls: ["./contact-form.component.scss"]
})
export class ContactFormComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private contactService: AppService,
    private router: Router
  ) {}

  contactDetails = this.fb.group({
    firstName: ["", Validators.required],
    lastName: ["", Validators.required],
    email: ["", Validators.required],
    phone: ["", Validators.required]
  });

  data;

  title = "Enter Details :-";

  example = {};

  ngOnInit() {

    this.contactService.editData.subscribe(data => {
      this.data = data;
      if (this.data.id != null) {
      this.example = {
        firstName: this.data.firstName,
        lastName: this.data.lastName,
        email: this.data.email,
        phone: this.data.phone
      };
    }});
  }

  submitForm() {
    if (this.contactDetails.valid) {
      let storeContact = {
        firstName: this.contactDetails.value.firstName,
        lastName: this.contactDetails.value.lastName,
        email: this.contactDetails.value.email,
        phone: this.contactDetails.value.phone,
        status: "Active"
      };
      if (this.data.id != null) {
        this.contactService
          .editContact(this.data.id, storeContact)
          .subscribe(data => {});
      } else {
        this.contactService.saveContact(storeContact).subscribe(data => {});
      }
    }
    this.contactDetails.reset();
    this.contactService.getContactDetails().subscribe(data => {
      this.contactService.editDataAsID(data);
    });
    this.contactService.editDataAsID({});
    this.router.navigate([""]);
  }

  resetForm() {
    this.contactDetails.reset();
    this.contactService.editDataAsID({});
  }
}
