class FileReader{

    static async read(file) {
        var text = fetch(file)
        .then(response => response.text())
        .then(text => text);
        return await text;
      }

}