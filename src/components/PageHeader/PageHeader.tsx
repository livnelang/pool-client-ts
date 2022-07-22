import "./PageHeader.scss";

interface PageHeaderProps {
  text: string;
}

const PageHeader = ({ text }: PageHeaderProps) => {
  return <div className="PageHeader">{text}</div>;
};

export default PageHeader;
