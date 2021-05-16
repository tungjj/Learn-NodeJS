

// const doPromise = new Promise((resolve, reject)=>{
//     setTimeout(()=>{
//         resolve('Ket qua Promise')
//         // reject('Oh no')
//     }, 500)
// })

// doPromise
//     .then(result=> console.log(result) )
//     .then(send =>  console.log(send))
//     // .then(result => {console.log(result)} )
//     .catch((error)=>{   console.log(error)})

const add = (a, b)=>{
    return new Promise( (resolve, reject)=>{
        setTimeout(()=>{
            resolve(a + b)
        }, 1000 )
    })
}
// const doWork =  ()=>{
//     const sum =  add(1, 2)
//     const sum2 =  add(sum, 4)
//     return sum2
// }

// doWork().then ( (result)=> console.log(result))
//         .catch( (e)     => console.log(e))

const doAsync = async ()=>{
    let sum  = await add(1, 2)
    let sum1 = await add(sum, 3)
    let sum2 = await add(sum1, 6)
    return sum2
}

doAsync().then( (result)=>console.log(result) )
        .catch( (e)     => console.log(e) )

