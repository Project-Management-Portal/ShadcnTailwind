import { Dispatch, SetStateAction } from "react";
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

const answerOptions = [
  { id: 1, value: "YES", label: "Yes" },
  { id: 2, value: "NO", label: "No" },
];

type questionType = {
  id: string;
  statement: string;
  number: string;
};

interface resQuestionType {
  id: string;
  answer: string;
}

interface tableProps {
  category: string;
  questions: questionType[];
  answers: resQuestionType[];
  setAnswers: Dispatch<SetStateAction<resQuestionType[]>>;
}

function OptionTable({ category, questions, answers, setAnswers }: tableProps) {
  const onUpdate = (id: string, answer: string) => {
    const existingAnswerIndex = answers.findIndex((item) => item.id === id);

    if (existingAnswerIndex !== -1) {
      // If an answer with the same id exists, update it
      const updatedAnswers = answers.map((item, index) => {
        if (index === existingAnswerIndex) {
          return {
            ...item,
            answer: answer,
          };
        } else {
          return item;
        }
      });
      setAnswers(updatedAnswers);
    } else {
      // If no answer with the same id exists, push a new answer
      const newAnswers = [
        ...answers,
        {
          id,
          answer,
        },
      ];
      setAnswers(newAnswers);
    }
  };

  return (
    <div>
      <div>
        <h3 className="w-full mb-2 text-center text-lg font-semibold text-blue-500">
          {category}
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
            {questions.map((question) => (
              <TableRow key={question.id}>
                <TableCell>{question.number}</TableCell>
                <TableCell>{question.statement}</TableCell>
                <TableCell>
                  <Select onValueChange={(val) => onUpdate(question.id, val)}>
                    <SelectTrigger className="bg-blue-100">
                      <SelectValue placeholder="Select answer" />
                    </SelectTrigger>
                    <SelectContent className="bg-blue-500">
                      {answerOptions.map((ans) => (
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
    </div>
  );
}

export default OptionTable;
