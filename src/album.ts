

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
  public localStorageKey: string;

  constructor(containerSelector: string) {
    this.localStorageKey = "albumData";
    this.albumContainer = document.querySelector(containerSelector);
    this.currentPage = 1;
    this.renderImagesContainer();
    this.renderButtons();
    this.renderAlbumTitle();
    const localData = this.getDataFromLocalStorage(this.localStorageKey);

    if (localData !== null) {
      this.album = localData;
      this.currentPage = this.album[0].albumId;
      this.renderImages();
    } else {
      this.fetchAlbum(this.currentPage); // this method use renderImages method and setDataInLocalStorage and him set this.album
    }
  }

  private fetchAlbum(id: number): void {
    fetch(`https://jsonplaceholder.typicode.com/albums/${id}/photos`)
      .then((response) => response.json())
      .then((album) => {
        this.album = album;
        this.setDataToLocalStorage(this.localStorageKey,this.album);
        this.renderImages();
        this.disableButton(false, this.previousButton, this.nextButton);
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
      this.changeImageInDocument(
        Array.from(document.querySelectorAll(".album__image")),
        this.album,
      );
    } else {
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

  private changeImageInDocument(albumImages: HTMLImageElement[], albumData: Image[]): void {
    albumImages.map((image: HTMLImageElement, index: number) => {
      image.src = albumData[index].url;
    });
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
    this.previousButton.addEventListener("click", () => {
      this.currentPage = this.selectNewPage("previous", this.currentPage);
      this.fetchAlbum(this.currentPage);
    });

    this.nextButton = document.createElement("button");
    this.nextButton.classList.add("album__right-button");
    this.nextButton.addEventListener("click", () => {
      this.currentPage = this.selectNewPage("next", this.currentPage);
      this.fetchAlbum(this.currentPage);
    });
    this.nextButton.textContent = ">";

    this.albumContainer.append(this.previousButton);
    this.albumContainer.append(this.nextButton);
  }

  public disableButton(isDisable: boolean, previousButton: HTMLButtonElement, nextButton: HTMLButtonElement,): void {
    previousButton.disabled = isDisable;
    nextButton.disabled = isDisable;
  }

  public selectNewPage(direction: string, currentPage: number): number {
    this.disableButton(true, this.previousButton, this.nextButton);
    this.scrollToTop();

    if (direction === "previous") {
      if (currentPage === 1) {
        return 100;
      }
      return currentPage -= 1;
    } else {
      if (currentPage === 100) {
        return 1;
      }
      return currentPage += 1;
    }
  }

  public setDataToLocalStorage(key: string, data: Image[]): void {
    if(localStorage.getItem(key)){
      localStorage.removeItem(key);
    }
    localStorage.setItem(key, JSON.stringify(data));
  }

  public getDataFromLocalStorage(key: string): Image[] {
    return JSON.parse(localStorage.getItem(key)) || null;
  }

  private fullscreenImage(img: Image): void {
    this.disableButton(true,this.previousButton,this.nextButton);
    const image: HTMLImageElement = document.createElement("img");
    image.src = img.url;
    image.classList.add("full-screen");
    image.addEventListener("click", () => {
      this.disableButton(false,this.previousButton,this.nextButton);
      image.remove();
    });
    this.albumContainer.append(image);
  }
}
