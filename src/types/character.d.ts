declare interface Character {
  id: number;
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  comics: {
    available: number;
    items: Array<{
      name: string;
    }>;
  };
}

declare interface Comic {
  id: number;
  title: string;
  dates: Array<{
    type: string;
    date: string;
  }>;
}
