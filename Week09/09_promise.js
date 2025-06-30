const wait1000 = new Promise((resolve, reject) =>{
    setTimeout(function chancyOperation() {
        let x = (Math.floor(Math.random() * 2) === 0);
        if (x){
            resolve();
        } else {
            reject();
        }
    }, 1000);
});

wait1000.then(() => {
    console.log("Yay!");
}, () => {
    console.log("Boo!")
});
