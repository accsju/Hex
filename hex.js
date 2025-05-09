const hex = { 
    mapData: null, // w, h, typ
    mapState: null, // {index, d, color, name, restP}
    init() {
        const w = 20;
        const h = 16;
        const type = "B";
        const WindowWidth = window.innerWidth - 50 ;
        const a = 2*WindowWidth/(3*w+1);
        const svg = document.getElementById("HexMap");
        svg.innerHTML = ""; 
        svg.setAttribute("width", `${WindowWidth}`);
        svg.setAttribute("height", `${Math.sqrt(3)*a*h+Math.sqrt(3)/2*a}`);
        let initX = 0;
        let initY = 0;
        const initMapData = {
            w: w,
            h: h,
            type: type   
        }
        this.mapData = initMapData;
        const initMapState = [];
        for(let i=1;i<h+1;i++) { 
            for(let j=1;j<w+1;j++) {
                const hex = {
                        index: w*(i-1) + j,
                        d: `M${initX+a/2} ${initY} L${initX} ${initY+Math.sqrt(3)*a/2} L${initX+a/2} ${initY+Math.sqrt(3)*a} L${initX+3*a/2} ${initY+Math.sqrt(3)*a} L${initX+2*a} ${initY+Math.sqrt(3)*a/2} L${initX+3*a/2} ${initY} Z`,
                        resistance: Math.floor(Math.random()*10)+1,
                        color: null,
                        name: null,
                        restP: null //計算用メモリとしてのプロパティ         
                }
                if (j%2) {
                    initMapState.push(hex);
                    initX += 3*a/2;
                    initY += Math.sqrt(3)*a/2;
                    continue;
                }
                initMapState.push(hex);
                initX += 3*a/2;
                initY -= Math.sqrt(3)*a/2;
            };
            initX = 0;
            initY = 2*i*Math.sqrt(3)*a/2;
        }
        this.mapState = initMapState;
    },
    search(x,type,w,h) { 
        if (type === "A") {
            if (w%2===0 && h%2===0) {
                if (x===1) return [x+1,x+w,x+w+1] 
                if (x===w) return [x-1,x+w]
                if (x===(w*(h-1)+1)) return [x+1,x-w]
                if (x===(w*h)) return [x-1,x-w,x-w-1]

                if (x%w===0) return [x-1,x-w,x+w,x-w-1] 
                if (x%w===1) return [x+1,x-w,x+w,x+w+1]
                if (w>x && x%2===0) return [x-1,x+1,x+w]
                if (w>x && x%2===1) return [x-1,x+1,x+w,x+w-1,x+w+1]
                if (w*(h-1)<x && x%2===0) return [x-1,x+1,x-w,x-w-1,x-w+1]
                if ((w*(h-1)<x && x%2)) return [x-1,x+1,x-w]

                if (x%2) return [x-1,x+1,x-w,x+w,x+w-1,x+w+1] 
                return [x-1,x+1,x-w,x+w,x-w-1,x-w+1]
            }
            if (w%2 && h%2===0) {
                if (x===1) return [x+1,x+w,x+w+1]
                if (x===w) return [x-1,x+w,x+w-1]
                if (x===(w*(h-1)+1)) return [x+1,x-w]
                if (x===(w*h)) return [x-1,x-w]

                if (x%w===0) return [x-1,x-w,x+w,x+w-1]
                if (x%w===1) return [x+1,x-w,x+w,x+w+1]
                if (w>x && x%2===0) return [x-1,x+1,x+w]
                if (w>x && x%2) return [x-1,x+1,x+w,x+w-1,x+w+1]
                if (w*(h-1)<x && x%2===0) return [x-1,x+1,x-w]
                if ((w*(h-1)<x && x%2)) return [x-1,x+1,x-w,x-w-1,x-w+1]

                if ((x%w)%2) return [x-1,x+1,x-w,x+w,x+w-1,x+w+1]
                return [x-1,x+1,x-w,x+w,x-w-1,x-w+1]
            }
            if (w%2===0 && h%2) {
                if (x===1) return [x+1,x+w,x+w+1]
                if (x===w) return [x-1,x+w]
                if (x===(w*(h-1)+1)) return [x+1,x-w]
                if (x===(w*h)) return [x-1,x-w,x-w-1]
                if (x%w===0) return [x-1,x-w,x+w,x-w-1]
                if (x%w===1) return [x+1,x-w,x+w,x+w+1]
                if (w>x && x%2===0) return [x-1,x+1,x+w] 
                if (w>x && x%2) return [x-1,x+1,x-w,x-w-1,w-w+1]
                if (w*(h-1)<x && x%2===0) return [x-1,x+1,x-w,x-w-1,x-w+1]
                if ((w*(h-1)<x && x%2)) return [x-1,x+1,x-w]
                if (x%2) return [x-1,x+1,x-w,x+w,x-w-1,x-w+1]
                return [x-1,x+1,x-w,x+w,x+w-1,x+w+1]
            } 
            if (w%2 && h%2) {
                if (x===1) return [x+1,x+w,x+w+1]
                if (x===w) return [x-1,x+w,x+w-1]
                if (x===(w*(h-1)+1)) return [x+1,x-w] 
                if (x===(w*h)) return [x-1,x-w]

                if (x%w===0) return [x-1,x-w,x+w,x+w-1]
                if (x%w===1) return [x+1,x-w,x+w,x+w+1]
                if (w>x && x%2===0) return [x-1,x+1,x+w] 
                if (w>x && x%2) return [x-1,x+1,x+w,x+w-1,x+w+1]
                if (w*(h-1)<x && x%2===0) return [x-1,x+1,x-w,x-w-1,x-w+1] 
                if ((w*(h-1)<x && x%2)) return [x-1,x+1,x-w] 

                if ((x%w)%2) return [x-1,x+1,x-w,x+w,x+w-1,x+w+1]
                return [x-1,x+1,x-w,x+w,x-w-1,x-w+1]
            }
        }
        if (type === "B") {
            if (w%2===0 && h%2===0) {
                if (x===1) return [x+1,x+w]
                if (x===w) return [x-1,x+w,x+w-1]
                if (x===(w*(h-1)+1)) return [x+1,x-w,x-w+1]
                if (x===(w*h)) return [x-1,x-w]
                if (x%w===0) return [x-1,x-w,x+w,x+w-1]
                if (x%w===1) return [x+1,x-w,x+w,x-w+1]
                if (w>x && x%2===0) return [x-1,x+1,x+w,x+w-1,x+w+1]
                if (w>x && x%2) return [x-1,x+1,x+w]
                if (w*(h-1)<x && x%2===0) return [x-1,x+1,x-w] 
                if ((w*(h-1)<x && x%2)) return [x-1,x+1,x-w,x-w-1,x-w+1] 
                if (x%2) return [x-1,x+1,x-w,x+w,x-w-1,x-w+1]
                return [x-1,x+1,x-w,x+w,x+w-1,x+w+1]
            } 
            if (w%2 && h%2===0) { 
                if (x===1) return [x+1,x+w]
                if (x===w) return [x-1,x+w]
                if (x===(w*(h-1)+1)) return [x+1,x-w,x-w+1]
                if (x===(w*h)) return [x-1,x-w,x-w-1]
                if (x%w===0) return [x-1,x-w,x+w,x-w-1]
                if (x%w===1) return [x+1,x-w,x+w,x-w+1]
                if (w>x && x%2===0) return [x-1,x+1,x+w,x+w-1,x+w+1] 
                if (w>x && x%2) return [x-1,x+1,x+w]
                if (w*(h-1)<x && x%2===0) return [x-1,x+1,x-w,x-w-1,x-w+1]
                if ((w*(h-1)<x && x%2)) return [x-1,x+1,x-w] 
                if ((x%w)%2) return [x-1,x+1,x-w,x+w,x-w-1,x-w+1]
                return [x-1,x+1,x-w,x+w,x+w-1,x+w+1]
            }
            if (w%2===0 && h%2) { 
                if (x===1) return [x+1,x+w]
                if (x===w) return [x-1,x+w,x+w-1]
                if (x===(w*(h-1)+1)) return [x+1,x-w,x-w+1]
                if (x===(w*h)) return [x-1,x-w]
                if (x%w===0) return [x-1,x-w,x+w,x+w-1]
                if (x%w===1) return [x+1,x-w,x+w,x-w+1]
                if (w>x && x%2===0) return [x-1,x+1,x+w,x+w-1,x+w+1]
                if (w>x && x%2) return [x-1,x+1,x+w]
                if (w*(h-1)<x && x%2===0) return [x-w,x-1,x+1]
                if (w*(h-1)<x && x%2) return [x-1,x+1,x-w,x-w-1,x-w+1]
                if (x%2) return [x-1,x+1,x-w,x+w,x-w-1,x-w+1]
                return [x-1,x+1,x-w,x+w,x+w-1,x+w+1]
            }
            if (w%2 && h%2) { 
                if (x===1) return [x+1,x+w]
                if (x===w) return [x-1,x+w]
                if (x===(w*(h-1)+1)) return [x+1,x-w,x-w+1]
                if (x===(w*h)) return [x-1,x-w,x-w-1]
                if (x%w===0) return [x-1,x-w,x+w,x-w-1]
                if (x%w===1) return [x+1,x-w,x+w,x-w+1]
                if (w>x && x%2===0) return [x-1,x+1,x+w,x+w-1,x+w+1]
                if (w>x && x%2) return [x-1,x+1,x+w]
                if (w*(h-1)<x && x%2===0) return [x-1,x+1,x-w]
                if (w*(h-1)<x && x%2) return [x-1,x+1,x-w,x-w-1,x-w+1]
                if ((x%w)%2) return [x-1,x+1,x-w,x+w,x-w-1,x-w+1]
                return [x-1,x+1,x-w,x+w,x+w-1,x+w+1] 
            }
        }
    },
    allSearchIndexs(indexObject, p) {
        if (p-indexObject.resistance < 0) {
            return [];
        } else if(p-indexObject.resistance === 0) {
            return [indexObject.index];
        };
        const current = [indexObject.index];
        const w = this.mapData.w;
        const h = this.mapData.h;
        const type = this.mapData.type;
        const mapState = this.mapState;
        const result = [indexObject.index];
        mapState[indexObject.index-1].restP = p-indexObject.resistance;
        while (current.length!==0) {
            const l = current.length;
            const a = [];
            for (let i=0;i<l;i++) {
                const s = this.search(current[i],type,w,h);
                const sl = s.length;
                for (let j=0;j<sl;j++) {
                    const restP = mapState[current[i]-1].restP-mapState[s[j]-1].resistance;
                    if (restP >= 0) {
                        mapState[s[j]-1].restP = restP;
                        a.push(s[j]);
                    }
                }
                mapState[current[i]-1].restP = null;
            }
            current.length = 0;
            let al = a.length;
            for (let i=0;i<al;i++) {
                if (!result.includes(a[i])) { 
                    result.push(a[i]);
                    current.push(a[i]);
                }
            }
        }
        return result;
    },
    create() {
        const svg = document.getElementById("HexMap");
        const mapState = this.mapState;
        let l = this.mapData.w*this.mapData.h;
        for (let i=0;i<l;i++) {
            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("d", mapState[i].d);
            path.id = `hex${i+1}`;
            path.setAttribute("stroke", "gray");
            path.setAttribute("stroke-width", "1");
            path.setAttribute("fill", "transparent");
            // path.setAttribute("fill", `rgba(${Math.floor(Math.random()*255+1)},${Math.floor(Math.random()*255+1)},${Math.floor(Math.random()*255+1)},${Math.random()})`);
            svg.appendChild(path);
        }
    },
    resize() {
        window.onresize = () => {
            this.init();
            this.create();
        }
    },
    click() {
        const svg = document.getElementById("HexMap");
        svg.onclick = (e) => {
            const id = e.target.id;
            const index = Number(id.slice(3, id.length));
            const indexObject = this.mapState[index-1];
            const arr = this.allSearchIndexs( indexObject , 15)
            for (let i=0;i<arr.length;i++) {
                const hex = document.getElementById(`hex${arr[i]}`);
                hex.style.fill = "red";
            }
        }
    },
    hover() {
        const svg = document.getElementById("HexMap");
        svg.onmousemove = (e) => {
            // const id = e.target.id;
            // const hex = document.getElementById(id);
            // hex.style.strokeWidth = "3";
            const id = e.target.id;
            const index = Number(id.slice(3, id.length));
            const indexObject = this.mapState[index-1];
            const arr = this.allSearchIndexs( indexObject , 15)
            for (let i=0;i<arr.length;i++) {
                const hex = document.getElementById(`hex${arr[i]}`);
                hex.style.fill = "red";
            }
        }
    },
    mouseout() {
        const svg = document.getElementById("HexMap");
        svg.onmouseout = (e) => {
            // const id = e.target.id;
            // const hex = document.getElementById(id);
            // hex.style.strokeWidth = "1"
            const id = e.target.id;
            const index = Number(id.slice(3, id.length));
            const indexObject = this.mapState[index-1];
            const arr = this.allSearchIndexs( indexObject , 15)
            for (let i=0;i<arr.length;i++) {
                const hex = document.getElementById(`hex${arr[i]}`);
                hex.style.fill = "transparent";
            }
        }
    }
}
hex.init();
hex.create();
hex.resize();
hex.click();
hex.hover();
hex.mouseout();