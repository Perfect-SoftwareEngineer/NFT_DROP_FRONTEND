import dynamic from "next/dynamic";

const Model = dynamic(() => import("./modelviewer"), {
  ssr: false,
});

export default Model;
