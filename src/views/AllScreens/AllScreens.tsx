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
import AppSelect from "../../components/forms/AppSelect/AppSelect";
import AppButton from "../../components/AppButton/AppButton";

interface ComponentPreview {
  name: string;
  element: ReactElement;
}

const componentsPreview: ComponentPreview[] = [
  {
    name: "App Button",
    element: <AppButton text="ברוך הבא" />,
  },
  {
    name: "App Button Small",
    element: <AppButton text="ברוך הבא" size="small" />,
  },
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
    element: (
      <MenuItem text="בית" isActive={false} path="" icon={<AiOutlineHome />} />
    ),
  },
  {
    name: "Active Menu Item",
    element: (
      <MenuItem
        text="בית"
        isActive={true}
        path=""
        // eslint-disable-next-line no-constant-condition
        icon={<AiOutlineHome color={`${true ? "#3BC5CE" : ""}`} />}
      />
    ),
  },
  {
    name: "Menu",
    element: (
      <Menu
        items={[
          { text: "בית", icon: <AiOutlineHome />, path: "" },
          { text: "הוסף לקוח", icon: <AiOutlineUserAdd />, path: "" },
          { text: "הוסף הזמנה", icon: <AiOutlineBarcode />, path: "" },
          { text: "הזמנות", icon: <AiOutlineCalendar />, path: "" },
        ]}
      />
    ),
  },
  {
    name: "App Modal",
    element: (
      <AppModal
        isOpen={true}
        onCloseModal={() => {}}
        text={"נושא מסוים"}
        secondaryText="מאחורי היער אחת שתיים שלוש"
      />
    ),
  },
  {
    name: "Profile Bar",
    element: <ProfileBar userName="ארצי בנקר" />,
  },
  {
    name: "App Select",
    element: (
      <AppSelect
        label="בחר רכב"
        defaultOption={{ label: "Volvo", value: "Volvo" }}
        onValueChange={() => {}}
        options={[
          { label: "Volvo", value: "Volvo" },
          { label: "BMW", value: "BMW" },
        ]}
      />
    ),
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
