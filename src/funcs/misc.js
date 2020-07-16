async function generate_keys(shh) {
    return {
        msg: await shh.newSymKey(),
        id: await shh.newKeyPair()
    }
}

export {
    generate_keys
}