import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'

import { Observable, observable, throwError } from 'rxjs';
import {map, catchError, flatMap} from 'rxjs/operators';

import {Entry} from "./entry.model"
import { element } from 'protractor';
import { url } from 'inspector';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  private apiPath: string = "api/entries";

  constructor(private http: HttpClient) { }

  getAll() : Observable<Entry[]> {
    return this.http.get(this.apiPath).pipe(
      catchError(this.handleError), 
      map(this.jsonDataToEntries)
    )
  }

getById (id: number) : Observable<Entry> {
  const url = `${this.apiPath}/${id}`;
  return this.http.get(url).pipe(
    catchError(this.handleError), 
    map(this.jsonDataToEntry)
  )
}

create (entry: Entry) : Observable<Entry>{
  return this.http.post(this.apiPath, entry).pipe ( 
  catchError(this.handleError), 
  map(this.jsonDataToEntry)
)
}

update (entry: Entry ) : Observable<Entry>{
    const url = `${this.apiPath}/${entry.id}`;
    return this.http.put(url
    , entry).pipe(
      catchError(this.handleError), 
      map(()=> entry)
    )
}

delete (id: number) :Observable<any> {
  const url = `${this.apiPath}/${id}`;
  return this.http.delete(url).pipe(
    catchError(this.handleError), 
    map(() => null)
  )
}


  //private methods
  private jsonDataToEntries (jsonData : any[]): Entry[] {
    const entries: Entry[] = [];
    jsonData.forEach(element => entries.push(element as Entry));
    return entries;

   }

   private jsonDataToEntry (jsonData : any): Entry {
    return jsonData as Entry;
   }

  private handleError (error: any): Observable<any> {
    console.log ("erro na requisição =>" , error );
    return throwError(error);
  }

}

