// src/hex/hex.js
var VisualHex = {
  //視覚的なヘックス
  init() {
  },
  draw() {
  },
  click() {
  },
  hover() {
  }
};
var VirtualHex = {
  //仮想的なヘックス 
  mapData: null,
  mapState: null,
  init() {
    const w = 100;
    const h = 100;
    const type = "A";
    const initMapData = {
      w,
      h,
      type
    };
    this.mapData = initMapData;
    const initMapState = [];
    for (let i = 0; i < w * h; i++) {
      initMapState.push(
        {
          index: i,
          registance: null,
          color: null,
          restP: null
          //計算用メモリとしてのプロパティ         
        }
      );
    }
    this.mapState = initMapState;
  },
  search(x, type, w, h) {
    if (type === "A") {
      if (!w % 2 && !h % 2) {
        if (x === 1) return [x + 1, x + w, x + w + 1];
        if (x === w) return [x - 1, x + w];
        if (x === w * (h - 1) + 1) return [x + 1, x - w];
        if (x === w * h) return [x - 1, x - w, x - w - 1];
        if (!x % w) return [x - 1, x - w, x + w, x - w - 1];
        if (x % w === 1) return [x + 1, x - w, x + w, x + w + 1];
        if (w > x && !x % 2) return [x - 1, x + 1, x + w];
        if (w > x && x % 2 === 1) return [x - 1, x + 1, x + w, x + w - 1, x + w + 1];
        if (w * (h - 1) < x && !x % 2) return [x - 1, x + 1, x - w, x - w - 1, x - w + 1];
        if (w * (h - 1) < x && x % 2) return [x - 1, x + 1, x - w];
        if (x % 2) return [x - 1, x + 1, x - w, x + w, x + w - 1, x + w + 1];
        return [x - 1, x + 1, x - w, x + w, x - w - 1, x - w + 1];
      }
      if (w % 2 && !h % 2) {
        if (x === 1) return [x + 1, x + w, x + w + 1];
        if (x === w) return [x - 1, x + w, x + w - 1];
        if (x === w * (h - 1) + 1) return [x + 1, x - w];
        if (x === w * h) return [x - 1, x - w];
        if (!x % w) return [x - 1, x - w, x + w, x + w - 1];
        if (x % w === 1) return [x + 1, x - w, x + w, x + w + 1];
        if (w > x && !x % 2) return [x - 1, x + 1, x + w];
        if (w > x && x % 2) return [x - 1, x + 1, x + w, x + w - 1, x + w + 1];
        if (w * (h - 1) < x && !x % 2) return [x - 1, x + 1, x - w];
        if (w * (h - 1) < x && x % 2) return [x - 1, x + 1, x - w, x - w - 1, x - w + 1];
        if (x % w % 2) return [x - 1, x + 1, x - w, x + w, x + w - 1, x + w + 1];
        return [x - 1, x + 1, x - w, x + w, x - w - 1, x - w + 1];
      }
      if (!w % 2 && h % 2) {
        if (x === 1) return [x + 1, x + w, x + w + 1];
        if (x === w) return [x - 1, x + w];
        if (x === w * (h - 1) + 1) return [x + 1, x - w];
        if (x === w * h) return [x - 1, x - w, x - w - 1];
        if (!x % w) return [x - 1, x - w, x + w, x - w - 1];
        if (x % w === 1) return [x + 1, x - w, x + w, x + w + 1];
        if (w > x && !x % 2) return [x - 1, x + 1, x + w];
        if (w > x && x % 2) return [x - 1, x + 1, x - w, x - w - 1, w - w + 1];
        if (w * (h - 1) < x && !x % 2) return [x - 1, x + 1, x - w, x - w - 1, x - w + 1];
        if (w * (h - 1) < x && x % 2) return [x - 1, x + 1, x - w];
        if (x % 2) return [x - 1, x + 1, x - w, x + w, x - w - 1, x - w + 1];
        return [x - 1, x + 1, x - w, x + w, x + w - 1, x + w + 1];
      }
      if (w % 2 && h % 2) {
        if (x === 1) return [x + 1, x + w, x + w + 1];
        if (x === w) return [x - 1, x + w, x + w - 1];
        if (x === w * (h - 1) + 1) return [x + 1, x - w];
        if (x === w * h) return [x - 1, x - w];
        if (!x % w) return [x - 1, x - w, x + w, x + w - 1];
        if (x % w === 1) return [x + 1, x - w, x + w, x + w + 1];
        if (w > x && !x % 2) return [x - 1, x + 1, x + w];
        if (w > x && x % 2) return [x - 1, x + 1, x + w, x + w - 1, x + w + 1];
        if (w * (h - 1) < x && !x % 2) return [x - 1, x + 1, x - w, x - w - 1, x - w + 1];
        if (w * (h - 1) < x && x % 2) return [x - 1, x + 1, x - w];
        if (x % w % 2) return [x - 1, x + 1, x - w, x + w, x + w - 1, x + w + 1];
        return [x - 1, x + 1, x - w, x + w, x - w - 1, x - w + 1];
      }
    }
    if (type === "B") {
      if (!w % 2 && !h % 2) {
        if (x === 1) return [x + 1, x + w];
        if (x === w) return [x - 1, x + w, x + w - 1];
        if (x === w * (h - 1) + 1) return [x + 1, x - w, x - w + 1];
        if (x === w * h) return [x - 1, x - w];
        if (!x % w) return [x - 1, x - w, x + w, x + w - 1];
        if (x % w === 1) return [x + 1, x - w, x + w, x - w + 1];
        if (w > x && !x % 2) return [x - 1, x + 1, x + w, x + w - 1, x + w + 1];
        if (w > x && x % 2) return [x - 1, x + 1, x + w];
        if (w * (h - 1) < x && !x % 2) return [x - 1, x + 1, x - w];
        if (w * (h - 1) < x && x % 2) return [x - 1, x + 1, x - w, x - w - 1, x - w + 1];
        if (x % 2) return [x - 1, x + 1, x - w, x + w, x - w - 1, x - w + 1];
        return [x - 1, x + 1, x - w, x + w, x + w - 1, x + w + 1];
      }
      if (w % 2 && !h % 2) {
        if (x === 1) return [x + 1, x + w];
        if (x === w) return [x - 1, x + w];
        if (x === w * (h - 1) + 1) return [x + 1, x - w, x - w + 1];
        if (x === w * h) return [x - 1, x - w, x - w - 1];
        if (!x % w) return [x - 1, x - w, x + w, x - w - 1];
        if (x % w === 1) return [x + 1, x - w, x + w, x - w + 1];
        if (w > x && !x % 2) return [x - 1, x + 1, x + w, x + w - 1, x + w + 1];
        if (w > x && x % 2) return [x - 1, x + 1, x + w];
        if (w * (h - 1) < x && !x % 2) return [x - 1, x + 1, x - w, x - w - 1, x - w + 1];
        if (w * (h - 1) < x && x % 2) return [x - 1, x + 1, x - w];
        if (x % w % 2) return [x - 1, x + 1, x - w, x + w, x - w - 1, x - w + 1];
        return [x - 1, x + 1, x - w, x + w, x + w - 1, x + w + 1];
      }
      if (!w % 2 && h % 2) {
        if (x === 1) return [x + 1, x + w];
        if (x === w) return [x - 1, x + w, x + w - 1];
        if (x === w * (h - 1) + 1) return [x + 1, x - w, x - w + 1];
        if (x === w * h) return [x - 1, x - w];
        if (!x % w) return [x - 1, x - w, x + w, x + w - 1];
        if (x % w === 1) return [x + 1, x - w, x + w, x - w + 1];
        if (w > x && !x % 2) return [x - 1, x + 1, x + w, x + w - 1, x + w + 1];
        if (w > x && x % 2) return [x - 1, x + 1, x + w];
        if (w * (h - 1) < x && !x % 2) return [x - w, x - 1, x + 1];
        if (w * (h - 1) < x && x % 2) return [x - 1, x + 1, x - w, x - w - 1, x - w + 1];
        if (x % 2) return [x - 1, x + 1, x - w, x + w, x - w - 1, x - w + 1];
        return [x - 1, x + 1, x - w, x + w, x + w - 1, x + w + 1];
      }
      if (w % 2 && h % 2) {
        if (x === 1) return [x + 1, x + w];
        if (x === w) return [x - 1, x + w];
        if (x === w * (h - 1) + 1) return [x + 1, x - w, x - w + 1];
        if (x === w * h) return [x - 1, x - w, x - w - 1];
        if (!x % w) return [x - 1, x - w, x + w, x - w - 1];
        if (x % w === 1) return [x + 1, x - w, x + w, x - w + 1];
        if (w > x && !x % 2) return [x - 1, x + 1, x + w, x + w - 1, x + w + 1];
        if (w > x && x % 2) return [x - 1, x + 1, x + w];
        if (w * (h - 1) < x && !x % 2) return [x - 1, x + 1, x - w];
        if (w * (h - 1) < x && x % 2) return [x - 1, x + 1, x - w, x - w - 1, x - w + 1];
        if (x % w % 2) return [x - 1, x + 1, x - w, x + w, x - w - 1, x - w + 1];
        return [x - 1, x + 1, x - w, x + w, x + w - 1, x + w + 1];
      }
    }
  },
  allSearchIndexs(indexObject, mapState, p) {
    if (p - indexObject.registance < 0) {
      return [];
    } else if (p - indexObject.registance === 0) {
      return [indexObject.index];
    }
    ;
    const current = [indexObject.index];
    const w = this.mapData.w;
    const h = this.mapData.h;
    const type = this.mapData.type;
    const result = [indexObject.index];
    indexObject.restP = p - indexObject.registance;
    while (current.length !== 0) {
      const l = current.length;
      const a = [];
      for (let i = 0; i < l; i++) {
        const s = this.search(current[i], type, w, h);
        const sl = s.length;
        for (let j = 0; j < sl; j++) {
          const restP = mapState[i].restP - mapState[j].registance;
          if (restP >= 0) {
            mapState[j].restP = restP;
            a.push(this.mapState[j].index);
          }
        }
        mapState[i].restP = null;
      }
      current.length = 0;
      let al = a.length;
      for (let i = 0; i < al; i++) {
        if (!result.includes(a[i])) {
          result.push(a[i]);
          current.push(a[i]);
        }
      }
    }
    return result;
  },
  getNumber(x, y) {
    const index = 20;
    return index;
  }
};
export {
  VirtualHex,
  VisualHex
};
