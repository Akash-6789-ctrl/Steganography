import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ClinicService {
  private api =
    "http://https://steganography-backend-mtqy.onrender.com/api/clinics";

  constructor(private http: HttpClient) {}

  search(city: string) {
    return this.http.get<any[]>(`${this.api}/search?city=${city}`);
  }
}
