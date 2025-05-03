import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import Svg, { Line } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

const PLUS_BUTTON_SIZE = width/5; // or whatever you're using
const BOTTOM_OFFSET = height / 40.6 + 88;
const LINE_OFFSET_X = 80;
const LINE_OFFSET_Y = 100; // vertical rise to the buttons

const ConnectorLines = () => {
  const centerX = width / 2;
  const plusTopY = height - (BOTTOM_OFFSET) - PLUS_BUTTON_SIZE; // 64 = button height

  return (
    <Svg style={StyleSheet.absoluteFill}>
      {/* Left Line */}
      <Line
        x1={centerX}
        y1={plusTopY}
        x2={centerX - LINE_OFFSET_X}
        y2={plusTopY - LINE_OFFSET_Y}
        stroke="#999"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Right Line */}
      <Line
        x1={centerX}
        y1={plusTopY}
        x2={centerX + LINE_OFFSET_X}
        y2={plusTopY - LINE_OFFSET_Y}
        stroke="#999"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </Svg>
  );
};

export default ConnectorLines;
