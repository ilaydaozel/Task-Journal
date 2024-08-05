"use client";

const DescriptionSection = ({ task }: { task: ITask }) => {
  return (
    <section className="md:w-3/5 w-full mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-text1-600 mb-4">{task?.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="mb-4">
            <div className="mt-2 text-gray-700">
              <strong>Description:</strong> {task?.description || "No description available."}
              <div className="mt-2 text-gray-700">
              <strong>Acceptance Criteria:</strong> {task?.acceptanceCriteria || "No acceptance criteria provided."}
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


export default DescriptionSection;
