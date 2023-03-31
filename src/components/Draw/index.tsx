/* eslint-disable react-native/no-inline-styles */
import {Canvas, Circle, ImageSVG, Path, Skia} from '@shopify/react-native-skia';
import React, {useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

interface IPath {
  segments: String[];
  color?: string;
}
export const Draw = () => {
  const [paths, setPaths] = useState<IPath[]>([]);

  const pan = Gesture.Pan()
    .onStart(g => {
      // Start gesture looks like this
      // {
      //   "absoluteX": 178,
      //   "absoluteY": 484,
      //   "handlerTag": 2,
      //   "numberOfPointers": 1,
      //   "oldState": 2,
      //   "state": 4,
      //   "target": 115,
      //   "translationX": -4.3333282470703125,
      //   "translationY": 0,
      //   "velocityX": -172.0102558333448,
      //   "velocityY": 0,
      //   "x": 178,
      //   "y": 484,
      // }
      const newPaths = [...paths];
      newPaths[paths.length] = {
        segments: [],
        color: '#06d6a0',
      };
      newPaths[paths.length].segments.push(`M ${g.x} ${g.y}`);
      setPaths(newPaths);
    })
    .onUpdate(g => {
      // Update gesture looks like
      // {
      //   "absoluteX": 229,
      //   "absoluteY": 400.3333282470703,
      //   "handlerTag": 2,
      //   "numberOfPointers": 1,
      //   "state": 4,
      //   "target": 115,
      //   "translationX": 0,
      //   "translationY": 1.6666717529296875,
      //   "velocityX": 0,
      //   "velocityY": 24.111687246989227,
      //   "x": 229,
      //   "y": 400.3333282470703,
      // }
      const index = paths.length - 1;
      const newPaths = [...paths];
      if (newPaths?.[index]?.segments) {
        newPaths[index].segments.push(`L ${g.x} ${g.y}`);
        setPaths(newPaths);
      }
    })
    .minDistance(1);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <GestureDetector gesture={pan}>
        <View style={{flex: 1, backgroundColor: 'black'}}>
          <Canvas style={{flex: 8}}>
            {paths.map((p, index) => (
              <Path
                key={index}
                path={p.segments.join(' ')}
                strokeWidth={5}
                style="stroke"
                color={p.color}
              />
            ))}
          </Canvas>
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export const Lines = () => {
  const path = Skia.Path.Make();
  path.moveTo(300, 200);
  path.lineTo(200, 300);

  return (
    <>
      <View style={{flex: 1}}>
        <Canvas style={{flex: 1, backgroundColor: 'black'}}>
          {/* Build a path using the classic SVG path notation */}
          <Path
            path={'M 100 100 L 200 300'}
            strokeWidth={2}
            color="white"
            style="stroke"
          />

          {/* Build a path using the Path object API (see above) */}
          <Path path={path} strokeWidth={2} color="blue" style="stroke" />
        </Canvas>
      </View>
    </>
  );
};

export const Circles = () => {
  return (
    <>
      <View style={{flex: 1}}>
        <Canvas style={{flex: 1, backgroundColor: 'black'}}>
          <Circle cx={200} cy={400} color="white" r={100} />
          <Circle cx={100} cy={200} color="white" r={25} />
          <Circle cx={300} cy={600} color="white" r={50} />
        </Canvas>
      </View>
    </>
  );
};

export const SvgImages = () => {
  const svgStar =
    '<svg class="star-svg" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/2000/xlink" viewBox="0 0 200 200"><polygon id="star" fill="#fcbf49" points="100,0,129.38926261462365,59.54915028125263,195.10565162951536,69.09830056250526,147.55282581475768,115.45084971874736,158.77852522924732,180.90169943749473,100,150,41.2214747707527,180.90169943749476,52.447174185242325,115.45084971874738,4.894348370484636,69.09830056250527,70.61073738537632,59.549150281252636"></polygon></svg>';
  const svgImage = Skia.SVG.MakeFromString(svgStar);

  return (
    <View style={{flex: 1}}>
      <Canvas style={{flex: 1, backgroundColor: 'black'}}>
        {!!svgImage && (
          <>
            <ImageSVG width={200} height={200} x={100} y={100} svg={svgImage} />
            <ImageSVG width={100} height={100} x={50} y={300} svg={svgImage} />
            <ImageSVG width={300} height={300} x={100} y={400} svg={svgImage} />
          </>
        )}
      </Canvas>
    </View>
  );
};
