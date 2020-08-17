// ADD THOUSAND SEPARATOR TO LARGE NUMBER
function separator(string) {
    return string.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, " ");
}

// FILTER OUT NULLIFIED HEXES
function filter_zeros(list) {
    return list.filter(value => value !== '0x0000000000000000000000000000000000000000');
}

export {
    separator,
    filter_zeros
}