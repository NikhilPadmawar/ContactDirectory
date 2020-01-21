import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ContactListComponent } from "./views/contact-list/contact-list.component";
import { ContactFormComponent } from "./views/contact-form/contact-form.component";

const routes: Routes = [
  { path: "", component: ContactListComponent },
  { path: "addContact", component: ContactFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
