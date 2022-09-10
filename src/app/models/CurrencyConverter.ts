import { Currency } from "./Currency";
import { ErrorMessage } from "./ErrorMessage";

export class CurrencyConverter {
    exchangeId: number = 0;
    fromCurrency: Currency = null;
    toCurrency: Currency = null;
    exchangeValue: number = 0;
    quantity: number = 0;
    result: number = 0;
    errorMessage: ErrorMessage = null;
    statusCode: string = '';
}