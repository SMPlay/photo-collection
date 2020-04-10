interface image {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export class Album {
  private album: image[];
  private albumContainer: HTMLElement;
  private imagesContainer: HTMLDivElement;
  private albumTitle: HTMLDivElement;
  private leftButton: HTMLButtonElement;
  private rightButton: HTMLButtonElement;
  private currentPage: number;

  constructor(containerSelector: string) {
    this.albumContainer = document.querySelector(containerSelector);
    this.currentPage = 1;
    this.renderImagesContainer();
    this.renderButtons();
    this.renderAlbumTitle();
    const localData = this.getDataInLocalStorage();
    if(localData){
      this.album = localData;
      this.renderImages();
    }else {
      this.queryAlbum(this.currentPage); // this method use renderImages method and setDataInLocalStorage and him set this.album
    }
  }

  private queryAlbum(id: number): void {
    fetch(`https://jsonplaceholder.typicode.com/albums/${id}/photos`)
      .then((response) => response.json())
      .then((response) => {
        this.album = response;
        this.renderImages();
        this.setDataInLocalStorage();
      })
      .catch((error) => console.error(error));
  }

  private renderImages(): void {
    this.imagesContainer.innerHTML = "";
    this.imagesContainer.scrollTop = 0;
    this.album.map((image) => {
      const img: HTMLImageElement = document.createElement("img");
      img.src = image.url;
      img.classList.add("album__image");

      this.imagesContainer.append(img);
    });
  }

  private renderImagesContainer(): void {
    this.imagesContainer = document.createElement("div");
    this.imagesContainer.classList.add("album__image-container");
    this.albumContainer.append(this.imagesContainer);
  }

  private renderAlbumTitle() {
    this.albumTitle = document.createElement("div");
    this.albumTitle.classList.add("album__title");
    this.albumTitle.innerText = "Album Title";

    this.albumContainer.append(this.albumTitle);
  }

  private renderButtons(): void {
    this.leftButton = document.createElement("button");
    this.leftButton.classList.add("album__left-button");
    this.leftButton.textContent = "<";
    this.leftButton.addEventListener("click", () => this.selectNewPage("left"));

    this.rightButton = document.createElement("button");
    this.rightButton.classList.add("album__right-button");
    this.rightButton.addEventListener("click", () =>
      this.selectNewPage("right"),
    );
    this.rightButton.textContent = ">";

    this.albumContainer.append(this.leftButton);
    this.albumContainer.append(this.rightButton);
  }

  private selectNewPage(direction: string): void {
    if (direction === "left") {
      if (this.currentPage === 1) {
        return;
      }
      this.currentPage -= 1;
      this.queryAlbum(this.currentPage);
      this.renderImages();
    } else {
      if (this.currentPage === 100) {
        return;
      }
      this.currentPage += 1;
      this.queryAlbum(this.currentPage);
      this.renderImages();
    }
  }

  private setDataInLocalStorage(): void{
    localStorage.removeItem("albumData");
    localStorage.setItem("albumData",JSON.stringify(this.album));
  }
  private getDataInLocalStorage(): image[]{
    return JSON.parse(localStorage.getItem("albumData"));
  }
}
