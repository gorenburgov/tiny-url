export default (url) => {
    if (
        url.substr(0, 7).toLowerCase() !== 'http://' &&
        url.substr(0, 8).toLowerCase() !== 'https://'
    ) {
        url = 'http://' + url;
    }
    return url;
};
