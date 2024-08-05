"use client";

import DescriptionSection from "./DescriptionSection";
import CommentSection from "./CommentSection";
import SideSection from "./SideSection";

const Task = ({ task }: { task: ITask }) => {

  return (
    <div className="w-full min-h-screen mt-24 flex justify-center">
      <div className="w-4/5 flex flex-col gap-4">     
        <div className="w-full flex flex-col md:flex-row">
          <DescriptionSection task={task}/>
          <SideSection task={task} />
        </div> 
        <CommentSection task={task}/></div>
    </div>
  );
};


export default Task;
