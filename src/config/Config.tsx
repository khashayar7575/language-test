export interface IColorConfig {
    config?: any;
  }
  
  export const useGetColor = ({ config }: IColorConfig) => {
    if (config) {
      return null;
    }
  
    return themeColors;
  };
  
  export const themeColors = {
    MainText: "#1D1929",
    Primary: "#151AAE",
    Secondary: "#1D68F9",
    Main3: "#FAA587",
    Main4: "#1FBE38",
    Main5: "#EFEFF2",
    Main6: "#3C3C3C",
    Main7: "#999999",
    Main8: "#A7A7A7",
    Main9: "#333",
    Main10: "#f5f5f5",
    Main11: "#13093D",
    TagBackground: "#555555",
    ExpertiseTagBackground: "#151aae21",
    AreaOfActivityTagBackground: "#F7F7FA",
    AreaOfActivityTagColor: "#555555",
    NeutralGray1: "#1D1929",
    NeutralGray2: "#565656",
    NeutralGray3: "#7E7E7",
    NeutralGray4: "#E6E6E6",
    NeutralGray5: "#f9f9f9",
    NeutralGray6: "#B6B7D8",
    QrCodePrintBG: "#FAFAFE",
    Gradient1: { first: "#151AAE", second: "#3282F5" },
    Gradient2: { first: "#151AAE", second: "#3282F5" },
    Gradient3: {
      first: "#FAA587",
      second: "#FF7D55",
      third: "#E0CEC8",
      fourth: "#D9D9D9",
      fifth: "#FF7D55",
    },
    white: "#fff",
    Transparent: "transparent",
    black: "#000",
  };