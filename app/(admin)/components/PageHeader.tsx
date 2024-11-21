interface PageHeaderProps {
  title: string;
  description: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description }) => {
  return (
    <div className="px-7 mt-4 flex items-center from-primary via-third font-bold to-secondary bg-clip-text text-transparent space-x-2 bg-gradient-to-r">
      <h1 className="text-xl">{title}</h1>
      <span className="text-xl font-bold">|</span>
      <p className="text-sm">{description}</p>
    </div>
  );
};

export default PageHeader;
