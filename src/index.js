// The URL on your server where CesiumJS's static files are hosted.
window.CESIUM_BASE_URL = '/';

import { Cartesian3, Cesium3DTileset, createOsmBuildingsAsync, Ion, Math as CesiumMath, Terrain, Viewer } from 'cesium';
import "cesium/Build/Cesium/Widgets/widgets.css";
import "../src/css/main.css"

// Your access token can be found at: https://ion.cesium.com/tokens.
// Replace `your_access_token` with your Cesium ion access token.

Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhMDliM2E5OS1jMzkxLTQ5OTQtYWQzOC04ZDU4NWZjNDY1NTIiLCJpZCI6MTY0OTYyLCJpYXQiOjE2OTQwNTE0MDB9.xEzQNmHLfaS09dJyfxcxz_l6tSZK-96nhz4O2Qh9MQI';


// Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
const viewer = new Viewer('cesiumContainer', {
  terrain: Terrain.fromWorldTerrain(),
});    

// Fly the camera to San Francisco at the given longitude, latitude, and height.
viewer.camera.flyTo({
  destination: Cartesian3.fromDegrees(-122.4175, 37.655, 400),
  orientation: {
    heading: CesiumMath.toRadians(0.0),
    pitch: CesiumMath.toRadians(-15.0),
  }
});

// Add Cesium OSM Buildings, a global 3D buildings layer.
const buildingTileset = await createOsmBuildingsAsync();
viewer.scene.primitives.add(buildingTileset); 

viewer.scene.primitives.add(
  await Cesium3DTileset.fromIonAssetId(57588)
);

//my new york city model manually added to ION
viewer.scene.primitives.add(
  await Cesium3DTileset.fromIonAssetId(2264354)
);