import moment from 'moment';

function shorten(hash, size) {
    return hash.slice(0, size) + '...' + hash.slice(-size)
}

function to_date(unix) {
    return moment.unix(unix).format('MM/DD H:mm')
}

export {
    shorten,
    to_date
}