// GENERATE NEW WHISPER KEYS
async function generate_keys(shh) {
    return {
        msg: await shh.newSymKey(),
        id: await shh.newKeyPair()
    }
}

// WAIT FOR GIVEN MILLISECONDS
function sleep (seconds) {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000))
}

export {
    generate_keys,
    sleep
}