interface SubjectType {
  id: number;
  name: string;
  grade_id: number;
}

interface SubjectProps {
  subjects: SubjectType[];
}

export default function Subject({ subjects }: { subjects: SubjectType[] }) {
  return (
    <div className="p-4">
      <h1 className="text-sm mb-3">Subjects</h1>
      <ul className="space-y-2  text-xs">
        {subjects && subjects.length > 0 ? (
          subjects.map((subject) => (
            <li
              key={subject.id}
              className="p-2 bg-white dark:bg-zinc-800 rounded shadow hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
            >
              {subject.name}
            </li>
          ))
        ) : (
          <li>No subjects available</li>
        )}
      </ul>
    </div>
  );
}
