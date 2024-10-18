import { createGlobalState } from "react-hooks-global-state";

export const {getGlobalState, useGlobalState, setGlobalState} = createGlobalState({
  boxModal: 'scale-0',
  offerModal: 'scale-0',
  priceModal: 'scale-0',
  auctions: [],
  auction: {},
  collections: []
})
