import { Dimensions } from "react-native";
import { thresholds } from "../components/molecules/display/SpendingCard";

export const numToMonth = (num: number) => {
  switch (num) {
    case 0:
      return "January";
    case 1:
      return "February";
    case 2:
      return "March";
    case 3:
      return "April";
    case 4:
      return "May";
    case 5:
      return "June";
    case 6:
      return "July";
    case 7:
      return "August";
    case 8:
      return "September";
    case 9:
      return "October";
    case 10:
      return "November";
    case 11:
      return "December";
  }
}

export const numToDay = (num: number) => {
  switch (num) {
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursdat";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    case 0:
      return "Sunday";
  }
}

export const getThresholdValue = (value: number, caution: number, danger: number) => {
  let threshold: thresholds = "good";
  if (value >= danger) {
    threshold = "danger";
  } else if (value >= caution) {
    threshold = "caution";
  }

  return threshold
}

export const getWindow = () => {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  return { width, height };
}