import { Base64 as compression } from 'js-base64';
import hashing from 'sha256';

// BASE64 ENCODE STRING
function encode(string) {

    // PARSE AS OBJECT
    const parsed = JSON.parse(string)

    // MINIFY TO STRING
    const stringified = JSON.stringify(parsed)

    // COMPRESS & RETURN
    return compression.encode(stringified)
}

// BASE64 DECODE STRING
function decode(string) {

    // ATTEMPT TO DECODE & PARSE AS JSON OBJECT
    try {
        const decoded = compression.decode(string);
        return JSON.parse(decoded);

    // IF IT FAILS, RETURN EMPTY OBJECT
    } catch {
        return {}
    }
}

// SHA256 HASH A OBJECT
function hash(string) {

    // PARSE AS OBJECT
    const parsed_id = JSON.parse(string)

    // MINIBY TO STRING, SETTINGS MIMIC PYTHON MIDDLEWARE
    const stringified_id = JSON.stringify(parsed_id, null, 2)

    // HASH & RETURN
    return hashing(stringified_id)
}

function exists(string) {
    if (string === '0x0000000000000000000000000000000000000000') {
        return false;
    }

    return true;
}

export {
    encode,
    decode,
    hash,
    exists
}