import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Country } from 'src/app/models/Country';
import { ExchangeService } from 'src/app/services/exchanage.service'; 
import { CurrencyConverter } from 'src/app/models/CurrencyConverter';
import { Currency } from 'src/app/models/Currency';


@Component({
  selector: 'app-exchange-converter',
  templateUrl: './exchange-converter.component.html',
  styleUrls: ['./exchange-converter.component.css'],
  providers: [ExchangeService]
})
export class ExchangeConverterComponent implements OnInit {

  // bind form
  @ViewChild('form') exchangeForm: NgForm;

  currencyList: Currency[];
  from: String; 
  to: String; 
  quantity: number = 0;
  currencyConverter: CurrencyConverter;
  result: number = 0;

  constructor(private exchangeService : ExchangeService) { }

  ngOnInit(): void {
    // pass the general list when the page is loaded
    this.getCountryList();
  }

  // get the country list to pass to the table
  public getCountryList() {
    this.exchangeService.findAllCurrencies().subscribe(
      data => {
        this.currencyList = data;
      });      
  }

  onSubmit() {
    this.result = 0;
    this.exchangeService.convertCurrency(this.from, this.to, this.quantity).subscribe(
      data => {
        this.currencyConverter = data;
        console.log(' -> ' + this.currencyConverter.statusCode);
        // insert 0
        if(this.currencyConverter.statusCode === 'ZERO_NUMBER_ERROR') {
          this.cleanFields();
          window.alert(this.currencyConverter.errorMessage.errorName + ' ' + this.currencyConverter.errorMessage.errorDescription);
        }
        // insert negative values 
        else if(this.currencyConverter.statusCode === 'NEGATIVE_NUMBER_ERROR') {
          this.cleanFields();
          window.alert(this.currencyConverter.errorMessage.errorName + ' ' + this.currencyConverter.errorMessage.errorDescription);
        } 
        //
        else if(this.currencyConverter.statusCode === 'NO_NUMBER_ERROR') {
          this.cleanFields();
          window.alert(this.currencyConverter.errorMessage.errorName + ' ' + this.currencyConverter.errorMessage.errorDescription);
        }
        // miss some fields
        else if (this.currencyConverter.statusCode === 'NULL_FROM_OR_TO_ERROR') {
          this.cleanFields();
          window.alert(this.currencyConverter.errorMessage.errorName + ' ' + this.currencyConverter.errorMessage.errorDescription);
        }
        // success convertion
        else {
          this.result = this.currencyConverter.result;
        }
        
      }
    );
  }


  public cleanFields() {
    this.from = '';
    this.to = '';
    this.quantity = 0;
    this.result = 0;
  }

  public reset() {
    this.cleanFields();
    
  }

  

  

}
