declare module "dragonball" {
  export interface DragonBallCharacter {
    id: number;
    name: string;
    ki: string;
    maxKi: string;
    race: string;
    gender: "Male" | "Female" | "Unknown";
    description: string;
    image: string;
    affiliation: string;
    comics: {
      available: number;
      items: Array<{
        name: string;
        date?: string;
      }>;
    };
    originPlanet?: {
      id: number;
      name: string;
      isDestroyed: boolean;
      description: string;
      image: string;
    };
    transformations: Array<{
      id: number;
      name: string;
      image: string;
      ki: string;
    }>;
  }
}
