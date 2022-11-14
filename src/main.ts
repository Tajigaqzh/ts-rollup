// console.log("hello rollup")

// 发布订阅者模式
/* 
on订阅/监听

emit 发布/注册

once 只执行一次

off解除绑定
 */
interface EventInterface {
	on: (name: string, fn: Function) => void;
	emit: (name: string, ...args: Array<any>) => void;
	off: (name: string, fn: Function) => void;
	once: (name: string, fn: Function) => void;
}

interface List {
	[key: string]: Array<Function>;
}
class Dispatch implements EventInterface {
	private list: List;
	constructor() {
		this.list = {};
	}
	on(name: string, fn: Function) {
		const callback = this.list[name] || [];
		callback.push(fn);
		this.list[name] = callback;
		// console.log(this.list);
	}
	emit(name: string, ...args: Array<any>) {
		let eventName = this.list[name];
		if (eventName) {
			eventName.forEach((fn) => {
				fn.apply(this, args);
			});
		} else {
			console.error(`名称错误${name}`);
		}
	}
	off(name: string, fn: Function) {
		let eventName = this.list[name];
		if (eventName && fn) {    
			eventName.forEach((item, index) => {
				if (item === fn) {
					// funIndex = index;
                    eventName.splice(index, 1)
                    return;
				}
			});
			// let index = evnetName.findIndex((fns) => fns === fn);
			// evnetName.splice(index, 1);
		} else {
			console.error("该事件未监听");
		}
	}
	once(name: string, fn: Function) {
        let de =(...args:Array<any>)=>{
            fn.apply(this,args)
            this.off(name,de)

        }
        this.on(name,de)
    }
}

const d = new Dispatch();
d.on("post",(...args:Array<any>)=>{
    console.log("1param",args,1);
})


d.emit('post',1,false,{name:"小曼"})

const fn = (...args:Array<any>)=>{
    console.log("2param",args,2)
    // console.log("已经删除");
    
}
d.on("of1f",fn)
d.off("of1f",()=>{})


// d.emit('post',2,true,{name:"小曼"})