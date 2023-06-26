import { ServerRespond } from './DataStreamer';

export interface Row {
  price_abc: number,
  price_def: number,
  ratio: number,
  timestamp: Date,
  upper_bound: number, 
  lower_bound: number,
  trigger_alert: number | undefined,
}


export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]): { [key: string]: string } {
    const priceABC = (serverResponds[0].top_ask.price + serverResponds[0].top_bid.price) / 2;
    const priceDEF = (serverResponds[1].top_ask.price + serverResponds[1].top_bid.price) / 2;
    const ratio = (priceABC / priceDEF).toFixed(2);
    const upperBound = (1 + 0.05).toFixed(2);
    const lowerBound = (1 - 0.05).toFixed(2);

    return {
      price_abc: priceABC.toFixed(2),
      price_def: priceDEF.toFixed(2),
      ratio,
      timestamp: serverResponds[0].timestamp > serverResponds[1].timestamp ? serverResponds[0].timestamp.toString() : serverResponds[1].timestamp.toString(),
      upper_bound: upperBound,
      lower_bound: lowerBound,
      trigger_alert: (parseFloat(ratio) > parseFloat(upperBound) || parseFloat(ratio) < parseFloat(lowerBound)) ? ratio : '',
    };
  }
}


