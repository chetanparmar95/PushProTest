import {createSlice} from '@reduxjs/toolkit';

export type NFTData = {
  amount: string;
  name: string;
  token_id: string;
  token_address: string;
  token_uri: string;
};

export type NFTState = {
  nfts?: NFTData[];
  bookmarked: NFTData[];
  images: {[key: string]: string};
};

export const initialState: NFTState = {
  images: {},
  bookmarked: [],
};

const nftSlice = createSlice({
  name: 'nft',
  initialState,
  reducers: {
    getNFTs(_state, _action) {},
    setNFTs(state, action) {
      state.nfts = action.payload;
    },
    getImage(_state, _action) {},
    setImage(state, action) {
      state.images[action.payload.id] = action.payload.image;
    },
    setBookmarks(state, action) {
      state.bookmarked = action.payload;
    },
    handleBookmarks(state, action) {
      // Add or remove bookmark
      const index = state.bookmarked.findIndex(
        bookmark => bookmark.token_id === action.payload.token_id,
      );
      if (index === -1) {
        state.bookmarked = [...state.bookmarked, action.payload];
      } else {
        const newBookmarks = [...state.bookmarked];
        newBookmarks.splice(index, 1);
        state.bookmarked = newBookmarks;
      }
    },
    deleteBookmarks(state, action) {
      const filteredBookmarks = state.bookmarked.filter(
        b => b.token_id !== action.payload.token_id,
      );
      state.bookmarked = filteredBookmarks;
    },
  },
});

export const {
  getNFTs,
  setNFTs,
  getImage,
  setImage,
  setBookmarks,
  handleBookmarks,
  deleteBookmarks,
} = nftSlice.actions;

export default nftSlice.reducer;
