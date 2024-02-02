module.exports = (temp, joke)=>{
    let output = temp.replace(/{%SETUP%}/g,joke.setup)
    output = output.replace(/{%DELIVERY%}/g,joke.delivery)
    output = output.replace(/{%ID%}/g,joke.id)
    return output
}
