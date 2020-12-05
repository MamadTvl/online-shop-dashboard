function blobCreationFromURL(inputURI) {

    let binaryVal;

    // mime extension extraction
    const inputMIME = inputURI.split(',')[0].split(':')[1].split(';')[0];

    // Extract remaining part of URL and convert it to binary value
    if (inputURI.split(',')[0].indexOf('base64') >= 0)
        binaryVal = atob(inputURI.split(',')[1]);

    // Decoding of base64 encoded string
    else
        binaryVal = unescape(inputURI.split(',')[1]);

    // Computation of new string in which hexadecimal
    // escape sequences are replaced by the character
    // it represents

    // Store the bytes of the string to a typed array
    let blobArray = [];
    for (let index = 0; index < binaryVal.length; index++) {
        blobArray.push(binaryVal.charCodeAt(index));
    }

    return new Blob([blobArray], {
        type: inputMIME
    });
}

export const createFormData = (name, imageLink) => {
    const blobObject = blobCreationFromURL(imageLink);
    console.log(blobObject)
    const formData = new FormData();
    formData.append(name, blobObject);

    return formData
}