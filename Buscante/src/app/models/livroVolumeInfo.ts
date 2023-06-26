export class LivroVolumeInfo {
    title?: string;
    authors?: string[];
    publisher?: string;
    publishedDate?: string;
    description?: string;
    previewLink?: string;
    thumbnail?: string;


    constructor(item){
    this.title = item.volumeInfo?.title ,
      this.authors = item.volumeInfo?.authors,
      this.publisher = item.volumeInfo?.publisher,
      this.publishedDate = item.volumeInfo?.publishedDate,
      this.description = item.volumeInfo?.description,
      this.previewLink = item.volumeInfo?.previewLink,
      this.thumbnail = item.volumeInfo?.imageLinks?.thumbnail
    }

}

/*
  refatorado

  resultLivros(items: Item[]): Livro[] {

    const livros : Livro[] = []

    debugger
    items.forEach(item => {
      livros.push(
      this.livro = {
        title: item.volumeInfo?.title ,
        authors: item.volumeInfo?.authors,
        publisher: item.volumeInfo?.publisher,
        publishedDate: item.volumeInfo?.publishedDate,
        description: item.volumeInfo?.description,
        previewLink: item.volumeInfo?.previewLink,
        thumbnail: item.volumeInfo?.imageLinks?.thumbnail
    })
  })

    return livros
  }

  */
