"use client";

import DescriptionSection from "./DescriptionSection";
import CommentSection from "./CommentSection";
import SideSection from "./SideSection";

const Task = ({ task }: { task: ITask }) => {

  return (
    <div className="w-full min-h-screen mt-24 flex justify-center">
      <div className="w-11/12 flex flex-col gap-12">     
        <div className="w-full flex flex-col md:flex-row mt-12 gap-4">
          <DescriptionSection task={task}/>
          <SideSection task={task} />
        </div> 
        <CommentSection task={task}/></div>
    </div>
  );
};


export default Task;
