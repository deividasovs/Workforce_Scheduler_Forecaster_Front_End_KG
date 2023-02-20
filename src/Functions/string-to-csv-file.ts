function generateCSVFileFromString(content: string, filename: string) {
    // Create a blob
    var blob = new Blob([content]);
    var url = URL.createObjectURL(blob);

    // Create a link to download it
    var pom = document.createElement('a');
    pom.href = url;
    pom.setAttribute('download', filename);
    pom.click();
}

export { generateCSVFileFromString }