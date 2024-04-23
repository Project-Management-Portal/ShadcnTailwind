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
  answer?: string;
};

interface tableProps {
  category: string;
  questions: questionType[];
}

function ShowOptionTable({ category, questions }: tableProps) {
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
                  <Select disabled={true}>
                    <SelectTrigger className="bg-blue-100">
                      <SelectValue placeholder={question.answer} />
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

export default ShowOptionTable;
