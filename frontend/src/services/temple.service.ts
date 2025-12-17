import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Temple } from "../models/temple.model";
import { environment } from "../environments/environment";

@Injectable({
    providedIn: "root",
})
export class TempleService {
    private apiUrl = `${environment.apiUrl}/temples`;

    constructor(private http: HttpClient) {}

    getAllTemples(): Observable<Temple[]> {
        return this.http.get<Temple[]>(this.apiUrl);
    }

    getTemplesByStatus(status: string): Observable<Temple[]> {
        const params = new HttpParams().set("status", status);
        return this.http.get<Temple[]>(this.apiUrl, { params });
    }

    getTempleById(id: string): Observable<Temple> {
        return this.http.get<Temple>(`${this.apiUrl}/${id}`);
    }

    createTemple(temple: Temple): Observable<Temple> {
        return this.http.post<Temple>(this.apiUrl, temple);
    }

    updateTemple(id: string, temple: Temple): Observable<Temple> {
        return this.http.put<Temple>(`${this.apiUrl}/${id}`, temple);
    }

    deleteTemple(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
