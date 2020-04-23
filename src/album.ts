interface Image {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export class Album {
  private album: Image[];
  private albumContainer: HTMLElement;
  private imagesContainer: HTMLDivElement;
  private albumTitle: HTMLDivElement;
  private previousButton: HTMLButtonElement;
  private nextButton: HTMLButtonElement;
  private currentPage: number;

  constructor(containerSelector: string) {
    this.albumContainer = document.querySelector(containerSelector);
    this.currentPage = 1;
    this.renderImagesContainer();
    this.renderButtons();
    this.renderAlbumTitle();
    const localData = this.getDataFromLocalStorage();

    if (localData) {
      this.album = localData;
      this.currentPage = this.album[0].albumId;
      this.renderImages();
    } else {
      this.fetchAlbum(this.currentPage); // this method use renderImages method and setDataInLocalStorage and him set this.album
      this.renderImages();
    }
  }

  private fetchAlbum(id: number): void {
    fetch(`https://jsonplaceholder.typicode.com/albums/${id}/photos`)
      .then((response) => response.json())
      .then((album) => {
        this.album = album;
        this.setDataToLocalStorage();
        this.renderImages();
        this.disableButton(false);
      })
      .catch((error) => console.error(error));
  }

  private scrollToTop(): void {
    this.imagesContainer.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  private renderImages(): void {
    if (document.querySelector(".album__image")) {
      this.changeImageInDocument(this.album);
    }else{
      this.album.map((image) => {
        const img: HTMLImageElement = document.createElement("img");
        img.src = image.url;
        img.title = image.title;
        img.addEventListener("click", () => this.fullscreenImage(image));
        img.classList.add("album__image");

        this.imagesContainer.append(img);
      });
    }
  }

  private changeImageInDocument(album: Image[]): void {
    Array.from(document.querySelectorAll(".album__image")).map(
      (image: HTMLImageElement, index: number) => {
        image.src = album[index].url;
      },
    );
  }

  private renderImagesContainer(): void {
    this.imagesContainer = document.createElement("div");
    this.imagesContainer.classList.add("album__image-container");
    this.albumContainer.append(this.imagesContainer);
  }

  private renderAlbumTitle(): void {
    this.albumTitle = document.createElement("div");
    this.albumTitle.classList.add("album__title");
    this.albumTitle.innerText = "Album Title";

    this.albumContainer.append(this.albumTitle);
  }

  private renderButtons(): void {
    this.previousButton = document.createElement("button");
    this.previousButton.classList.add("album__left-button");
    this.previousButton.textContent = "<";
    this.previousButton.addEventListener("click", () => this.selectNewPage("previous"));

    this.nextButton = document.createElement("button");
    this.nextButton.classList.add("album__right-button");
    this.nextButton.addEventListener("click", () =>
      this.selectNewPage("next"),
    );
    this.nextButton.textContent = ">";

    this.albumContainer.append(this.previousButton);
    this.albumContainer.append(this.nextButton);
  }

  private disableButton(isDisable: boolean): void {
    this.previousButton.disabled = isDisable;
    this.nextButton.disabled = isDisable;
  }


  private selectNewPage(direction: string): void {
    this.disableButton(true);
    this.scrollToTop();
    if (direction === "previous") {
      if (this.currentPage === 1) {
        return;
      }
      this.currentPage -= 1;
      this.fetchAlbum(this.currentPage);
    } else {
      if (this.currentPage === 100) {
        return;
      }
      this.currentPage += 1;
      this.fetchAlbum(this.currentPage);
    }
  }

  private setDataToLocalStorage(): void {
    localStorage.removeItem("albumData");
    localStorage.setItem("albumData", JSON.stringify(this.album));
  }

  private getDataFromLocalStorage(): Image[] {
    return JSON.parse(localStorage.getItem("albumData"));
  }

  private fullscreenImage(img: Image): void {
    this.previousButton.disabled = true;
    this.nextButton.disabled = true;
    const image: HTMLImageElement = document.createElement("img");
    image.src = img.url;
    image.classList.add("full-screen");
    image.addEventListener("click", () => {
      this.previousButton.disabled = false;
      this.nextButton.disabled = false;
      image.remove();
    });
    this.albumContainer.append(image);
  }
}
