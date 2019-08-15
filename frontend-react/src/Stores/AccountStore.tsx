import { observable , action } from 'mobx';

import Portis from '@portis/web3';
import Web3 from 'web3';

import { NETWORK, CONTRACT_ADDRESS, HUB_ADDRESS } from "../constants";
import upmeetAbi from "./upmeetAbi.json"
import hubAbi  from "./hubAbi.json";

const portis = new Portis('e04fedfa-b1d3-451d-a952-9eb2d8670283', NETWORK , { gasRelay: true });
const web3 = new Web3(portis.provider);

class AccountStore {
    @observable count = 0;
    @observable address : string | null = null;
    @observable events = [] as {title: string, description :string}[] ;


    constructor() {
        this.init();
    }

    @action
    init() {
        web3.eth.getAccounts((error, accounts) => {
            if (error) {
                return;
            }
            if (accounts[0]) {
                this.address = accounts[0];
            }
        });
    }

    showInfo() {
        portis.showPortis();
    }

    @action
    logout() {
        this.address = null;
        portis.onLogout(()=> {
            console.log("signed out.")
        })
    }

    async addEvent(event : any) {
        try {
            const upmeetContract = new web3.eth.Contract(upmeetAbi , CONTRACT_ADDRESS );
            
            if (this.address !== null) {
                await upmeetContract.methods.addEvent(event.title, event.description, event.timestamp , event.rate ).send({
                    from: this.address
                });
                return Promise.resolve();
            } else {
                throw new Error("Invalid user address.");
            }

        } catch (error) {
            return Promise.reject(error);
        }
    }

    async checkGasBalance() {
        try {
            const hubContract = new web3.eth.Contract(hubAbi,HUB_ADDRESS );
            const balance = await hubContract.methods
                .balanceOf(CONTRACT_ADDRESS)
                .call();
            return Promise.resolve(balance/(10 ** 18));
        } catch (error) {
            return Promise.reject(error);
        }
    };

    increase() {
        this.count = this.count + 1;
    }
    decrease() {
        this.count = this.count - 1;
    }

    async fund(amount : number) {
        try {
            const hubContract = new web3.eth.Contract(hubAbi,HUB_ADDRESS );
            if (this.address !== null) {
                await hubContract.methods.depositFor(CONTRACT_ADDRESS).send({
                    from: this.address,
                    value: amount * 10 ** 18
                });
                return Promise.resolve();
            } else {
                throw new Error("Invalid user address.");
            }
            
        } catch (error) {
            return Promise.reject(error)
        }
    }

    @action
    async loadEvents(limit? : number) {
        const upmeetContract = new web3.eth.Contract(upmeetAbi , CONTRACT_ADDRESS );
        const result = await upmeetContract.methods.numEvent().call();
        let items = [];
        for (let i = 0;i<result;i++) {  
            const item = await upmeetContract.methods.getEvent(i).call();
            // console.log("time : ", Math.round(new Date().valueOf()/1000));
            const event = {
                id : i ,
                title : item['0'],
                description : item['1'],
                active: item['2'],
                owner: item['3'],
                createdAd: new Date(Number(item['4'])* 1000).toDateString()+" "+new Date(Number(item['4'])* 1000).toTimeString(),
                eventAt : new Date(Number(item['5'])* 1000).toDateString()+" "+new Date(Number(item['5'])* 1000).toTimeString(),
                rate: web3.utils.fromWei( item['6'], 'ether')
            }
            console.log("event : ", event);
            items.push(event);
        }

        // limits to last 5 events to show
        if (limit && items.length > limit) {
            items = items.slice(Math.max(items.length - limit, 1));
        }

        this.events = items;

    }

    async getAttendees(event_id: number)  {
        try {
            const upmeetContract = new web3.eth.Contract(upmeetAbi , CONTRACT_ADDRESS );
            const result = await upmeetContract.methods.getAttendee(event_id).call();
            
            const list = result.length > 0 ? result.filter((item : any) => item!=="0x0000000000000000000000000000000000000000" ) : [];
            
            return Promise.resolve(list);
        } catch (error) {
            return Promise.reject(error);
        }

    } 

    async join(event_id: number, value: string) {
        try {
            const upmeetContract = new web3.eth.Contract(upmeetAbi , CONTRACT_ADDRESS );
            if (this.address !== null) {
                await upmeetContract.methods.addAttendee(event_id).send({
                    from: this.address,
                    value: (10 ** 18)*Number(value)
                });
                return Promise.resolve();
            } else {
                throw new Error("Invalid user address.");
            }

        } catch (error) {
            return Promise.reject(error);
        }
    }
}

const accountStore = new AccountStore();
export default accountStore;
export { AccountStore };