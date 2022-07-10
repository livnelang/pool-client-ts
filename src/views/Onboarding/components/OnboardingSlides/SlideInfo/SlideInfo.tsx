// import LazyLoad from "react-lazyload";
import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { SlideMetaData } from "../hooks/useSlideStepText";
import "./SlideInfo.css";

interface SlideInfoData {
  slide: SlideMetaData;
}

const SlideInfo = ({ slide }: SlideInfoData) => {
  const [isImageReady, setIsImageReady] = useState<boolean>(false);

  return (
    <div className="SlideInfo">
      <div>
        <LazyLoadImage
          key={`slide-img-${slide.counter}`}
          src={slide.image}
          width={214}
          height={195}
        />
      </div>
      <div className="texts">
        <span className="mainText">{slide.texts.mainText}</span>
        <span className="secondaryText">{slide.texts.secondaryText}</span>
      </div>
    </div>
  );
};

export default SlideInfo;
