//Promise
//Promise的实例有三个状态，Pending（进行中）、Resolved（已完成）、Rejected（已拒绝）。
//当你把一件事情交给promise时，它的状态就是Pending，任务完成了状态就变成了Resolved、没有完成失败了就变成了Rejected。
// let promise = new Promise((resolve, reject) => {
// 	setTimeout(() => {
// 		let num = parseInt(Math.random() * 100);
// 		if (num > 50) {
// 			resolve(num);
// 		} else {
// 			reject(num);
// 		}
// 	}, 5000);
// });
// promise.then(
// 	(res) => {
// 		console.log('successCode:', res);
// 	},
// 	(err) => {
// 		console.log('errorCode:', err);
// 	}
// );
// promise
// 	.then((res) => {
// 		console.log('successCode:', res);
// 	})
// 	.catch((err) => {
// 		console.log('errorCode:', err);
// 	});

//Promise.all
//Promise.all 接收一个数组，数组的每一项都是一个promise对象。
//当数组中所有的promise的状态都达到resolved的时候，Promise.all的状态就会变成resolved，
//如果有一个状态变成了rejected，那么Promise.all的状态就会变成rejected（任意一个失败就算是失败），这就可以解决我们并行的问题。
//调用then方法时的结果成功的时候是回调函数的参数也是一个数组，按顺序保存着每一个promise对象resolve执行时的值。
// let promise1 = new Promise((resolve, reject) => {
// 	setTimeout(() => {
// 		resolve(1);
// 	}, 1000);
// });

// let promise2 = new Promise((resolve, reject) => {
// 	setTimeout(() => {
// 		resolve(2);
// 	}, 5000);
// });

// let promise3 = new Promise((resolve, reject) => {
// 	setTimeout(() => {
// 		resolve(3);
// 	}, 11000);
// });

// Promise.all([promise1, promise2, promise3]).then((res) => {
// 	console.log(res);
// });

//Promise.race
//Promise.race 竞速模式 也是接受一个每一项都是promise的数组。
//但是与all不同的是，第一个promise对象状态变成resolved时自身的状态变成了resolved，
//第一个promise变成rejected自身状态就会变成rejected。
//第一个变成resolved的promsie的值就会被使用。
// let promise1 = new Promise((resolve, reject) => {
// 	setTimeout(() => {
// 		resolve(1);
// 	}, 5000);
// });

// let promise2 = new Promise((resolve, reject) => {
// 	setTimeout(() => {
// 		resolve(2);
// 	}, 3000);
// });

// let promise3 = new Promise((resolve, reject) => {
// 	setTimeout(() => {
// 		resolve(3);
// 	}, 11000);
// });

// Promise.race([promise1, promise2, promise3]).then(
// 	(res) => {
// 		console.log('the fastest promise: promise' + res); //打印出2，因为promise2最先完成，其余的就被忽略
// 	},
// 	(rej) => {
// 		console.log('rejected');
// 		console.log(rej);
// 	}
// );

//await && async
//await后面接一个会return new promise的函数并执行它
//await只能放在async函数里

//例子 from MDN
// function resolveAfter2Seconds() {
// 	return new Promise((resolve) => {
// 		setTimeout(() => {
// 			resolve('resolved');
// 		}, 2000);
// 	});
// }
// async function asyncCall() {
// 	console.log('calling');
// 	const result = await resolveAfter2Seconds();
// 	// console.log(111);
// 	console.log(result);
// 	// expected output: 'resolved'
// }
// asyncCall();

//使用async和await获取成功的结果
// function rollDice() {
// 	return new Promise((resolve, reject) => {
// 		let sino = parseInt(Math.random() * 6 + 1);
// 		setTimeout(() => {
// 			resolve(sino);
// 		}, 3000);
// 	});
// }
// async function test() {
// 	let n = await rollDice();
// 	console.log(n);
// }
// test();
//上面这段代码async中使await rollDIce()先执行，等到三秒后执行完再把得到的结果赋值给左边的n，
//也就是说test函数需要三秒钟才执行完成，所以test函数是异步的，因此前面必须写async

//获取失败的结果
// function rollDice(guess) {
// 	return new Promise((resolve, reject) => {
// 		let sino = Math.floor(Math.random() * 6 + 1);
// 		setTimeout(() => {
// 			if (sino > 3) {
// 				if (guess === 'big') {
// 					resolve(sino);
// 				} else {
// 					reject(sino);
// 				}
// 			} else {
// 				if (guess === 'big') {
// 					reject(sino);
// 				} else {
// 					resolve(sino);
// 				}
// 			}
// 		}, 3000);
// 	});
// }
// async function test(guess) {
// 	try {
// 		let n = await rollDice(guess);
// 		console.log('you win! the number is', n);
// 	} catch (error) {
// 		console.log('you loose! the number is', error);
// 	}
// }
// //把await和成功后的操作放到try里，失败的放在catch里
// test('small');

//Q:有多个promise，怎么拿到所有的promise都结束后的结果
//A1：使用Promise
//promise.all里面跟一个数组，数组的每一项是一个返回promise的函数调用，then的第一个参数是所有的promise都成功后调用，拿到所有promise的结果是一个数组；第二个参数拿到的是第一个失败的值
// function rollDice(guess) {
// 	return new Promise((resolve, reject) => {
// 		let sino = Math.floor(Math.random() * 6 + 1);
// 		setTimeout(() => {
// 			if (sino > 3) {
// 				if (guess === 'big') {
// 					resolve(sino);
// 				} else {
// 					reject(sino);
// 				}
// 			} else {
// 				if (guess === 'big') {
// 					reject(sino);
// 				} else {
// 					resolve(sino);
// 				}
// 			}
// 		}, 3000);
// 	});
// }
// Promise.all([rollDice('big'), rollDice('small')]).then(
// 	(res) => console.log('win!', res), //全部猜对才会打印n
// 	(rej) => console.log('loose!', rej) //其中一个不通过就会打印出不通过的那个
// );

//A2:使用await
//await是直接获取多个promise的结果的，因为Promise.all()返回的也是一个promise所以如果要使用await拿到多个promise的值，可以直接await Promise.all()
// function rollDice(guess) {
// 	return new Promise((resolve, reject) => {
// 		let sino = Math.floor(Math.random() * 6 + 1);
// 		setTimeout(() => {
// 			if (sino > 3) {
// 				if (guess === 'big') {
// 					resolve(sino);
// 				} else {
// 					reject(sino);
// 				}
// 			} else {
// 				if (guess === 'big') {
// 					reject(sino);
// 				} else {
// 					resolve(sino);
// 				}
// 			}
// 		}, 3000);
// 	});
// }

// async function test() {
// 	try {
// 		let n = await Promise.all([
// 			rollDice('big'),
// 			rollDice('small'),
// 			rollDice('small'),
// 		]);
// 		//全部猜对才会打印n
// 		console.log(n);
// 	} catch (error) {
// 		//其中一个不通过就会打印出不通过的那个
// 		console.log('you did not guess right num at all times',error);
// 	}
// }
// test();

//简单例子 from ‘https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function’
// var resolveAfter2Seconds = function () {
// 	console.log('starting slow promise');
// 	return new Promise((resolve) => {
// 		setTimeout(function () {
// 			resolve('slow');
// 			console.log('slow promise is done');
// 		}, 2000);
// 	});
// };

// var resolveAfter1Second = function () {
// 	console.log('starting fast promise');
// 	return new Promise((resolve) => {
// 		setTimeout(function () {
// 			resolve('fast');
// 			console.log('fast promise is done');
// 		}, 1000);
// 	});
// };

// var sequentialStart = async function () {
// 	console.log('==SEQUENTIAL START==');

// 	// 1. Execution gets here almost instantly
// 	const slow = await resolveAfter2Seconds();
// 	console.log(slow); // 2. this runs 2 seconds after 1.

// 	const fast = await resolveAfter1Second();
// 	console.log(fast); // 3. this runs 3 seconds after 1.
// };

// var concurrentStart = async function () {
// 	console.log('==CONCURRENT START with await==');
// 	const slow = resolveAfter2Seconds(); // starts timer immediately
// 	const fast = resolveAfter1Second(); // starts timer immediately

// 	// 1. Execution gets here almost instantly
// 	console.log(await slow); // 2. this runs 2 seconds after 1.
// 	console.log(await fast); // 3. this runs 2 seconds after 1., immediately after 2., since fast is already resolved
// };

// var concurrentPromise = function () {
// 	console.log('==CONCURRENT START with Promise.all==');
// 	return Promise.all([resolveAfter2Seconds(), resolveAfter1Second()]).then(
// 		(messages) => {
// 			console.log(messages[0]); // slow
// 			console.log(messages[1]); // fast
// 		}
// 	);
// };

// var parallel = async function () {
// 	console.log('==PARALLEL with await Promise.all==');

// 	// Start 2 "jobs" in parallel and wait for both of them to complete
// 	await Promise.all([
// 		(async () => console.log(await resolveAfter2Seconds()))(),
// 		(async () => console.log(await resolveAfter1Second()))(),
// 	]);
// };

// // This function does not handle errors. See warning below!
// var parallelPromise = function () {
// 	console.log('==PARALLEL with Promise.then==');
// 	resolveAfter2Seconds().then((message) => console.log(message));
// 	resolveAfter1Second().then((message) => console.log(message));
// };

// sequentialStart(); // after 2 seconds, logs "slow", then after 1 more second, "fast"

// // wait above to finish
// setTimeout(concurrentStart, 4000); // after 2 seconds, logs "slow" and then "fast"

// // wait again
// setTimeout(concurrentPromise, 7000); // same as concurrentStart

// // wait again
// setTimeout(parallel, 10000); // truly parallel: after 1 second, logs "fast", then after 1 more second, "slow"

// // wait again
// setTimeout(parallelPromise, 13000); // same as parallel
