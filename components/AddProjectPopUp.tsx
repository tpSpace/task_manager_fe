import React from 'react';

interface PopupProps {
  trigger: boolean;
  setTrigger: (state: boolean) => void;
  children: any;
}

const AddProjectPopUp = (props: PopupProps) => {
  return props.trigger ? (
    <div className="fixed top-0 left-0 w-full h-[100vh] flex justify-center items-center backdrop-blur">
      <div className="w-full h-full max-w-[640px] max-h-[480px] bg-black relative rounded-[20px] border-none">
        <button
          className="absolute top-[16px] right-[16px] border-none bg-transparent text-white h-[25px] w-[25px] text-[20px] font-bold -mt-[5px]"
          onClick={() => props.setTrigger(false)}
        >
          X
        </button>
        {props.children}
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default AddProjectPopUp;
