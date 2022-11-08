import { Component } from '@angular/core';
import { ApidataService } from './apidata.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
  currencyjson: any = [];

  inputCurrency = 'UAH';
  outputCurrency = 'UAH';
  result = ''
  inputValue = ''
  outputValue = 1
  uahToEuro = 1
  uahToUsd = 1

  changeInputCurrency(inputCurrency: string){
    this.inputCurrency = inputCurrency;
  }
  toOutputCurrency(outputCurrency:string){
    this.outputCurrency = outputCurrency;
  }
  constructor(private currency: ApidataService){
    this.convertHeader()
  }
  convert(){
    this.currency.getcurrencydata(this.inputCurrency).subscribe(data => {
      this.currencyjson = JSON.stringify(data)
      this.currencyjson = JSON.parse(this.currencyjson)

      if (this.outputCurrency == 'USD'){
        this.outputValue = Number(this.currencyjson.rates.USD)
      }
      else if (this.outputCurrency == 'UAH'){
        this.outputValue = Number(this.currencyjson.rates.UAH)
      }
      else if (this.outputCurrency == 'EUR'){
        this.outputValue = Number(this.currencyjson.rates.EUR)
      }
      this.result = String(Math.round(this.outputValue * Number(this.inputValue)*100)/100) 
    })
  }
  convertHeader(){
    this.currency.getcurrencydata('USD').subscribe(data => {
      this.currencyjson = JSON.stringify(data)
      this.currencyjson = JSON.parse(this.currencyjson)
      this.uahToUsd = Math.round(Number(this.currencyjson.rates.UAH)*100)/100 
    })
    this.currency.getcurrencydata('EUR').subscribe(data => {
      this.currencyjson = JSON.stringify(data)
      this.currencyjson = JSON.parse(this.currencyjson)
      this.uahToEuro = Math.round(Number(this.currencyjson.rates.UAH)*100)/100 
    })
  }
}
