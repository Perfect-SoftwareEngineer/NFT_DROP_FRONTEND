import "@google/model-viewer";

const Model = ({ src }) => (
  <div id="card">
    <model-viewer
      // src="https://newkino-client.s3.amazonaws.com/under_armour/assets/SANDBOX_CURRY.gltf"
      src={src}
      ios-src=""
      poster=""
      alt="A 3D model of an astronaut"
      shadow-intensity="1"
      camera-controls
      auto-rotate
      ar
    ></model-viewer>
  </div>
);

export default Model;
