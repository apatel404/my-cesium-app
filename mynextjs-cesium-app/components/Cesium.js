import { 
  Cartesian3, 
  Color, 
  Ion, 
  Terrain, 
  Math as CesiumMath, 
  IonResource
} from 'cesium'
import { useState } from 'react';
import { CameraFlyTo, Entity, Viewer, Cesium3DTileset} from 'resium'




export default function Cesium() {
  Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhMDliM2E5OS1jMzkxLTQ5OTQtYWQzOC04ZDU4NWZjNDY1NTIiLCJpZCI6MTY0OTYyLCJpYXQiOjE2OTQwNTE0MDB9.xEzQNmHLfaS09dJyfxcxz_l6tSZK-96nhz4O2Qh9MQI';
  // console.log(new MS.Symbol('SFG-UCI----D' , {size:35}));
  // const terrainProvider = createWorldTerrainAsync();
  //Adding 3D terrain
  const terrainProvider = Terrain.fromWorldTerrain({
    requestWaterMask: false,
    requestVertexNormals: true
  });
  var sym = new ms.Symbol('SFG-UCI----D',{size:35});
  
  // const position = Cartesian3.fromDegrees(-74.0707383, 40.7117244, 100);
  
    
    let viewer; // This will be raw Cesium's Viewer object.
  
    const handleReady = tileset => {
      if (viewer) {
        viewer.zoomTo(tileset);
      }
    };
  const [flag, setFlag] = useState(false);
  return (
    <Viewer full terrain={terrainProvider} ref={e => {
      viewer = e && e.cesiumElement;
    }} >

      {/* The world */}
      <Cesium3DTileset url={IonResource.fromAssetId(96188)}/>
      
      {/* //DC */}
      <Cesium3DTileset url={IonResource.fromAssetId(57588)} onReady={handleReady}/>
      
      {/* //New York, This asset is purposlly offset so it can be seen overlaid with The World */}
      <Cesium3DTileset url={IonResource.fromAssetId(2264354)} onReady={handleReady}/>
      
      {/* // Fly to Manhattan -74.00952, 40.70549 */}
      <CameraFlyTo
        destination={Cartesian3.fromDegrees(-74.00952, 40.70549, 1000)}
        orientation={{pitch: CesiumMath.toRadians(-40.0)}}
      />
      <Entity
        name="Tokyo"
        position={Cartesian3.fromDegrees(139.767052, 35.681167, 100)}
        point={{ pixelSize: 20, color: Color.WHITE }}
        description="hoge"
        onClick={() => setFlag(f => !f)}
        billboard = { {
          // image : sym.getMarker().asCanvas(), //Get the canvas for the billboard
          pixelOffset : new Cesium.Cartesian2(-sym.markerAnchor.x, -sym.markerAnchor.y), // Symbol offset
          eyeOffset : new Cesium.Cartesian3(0.0, 0.0, 0.0), // default
          horizontalOrigin : Cesium.HorizontalOrigin.LEFT, // default
          verticalOrigin : Cesium.VerticalOrigin.TOP
        }}
      />
      {flag && (
        <Entity
          position={Cartesian3.fromDegrees(139.767052, 34.681167, 100)}
          point={{ pixelSize: 20, color: Color.RED }}
        />
      )}
    </Viewer>
  )
}