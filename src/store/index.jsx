import { createGlobalState } from "react-hooks-global-state";

export const {getGlobalState, useGlobalState, setGlobalState} = createGlobalState({
  connectedAccount: 'scale-0',
  boxModal: 'scale-0',
  offerModal: 'scale-0',
  priceModal: 'scale-0',
  bidPlacingModal: 'scale-0',
  auctions: [],
  auction: {},
  collections: [],
  biders: []
})

function truncate(text, startChars, endCahars, maxLength){
  if(text.length > maxLength){
    let start = text.substring(0, startChars);
    let end = text.substring(text.length - endCahars, text.length);
    while(start.length + end.length <maxLength){
      start = start + '-';
    }
    return start + end;
  }
  return text;
}

export {truncate}
