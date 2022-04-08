import React from "react";
import Svg, { Circle, Defs, G, Image, Path, Pattern, Rect, Line, ClipPath } from "react-native-svg";

type IconProps = {
  width: number,
  height: number,
}

export const ArrowDownIcon = ({ width, height }: IconProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 15 15">
      <G id="Group_13064" data-name="Group 13064" transform="translate(-29 23) rotate(-90)">
        <Rect id="Rectangle_110" data-name="Rectangle 110" width="15" height="15" transform="translate(8 29)" fill="#fff" opacity="0" />
        <Path id="Icon_ionic-ios-arrow-back" data-name="Icon ionic-ios-arrow-back" d="M13.621,13.068l5.2-5.2a.983.983,0,1,0-1.392-1.388l-5.895,5.891a.981.981,0,0,0-.029,1.355l5.92,5.932a.983.983,0,1,0,1.392-1.388Z" transform="translate(0.083 23.806)" fill="#818181" />
      </G>
    </Svg>
  )
}

export const HomeIcon = ({ width, height }: IconProps) => {
  return (
    <Svg id="Outline" viewBox="0 0 24 24" width={width} height={height}>
      <Path d="M23.121,9.069,15.536,1.483a5.008,5.008,0,0,0-7.072,0L.879,9.069A2.978,2.978,0,0,0,0,11.19v9.817a3,3,0,0,0,3,3H21a3,3,0,0,0,3-3V11.19A2.978,2.978,0,0,0,23.121,9.069ZM15,22.007H9V18.073a3,3,0,0,1,6,0Zm7-1a1,1,0,0,1-1,1H17V18.073a5,5,0,0,0-10,0v3.934H3a1,1,0,0,1-1-1V11.19a1.008,1.008,0,0,1,.293-.707L9.878,2.9a3.008,3.008,0,0,1,4.244,0l7.585,7.586A1.008,1.008,0,0,1,22,11.19Z" />
    </Svg>
  )
}

export const ProfileIcon = ({ width, height }: IconProps) => {
  return (
    <Svg id="Outline" viewBox="0 0 24 24" width={width} height={height}>
      <Path d="M12,12A6,6,0,1,0,6,6,6.006,6.006,0,0,0,12,12ZM12,2A4,4,0,1,1,8,6,4,4,0,0,1,12,2Z" />
      <Path d="M12,14a9.01,9.01,0,0,0-9,9,1,1,0,0,0,2,0,7,7,0,0,1,14,0,1,1,0,0,0,2,0A9.01,9.01,0,0,0,12,14Z" />
    </Svg>
  )
}

export const CalendarIcon = ({ width, height }: IconProps) => {
  return (
    <Svg id="Outline" viewBox="0 0 24 24" width={width} height={height}>
      <Path d="M19,2H18V1a1,1,0,0,0-2,0V2H8V1A1,1,0,0,0,6,1V2H5A5.006,5.006,0,0,0,0,7V19a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V7A5.006,5.006,0,0,0,19,2ZM2,7A3,3,0,0,1,5,4H19a3,3,0,0,1,3,3V8H2ZM19,22H5a3,3,0,0,1-3-3V10H22v9A3,3,0,0,1,19,22Z" />
      <Circle cx="12" cy="15" r="1.5" />
      <Circle cx="7" cy="15" r="1.5" />
      <Circle cx="17" cy="15" r="1.5" />
    </Svg>
  )
}

export const AngleRightIcon = ({ width, height }: IconProps) => {
  return (
    <Svg id="Bold" viewBox="0 0 24 24" width={width} height={height}>
      <Path d="M15.75,9.525,11.164,4.939A1.5,1.5,0,0,0,9.043,7.061l4.586,4.585a.5.5,0,0,1,0,.708L9.043,16.939a1.5,1.5,0,0,0,2.121,2.122l4.586-4.586A3.505,3.505,0,0,0,15.75,9.525Z" />
    </Svg>
  )
}

export const ArrowRight = ({ width, height }: IconProps) => {
  return (
    <Svg id="Outline" viewBox="0 0 24 24" width={width} height={height}>
      <Path d="M23.12,9.91,19.25,6a1,1,0,0,0-1.42,0h0a1,1,0,0,0,0,1.41L21.39,11H1a1,1,0,0,0-1,1H0a1,1,0,0,0,1,1H21.45l-3.62,3.61a1,1,0,0,0,0,1.42h0a1,1,0,0,0,1.42,0l3.87-3.88A3,3,0,0,0,23.12,9.91Z" />
    </Svg>
  )
}