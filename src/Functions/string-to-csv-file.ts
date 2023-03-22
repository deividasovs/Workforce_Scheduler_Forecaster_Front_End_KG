function generateCSVFileFromString(content: string, filename: string) {
    var blob = new Blob([content]);
    var url = URL.createObjectURL(blob);

    var pom = document.createElement('a');
    pom.href = url;
    pom.setAttribute('download', filename);
    pom.click();
}


export { generateCSVFileFromString }