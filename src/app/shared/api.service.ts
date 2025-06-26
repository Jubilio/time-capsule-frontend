import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User, Capsule } from "./models";

@Injectable({providedIn:'root'})
export class ApiService {
  private base = 'http://localhost:8080/api';
  constructor(private http: HttpClient) {}

  // Users
  getUsers()    { return this.http.get<User[]>(`${this.base}/users`); }
  getUser(id: number) { return this.http.get<User>(`${this.base}/users/${id}`); }
  addUser(u: User)     { return this.http.post<User>(`${this.base}/users`, u); }
  updUser(u: User)     { return this.http.put<User>(`${this.base}/users/${u.id}`, u); }
  delUser(id: number)  { return this.http.delete(`${this.base}/users/${id}`); }

  // Capsules
  getCapsules()         { return this.http.get<Capsule[]>(`${this.base}/capsules`); }
  getCapsule(id: number){ return this.http.get<Capsule>(`${this.base}/capsules/${id}`); }
  addCapsule(c: Capsule) { return this.http.post<Capsule>(`${this.base}/capsules`, c); }
  updCapsule(c: Capsule) { return this.http.put<Capsule>(`${this.base}/capsules/${c.id}`, c); }
  delCapsule(id: number) { return this.http.delete(`${this.base}/capsules/${id}`); }
}
