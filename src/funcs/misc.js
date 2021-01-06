// GENERATE NEW WHISPER KEYS
async function generate_keys(shh) {
    return {
        msg: await shh.newSymKey(),
        id: await shh.newKeyPair()
    }
}

// WAIT FOR GIVEN MILLISECONDS
function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time))
}

export {
    generate_keys,
    sleep
}