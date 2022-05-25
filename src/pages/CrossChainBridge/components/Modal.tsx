interface Props {
  isOpen: boolean;
  onRequestClose: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customStyles: any;
  object:
    | {
        [s: string]: unknown;
      }
    | ArrayLike<unknown>;
}

const Modal: React.FC<Props> = ({
  isOpen,
  onRequestClose,
  customStyles,
  object,
}) => {
  return (
    <p>3</p>
    // <Modal
    //   isOpen={modalIsOpen}
    //   // onAfterOpen={afterOpenModal}
    //   onRequestClose={closeModal}
    //   style={customStyles}
    //   contentLabel="Modal"
    //   overlayClassName="Overlay"
    //   preventScroll={false}
    // >
    //   <div className="z-50 flex flex-1 flex-col items-center h-full w-full relative px-6 pt-2 pb-4">
    //     <div className="flex flex-col h-20 w-full text-white font-poppins">
    //       <p className="font-poppins text-md mt-4 ">Switch to</p>
    //     </div>
    //     <ul className="flex flex-col w-full text-white font-poppins justify-center items-center">
    //       {Object.values(object).map((chain, index) => (
    //         <li
    //           key={`${object.name}/${index}`}
    //           className="w-full hover:bg-gray-800 "
    //         >
    //           <button
    //             className={` w-full flex ${
    //               index === 0 || index === Object.values(object).length - 1
    //                 ? undefined
    //                 : 'border-t-2'
    //             } border-opacity-70 border-gray-600 h-16 items-center justify-center text-center`}
    //             onClick={() => updateState({ chain: object.tag })}
    //           >
    //             <img src={object.image} className="w-8 h-8 mr-2" />
    //             <p className="text-xl font-semibold">
    //               {object.tag} ({object.name})
    //             </p>
    //           </button>
    //         </li>
    //       ))}
    //     </ul>
    //   </div>
    // </Modal>
  );
};

export default Modal;
