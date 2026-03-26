import { createSlice } from "@reduxjs/toolkit";
import { getGridValue } from "../../shared/utils/gridValueGenerator";

type Tile = {
  num: number;
  marked: boolean;
  selected: boolean;
};
type valueType = {
  value: Array<Tile>;
  bingo: number
  // isMarked: Array<boolean>;
};

const initialValue: valueType = { value: [], bingo: 0 };

const tileSlice = createSlice({
  name: "tileSlice",
  initialState: initialValue,

  reducers: {
    fill: (state) => {
      if (state.value.length === 0) {
        const getValue = getGridValue();
        for (let i = 0; i < 25; i++) {
          const val = getValue();
          state.value.push({
            num: val,
            marked: false,
            selected: false,
          });
        }
      }
    },

    markNum: (state, action) => {
        for (let i = 0; i < 25; i++) {
          if (state.value[i].num === action.payload) {
            state.value[i].marked = true;
          }
        }
    },

    unmarkNum: (state, action) => {
        for (let i = 0; i < 25; i++) {
          if (state.value[i].num === action.payload) {
            state.value[i].marked = false;
          }
        }
    },

    calculateBingo: (state) => {
        const getIdx = (row: number, col: number) => {
          return (row * 5) + col;
        };

        let rows: Array<number> = [];
        let cols: Array<number> = [];

        for(let i = 0; i < 5; i++){
          let markedR = true;
          let markedC = true;
          for(let j = 0; j < 5; j++){
            const idx1 = getIdx(i, j);
            const idx2 = getIdx(j, i);
            markedR &&= state.value[idx1].marked;
            markedC &&= state.value[idx2].marked;
          }
          if(markedR) rows.push(i);
          if(markedC) cols.push(i);
        }

        let markedD1 = true;
        let markedD2 = true;
        for(let i = 0; i < 5; i++){
          const idx1 = getIdx(i, i);
          const idx2 = getIdx(i, 4-i);
          markedD1 &&= state.value[idx1].marked;
          markedD2 &&= state.value[idx2].marked;
        }

        for(let i = 0; i < rows.length; i++){
          for(let j = 0; j < 5; j++){
            const idx = getIdx(rows[i], j);
            state.value[idx].selected = true;
          }
        }

        for(let i = 0; i < cols.length; i++){
          for(let j = 0; j < 5; j++){
            const idx = getIdx(j, cols[i]);
            state.value[idx].selected = true;
          }
        }
        if(markedD1){
          for(let i = 0; i < 5; i++){
            const idx = getIdx(i,i);
            state.value[idx].selected = true;
          }
        }
        if(markedD2){
          for(let i = 0; i < 5; i++){
            const idx = getIdx(i,4-i);
            state.value[idx].selected = true;
          }
        }

        state.bingo = Math.min(5, rows.length + cols.length + (markedD1 ? 1 : 0) + (markedD2 ? 1 : 0));

    },

    clear: () => ({ value: [], bingo: 0 })
  },
});

export const { markNum, unmarkNum, fill, clear, calculateBingo } = tileSlice.actions;
export default tileSlice.reducer;
