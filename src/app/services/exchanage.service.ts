import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Country } from '../models/Country';
import { Currency } from '../models/Currency';
import { CurrencyConverter } from '../models/CurrencyConverter';


@Injectable({
    providedIn: 'root'
})

export class ExchangeService {

    private currencyExchangeURL: string;
    private currencyConverterURL: string;


    constructor(private http: HttpClient) { 
        this.currencyExchangeURL = 'http://localhost:8081/api';
        this.currencyConverterURL = 'http://localhost:8082/api';
    }


    public findAllCountries(): Observable<Country[]> {
        return this.http.get<Country[]>(this.currencyExchangeURL + '/countries');
    }

    public findAllCurrencies(): Observable<Currency[]> {
        return this.http.get<Currency[]>(this.currencyExchangeURL + '/currencies');
    }


    public convertCurrency(from: String, to: String, quantity: number): Observable<CurrencyConverter> {
        return this.http.get<CurrencyConverter>(this.currencyConverterURL + '/currency-converter/from/' + from + '/to/' + to + '/quantity/' + quantity);
    }




}