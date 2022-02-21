const Categories: React.FC = () => {
  return (
    <div className="w-full flex space-x-2 mb-4">
      <div className="flex border-[1px] flex-[0.25] rounded-lg border-blue-600 h-8 items-center justify-center text-[0.70rem] xs:text-[0.60rem] font-poppins text-blue-600 border-l-4">
        Foundation
      </div>
      <div className="flex border-[1px] flex-[0.25] rounded-lg border-green-600 h-8 items-center justify-center text-[0.70rem] xs:text-[0.60rem] font-poppins text-green-600 border-l-4">
        Global
      </div>
      <div className="flex border-[1px] flex-[0.25] rounded-lg border-purple-500 h-8 items-center justify-center text-[0.70rem] xs:text-[0.60rem] font-poppins text-purple-500 border-l-4">
        Ecosystem
      </div>
      <div className="flex border-[1px] flex-[0.25] rounded-lg border-yellow-500 h-8 items-center justify-center text-[0.70rem] xs:text-[0.60rem] font-poppins text-yellow-500 border-l-4">
        Exploratory
      </div>
    </div>
  );
};

export default Categories;
