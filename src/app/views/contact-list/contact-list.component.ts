import { Component, OnInit } from "@angular/core";
import { ContactFormComponent } from "../contact-form/contact-form.component";
import { AppService } from "src/app/app.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-contact-list",
  templateUrl: "./contact-list.component.html",
  styleUrls: ["./contact-list.component.scss"],
  providers: [ContactFormComponent]
})
export class ContactListComponent implements OnInit {
  constructor(
    private formData: ContactFormComponent,
    private contactService: AppService,
    private router: Router
  ) {}

  showContactDetails: any = [];
  search = "";


  ngOnInit() {
    this.getDetails();
  }

  getDetails() {
    this.contactService.getContactDetails().subscribe(data => {
      this.showContactDetails = data;
    });
  }

  deleteContact(id) {
    // this.contactService.deleteContact(id).subscribe(data => {
    //   this.getDetails();
    // });
    this.showContactDetails.forEach(element => {
      let storeContact = {
        firstName: element.firstName,
        lastName: element.lastName,
        email: element.email,
        phone: element.phone,
        status: 'Inactive'
      };
      if (element.id === id) {
        this.contactService
        .editContact(element.id, storeContact)
        .subscribe(data => this.getDetails());
      }
    });
  }

  editContact(id) {
    this.showContactDetails.forEach(element => {
      if (element.id === id) {
        this.contactService.editDataAsID(element);
      }
    });
    this.router.navigate(["addContact"]);
  }
}
