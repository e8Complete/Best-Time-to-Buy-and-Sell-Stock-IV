/**
 * @param {number} k
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(k, prices) {

  if( (k === 0) || (prices.length < 2) ) {
    return 0;
  }

  let profit = 0;
  if( k > (prices.length/2) ){ //If this is the case, then we can buy and sell on every other step, and we can traverse the whole array in O(n)
    for(let thisDay = 0; thisDay <= prices.length-1; thisDay++){
      if(prices[thisDay] < prices[thisDay+1]){
        profit += prices[thisDay+1] - prices[thisDay];
      }
    }
    return profit;
  }
  else{
    let balanceAfterPurchase = new Array(k).fill(Number.NEGATIVE_INFINITY); //Initialize an array of length k, with smallest possible value
    let balanceAfterSale = new Array(k).fill(Number.NEGATIVE_INFINITY);

    for(let i = 0; i < prices.length; i++){ //For each price in prices
      for(let j = 0; j < k; j++){ //check the k amount of transactions prices
        balanceAfterPurchase[j] = Math.max(balanceAfterPurchase[j], (j === 0) ? (0 - prices[i]) : (balanceAfterSale[j-1] - prices[i]) ); //The maximum new balance after we buy a stock is either the balane we have (we don't buy again), or it is the previous balance we had after selling, minus thie price of the stock at this point (prices[i])
        balanceAfterSale[j] = Math.max(balanceAfterSale[j], balanceAfterPurchase[j] + prices[i] ); //The maximum balance after selling, is either the balance we have, or it is the one we have if we sell our stock to the price at this point (prices[i])
      }
    }
    return balanceAfterSale[k-1]; //Our final maximum profit is the one we have at the last point in the balanceAfterSale array
  }
};

console.log(maxProfit(2, [3,2,6,5,0,3]));

console.log(maxProfit(2, [2,4,1]));
