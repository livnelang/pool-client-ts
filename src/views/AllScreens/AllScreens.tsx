import "./AllScreens.css";
import { ReactElement, useState } from "react";
import InputField from "../../components/forms/InputField/InputField";
import OnboardingSlides from "../Onboarding/components/OnboardingSlides/OnboardingSlides";
import MenuItem from "../../components/MenuItem/MenuItem";
import {
  AiOutlineHome,
  AiOutlineCalendar,
  AiOutlineBarcode,
  AiOutlineUserAdd,
} from "react-icons/ai";
import Menu from "../../components/Menu/Menu";
import AppModal from "../../components/AppModal/AppModal";
import ProfileBar from "../../components/ProfileBar/ProfileBar";

interface ComponentPreview {
  name: string;
  element: ReactElement;
}

const componentsPreview: ComponentPreview[] = [
  {
    name: "Text input Field",
    element: (
      <InputField
        label={"שם"}
        type="text"
        placeholder="הקלד שם"
        error={false}
      />
    ),
  },
  {
    name: "Password Field",
    element: (
      <InputField
        type="password"
        label={"סיסמא"}
        placeholder="הקלד סיסמא"
        error={true}
      />
    ),
  },
  {
    name: "Onboarding Slides",
    element: <OnboardingSlides onLastSlidingClick={() => null} />,
  },
  {
    name: "Menu Item",
    element: <MenuItem text="בית" isActive={false} icon={<AiOutlineHome />} />,
  },
  {
    name: "Active Menu Item",
    element: (
      <MenuItem
        text="בית"
        isActive={true}
        icon={<AiOutlineHome color={`${1 ? "#3BC5CE" : ""}`} />}
      />
    ),
  },
  {
    name: "Menu",
    element: (
      <Menu
        items={[
          { text: "בית", icon: <AiOutlineHome />, isActive: true },
          { text: "הוסף לקוח", icon: <AiOutlineUserAdd />, isActive: false },
          { text: "הוסף הזמנה", icon: <AiOutlineBarcode />, isActive: false },
          { text: "הזמנות", icon: <AiOutlineCalendar />, isActive: false },
        ]}
      />
    ),
  },
  {
    name: "App Modal",
    element: <AppModal
      isOpen={true}
      onCloseModal={() => { }}
      text={"נושא מסוים"}
      secondaryText="מאחורי היער אחת שתיים שלוש" />,
  },
  {
    name: "Profile Bar",
    element: <ProfileBar userName="ארצי בנקר"/>,
  },
];

const AllScreens = () => {
  const [selectedElement, setSelectedElement] =
    useState<ComponentPreview | null>(null);
  const handleComponentPreviewClick = (component: ComponentPreview) => {
    setSelectedElement(component);
  };

  const handleGoBackToElements = () => {
    setSelectedElement(null);
  };

  const renderSelection = () => {
    if (selectedElement === null) {
      return (
        <div className="AllComponents">
          <h4>Components List</h4>
          <ul>
            {componentsPreview.map((component, index) => {
              return (
                <li
                  key={index}
                  onClick={() => handleComponentPreviewClick(component)}
                >
                  {index + 1}. {component.name}
                </li>
              );
            })}
          </ul>
        </div>
      );
    }

    return (
      <div className="selectedElementContainer">
        <div className="topPanel">
          <span onClick={() => handleGoBackToElements()}> {"<"} Back </span>
        </div>
        <div>
          <h3 className="componentName">{selectedElement.name}</h3>
          <div>{selectedElement.element}</div>
        </div>
      </div>
    );
  };

  return <div style={{ width: "100%" }}>{renderSelection()}</div>;
};

export default AllScreens;
