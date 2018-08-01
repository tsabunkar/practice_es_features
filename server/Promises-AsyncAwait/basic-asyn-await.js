//async -> we need to declare in the function declartaion itself as async Keyword
//await -> this can be used inside the async function
//async-await is not replacement for Promises but it is enhacement for Promises
const myAsyncFunc = async () => {
    return 'Tejas'
}

console.log(myAsyncFunc()); // Async function will always return promise i.e - Promise { 'Tejas' }

// So, above myAsyncFunc is eqvialent to ->

const myAsyncFunc2  = () => {
    return new Promise((resolve,reject) => {
        resolve('Tejas')
    })
}

console.log(myAsyncFunc2());

myAsyncFunc().then((result) => {
    console.log(result);//Tejas
}).catch((err) => {
    
});

//------------------------------------------------------------------------------------------------------

//If we want to reject the promise ie- 

const myAsyncFunc3  = () => {
    return new Promise((resolve,reject) => {
        reject('This is an Error')
    })
}

// console.log(myAsyncFunc3());

//Similary If we want to reject the promise in async , just throw new Error()

const myAsyncFunc4  = async () => {
   throw new Error('This is an Error')
}

// console.log(myAsyncFunc4());


//--------------------------------------------------------------------------------------------------------
