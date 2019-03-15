const dut = require('./build/Release/dut.node');
const {Sim, RisingEdge, FallingEdge} = require('signalflip-js');
const _ = require('lodash');


const clk = new Sim(dut, dut.eval, dut.clk);
dut.init();

const init = () => {
//    dut.mdc(0);
//    dut.mdio(0);
    dut.en(0);
    dut.clk(0);
    dut.rstf(0);
};

init();
let i = 0;
clk.on('negedge', (props) => {
    if(i < 10) {
	dut.rstf(0);
    } else {
	dut.rstf(1);
    }
    i++;
});

let range = n => Array.from(Array(n).keys())
const u = x => x >>> 0;

function* enableTxn() {
    yield () => { return dut.rstf() == 1 };
    yield* RisingEdge(dut.clk); 
    dut.en(1)
    yield* RisingEdge(dut.clk);
    dut.en(0);
}

clk.addTask(enableTxn());
clk.run(200);



module.exports = dut;
