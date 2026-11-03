import { drawGraph } from "@ics4u-assignment-02/utils";

const canvas = document.getElementById("graph") as HTMLCanvasElement;
const history = document.getElementById("history") as HTMLElement;
const a = document.getElementById("inputA") as HTMLInputElement;
const b = document.getElementById("inputB") as HTMLInputElement;
const c = document.getElementById("inputC") as HTMLInputElement;
const d = document.getElementById("inputD") as HTMLInputElement;
const saveBtn = document.getElementById("save-btn") as HTMLInputElement;
const p = document.getElementById("p") as HTMLElement;
const q = document.getElementById("q") as HTMLElement;
const delta = document.getElementById("discriminant") as HTMLElement;
const root1 = document.getElementById("root-one") as HTMLElement;
const root2 = document.getElementById("root-two") as HTMLElement;
const root3 = document.getElementById("root-three") as HTMLElement;
const equation = document.getElementById("equation") as HTMLElement;
const firstDerivative = document.getElementById("first-derivative") as HTMLElement;
const secondDerivative = document.getElementById("second-derivative") as HTMLElement;
const rootsSummary = document.getElementById("roots") as HTMLElement;
const factoredForm = document.getElementById("factored") as HTMLElement;

let newR1 = 0;
let newR2 = 0;
let newR3 = 0;


const calculateAnalysis = () => {
    const valueA = Number(a.value);
    const valueB = Number(b.value);
    const valueC = Number(c.value);
    const valueD = Number(d.value);
    
    if (valueA === 0 || isNaN(valueA)) return;
    const h = valueB / (3 * valueA);
    const valueP = (3 * valueA * valueC - Math.pow(valueB, 2)) / (3 * Math.pow(valueA, 2));
    const valueQ = (27 * Math.pow(valueA, 2) * valueD - 9 * valueA * valueB * valueC + 2 * Math.pow(valueB, 3)) / (27 * Math.pow(valueA, 3));
    const valueDelta = Math.pow(valueQ / 2, 2) + Math.pow(valueP / 3, 3);


    p.innerHTML = valueP.toFixed(4);
    q.innerHTML = valueQ.toFixed(4);
    delta.innerHTML = valueDelta.toFixed(4);

    
    let x1 = 0;
    let x2 = 0;
    let x3 = 0;

    if (valueDelta < 0) {
        const k = 2 * Math.sqrt(-valueP / 3);
        const theta = (1 / 3) * Math.acos((-valueQ / 2) / Math.sqrt(-Math.pow(valueP / 3, 3)));

        const y1 = k * Math.cos(theta);
        const y2 = k * Math.cos(theta + (2 * Math.PI) / 3);
        const y3 = k * Math.cos(theta + (4 * Math.PI) / 3);

        x1 = y1 - h;
        x2 = y2 - h;
        x3 = y3 - h;

        newR1 = x1;
        newR2 = x2;
        newR3 = x3;


        root1.innerHTML = `x: ${x1.toFixed(4)} | y: 0.0000`;
        root2.innerHTML = `x: ${x2.toFixed(4)} | y: 0.0000`;
        root3.innerHTML = `x: ${x3.toFixed(4)} | y: 0.0000`;
    }else if (valueDelta > 0) {
        const u = Math.cbrt(-valueQ / 2 + Math.sqrt(valueDelta));
        const v = Math.cbrt(-valueQ / 2 - Math.sqrt(valueDelta));
        const y1 = u + v;
        x1 = y1 - h;

        newR1 = x1;
        newR2 = 0;
        newR3 = 0;


        root1.innerHTML = `x: ${x1.toFixed(4)} | y: 0.0000`;
        root2.innerHTML = `x: Imaginary| y: Imaginary`;
        root3.innerHTML = `x: Imaginary| y: Imaginary`;
    }else {
        if (valueP === 0 && valueQ === 0) {
            const x1 = 0 - h;

            newR1 = x1;
            newR2 = x1;
            newR3 = x1;

            root1.innerHTML = `x: ${x1.toFixed(4)} | y: 0.0000`;
            root2.innerHTML = `x: ${x1.toFixed(4)} | y: 0.0000`;
            root3.innerHTML = `x: ${x1.toFixed(4)} | y: 0.0000`;
        } else {
            const ySingle = Math.cbrt(-4 * valueQ);
            const xSingle = ySingle - h;

            const yDouble = -ySingle / 2;
            const xDouble = yDouble - h;

            newR1 = xSingle;
            newR2 = xDouble;
            newR3 = xDouble;

            root1.innerHTML = `x: ${xSingle.toFixed(4)} | y: 0.0000`;
            root2.innerHTML = `x: ${xDouble.toFixed(4)} | y: 0.0000 (Double Root)`;
            root3.innerHTML = `x: ${xDouble.toFixed(4)} | y: 0.0000 (Double Root)`;
        }

    }
    let polyStr = valueA + "x³";

    if (valueB > 0) {
        polyStr = polyStr + " + " + valueB + "x²";
    } else if (valueB < 0) {
        polyStr = polyStr + " - " + (-valueB) + "x²";
    }

    if (valueC > 0) {
        polyStr = polyStr + " + " + valueC + "x";
    } else if (valueC < 0) {
        polyStr = polyStr + " - " + (-valueC) + "x";
    }

    if (valueD > 0) {
        polyStr = polyStr + " + " + valueD;
    } else if (valueD < 0) {
        polyStr = polyStr + " - " + (-valueD);
    }

    equation.innerHTML = polyStr;

    const da = 3 * valueA;
    const db = 2 * valueB;

    let firstDerivativeString = da + "x²";

    if (db > 0) {
        firstDerivativeString = firstDerivativeString + " + " + db + "x";
    } else if (db < 0) {
        firstDerivativeString = firstDerivativeString + " - " + (-db) + "x";
    }

    if (valueC > 0) {
        firstDerivativeString = firstDerivativeString + " + " + valueC;
    } else if (valueC < 0) {
        firstDerivativeString = firstDerivativeString + " - " + (-valueC);
    }

    firstDerivative.innerHTML = firstDerivativeString;

    const sda = 6 * valueA;
    const sdb = 2 * valueB;

    let secondDerivativeString = sda + "x";

    if (sdb > 0) {
        secondDerivativeString = secondDerivativeString + " + " + sdb;
    } else if (sdb < 0) {
        secondDerivativeString = secondDerivativeString + " - " + (-sdb);
    }

    secondDerivative.innerHTML = secondDerivativeString;

if (valueDelta > 0) {
    rootsSummary.innerHTML = "1 Real Root, 2 Complex Roots";
} else if (valueDelta < 0) {
    rootsSummary.innerHTML = "3 Real Roots";
} else {
    if (valueP === 0 && valueQ === 0) {
        rootsSummary.innerHTML = "1 Triple Real Root";
    } else {
        rootsSummary.innerHTML = "1 Single Root, 1 Double Root";
    }
}

if (valueDelta > 0) {
    factoredForm.innerHTML = "No real factorization";
} else {
    factoredForm.innerHTML = "Factored form active";
}
};


const addItem = (event:Event) => {
    event.preventDefault()
    const valueA = a.value;
    const valueB = b.value;
    const valueC = c.value;
    const valueD = d.value;

    const li = document.createElement("li");
    li.className = "flex items-center gap-3 bg-transparent";
    li.innerHTML = `
        <div class="flex-1 flex justify-around p-4 rounded-xl border border-slate-800 bg-[#0b0f19] text-white font-mono">
            <span>${valueA}</span>
            <span>${valueB}</span>
            <span>${valueC}</span>
            <span>${valueD}</span>
        </div>
        <button class="delete-btn px-4 py-4 rounded-xl border border-rose-900 bg-rose-950 text-rose-500 font-mono text-xs">
            Delete
        </button>
    `;
    const card = li.querySelector("div");
    if (card) {
        card.addEventListener("click", () => {
            a.value = valueA;
            b.value = valueB;
            c.value = valueC;
            d.value = valueD;
            calculateAnalysis();
            graphFunction();
        });
    }
    
    const deleteBtn = li.querySelector(".delete-btn") as HTMLButtonElement
    deleteBtn.addEventListener("click",() =>{
      li.remove()
    })
    

    history.appendChild(li);
}

saveBtn.addEventListener("click", addItem);


const graphFunction = () => {
  drawGraph(
  { a: Number(a.value), b: Number(b.value), c: Number(c.value), d: Number(d.value) },
  {
    r1: { x: newR1, y: 0 },
    r2: { x: newR2, y: 0 },
    r3: { x: newR3, y: 0 },
  },
  canvas,
);
}

const graph = () => {
    calculateAnalysis();
    graphFunction();
}

a.addEventListener("input", graph);
b.addEventListener("input", graph);
c.addEventListener("input", graph);
d.addEventListener("input", graph);