import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AppService {
  constructor(private http: HttpClient) {}

  private data = new BehaviorSubject<Object>({});
  editData = this.data.asObservable();

  private viewData = new BehaviorSubject<Object>({});
  viewDataTable = this.viewData.asObservable();

  getContactDetails() {
    return this.http.get<any>("http://localhost:3000/directory");
  }

  saveContact(data) {
    return this.http.post<any>(`http://localhost:3000/directory`, data);
  }

  deleteContact(id) {
    return this.http.delete(`http://localhost:3000/directory/${id}`);
  }

  editContact(id, data) {
    return this.http.put<any>(`http://localhost:3000/directory/${id}`, data);
  }

  editDataAsID(dataObj: Object) {
    this.data.next(dataObj);
  }

  viewDataInTable(dataObj: Object) {
    this.viewData.next(dataObj);
  }
}
