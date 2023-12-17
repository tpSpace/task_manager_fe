import React from 'react';

interface PopupProps{
  trigger: boolean;
  setTrigger: (state:boolean)=>void;
  children: any;
}

const AddProjectPopUp = (props:PopupProps) => {
  return (props.trigger)? (
    <div>

    </div>
  ): (<div></div>);
}