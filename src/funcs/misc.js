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

// REPLACE BRACKETS IN STRING WITH ARGUMENTS
function replace(string, args) {
    let i = 0
    return string.replace(/{}/g, () => {
        return typeof args[i] != 'undefined' ? args[i++] : '';
    })
}

export {
    generate_keys,
    sleep,
    replace
}