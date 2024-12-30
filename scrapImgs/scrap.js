//telecharger des image sur un site

function get_links() {
    let elements = document.querySelectorAll('a[data-testid="vector-illustration"] script')
    let links = []
    elements.forEach(element=>{
        links.push(JSON.parse(element.textContent).contentUrl)
    })
    return links
}

const imageLinks = get_links()

const downloadImage = async (url, filename) => {
    await fetch(url)
        .then(response => response.blob())
        .then(blob => {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })
        .catch(console.error);
};


function get_manuel(last_imgs) {
    for (let i = last_imgs ; i < last_imgs + 10 ; i++) {
        const filename = imageLinks[i].split('/')[imageLinks[i].split('/').length - 1];
        downloadImage(imageLinks[i], filename);
    }   
}

function get_all() {
    // Qlq erreur
    imageLinks.forEach((url) => {
        const filename = url.split('/')[url.split('/').length - 1]; // Renomme les fichiers avec un numéro
        downloadImage(url, filename);
    });
}