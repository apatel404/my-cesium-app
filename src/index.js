// The URL on your server where CesiumJS's static files are hosted.
window.CESIUM_BASE_URL = '/';

import { Cartesian3, Cesium3DTileset, createOsmBuildingsAsync, Ion, Math as CesiumMath, Terrain, Viewer, ArcGisMapService, ImageryLayer, ArcGisMapServerImageryProvider, ArcGisBaseMapType } from 'cesium';
import "cesium/Build/Cesium/Widgets/widgets.css";
import "../src/css/main.css"

Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhMDliM2E5OS1jMzkxLTQ5OTQtYWQzOC04ZDU4NWZjNDY1NTIiLCJpZCI6MTY0OTYyLCJpYXQiOjE2OTQwNTE0MDB9.xEzQNmHLfaS09dJyfxcxz_l6tSZK-96nhz4O2Qh9MQI';

const apiKey = "AAPK479c7f2ced464b8782ea8413ab31907dteuY4iWFyqetpy-zYo1_mjfp-iP4_Fe5mLdinsn-tnC4wQHhZvQIG0NJ4jv_eYiu";

// Task 4: Add a 3rd party datasource
ArcGisMapService.defaultAccessToken = apiKey;

// Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
const viewer = new Viewer('cesiumContainer', {
  terrain: Terrain.fromWorldTerrain({
    requestWaterMask: true,
    requestVertexNormals: true
  }),
  baseLayer: ImageryLayer.fromProviderAsync(
    ArcGisMapServerImageryProvider.fromBasemapType(ArcGisBaseMapType.SATELLITE,{
            enablePickFeatures:false
})),
});    

// Fly the camera to Task 2, custom 3D Model, i.e FiDi New York City
viewer.camera.flyTo({
  destination: Cartesian3.fromDegrees(-74.00906, 40.70323, 700),
  orientation: {
    heading: CesiumMath.toRadians(0.0),
    pitch: CesiumMath.toRadians(-30.0),
  }
});

// Add Cesium OSM Buildings, a global 3D buildings layer.
const buildingTileset = await createOsmBuildingsAsync();
viewer.scene.primitives.add(buildingTileset); 

// Task 2:  Add a global Curated dataset from Cesium Ion, The Globe
viewer.scene.primitives.add(
  await Cesium3DTileset.fromIonAssetId(57588)
);


// Task 3: Upload custom 3D Model to Cesium Ion. This is new york city model manually added to ION
// This model is intentionally a little offset from the Global 3D dataset to prove that both are getting loaded simultaniously
viewer.scene.primitives.add(
  await Cesium3DTileset.fromIonAssetId(2264354)
);

