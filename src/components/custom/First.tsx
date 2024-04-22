import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const First = () => {
  //   const columns = [
  //     {
  //       name: "Sr. No.",
  //       selector: (row) => row["srNo"],
  //       width: "10%",
  //     },
  //     {
  //       name: "Statement",
  //       selector: (row) => row["statement"],
  //       width: "60%",
  //       cell: (row) => (
  //         <div style={{ whiteSpace: "normal", wordBreak: "break-word" }}>
  //           {row.statement}
  //         </div>
  //       ),
  //     },
  //     {
  //       name: "Answer",
  //       selector: (row) => row["answer"],
  //       width: "30%",
  //     },
  //   ];

  type ansType = {
    id: number;
    value: string;
    label: string;
  };
  type dataType = {
    srno: number;
    statement: string;
    answer: ansType[];
  };

  type version = {
    id: number;
    title: string;
    questions: dataType[];
  };

  const Data: version[] = [
    {
      id: 1,
      title: "Problem statement",
      questions: [
        {
          srno: 1,
          statement:
            "Is the statement short and concise (10-20 words maximum)?",
          answer: [
            {
              id: 1,
              value: "yes",
              label: "Yes",
            },
            {
              id: 2,
              value: "no",
              label: "No",
            },
          ],
        },
        {
          srno: 2,
          statement:
            "Does the statement give a clear indication about what your project will accomplish?",
          answer: [
            {
              id: 1,
              value: "yes",
              label: "Yes",
            },
            {
              id: 2,
              value: "no",
              label: "No",
            },
          ],
        },
        {
          srno: 3,
          statement:
            "Can a person who is not familiar with the project understand the scope of the project by reading the project problem statement?",
          answer: [
            {
              id: 1,
              value: "yes",
              label: "Yes",
            },
            {
              id: 2,
              value: "no",
              label: "No",
            },
          ],
        },
      ],
    },
    {
      id: 2,
      title: "Requirement: Scope and Objective",
      questions: [
        {
          srno: 4,
          statement:
            "Are all aspects of the requirements document (i.e., Functional Spec.) addressed in the design?",
          answer: [
            {
              id: 1,
              value: "yes",
              label: "Yes",
            },
            {
              id: 2,
              value: "no",
              label: "No",
            },
          ],
        },
        {
          srno: 5,
          statement:
            "Is the architecture / block diagram well defined and understood?",
          answer: [
            {
              id: 1,
              value: "yes",
              label: "Yes",
            },
            {
              id: 2,
              value: "no",
              label: "No",
            },
          ],
        },
        {
          srno: 6,
          statement:
            "The project's objective of study (what product, process, resource etc.) is being addressed?",
          answer: [
            {
              id: 1,
              value: "yes",
              label: "Yes",
            },
            {
              id: 2,
              value: "no",
              label: "No",
            },
          ],
        },
        {
          srno: 7,
          statement:
            "The project's purpose is the purpose of the project addressed properly (why it's being pursued: to evaluate, reduce, increase, etc.)?",
          answer: [
            {
              id: 1,
              value: "yes",
              label: "Yes",
            },
            {
              id: 2,
              value: "no",
              label: "No",
            },
          ],
        },
        {
          srno: 8,
          statement:
            "The project's viewpoint: Is the project's viewpoint understood? (Who is the project's end user?)",
          answer: [
            {
              id: 1,
              value: "yes",
              label: "Yes",
            },
            {
              id: 2,
              value: "no",
              label: "No",
            },
          ],
        },
        {
          srno: 9,
          statement:
            "Is the project goal statement in alignment with the sponsoring organization's business goals and mission?",
          answer: [
            {
              id: 1,
              value: "yes",
              label: "Yes",
            },
            {
              id: 2,
              value: "no",
              label: "No",
            },
          ],
        },
      ],
    },
    {
      id: 3,
      title: "Analysis",
      questions: [
        {
          srno: 10,
          statement:
            "Is information domain analysis complete, consistent and accurate?",
          answer: [
            {
              id: 1,
              value: "yes",
              label: "Yes",
            },
            {
              id: 2,
              value: "no",
              label: "No",
            },
          ],
        },
        {
          srno: 11,
          statement:
            "Is the problem statement categorized in the identified area and targeted towards a specific area therein?",
          answer: [
            {
              id: 1,
              value: "yes",
              label: "Yes",
            },
            {
              id: 2,
              value: "no",
              label: "No",
            },
          ],
        },
        {
          srno: 12,
          statement: "Are external and internal interfaces properly defined?",
          answer: [
            {
              id: 1,
              value: "yes",
              label: "Yes",
            },
            {
              id: 2,
              value: "no",
              label: "No",
            },
          ],
        },
        {
          srno: 13,
          statement:
            "Does the Use Case Model properly reflect the actors and their roles and responsibilities?",
          answer: [
            {
              id: 1,
              value: "yes",
              label: "Yes",
            },
            {
              id: 2,
              value: "no",
              label: "No",
            },
          ],
        },
        {
          srno: 14,
          statement: "Are all requirements traceable to system level?",
          answer: [
            {
              id: 1,
              value: "yes",
              label: "Yes",
            },
            {
              id: 2,
              value: "no",
              label: "No",
            },
          ],
        },
        {
          srno: 15,
          statement:
            "Is similar type of methodology / model used for existing work?",
          answer: [
            {
              id: 1,
              value: "yes",
              label: "Yes",
            },
            {
              id: 2,
              value: "no",
              label: "No",
            },
          ],
        },
        {
          srno: 16,
          statement: "Are requirements consistent with schedule, resources and budget?",
          answer: [
            {
              id: 1,
              value: "yes",
              label: "Yes",
            },
            {
              id: 2,
              value: "no",
              label: "No",
            },
          ],
        },
      ],
    },
  ];

  return (
    <div className="w-auto h-screen p-5">
      <h1 className="text-2xl font-bold mb-5">Review-1 Checklist : Synopsis</h1>
      <section>
        {Data.map((data) => {
          return (
            <div key={data.id}>
              <h3 className="w-full mb-2 text-center text-lg font-semibold text-blue-500">
                {data.title}
              </h3>
              <Table className="mb-4">
                <TableHeader>
                  <TableRow>
                    <TableHead>Sr. No.</TableHead>
                    <TableHead>Statement</TableHead>
                    <TableHead>Answer</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.questions.map((row, index) => (
                    <TableRow key={row.srno}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{row.statement}</TableCell>
                      <TableCell>
                        <Select>
                          <SelectTrigger className="bg-blue-100">
                            <SelectValue placeholder="Select answer" />
                          </SelectTrigger>
                          <SelectContent className="bg-blue-500">
                            {row.answer.map((ans) => (
                              <SelectItem key={ans.id} value={ans.value}>
                                {ans.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default First;
